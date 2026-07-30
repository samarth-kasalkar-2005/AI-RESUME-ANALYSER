import json
import os
import re

from google import genai
from google.genai import types


MODEL_NAME = "gemini-3.6-flash"


def get_client():
    """
    Create Gemini client using the backend-only
    environment variable.
    """

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY is not configured."
        )

    return genai.Client(
        api_key=api_key
    )


def clean_json_response(text):
    """
    Remove Markdown fences if the model ever
    surrounds JSON with ```json ... ```.
    """

    if not text:
        return ""

    text = text.strip()

    text = re.sub(
        r"^```(?:json)?",
        "",
        text,
        flags=re.IGNORECASE,
    )

    text = re.sub(
        r"```$",
        "",
        text,
    )

    return text.strip()


def build_recruiter_prompt(
    resume_sections,
    resume_quality,
    extracted_skills,
    job_description="",
):
    """
    Build structured context for the recruiter.
    """

    target_context = (
        job_description.strip()
        if job_description
        else "No specific job description was supplied."
    )

    return f"""
You are an expert technical recruiter and resume reviewer.

Analyze the candidate's resume using ONLY the information
provided below.

Do not invent experience, achievements, technologies,
companies, certifications, education, statistics, or skills.

The candidate may be a student or early-career applicant,
so do not penalize them simply for having limited formal
employment experience.

Your goal is to provide specific, practical improvements.

TARGET JOB DESCRIPTION:
{target_context}

EXTRACTED SKILLS:
{json.dumps(extracted_skills)}

CURRENT RESUME QUALITY ANALYSIS:
{json.dumps(resume_quality)}

RESUME SECTIONS:
{json.dumps(resume_sections)}

Return ONLY valid JSON with this exact structure:

{{
    "recruiter_verdict": {{
        "summary": "2-4 sentence recruiter assessment",
        "strength_level": "strong | moderate | weak"
    }},

    "top_strengths": [
        "specific strength",
        "specific strength",
        "specific strength"
    ],

    "critical_improvements": [
        {{
            "title": "short title",
            "reason": "why this matters",
            "suggestion": "specific action the candidate should take",
            "priority": "high | medium | low"
        }}
    ],

    "section_feedback": {{
        "summary": "feedback",
        "experience": "feedback",
        "projects": "feedback",
        "skills": "feedback",
        "education": "feedback"
    }},

    "bullet_rewrites": [
        {{
            "original": "an actual weak bullet or statement from the supplied resume",
            "improved": "a stronger rewrite without inventing facts",
            "why_better": "short explanation"
        }}
    ],

    "interview_questions": [
        {{
            "question": "question based on the candidate resume",
            "reason": "why a recruiter might ask it"
        }}
    ]
}}

Rules:

1. Never fabricate metrics.
2. Never add technologies the candidate did not claim.
3. If an improvement would benefit from a number that is
   unavailable, recommend adding a truthful metric instead
   of inventing one.
4. bullet_rewrites must preserve the meaning of the original.
5. Generate 3 to 5 critical improvements.
6. Generate up to 3 bullet rewrites.
7. Generate exactly 5 interview questions.
8. If a job description exists, tailor feedback toward it.
9. If a resume section is absent, say that rather than
   inventing content.
10. Return JSON only.
"""


def analyze_with_ai_recruiter(
    resume_sections,
    resume_quality,
    extracted_skills,
    job_description="",
):
    """
    Run AI recruiter analysis.
    """

    client = get_client()

    prompt = build_recruiter_prompt(
        resume_sections=resume_sections,
        resume_quality=resume_quality,
        extracted_skills=extracted_skills,
        job_description=job_description,
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )

    raw_text = clean_json_response(
        response.text
    )

    if not raw_text:
        raise ValueError(
            "Gemini returned an empty response."
        )

    try:
        return json.loads(raw_text)

    except json.JSONDecodeError as exc:
        raise ValueError(
            "Gemini returned invalid JSON."
        ) from exc