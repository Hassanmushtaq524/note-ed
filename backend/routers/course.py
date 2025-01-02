from fastapi import APIRouter, HTTPException, Depends
from starlette.requests import Request 
from sqlalchemy.orm import Session
from db import db_dependency
from models import User, Course
from pydantic import BaseModel
import os
from dotenv import load_dotenv
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
    return current_user


 
class AddCourseBody(BaseModel):
    course_code: str
    semester: str
    year: int
 
@router.post("/")
def add_course(request: Request, data: AddCourseBody, db: Session = db_dependency, admin: None = Depends(admin_required)):
    try:
        # if it is not then raise error, otherwise we try adding course
        course = db.query(Course).filter(Course.course_code == data.course_code).first()
        if course:
            raise HTTPException(status_code=400, detail="Course already exists")

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
        raise HTTPException(status_code=401, detail="Unauthorized")


