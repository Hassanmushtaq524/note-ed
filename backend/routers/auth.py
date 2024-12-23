from fastapi import APIRouter, HTTPException
from starlette.requests import Request 
import uvicorn 
from google.oauth2 import id_token 
from google.auth.transport import requests 
import os
from dotenv import load_dotenv
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


router = APIRouter()


@router.get("/callback")
def authentication(request: Request, token: str): 
	try: 
		user = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID) 
        
		request.session['user'] = dict({  
			"email" : user["email"],
			"name" : user["name"]
		}) 
	
		return {
            "status": "success",
            "user": {
                "email": user["email"],
                "name": user["name"]
            },
            "token": token
        }
	except ValueError: 
		raise HTTPException(status_code=401, detail="Unauthorized")
	


@router.get('/checksession') 
def check(request: Request): 
	if request.session.get('user'):
		return "hi "+ str(request.session.get('user')['email'])
	else:
		raise HTTPException(status_code=403, detail="Not signed in")
