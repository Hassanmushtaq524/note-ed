from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import JSONResponse
from starlette.requests import Request 
from sqlalchemy.orm import Session
from db import db_dependency
from models import User, Course, Note
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from typing import Annotated
from helpers.aws import upload_to_s3
from helpers.extract import extract_text_from_images, pdf_to_images
from helpers.user_dependency import auth_required, admin_required
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

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
    except Exception as e:
        return JSONResponse(status_code=500, content="Internal server error")

    


"""
TODO
On the frontend, I have 
CourseContext, with course, setCourse(course._id), topic, setTopic(topic._id), topicList, setTopicList(), setNote(Note._id) which
maybe to open the course itself, noteList, setNoteList()

GET /course/{course._id} -
# gets all the notes for the selected course
# no auth
# returns { course sem, year, code, topic id name list }

POST /course/{course._id} -
# Add a note to the course
# body { name }
# auth
# returns { topic id name list }


----- FOR NOW, NOT USING
POST /course/{course._id}/topic 
# Sets up the topics for the selected course
# auth
# body { file data } 
# returns { course id, topic id name list }

GET /course/topic/{topic._id} -
# Gets all the notes for the selected topic
# no auth
# returns { topic id, notes id url name username list }

POST /course/topic/{topic._id} -
# Add notes to a topic
# auth
# body { name }
# returns { added note id, pdf url, name, username }

"""



@router.get("/{course_id}")
def get_all_notes(course_id: int, request: Request, db: Session = db_dependency):
    """
    Get all notes for the selected course 
    """
    try:
        course_info = db.query(Course).filter(Course._id == course_id).first()
        if not course_info:
            raise HTTPException(status_code=404, detail="Content not found")
        notes_list = db.query(Note).filter(Note.course_id == course_id).all()

        
        return_list = []
        for note in notes_list:
            ret = db.query(User).filter(User._id == note.user_id).first()
            return_list.append({
                '_id': note._id,
                'name': note.name,
                'pdf_url': note.pdf_url,
                'type': note.type,
                'username': ret.name,
                'course_id': note.course_id
            })
            

        return {
            "status": "success",
            "course": course_info,
            "notes": return_list
        }
    except Exception as e:
        return JSONResponse(status_code=500, content="Internal server error")

    
    


@router.post("/{course_id}")
async def add_note(course_id: int, file: Annotated[UploadFile, File()], request: Request, db: Session = db_dependency, user: User = Depends(auth_required)):
    """
    Add the notes uploaded by the authenticated user to AWS and save the url to the db for access
    """
    try:
        # TODO: stop any inappropriate things
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Incorrect file format")
        
        # we need to save it to aws
        pdf_url = await upload_to_s3(file)
        if not pdf_url:
             raise HTTPException(status_code=400, detail="Unable to upload to s3")
        
        new_note = Note(name=file.filename, user_id=user._id, course_id=course_id, pdf_url=pdf_url)
        db.add(new_note)
        db.commit()
        db.refresh(new_note)
        return {
            "status": "success",
            "note": new_note
        }
    except Exception as e:
        return JSONResponse(status_code=500, content="Internal server error")

        
