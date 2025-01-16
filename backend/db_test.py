from sqlalchemy import create_engine

DATABASE_URL = "postgresql://doadmin:AVNS_KZ-SWwHHAbo1NWrhZc_@notinotesdb-do-user-18824133-0.f.db.ondigitalocean.com:25060/defaultdb?sslmode=require"

try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
    with engine.connect() as conn:
        result = conn.execute("SELECT 1")
        print(result.fetchone())
except Exception as e:
    print(f"Error: {e}")
