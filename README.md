# music-app
full stack music app using python(Fast-Api) backend , db.sqlite
# FastAPI Music Project

This project is a music web application built with FastAPI (Python backend) and a static frontend. It allows users to play music, manage profiles, and more.

## Features
- FastAPI backend
- Static frontend (HTML/CSS/JS)
- SQLite database
- User profile photos
- Music file uploads

## Requirements
- Python 3.12+
- Git
- (Recommended) Virtual environment tool: `venv`

## Setup Instructions

### 1. Clone the Repository
```powershell
git clone https://github.com/your-username/fastApi-music_project3_final.git
cd fastApi-music_project3_final
```

### 2. Create and Activate a Virtual Environment
```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install Dependencies
```powershell
pip install fastapi uvicorn sqlalchemy pydantic requests razorpay
```

### 4. (Optional) Install Additional Requirements
If you have a `requirements.txt` file, run:
```powershell
pip install -r requirements.txt
```

### 5. Run the FastAPI Server
```powershell
uvicorn main:app --reload
```

- The API will be available at: http://127.0.0.1:8000
- The automatic docs will be at: http://127.0.0.1:8000/docs

### 6. Access the Frontend
Open `music-app/public/index.html` in your browser to use the music app interface.

---

## Project Structure
```
fastApi-music_project3_final/
│   main.py
│   users.db
│   ...
├── music-app/
│   └── public/
│       ├── index.html
│       ├── home.html
│       ├── js/
│       ├── css/
│       └── music/
├── profile_photos/
├── .venv/
└── ...
```

## Notes
- Make sure to activate the virtual environment before running any Python commands.
- If you encounter issues with missing packages, install them using `pip install <package-name>`.
- For development, use `--reload` with Uvicorn for auto-reloading.

## License
if you upload on your github then pleation tag me also
