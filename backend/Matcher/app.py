from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from matcher_manual import router as manual_router
from matcher_resume import router as resume_router
from fastapi import APIRouter
from pydantic import BaseModel
import os
import csv
from typing import List, Dict, Any

app = FastAPI(title="Student Internship Matcher")

# CORS for local dev and simple deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root API router with /api prefix to align with frontend proxy
api = APIRouter(prefix="/api")

# Mount feature routers
api.include_router(manual_router, prefix="/manual", tags=["Manual Entry"])
api.include_router(resume_router, prefix="/resume", tags=["Resume Upload"])


def _data_path(filename: str) -> str:
    base_dir = os.path.dirname(__file__)
    return os.path.join(base_dir, filename)


@api.get("/companies", tags=["Companies"]) 
def get_companies() -> List[Dict[str, Any]]:
    path = _data_path("companies.csv")
    if not os.path.exists(path):
        return []
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        return list(reader)


@api.get("/notifications", tags=["Notifications"]) 
def list_notifications() -> List[Dict[str, Any]]:
    return []


@api.post("/notifications/{notification_id}/read", tags=["Notifications"]) 
def mark_notification_read(notification_id: str) -> Dict[str, Any]:
    return {"id": notification_id, "status": "read"}


@api.get("/applications", tags=["Applications"]) 
def list_applications() -> List[Dict[str, Any]]:
    return []


@api.get("/industry/recommendations", tags=["Industry"]) 
def industry_recommendations() -> Dict[str, Any]:
    return {"recommendations": []}


# Students endpoints minimal surface used by UI.
from matcher_manual import CandidateProfile, save_student_profile  # type: ignore


@api.post("/students", tags=["Students"]) 
def create_student(profile: CandidateProfile) -> Dict[str, Any]:
    save_student_profile(profile, filepath=_data_path("students.csv"))
    return {"ok": True, "profile": profile.dict()}


@api.get("/students/{student_id}", tags=["Students"]) 
def get_student(student_id: str) -> Dict[str, Any]:
    # Minimal placeholder so pages render without errors
    return {
        "id": student_id,
        "name": "Student",
        "skills": ["python", "react"],
        "email": "student@example.com",
    }


# Register the /api router
app.include_router(api)


# -------------------- Auth (stubs) --------------------
class AuthPayload(BaseModel):
    email: str
    password: str
    role: str | None = None


@api.post("/auth/signup", tags=["Auth"]) 
def auth_signup(payload: AuthPayload) -> Dict[str, Any]:
    role = payload.role or "student"
    return {
        "token": "dev-token",
        "user": {"email": payload.email, "role": role},
        "message": "Signup ok",
    }


@api.post("/auth/login", tags=["Auth"]) 
def auth_login(payload: AuthPayload) -> Dict[str, Any]:
    role = payload.role or ("company" if payload.email.endswith("@company.com") else "student")
    return {
        "token": "dev-token",
        "user": {"email": payload.email, "role": role},
        "message": "Login ok",
    }

@app.get("/")
def root():
    return {"message": "Welcome to the Internship Matcher API"}
