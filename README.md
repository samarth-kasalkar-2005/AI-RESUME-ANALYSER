# Resume Analyser 🚀  
**AI-Powered Resume Analysis & Career Matching Platform**

Resume Analyser is a full-stack application that intelligently analyzes resumes to:
- Extract technical and professional skills
- Calculate ATS (Applicant Tracking System) compatibility
- Identify missing skills for target roles
- Recommend best-fit job roles using semantic matching

Built with a clean separation of **Frontend, Backend, and ML logic**, this project demonstrates real-world AI application development.

---

## 🔹 Key Features

- 📄 Resume parsing (PDF/DOCX)
- 🧠 Skill extraction using NLP
- 📊 ATS compatibility scoring
- 🎯 Job role recommendations with semantic similarity
- ❌ Missing skill identification per role
- ⚡ Real-time frontend + backend integration

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Fetch API

### Backend
- Django
- Django REST Framework
- CORS Headers

### Machine Learning / NLP
- Sentence Transformers (`all-MiniLM-L6-v2`)
- Semantic similarity (cosine similarity)
- Custom ATS scoring logic

---

## 📁 Project Structure
```text
AI-Resume-Analyser/
├── career-recommender/
│   ├── backend/
│   │   ├── api/
│   │   │   ├── migrations/
│   │   │   ├── admin.py
│   │   │   ├── apps.py
│   │   │   ├── models.py
│   │   │   ├── tests.py
│   │   │   ├── urls.py
│   │   │   └── views.py
│   │   ├── backend/
│   │   │   ├── asgi.py
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   ├── manage.py
│   │   └── requirements.txt
│   │
│   ├── data_pipeline/
│   │   └── sample_linkedin_jobs.py
│   │
│   ├── models/
│   │   ├── ats_scorer.py
│   │   └── train_job_classifier.py
│   │
│   ├── parsers/
│   │   └── parser.py
│   │
│   ├── utils/
│   │   ├── matcher.py
│   │   ├── skill_extractor.py
│   │   └── skill_utils.py
│   │
│   ├── run_resume_ingestion.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   └── career-compass-3d-main/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── assets/
│       │   ├── App.tsx
│       │   └── index.css
│       ├── package.json
│       ├── vite.config.ts
│       └── tailwind.config.ts
│
├── .gitignore
└── run_project.bat
