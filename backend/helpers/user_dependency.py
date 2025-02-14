from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import User
from db import db_dependency
from starlette.requests import Request



def admin_required(request: Request, db: Session = db_dependency):
    """
    Dependency function to make sure the current user is an admin
    """
    if not request.session.get("user"):
        raise HTTPException(status_code=403)
    current_user = request.session.get("user")
    user = db.query(User).filter(User.email == current_user.get("email")).first()
    if not user:
        raise HTTPException(status_code=403)
    if user.role != "admin":
        raise HTTPException(status_code=403)
    return user



def auth_required(request: Request, db: Session = db_dependency):
    """
    Dependency function to make sure user is authenticated
    """
    if not request.session.get("user"):
        raise HTTPException(status_code=403)
    current_user = request.session["user"]
    user = db.query(User).filter(User.email == current_user["email"]).first()
    if not user:
        raise HTTPException(status_code=403)
    return user
    
