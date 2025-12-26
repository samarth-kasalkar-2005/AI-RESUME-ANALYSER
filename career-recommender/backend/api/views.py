from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os

from parsers.parser import parse_resume
from models.ats_scorer import extract_skills
from utils.matcher import match_job


class AnalyzeResumeView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        if 'resume' not in request.FILES:
            return Response(
                {"error": "No resume file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        resume_file = request.FILES['resume']

        # Save resume
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
        resume_path = os.path.join(settings.MEDIA_ROOT, resume_file.name)

        with open(resume_path, "wb+") as f:
            for chunk in resume_file.chunks():
                f.write(chunk)

        # Parse resume
        resume_text = parse_resume(resume_path)

        SKILL_LIST = [
            "python", "django", "flask", "react", "javascript",
            "html", "css", "sql", "machine learning", "deep learning",
            "nlp", "computer vision", "data science", "pandas",
            "numpy", "tensorflow", "pytorch", "ui", "figma"
        ]

        extracted_skills = extract_skills(resume_text, SKILL_LIST)

        # 🔥 ALL scoring happens here now
        job_matches = match_job(extracted_skills)

        return Response({
            "extracted_skills": extracted_skills,
            "job_matches": job_matches
        })
