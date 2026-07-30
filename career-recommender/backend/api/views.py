from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

import os

from parsers.parser import parse_resume
from models.ats_scorer import extract_skills

from utils.matcher import match_job
from utils.job_description_analyzer import analyze_job_description
from utils.resume_quality_analyzer import analyze_resume_quality
from utils.resume_section_parser import build_resume_structure
from utils.ai_recruiter import analyze_with_ai_recruiter


class AnalyzeResumeView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):

        # ==========================================
        # 1. VALIDATE RESUME
        # ==========================================

        if "resume" not in request.FILES:
            return Response(
                {
                    "error": "No resume file uploaded"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        resume_file = request.FILES["resume"]

        # ==========================================
        # 2. OPTIONAL REQUEST SETTINGS
        # ==========================================

        job_description = str(
            request.data.get(
                "job_description",
                ""
            )
        ).strip()

        ai_recruiter_enabled = (
            str(
                request.data.get(
                    "ai_recruiter",
                    "false"
                )
            ).lower()
            == "true"
        )

        # ==========================================
        # 3. SAVE TEMPORARY RESUME
        # ==========================================

        os.makedirs(
            settings.MEDIA_ROOT,
            exist_ok=True
        )

        resume_path = os.path.join(
            settings.MEDIA_ROOT,
            resume_file.name
        )

        try:

            with open(resume_path, "wb+") as file:
                for chunk in resume_file.chunks():
                    file.write(chunk)

            # ==========================================
            # 4. PARSE RESUME
            # ==========================================

            resume_text = parse_resume(
                resume_path
            )

            if (
                not resume_text
                or not resume_text.strip()
            ):
                return Response(
                    {
                        "error":
                        "Unable to extract text from resume"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ==========================================
            # 5. SKILL EXTRACTION
            # ==========================================

            skill_list = [
                "python",
                "django",
                "flask",
                "react",
                "javascript",
                "html",
                "css",
                "sql",
                "machine learning",
                "deep learning",
                "nlp",
                "computer vision",
                "data science",
                "pandas",
                "numpy",
                "tensorflow",
                "pytorch",
                "ui",
                "figma",
            ]

            extracted_skills = extract_skills(
                resume_text,
                skill_list
            )

            # ==========================================
            # 6. CAREER / JOB MATCHING
            # ==========================================

            job_matches = match_job(
                extracted_skills
            )

            # ==========================================
            # 7. RESUME QUALITY ENGINE
            # ==========================================

            resume_quality = (
                analyze_resume_quality(
                    resume_text
                )
            )

            # ==========================================
            # 8. RESUME STRUCTURE ENGINE
            # ==========================================

            resume_structure = (
                build_resume_structure(
                    resume_text
                )
            )

            # ==========================================
            # 9. BASE RESPONSE
            # ==========================================

            response_data = {
                "extracted_skills":
                    extracted_skills,

                "job_matches":
                    job_matches,

                "resume_quality":
                    resume_quality,

                "resume_structure":
                    resume_structure,
            }

            # ==========================================
            # 10. JOB DESCRIPTION INTELLIGENCE
            # ==========================================

            if job_description:

                try:

                    jd_analysis = (
                        analyze_job_description(
                            resume_text,
                            job_description
                        )
                    )

                    response_data[
                        "job_description_analysis"
                    ] = jd_analysis

                except Exception as jd_error:

                    # JD analysis failure should not
                    # destroy normal resume analysis.

                    print(
                        "JOB DESCRIPTION ERROR:",
                        jd_error
                    )

                    response_data[
                        "job_description_error"
                    ] = str(jd_error)

            # ==========================================
            # 11. AI RECRUITER
            # ==========================================
            #
            # IMPORTANT:
            #
            # This is intentionally OUTSIDE
            # "if job_description".
            #
            # Therefore AI Recruiter works:
            #
            # Resume + AI
            #
            # AND
            #
            # Resume + JD + AI
            #
            # ==========================================

            if ai_recruiter_enabled:

                try:

                    print(
                        "AI Recruiter Mode: ENABLED"
                    )

                    ai_analysis = (
                        analyze_with_ai_recruiter(
                            resume_sections=
                                resume_structure[
                                    "sections"
                                ],

                            resume_quality=
                                resume_quality,

                            extracted_skills=
                                extracted_skills,

                            job_description=
                                job_description,
                        )
                    )

                    response_data[
                        "ai_recruiter"
                    ] = ai_analysis

                    print(
                        "AI Recruiter analysis completed."
                    )

                except Exception as ai_error:

                    # Gemini failure should NEVER
                    # destroy the normal analysis.

                    print(
                        "AI RECRUITER ERROR:",
                        ai_error
                    )

                    response_data[
                        "ai_recruiter_error"
                    ] = str(ai_error)

            # ==========================================
            # 12. RETURN FINAL RESPONSE
            # ==========================================

            return Response(
                response_data,
                status=status.HTTP_200_OK
            )

        # ==========================================
        # GLOBAL ERROR HANDLER
        # ==========================================

        except Exception as exc:

            print(
                "RESUME ANALYSIS ERROR:",
                exc
            )

            return Response(
                {
                    "error":
                        "Resume analysis failed",

                    "details":
                        str(exc),
                },
                status=
                    status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # ==========================================
        # CLEANUP TEMPORARY FILE
        # ==========================================

        finally:

            if os.path.exists(
                resume_path
            ):

                try:

                    os.remove(
                        resume_path
                    )

                except OSError:

                    pass