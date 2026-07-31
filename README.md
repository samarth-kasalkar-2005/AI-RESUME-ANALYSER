# 🚀 AI Resume Analyser

An intelligent full-stack **AI-powered Resume Analysis & Career Recommendation Platform** that analyzes resumes, evaluates ATS compatibility, recommends career paths, compares resumes with job descriptions, and provides recruiter-style feedback using **Google Gemini AI**.

The project combines traditional resume parsing, semantic NLP, ATS scoring, resume-quality analysis, and Generative AI to provide actionable career insights.

---

## ✨ Features

### 📄 Resume Analysis

Upload a resume and automatically:

- Extract resume text
- Detect technical skills
- Analyze resume structure
- Detect important resume sections
- Evaluate contact information
- Analyze writing quality
- Identify action verbs
- Detect measurable achievements
- Generate resume improvement recommendations

---

### 📊 Resume Health Score

The Resume Health Engine evaluates the resume across multiple dimensions:

- Structure
- Contact Information
- Action Language
- Measurable Impact
- Content Length
- Writing Quality

It generates an overall resume score along with detailed recommendations.

---

### 🎯 ATS Scoring

The system compares extracted resume skills against job requirements and calculates:

- ATS compatibility score
- Matched skills
- Missing skills
- Job-specific skill gaps

---

### 🧠 Semantic Job Matching

Uses **Sentence Transformers** and semantic embeddings to understand the relationship between resume skills and career roles.

The system can recommend roles such as:

- Frontend Developer
- Backend Developer
- Data Analyst
- Machine Learning Engineer
- Custom job roles

Each recommendation includes:

- Semantic Match Score
- ATS Score
- Missing Skills

---

### 📋 Job Description Intelligence

Users can optionally paste a job description.

The system then performs:

- Resume vs Job Description comparison
- Job compatibility scoring
- Required skill extraction
- Matched skill detection
- Missing skill detection
- Semantic similarity analysis
- Targeted improvement recommendations

This allows users to evaluate their resume for a **specific job opening**.

---

## 🤖 AI Recruiter Mode

AI Recruiter Mode adds a Generative AI layer powered by **Google Gemini**.

When enabled, Gemini reviews the structured resume information and produces recruiter-style insights.

### 🧑‍💼 Recruiter Verdict

Provides an AI-generated assessment of how a recruiter may perceive the candidate.

### 💪 Top Strengths

Highlights the strongest parts of the candidate's profile.

### ⚠️ Critical Improvements

Identifies high-priority weaknesses and explains:

- What needs improvement
- Why it matters
- What the candidate should do

### ✍️ AI Bullet Rewrites

Transforms weak resume statements into stronger professional alternatives while preserving the candidate's actual information.

Example:

**Before**

> Developed a dashboard using Excel and Power BI.

**Improved**

> Developed interactive Excel and Power BI dashboards to transform raw data into structured KPI-driven business insights.

### 📑 Section-by-Section Feedback

Provides AI feedback for:

- Summary
- Experience
- Projects
- Skills
- Education

### 🎤 Personalized Interview Questions

Generates interview questions based on the candidate's own resume, projects, skills, and experience.

---

# 🏗️ System Architecture

```text
                     ┌─────────────────────┐
                     │     React + Vite    │
                     │      Frontend       │
                     └──────────┬──────────┘
                                │
                                │ REST API
                                ▼
                     ┌─────────────────────┐
                     │   Django REST API   │
                     │       Backend       │
                     └──────────┬──────────┘
                                │
              ┌─────────────────┼──────────────────┐
              │                 │                  │
              ▼                 ▼                  ▼
       Resume Parser      Resume Quality     Skill Extraction
              │                 │                  │
              └─────────────────┼──────────────────┘
                                │
                                ▼
                        Semantic Matching
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              ATS Job Matching        JD Intelligence
                    │                       │
                    └───────────┬───────────┘
                                ▼
                       Gemini AI Recruiter
                                │
                                ▼
                       Intelligence Report
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Modern Responsive UI

## Backend

- Python
- Django
- Django REST Framework
- django-cors-headers

## AI / NLP

- Google Gemini API
- Sentence Transformers
- `all-MiniLM-L6-v2`
- Semantic Embeddings
- NLP-based Skill Extraction

## Resume Processing

- PDF Parsing
- DOCX Parsing
- `pdfminer.six`
- `python-docx`

---

# 📂 Project Structure

```text
AI-RESUME-ANALYSER/
│
├── career-recommender/
│   │
│   ├── backend/
│   │   ├── api/
│   │   │   └── views.py
│   │   │
│   │   ├── backend/
│   │   │   └── settings.py
│   │   │
│   │   ├── .env.example
│   │   ├── manage.py
│   │   └── requirements.txt
│   │
│   ├── models/
│   │   └── ats_scorer.py
│   │
│   ├── parsers/
│   │   └── parser.py
│   │
│   └── utils/
│       ├── matcher.py
│       ├── ai_recruiter.py
│       ├── job_description_analyzer.py
│       ├── resume_quality_analyzer.py
│       └── resume_section_parser.py
│
├── frontend/
│   └── career-compass-3d-main/
│       │
│       ├── src/
│       │   ├── components/
│       │   │   ├── AIRecruiterCard.tsx
│       │   │   ├── ResumeQualityCard.tsx
│       │   │   ├── ResultsDashboard.tsx
│       │   │   └── UploadZone.tsx
│       │   │
│       │   ├── pages/
│       │   │   └── Index.tsx
│       │   │
│       │   └── types/
│       │       └── result.ts
│       │
│       ├── package.json
│       └── package-lock.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/samarth-kasalkar-2005/AI-RESUME-ANALYSER.git
```

Enter the project:

```bash
cd AI-RESUME-ANALYSER
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd career-recommender/backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create the following file:

```text
career-recommender/backend/.env
```

Use `.env.example` as the template.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your real `.env` file or Gemini API key to GitHub.

The repository's `.gitignore` keeps sensitive environment files private.

---

# ▶️ Run Backend

Navigate to:

```text
career-recommender/backend
```

Run:

```bash
python manage.py runserver
```

Django will normally start at:

```text
http://127.0.0.1:8000
```

Resume Analysis API:

```text
POST /api/analyze/
```

---

# ⚛️ Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend/career-compass-3d-main
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

# 🧪 Analysis Modes

The application supports four different analysis combinations.

| Resume | Job Description | AI Recruiter | Analysis |
|--------|-----------------|--------------|----------|
| ✅ | ❌ | ❌ | Resume + Career Analysis |
| ✅ | ✅ | ❌ | Resume + Target Job Analysis |
| ✅ | ❌ | ✅ | Resume + AI Recruiter |
| ✅ | ✅ | ✅ | Full AI Career Intelligence |

---

# 🔄 How It Works

## Standard Resume Analysis

```text
Upload Resume
      ↓
Resume Parser
      ↓
Skill Extraction
      ↓
Resume Health Analysis
      ↓
ATS Scoring
      ↓
Semantic Job Matching
      ↓
Career Recommendations
```

---

## Job Description Analysis

```text
Resume
   +
Job Description
      ↓
Skill Extraction
      ↓
Semantic Comparison
      ↓
ATS Compatibility
      ↓
Matched Skills
      ↓
Missing Skills
      ↓
Targeted Recommendations
```

---

## AI Recruiter Mode

```text
Resume
   ↓
Resume Parsing
   ↓
Resume Structure
   ↓
Resume Quality Analysis
   ↓
Extracted Skills
   ↓
Google Gemini AI
   ↓
AI Recruiter Report
   │
   ├── Recruiter Verdict
   ├── Top Strengths
   ├── Critical Improvements
   ├── Resume Bullet Rewrites
   ├── Section Feedback
   └── Interview Questions
```

---

# 🔐 Security

The project uses environment variables for sensitive credentials.

Never commit:

```text
.env
API Keys
venv/
node_modules/
Uploaded Resumes
```

Instead, configuration examples should be provided through:

```text
.env.example
```

Uploaded resumes are used temporarily during analysis and should not be permanently stored by the application.

---

# 🗺️ Project Roadmap

## ✅ Level 1 — Core Resume Analyzer

Completed features:

- Resume Parsing
- Skill Extraction
- ATS Scoring
- Semantic Job Matching
- Career Recommendations

---

## ✅ Level 2 — Resume Intelligence + AI Recruiter

Completed features:

- Resume Health Score
- Resume Structure Detection
- Resume Quality Analysis
- Contact Information Analysis
- Action Language Analysis
- Measurable Impact Detection
- Job Description Intelligence
- Resume vs Job Description Matching
- Skill Gap Analysis
- Google Gemini Integration
- AI Recruiter Mode
- Recruiter Verdict
- Resume Strength Analysis
- Critical Improvement Suggestions
- AI Resume Bullet Rewrites
- Section-by-Section Feedback
- Personalized Interview Questions

---

## 🚧 Level 3 — AI Resume Optimizer

Planned features:

- AI Resume Optimizer
- AI-generated Resume Improvements
- Original vs Improved Comparison
- Accept / Reject AI Suggestions
- Resume Summary Rewriting
- Project Bullet Optimization
- Experience Bullet Optimization
- AI Resume Builder
- Resume Preview
- Export Optimized Resume
- PDF Export
- DOCX Export

---

# 🎯 Project Goal

The goal of **AI Resume Analyser** is to go beyond traditional ATS keyword scanners.

Instead of simply assigning a score, the platform combines:

```text
Resume Parsing
      +
ATS Intelligence
      +
Semantic NLP
      +
Job Description Matching
      +
Resume Quality Analysis
      +
Generative AI
      ↓
Personalized Career Intelligence
```

The platform aims to help students, fresh graduates, developers, and job seekers understand:

- What is good about their resume
- What is weakening their resume
- Why those weaknesses matter
- Which skills they are missing
- Which careers match their profile
- How well they match a particular job
- How recruiters may perceive their resume
- How existing resume content can be improved
- What interview questions they should prepare for

---

# 🚀 Future Vision

AI Resume Analyser is being developed toward a complete AI-powered career platform.

Future versions may provide a workflow such as:

```text
Upload Resume
      ↓
Analyze Resume
      ↓
Discover Weaknesses
      ↓
AI Recruiter Review
      ↓
Optimize Resume
      ↓
Accept / Reject AI Changes
      ↓
Generate Improved Resume
      ↓
Export PDF / DOCX
      ↓
Prepare for Interview
```

The long-term goal is to transform the project from a simple resume analyzer into a complete **AI Resume Optimization and Career Intelligence Platform**.

---

# 👨‍💻 Author

**Samarth Kasalkar**

B.Sc. Computer Science

GitHub: `samarth-kasalkar-2005`

---

# 🤝 Contributions

Contributions, suggestions, bug reports, and feature ideas are welcome.

If you would like to improve the project:

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐.

It helps support continued development of the project.

---

# 📌 Current Version

## AI Resume Analyser v2.0

**Level 2 development is complete.**

Current capabilities include:

**Resume Intelligence + ATS Analysis + Job Description Matching + Semantic Career Matching + Google Gemini AI Recruiter**

### Next Milestone

🚀 **Level 3 — AI Resume Optimizer & Builder**