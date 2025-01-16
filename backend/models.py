from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, URL, Enum
from sqlalchemy.orm import relationship
from db import Base



class User(Base):
    __tablename__='users'
    _id = Column(Integer, primary_key=True, autoincrement=True)
    google_sub = Column(String, unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    role = Column(Enum('user', 'admin', name='user_roles'), default='user', nullable=False) 
    email = Column(String(120), unique=True, nullable=False)



class Course(Base):
    __tablename__ = 'courses'
    _id = Column(Integer, primary_key=True, autoincrement=True)
    course_code = Column(String(10), unique=True, nullable=False)
    semester = Column(String(10))
    year = Column(Integer)



# FOR NOW, NOT USING
class Topic(Base):
    __tablename__ = 'topics'
    _id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    course_id = Column(Integer, ForeignKey('courses._id', ondelete="CASCADE"), nullable=False)



class Note(Base):
    __tablename__ = 'notes'
    _id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    pdf_url = Column(String(255), nullable=False)  
    user_id = Column(Integer, ForeignKey('users._id', ondelete="CASCADE"), nullable=False)
    type = Column(Enum('assignment', 'lecture_note', 'exam', name='note_type'), default='lecture_note', nullable=False) 
    course_id = Column(Integer, ForeignKey('courses._id', ondelete="CASCADE"), nullable=False)