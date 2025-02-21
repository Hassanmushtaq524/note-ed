from sqlalchemy import create_engine
from fastapi import HTTPException, Depends
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os
load_dotenv()

DB_PATH = os.getenv("DB_PATH")

engine = create_engine(
    DB_PATH,
    pool_size=10,      # Controls max concurrent connections
    max_overflow=5,    # Allows extra temporary connections
    pool_recycle=1800, # Prevents idle connections from closing
    pool_pre_ping=True # Ensures connections are alive before reuse
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


async def get_db():
    db = SessionLocal()
    try: 
        yield db
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print("There is a error in database instance: %s" % e)
        raise HTTPException(status_code=404, detail=f"{e}")
    finally:
        db.close()
        
        
db_dependency = Depends(get_db)