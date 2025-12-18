from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

# Update this path if your DB is elsewhere
DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

try:
    with engine.connect() as conn:
        conn.execute("ALTER TABLE users ADD COLUMN is_subscribed INTEGER DEFAULT 0;")
        print("Column 'is_subscribed' added successfully.")
except OperationalError as e:
    if "duplicate column name" in str(e):
        print("Column 'is_subscribed' already exists.")
    else:
        print("Error:", e)
except Exception as e:
    print("Error:", e)
