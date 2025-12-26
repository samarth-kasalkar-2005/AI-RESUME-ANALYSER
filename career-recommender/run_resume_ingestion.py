import json
import os
from datetime import datetime

# Internal imports
from parsers.parser import parse_resume
from models.ats_scorer import extract_skills, ats_score
from utils.matcher import match_job

# ================================
# CONFIG
# ================================

# Path to resume (UI/UX, DS, anything)
RESUME_PATH = r"C:\Users\LENOVO\Downloads\Mahendra_Naidu_AI_Research_Engineer_ATS_Resume.pdf"
# Output
OUTPUT_DIR = "data/resumes"
OUTPUT_FILE = "resume_001.json"

# O*NET skills file
ONET_SKILLS_PATH = "data/onet_skills.json"


# ================================
# PIPELINE
# ================================

def main():
    print("🔍 Parsing resume...")
    resume_text = parse_resume(RESUME_PATH)

    print("🧠 Loading role skill standards...")
    with open(ONET_SKILLS_PATH, "r", encoding="utf-8") as f:
        onet_skills = json.load(f)

    print("📊 Calculating ATS scores for all roles...")
    ats_results = {}

    for role, role_skills in onet_skills.items():
        matched_skills = extract_skills(resume_text, role_skills)
        score, missing = ats_score(matched_skills, role_skills)

        ats_results[role] = {
            "score": score,
            "missing_skills": missing,
            "matched_skills": matched_skills
        }

    # Pick best role
    best_role = max(ats_results, key=lambda r: ats_results[r]["score"])
    best_ats = ats_results[best_role]

    print(f"✅ Best fit role detected: {best_role}")
    print(f"📊 ATS Score: {best_ats['score']}%")

    print("📌 Matching jobs...")
    job_matches = match_job(best_ats["matched_skills"])

    # ================================
    # SAVE STRUCTURED JSON
    # ================================

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    resume_json = {
        "id": "resume_001",
        "user_id": None,
        "original_filename": os.path.basename(RESUME_PATH),
        "text": resume_text,
        "extracted_skills": best_ats["matched_skills"],
        "ats_score": {
            "best_role": best_role,
            "percentage": best_ats["score"],
            "missing_skills": best_ats["missing_skills"]
        },
        "parsed_date": datetime.now().strftime("%Y-%m-%d")
    }

    output_path = os.path.join(OUTPUT_DIR, OUTPUT_FILE)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(resume_json, f, indent=4)

    # ================================
    # PRINT RESULTS
    # ================================

    print("\n✅ Resume ingestion completed")
    print(f"📁 Saved JSON → {output_path}")

    print("\n🧠 Extracted Skills:")
    print(best_ats["matched_skills"])

    print(f"\n📊 ATS Score for {best_role}: {best_ats['score']}%")
    if best_ats["missing_skills"]:
        print("❌ Missing Skills:", best_ats["missing_skills"])
    else:
        print("✅ No critical skills missing")

    print("\n🏆 Top Job Matches:")
    for job, score in job_matches[:5]:
        print(f"{job} → {round(score, 4)}")


# ================================
# ENTRY POINT
# ================================

if __name__ == "__main__":
    main()
