from sentence_transformers import SentenceTransformer
import numpy as np
import json
import os

from models.ats_scorer import ats_score

# Load embedding model ONCE
model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------------
# Built-in base jobs with skills
# -------------------------------
BASE_JOBS = {
    "Machine Learning Engineer": [
        "python", "machine learning", "deep learning",
        "numpy", "pandas", "tensorflow", "pytorch"
    ],
    "Backend Developer": [
        "python", "django", "flask", "sql", "api"
    ],
    "Frontend Developer": [
        "react", "javascript", "css", "html", "ui"
    ],
    "Data Analyst": [
        "sql", "python", "pandas", "numpy",
        "data analysis", "visualization"
    ],
}

CUSTOM_JOBS_PATH = os.path.join("data", "custom_jobs.json")


# -------------------------------
# Load jobs safely
# -------------------------------
def load_jobs():
    jobs = dict(BASE_JOBS)

    if os.path.exists(CUSTOM_JOBS_PATH):
        with open(CUSTOM_JOBS_PATH, "r", encoding="utf-8") as f:
            custom_jobs = json.load(f)

        for job in custom_jobs:
            jobs[job["job_title"]] = job["required_skills"]

    return jobs


# -------------------------------
# MAIN MATCH FUNCTION (FIXED)
# -------------------------------
def match_job(resume_skills):
    if not resume_skills:
        return []

    jobs = load_jobs()
    results = []

    resume_text = " ".join(resume_skills)
    resume_vec = model.encode(resume_text, normalize_embeddings=True)

    for job_title, required_skills in jobs.items():
        # Semantic similarity
        job_text = " ".join(required_skills)
        job_vec = model.encode(job_text, normalize_embeddings=True)
        semantic_score = float(np.dot(resume_vec, job_vec)) * 100

        # ATS score (JOB-SPECIFIC)
        ats, missing = ats_score(resume_skills, required_skills)

        results.append({
            "job": job_title,
            "semantic_score": round(semantic_score, 2),
            "ats_score": ats,
            "missing_skills": missing
        })

    results.sort(key=lambda x: x["semantic_score"], reverse=True)
    return results
