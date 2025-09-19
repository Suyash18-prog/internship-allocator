import os
import pandas as pd

STUDENT_FILE = "students.csv"

def save_student_profile(profile: dict, source: str = "manual"):
    """Save student profile into students.csv"""
    if os.path.exists(STUDENT_FILE):
        df = pd.read_csv(STUDENT_FILE)
    else:
        df = pd.DataFrame(columns=[
            "name", "email", "education", "skills",
            "sector_interests", "location_pref", "experience"
        ])

    # Prevent duplicates by email
    if profile.get("email") in df["email"].values:
        df.loc[df["email"] == profile["email"], :] = [
            profile.get("name", ""),
            profile.get("email", ""),
            profile.get("education", ""),
            profile.get("skills", ""),
            profile.get("sector_interests", ""),
            profile.get("location_pref", ""),
            profile.get("experience", "")
        ]
    else:
        new_record = {
            "name": profile.get("name", ""),
            "email": profile.get("email", ""),
            "education": profile.get("education", ""),
            "skills": profile.get("skills", ""),
            "sector_interests": profile.get("sector_interests", ""),
            "location_pref": profile.get("location_pref", ""),
            "experience": profile.get("experience", "")
        }
        df = pd.concat([df, pd.DataFrame([new_record])], ignore_index=True)

    df.to_csv(STUDENT_FILE, index=False)
    return profile
