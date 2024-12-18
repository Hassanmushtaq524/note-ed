from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from db import Base

class Users(Base):
    __tablename__='users'

    _id = Column(Integer, primary_key=True, index=True)
    

