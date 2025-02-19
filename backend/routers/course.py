from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Query
from fastapi.responses import JSONResponse
from starlette.requests import Request 
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from db import db_dependency
from models import User, Course, Note
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from typing import Annotated
from helpers.aws import upload_to_s3
from helpers.extract import extract_text_from_images, pdf_to_images
from helpers.user_dependency import auth_required, admin_required
from datetime import datetime, UTC
import math
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
DAILY_NOTE_LIMIT = 10


router = APIRouter()



class AddCourseBody(BaseModel):
    course_code: str
    name: str
 
@router.post("/")
def add_course(request: Request, data: AddCourseBody, db: Session = db_dependency, admin: User = Depends(admin_required)):
    """
    Adds a course by its course_code and name. ADMIN required.
    """
    try:
        # if it is not then raise error, otherwise we try adding course
        course = db.query(Course).filter(Course.course_code == data.course_code).first()
        if course:
            raise HTTPException(status_code=400, detail="Course already exists")

        new_course = Course(
            course_code=data.course_code,
            name=data.name
        )

        db.add(new_course)
        db.commit()
        db.refresh(new_course)
        return {
            "status": "success",
            "course": new_course
        }
    except HTTPException as http_exc: 
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content="Internal server error")



@router.get("/")
def get_all_courses(request: Request, db: Session = db_dependency):
    """
    Gets all the courses in the db
    """
    try:
        courses = db.query(Course).all()
        return {
            "status": "success",
            "courses": courses
        }
    except HTTPException as http_exc: 
        raise http_exc
    except Exception as e:
        # TODO: remove
        print(e)
        return JSONResponse(status_code=500, content="Internal server error")

    

@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = db_dependency, admin: User = Depends(admin_required)):
    """
    Delete a course. ADMIN required.
    """
    try:
        course = db.query(Course).filter(Course._id == course_id).first()
        if not course:
            raise HTTPException(status_code=404)
        
        db.delete(course)
        db.commit()
        
        return {
            "status": "success",
            "message": f"Course {course.course_code} deleted successfully"
        }
    except HTTPException as http_exc: 
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content="Internal server error")



@router.get("/{course_id}")
def get_all_notes(
    course_id: int, 
    request: Request, 
    type: str = Query(default="lecture_note"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = db_dependency
):
    """
    Get paginated notes for the selected course, filtered by type
    """
    try:
        course_info = db.query(Course).filter(Course._id == course_id).first()
        if not course_info:
            raise HTTPException(status_code=404)
        
        # Calculate offset
        offset = (page - 1) * limit
        
        # Get total count of notes with type filter
        total_notes = db.query(Note).filter(
            Note.course_id == course_id,
            Note.type == type
        ).count()
        
        # Get paginated notes with type filter
        notes_list = db.query(Note)\
            .filter(
                Note.course_id == course_id,
                Note.type == type
            )\
            .offset(offset)\
            .limit(limit)\
            .all()
        
        return_list = []
        for note in notes_list:
            ret = db.query(User).filter(User._id == note.user_id).first()
            return_list.append({
                '_id': note._id,
                'name': note.name,
                'pdf_url': note.pdf_url,
                'type': note.type,
                'user': { 
                    '_id': ret._id,
                    'username': ret.name,
                },
                'course_id': note.course_id,
                'created_at': note.created_at
            })

        return {
            "status": "success",
            "course": course_info,
            "notes": return_list,
            "pagination": {
                "total": total_notes,
                "page": page,
                "limit": limit,
                "total_pages": math.ceil(total_notes / limit)
            }
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content="Internal server error")



@router.post("/{course_id}/{note_type}")
async def add_note(course_id: int, note_type: str, file: Annotated[UploadFile, File()], request: Request, db: Session = db_dependency, user: User = Depends(auth_required)):
    """
    Add the notes uploaded by the authenticated user to AWS and save the url to the db for access
    """
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Incorrect file format")
        course_info = db.query(Course).filter(Course._id == course_id).first()
        if not course_info:
            raise HTTPException(status_code=404)
        
        # Get the start of the current day (midnight)
        today_start = datetime.now(UTC).replace(hour=0, minute=0, second=0, microsecond=0)

        # Count user's notes created today
        notes_today = db.query(Note).filter(
            Note.user_id == user._id,
            Note.created_at >= today_start
        ).count()
        
        # Check if user has exceeded the daily limit
        if notes_today >= DAILY_NOTE_LIMIT:
            raise HTTPException(status_code=403, detail="Daily note limit reached. Try again tomorrow.")

        # we need to save it to aws
        pdf_url = await upload_to_s3(file)
        if not pdf_url:
            raise HTTPException(status_code=400, detail="Unable to upload to s3")
        
        new_note = Note(name=file.filename, user_id=user._id, course_id=course_id, pdf_url=pdf_url, type=note_type)
        db.add(new_note)
        db.commit()
        db.refresh(new_note)
        return {
            "status": "success",
            "note": new_note
        }
    except HTTPException as http_exc: 
        raise http_exc
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content="Internal server error")

        
