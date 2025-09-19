from fastapi import APIRouter, UploadFile, File
import pandas as pd
import os, json, re
from PyPDF2 import PdfReader
try:
    from sentence_transformers import SentenceTransformer, util
except Exception:  # pragma: no cover - optional in dev
    SentenceTransformer = None
    util = None
try:
    from groq import Groq
except Exception:
    Groq = None
from utils import save_student_profile

router = APIRouter()
model = SentenceTransformer("all-MiniLM-L6-v2") if SentenceTransformer else None
BASE_DIR = os.path.dirname(__file__)
internships_df = pd.read_csv(os.path.join(BASE_DIR, "companies.csv"))

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY) if (Groq and GROQ_API_KEY) else None

def extract_profile_from_resume_llm(resume_text: str):
    """Extract structured profile using Groq LLM"""
    cleaned_text = re.sub(r"\s+", " ", resume_text).strip()

    prompt = f"""
    Extract student details from this resume and return only valid JSON in this format:
    {{
        "name": "Candidate Name",
        "email": "candidate@email.com",
        "education": "Highest degree",
        "skills": "comma separated skills",
        "sector_interests": "comma separated interests",
        "location_pref": "Preferred city",
        "experience": "short experience summary"
    }}

    Resume text:
    {cleaned_text}
    """

    if not groq_client:
        # Fallback: naive extraction using regexes
        skills = ", ".join(sorted(set(re.findall(r"[A-Za-z][A-Za-z+.#0-9]{1,20}", resume_text)))).lower()[:200]
        return {
            "name": "",
            "email": "",
            "education": "",
            "skills": skills,
            "sector_interests": "",
            "location_pref": "",
            "experience": "",
        }

    response = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    raw_output = response.choices[0].message.content.strip()

    try:
        json_str = re.search(r"\{.*\}", raw_output, re.DOTALL).group()
        profile = json.loads(json_str)
    except Exception:
        profile = {
            "name": "", "email": "", "education": "",
            "skills": "", "sector_interests": "",
            "location_pref": "", "experience": ""
        }
    return profile

@router.post("/resume/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload resume and recommend internships"""

    # Read PDF text
    reader = PdfReader(file.file)
    text = " ".join([page.extract_text() or "" for page in reader.pages])

    # Extract profile via LLM
    profile = extract_profile_from_resume_llm(text)

    # Save student profile
    saved_profile = save_student_profile(profile, source="resume")

    # Matching internships
    query_text = " ".join([
        saved_profile.get("skills", ""),
        saved_profile.get("education", ""),
        saved_profile.get("sector_interests", "")
    ])
    if model is None or util is None:
        # Fallback: return top entries without scoring
        recommendations = internships_df.head(5).to_dict(orient="records")
        return {
            "extracted_profile": saved_profile,
            "recommendations": recommendations,
        }

    query_embedding = model.encode(query_text, convert_to_tensor=True)

    internships_df["combined_text"] = (
        internships_df["SkillsRequired"].fillna("") + " " +
        internships_df["PostedRole"].fillna("") + " " +
        internships_df["Industry"].fillna("")
    )
    internship_embeddings = model.encode(internships_df["combined_text"].tolist(), convert_to_tensor=True)
    similarities = util.cos_sim(query_embedding, internship_embeddings)[0]

    internships_df["score"] = similarities.cpu().numpy()
    recommendations = internships_df.sort_values("score", ascending=False).head(5).to_dict(orient="records")

    return {
        "extracted_profile": saved_profile,
        "recommendations": recommendations
    }
