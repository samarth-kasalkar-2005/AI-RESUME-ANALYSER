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
```

## 📸 Screenshots
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/dc869096-41e2-405a-a415-9105d1b630c3" />   <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/d644417e-ba6c-404f-923f-f90b0852127e" />

## 🚀 Demo Video


## 🧩 System Architecture

```Architecture
Resume Upload
   ↓
Resume Parser (PDF/DOCX)
   ↓
Skill Extraction (NLP)
   ↓
ATS Scoring Engine
   ↓
Semantic Matching (Job Roles)
   ↓
REST API (Django)
   ↓
React Frontend (Results Dashboard)
```

## ⚙️ How It Works

1. User uploads resume (PDF/DOCX)
2. Backend parses text using custom parser
3. Skills are extracted using NLP-based keyword matching
4. Resume embeddings are generated using Sentence Transformers
5. Job role embeddings are compared using cosine similarity
6. ATS score is calculated using weighted rules
7. Missing skills are identified per role
8. Results are returned via REST API to frontend

## 🛠️ Installation & Setup

### Backend (Django)
```bash
cd career-recommender/backend
python -m venv myenv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### Frontend (React)
```bash
cd frontend/career-compass-3d-main
npm install
npm run dev
```

## 🚧 Future Enhancements

- User authentication & profile history
- Resume comparison across roles
- Multi-language resume support
- Cloud deployment (AWS / Render)
- AI interview question generation

## 🎓 What I Learned

- End-to-end full-stack AI application development
- NLP-based skill extraction
- Semantic search using transformers
- Django REST API design
- Frontend–backend integration
- Clean project structuring

## 👨‍💻 Author
**Samarth Kasalkar**  
Ty BSc Computer Science  
GitHub: https://github.com/samarth-kasalkar-2005
