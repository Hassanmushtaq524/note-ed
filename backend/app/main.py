from fastapi import Depends, FastAPI, HTTPException
from .routers import auth
import os

DB_PATH = os.getenv("DB_PATH")

app = FastAPI(title="backend", 
              version="1.0.0")


# app.include_router(auth.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}