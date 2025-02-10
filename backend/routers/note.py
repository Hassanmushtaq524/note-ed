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
from helpers.extract import extract_text_from_images, pdf_to_images
from helpers.user_dependency import auth_required, admin_required
from helpers.aws import delete_from_s3
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

router = APIRouter()


@router.delete("/{note_id}")
def delete_note(request: Request, note_id: int, db: Session = db_dependency, user: User = Depends(auth_required)):
    try:
        note = db.query(Note).filter(Note._id == note_id).first()
        
        if not note:
            raise HTTPException(status_code=404)
        if note.user_id != user._id:
            raise HTTPException(status_code=403)
        
        s3_key = note.pdf_url.split("/")[-1]
        s3_key = f"uploads/{s3_key}"
        if not delete_from_s3(s3_key):
            raise HTTPException(status_code=400)
        
        db.delete(note)
        db.commit()

        return {
            "status": "success"
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500)