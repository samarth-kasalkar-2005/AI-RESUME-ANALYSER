import json
import re

def extract_skills(text, skill_list):
    text = text.lower()
    found = set()
    for skill in skill_list:
        if re.search(rf"\b{re.escape(skill.lower())}\b", text):
            found.add(skill)
    return list(found)

def ats_score(resume_skills, required_skills):
    resume_set = set(resume_skills)
    required_set = set(required_skills)

    matched = resume_set.intersection(required_set)
    missing = list(required_set - resume_set)

    score = (len(matched) / len(required_set)) * 100 if required_set else 0

    return round(score, 2), missing

