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
from aws import upload_to_s3
from helpers.extract import extract_text_from_images, pdf_to_images
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

router = APIRouter()


 
def admin_required(request: Request, db: Session = db_dependency):
    if not request.session["user"]:
        raise HTTPException(status_code=403, detail="Forbidden")
    current_user = request.session["user"]
    user = db.query(User).filter(User.email == current_user["email"]).first()
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return user



def auth_required(request: Request, db: Session = db_dependency):
    if not request.session.get("user"):
        raise HTTPException(status_code=403, detail="Forbidden")
    current_user = request.session["user"]
    user = db.query(User).filter(User.email == current_user["email"]).first()
    return user


 
class AddCourseBody(BaseModel):
    course_code: str
    semester: str
    year: int
 
@router.post("/")
def add_course(request: Request, data: AddCourseBody, db: Session = db_dependency, admin: User = Depends(admin_required)):
    """
    Adds a course by its course_code, semester and year. ADMIN required.
    """
    try:
        # if it is not then raise error, otherwise we try adding course
        course = db.query(Course).filter(Course.course_code == data.course_code).first()
        if course:
            raise HTTPException(status_code=403, detail="Forbidden")

        new_course = Course(
            course_code=data.course_code,
            semester=data.semester,
            year=data.year
        )

        db.add(new_course)
        db.commit()

        return {
            "status": "success",
            "course": new_course.course_code
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")



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
        raise HTTPException(status_code=500, detail="Internal server error")
    


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
            return JSONResponse(status_code=404, content={ "detail": "Content not found" })
        notes_list = db.query(Note).filter(Note.course_id == course_id).all()
        return {
            "status": "success",
            "course": course_info,
            "notes": notes_list
        }
    except Exception as e:
        #TODO: remove
        print(e)
        return JSONResponse(status_code=500, content={ "detail": "Internal Server Error" })
    


class AddNoteBody(BaseModel):
    name: str

@router.post("/{course_id}")
async def add_note(course_id: int, file: Annotated[UploadFile, File()], request: Request, db: Session = db_dependency, user: User = Depends(auth_required)):
    """
    Add the notes uploaded by the authenticated user to AWS and save the url to the db for access
    """
    try:
        # TODO: stop any inappropriate things
        if file.content_type != "application/pdf":
            return JSONResponse(status_code=400, content={ "detail": "Incorrect file format" })
        
        # we need to save it to aws
        pdf_url = await upload_to_s3(file)
        if not pdf_url:
            return JSONResponse(status_code=400, content={ "detail": "Unable to upload s3" })
        
        new_note = Note(name=file.filename, user_id=user._id, course_id=course_id, pdf_url=pdf_url)
        db.add(new_note)
        db.commit()
        db.refresh(new_note)
        return {
            "status": "success",
            "note": new_note
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={ "detail": "Internal Server Error" })
        


# @router.post("/testing/{course_id}/topic")
# async def create_topics_and_add_notes(course_id: int, 
#                                 file: Annotated[UploadFile, File()], 
#                                 request: Request, 
#                                 db: Session = db_dependency, 
#                                 user: User = Depends(auth_required)):
    
#     """
#     Analyze the notes pdf, separate the pages, and create relevant topics
#     """
#     try:
#         found_topic = db.Query(Topic).filter(Topic.course_id == course_id).first()
#         if found_topic:
#             return JSONResponse(status_code=400, content={ "detail": "Course already has topics" })
        
#         # Extract the pdf
#         if file.content_type != "application/pdf":
#             return JSONResponse(status_code=400, content={ "detail": "Incorrect file format" })
        
#         images = await pdf_to_images(file)
#         pdf_text = await extract_text_from_images(images)
#         # Analyze it to get relevant topics
#         # Mark which pages correspond to which topics
#         # Then separate those pages
#         # Create the topics
#         # TODO: remove
#         return {
#             "file": file,
#             "text": pdf_text
#         }
#     except Exception as e:
#         #TODO: remove
#         print(e)
#         return JSONResponse(status_code=500, content={ "detail": "Internal Server Error" })