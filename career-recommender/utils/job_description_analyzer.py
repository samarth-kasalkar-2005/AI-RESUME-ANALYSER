import re
from sentence_transformers import SentenceTransformer
import numpy as np


# Load once when Django starts
model = SentenceTransformer("all-MiniLM-L6-v2")


# Central skill database.
# We can move this into JSON/database later.
SKILL_DATABASE = [
    # Programming
    "python", "java", "javascript", "typescript", "c", "c++", "c#",
    "go", "rust", "kotlin", "swift", "php", "ruby",

    # Frontend
    "html", "css", "react", "next.js", "angular", "vue",
    "tailwind", "bootstrap", "redux", "vite",

    # Backend
    "django", "flask", "fastapi", "node.js", "express",
    "spring boot", "rest api", "graphql",

    # Databases
    "sql", "mysql", "postgresql", "mongodb", "sqlite",
    "redis", "firebase",

    # AI / ML
    "machine learning", "deep learning", "nlp",
    "computer vision", "tensorflow", "pytorch",
    "scikit-learn", "pandas", "numpy", "opencv",
    "transformers", "hugging face",

    # Cloud / DevOps
    "aws", "azure", "gcp", "docker", "kubernetes",
    "jenkins", "github actions", "ci/cd", "linux",

    # Development tools
    "git", "github", "postman", "jira",

    # Data
    "data analysis", "data science", "power bi",
    "tableau", "excel", "matplotlib",

    # Design
    "figma", "ui", "ux", "ui/ux",

    # Concepts
    "data structures", "algorithms", "oop",
    "microservices", "agile", "scrum"
]


def normalize_text(text):
    """Normalize text before comparison."""
    if not text:
        return ""

    text = text.lower()
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def extract_known_skills(text):
    """Extract known technical skills from text."""
    normalized = normalize_text(text)

    found = set()

    for skill in SKILL_DATABASE:
        pattern = rf"(?<!\w){re.escape(skill.lower())}(?!\w)"

        if re.search(pattern, normalized):
            found.add(skill)

    return sorted(found)


def calculate_semantic_similarity(resume_text, job_description):
    """Compare the meaning of the complete resume and JD."""

    if not resume_text or not job_description:
        return 0.0

    embeddings = model.encode(
        [resume_text, job_description],
        normalize_embeddings=True
    )

    similarity = float(np.dot(embeddings[0], embeddings[1])) * 100

    # Avoid strange negative percentages
    similarity = max(0.0, min(similarity, 100.0))

    return round(similarity, 2)


def calculate_skill_match(resume_skills, job_skills):
    """Calculate explicit skill overlap."""

    resume_set = {skill.lower() for skill in resume_skills}
    job_set = {skill.lower() for skill in job_skills}

    if not job_set:
        return 0.0, [], []

    matched = sorted(resume_set.intersection(job_set))
    missing = sorted(job_set - resume_set)

    score = (len(matched) / len(job_set)) * 100

    return round(score, 2), matched, missing


def calculate_keyword_match(resume_text, job_description):
    """
    Estimate how many meaningful JD keywords also occur
    in the resume.
    """

    resume = normalize_text(resume_text)
    jd = normalize_text(job_description)

    # Extract words while ignoring tiny/noisy tokens
    jd_words = re.findall(r"\b[a-zA-Z][a-zA-Z+#.\-/]{2,}\b", jd)

    stop_words = {
        "the", "and", "for", "with", "you", "your", "our",
        "are", "this", "that", "will", "from", "have", "has",
        "job", "role", "work", "team", "candidate", "looking",
        "required", "requirements", "responsibilities",
        "experience", "years", "skills", "knowledge"
    }

    keywords = {
        word
        for word in jd_words
        if word not in stop_words
    }

    if not keywords:
        return 0.0

    matched = sum(
        1
        for keyword in keywords
        if re.search(rf"(?<!\w){re.escape(keyword)}(?!\w)", resume)
    )

    score = (matched / len(keywords)) * 100

    return round(score, 2)


def analyze_job_description(resume_text, job_description):
    """
    Main JD intelligence function.
    """

    resume_skills = extract_known_skills(resume_text)
    required_skills = extract_known_skills(job_description)

    skill_score, matched_skills, missing_skills = calculate_skill_match(
        resume_skills,
        required_skills
    )

    semantic_score = calculate_semantic_similarity(
        resume_text,
        job_description
    )

    keyword_score = calculate_keyword_match(
        resume_text,
        job_description
    )

    # Weighted explainable score
    #
    # Skills = 50%
    # Semantic relevance = 30%
    # JD keywords = 20%
    final_score = (
        skill_score * 0.50
        + semantic_score * 0.30
        + keyword_score * 0.20
    )

    final_score = round(final_score, 2)

    return {
        "overall_match_score": final_score,

        "score_breakdown": {
            "skill_match": skill_score,
            "semantic_match": semantic_score,
            "keyword_match": keyword_score
        },

        "resume_skills": resume_skills,
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }