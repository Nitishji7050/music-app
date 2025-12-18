from fastapi import Request
import hmac
import hashlib
import razorpay

# Razorpay API keys
RAZORPAY_KEY_ID = "key id"
RAZORPAY_KEY_SECRET = "key secret"

# fast api app instance
from fastapi import FastAPI, HTTPException, Query, Depends, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import uvicorn

# database imports
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,

    # I can restrict this to ["http://127.0.0.1:5501"] or your frontend origin
    # use ["*"] to allow all endpoint origins
    # but it's better to specify the exact origin for security
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# User model for SQLAlchemy
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_subscribed = Column(Integer, default=0)  #if '0' = not subscribed, '1' = subscribed

Base.metadata.create_all(bind=engine)

# Pydantic schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    is_subscribed: Optional[int] = 0

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_subscribed: int
    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Signup endpoint
@app.post("/api/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password,
        is_subscribed=user.is_subscribed or 0
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "name": new_user.name, "email": new_user.email, "is_subscribed": new_user.is_subscribed}

# Login endpoint
@app.post("/api/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email, User.password == user.password).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email}

# Profile update endpoint
@app.put("/api/profile/{user_id}")
def update_profile(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.name:
        db_user.name = user.name
    if user.email:
        db_user.email = user.email
    if user.password:
        db_user.password = user.password
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email}

# Profile GET endpoint for fetching user info
@app.get("/api/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    # Check if profile photo exists
    import os
    photo_path = f"profile_photos/user_{user_id}.png"
    photo_url = None
    if os.path.exists(photo_path):
        photo_url = f"/profile_photos/user_{user_id}.png"
    return {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email,
        "is_subscribed": db_user.is_subscribed,
        "photo_url": photo_url
    }

# Secure music download endpoint for subscribed users
from fastapi.responses import FileResponse
@app.get("/api/download/{user_id}")
def download_music(user_id: int, file: str, db: Session = Depends(get_db)):
    import os
    print(f"Download request: user_id={user_id}, file={file}")
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        print("User not found")
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.is_subscribed != 1:
        print(f"User {user_id} is not subscribed.")
        raise HTTPException(status_code=403, detail="Subscription required for downloads.")
    music_path = os.path.join("music-app", "public", "music", file)
    print(f"Resolved music_path: {music_path}")
    if not os.path.exists(music_path):
        print(f"File not found: {music_path}")
        raise HTTPException(status_code=404, detail="File not found.")
    try:
        with open(music_path, 'rb') as f:
            print(f"File {music_path} is readable.")
    except Exception as e:
        print(f"Error opening file: {e}")
        raise HTTPException(status_code=500, detail=f"File cannot be read: {e}")
    return FileResponse(music_path, media_type="audio/mpeg", filename=file)

# Profile photo upload endpoint (demo, saves file locally)
@app.post("/api/profile/{user_id}/photo")
def upload_profile_photo(user_id: int, file: UploadFile = File(...)):
    file_location = f"profile_photos/user_{user_id}.png"
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    return {"filename": file_location}

# Favourites endpoints (demo, in-memory)
favourites_db = {}

@app.get("/api/favourites/{user_id}")
def get_favourites(user_id: int):
    return favourites_db.get(user_id, [])

@app.post("/api/favourites/{user_id}")
def add_favourite(user_id: int, song: dict):
    if user_id not in favourites_db:
        favourites_db[user_id] = []
    favourites_db[user_id].append(song)
    return {"status": "added"}

# Music list endpoint (static demo) testing
@app.get("/api/music")
def get_music():
    return {
        "english": [
            {"title": "Levitating", "artist": "Dua lipa", "src": "/music/levtating1.mp3", "cover": "/img/cover1.jpg"},
            {"title": "Shape of You", "artist": "Ed Sheeran", "src": "/music/shapeofyou.mp3", "cover": "/img/cover2.jpg"},
            {"title": "Blind Light", "artist": "The Weekend", "src": "/music/The_Weeknd_-_Blinding_Lights_Offblogmedia.com.mp3", "cover": "/img/cover2.jpg"}
        ],
        "hindi": [
            {"title": "Tum Hi Ho", "artist": "Arijit Singh", "src": "/music/tumhiho.mp3", "cover": "/img/cover3.jpg"},
            {"title": "Kal Ho Naa Ho", "artist": "Sonu Nigam", "src": "/music/kalhonaaho.mp3", "cover": "/img/cover4.jpg"}
        ]
    }


app.mount("/profile_photos", StaticFiles(directory="profile_photos"), name="profile_photos")
app.mount("/music", StaticFiles(directory="music-app/public/music"), name="music")

