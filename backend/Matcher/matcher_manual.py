from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd
import numpy as np
try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None
import os, re

# ------------------ Helpers ------------------
def normalize_text(s):
    if not isinstance(s, str):
        return ""
    s = s.lower()
    s = re.sub(r"[^a-z0-9, ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def parse_skills(text):
    text = normalize_text(text)
    parts = re.split(r"[,;\n]| and ", text)
    skills = [p.strip() for p in parts if p.strip()]
    return list(dict.fromkeys(skills))

def jaccard_score(list1, list2):
    s1 = set([normalize_text(x) for x in list1 if x])
    s2 = set([normalize_text(x) for x in list2 if x])
    if not s1 and not s2:
        return 0.0
    return len(s1 & s2) / len(s1 | s2) if (s1 | s2) else 0.0

def _normalize_embeddings(embs):
    norms = np.linalg.norm(embs, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    return embs / norms

# ------------------ Matcher ------------------
class Matcher:
    def __init__(self, companies_df, model):
        self.df = companies_df.copy()
        for c in self.df.columns:
            self.df[c] = self.df[c].fillna("")
        self.df["combined_text"] = (
            self.df["SkillsRequired"].astype(str) + " " +
            self.df["PostedRole"].astype(str) + " " +
            self.df["Industry"].astype(str)
        )
        texts = self.df["combined_text"].apply(normalize_text).tolist()
        if SentenceTransformer is None:
            self.embeddings = np.zeros((len(texts), 384))
        else:
            self.embeddings = model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
            self.embeddings = _normalize_embeddings(self.embeddings)

    def recommend(self, candidate_text, candidate_skills, location_pref=None, top_k=5):
        if SentenceTransformer is None:
            sim = np.zeros(len(self.df))
        else:
            cand_emb = model.encode([normalize_text(candidate_text)], convert_to_numpy=True, show_progress_bar=False)
            cand_emb = _normalize_embeddings(cand_emb)[0]
            sim = np.dot(self.embeddings, cand_emb)
        jaccard = self.df["SkillsRequired"].apply(lambda r: jaccard_score(candidate_skills, parse_skills(r))).values
        if location_pref:
            loc = normalize_text(location_pref)
            loc_bonus = self.df["Location"].apply(lambda r: 1.0 if loc in normalize_text(r) else 0.0).values
        else:
            loc_bonus = np.zeros(len(self.df))
        score = 0.7*sim + 0.25*jaccard + 0.05*loc_bonus
        res = self.df.copy()
        res["score"] = score
        return res.sort_values("score", ascending=False).head(top_k)

# ------------------ Setup ------------------
MODEL_NAME = os.getenv("SENT_MODEL", "all-MiniLM-L6-v2")
model = SentenceTransformer(MODEL_NAME) if SentenceTransformer else None
BASE_DIR = os.path.dirname(__file__)
companies = pd.read_csv(os.path.join(BASE_DIR, "companies.csv"))
matcher = Matcher(companies, model)

# ------------------ FastAPI Router ------------------
router = APIRouter()

class CandidateProfile(BaseModel):
    name: str = ""
    email: str = ""
    education: str = ""
    skills: str = ""
    sector_interests: str = ""
    location_pref: str = ""
    experience: str = ""

def save_student_profile(profile: CandidateProfile, filepath="students.csv"):
    """Save profile into students.csv"""
    new_record = profile.dict()

    # Create or append to students.csv
    if os.path.exists(filepath):
        df = pd.read_csv(filepath)
    else:
        df = pd.DataFrame(columns=["name","email","education","skills","sector_interests","location_pref","experience"])

    # Check if student already exists by email
    if new_record["email"] in df["email"].values:
        df.loc[df["email"] == new_record["email"], :] = new_record.values()
    else:
        df = pd.concat([df, pd.DataFrame([new_record])], ignore_index=True)

    df.to_csv(filepath, index=False)

@router.post("/recommend_manual")
def recommend_manual(profile: CandidateProfile):
    # Save student profile
    save_student_profile(profile)

    # Build candidate text for embeddings
    candidate_text = " ".join([
        profile.education,
        profile.skills,
        profile.sector_interests,
        profile.experience
    ])

    # Extract skills
    candidate_skills = parse_skills(profile.skills)

    # Get recommendations
    results = matcher.recommend(candidate_text, candidate_skills, profile.location_pref, top_k=5)

    return {
        "saved_profile": profile.dict(),
        "recommendations": results.to_dict(orient="records")
    }
