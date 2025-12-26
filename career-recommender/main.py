import json
import os
from datetime import datetime

from parsers.parser import parse_resume
from utils.skill_extractor import extract_skills
from utils.matcher import match_job

# --- CHANGE THIS TO YOUR RESUME FILE ---
resume_path = "data/test_resume.pdf"    # <-- put your test resume here


# 1. Parse resume text
print("🔍 Parsing resume...")
text = parse_resume(resume_path)

# 2. Extract skills
print("🧠 Extracting skills...")
skills = extract_skills(text)

# 3. Match jobs
print("📌 Matching suitable jobs...")
matches = match_job(skills)

# 4. Save JSON output
resume_json = {
    "id": "resume_001",
    "user_id": None,
    "original_filename": os.path.basename(resume_path),
    "text": text,
    "sections": {
        "education": "",
        "experience": "",
        "skills": ""
    },
    "extracted_skills": skills,
    "parsed_date": datetime.now().strftime("%Y-%m-%d")
}

os.makedirs("data/resumes", exist_ok=True)

json_path = "data/resumes/resume_001.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(resume_json, f, indent=4)

print("\n✅ Saved structured resume data to:", json_path)

# 5. Print output
print("\n🧠 Extracted Skills:", skills)
print("\n🏆 Top Job Recommendations:")
for job, score in matches:
    print(f"{job}: {round(score, 4)}")
