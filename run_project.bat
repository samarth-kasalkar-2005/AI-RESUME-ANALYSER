@echo off
echo ======================================
echo 🚀 Starting AI Resume Analyser (Smart)
echo ======================================

:: ---------------- BACKEND ----------------
echo 🔥 Starting Django Backend...
cd career-recommender\backend
call myenv\Scripts\activate

start cmd /k "python manage.py runserver"

:: -------- WAIT FOR BACKEND TO BE READY --------
echo ⏳ Waiting for backend to be ready...

:wait_backend
timeout /t 2 > nul
curl -s http://127.0.0.1:8000 > nul
if errorlevel 1 goto wait_backend

echo ✅ Backend is live!

:: ---------------- FRONTEND ----------------
echo ⚡ Starting Frontend...
cd ..\..\frontend\career-compass-3d-main

start cmd /k "npm run dev"

:: -------- WAIT FOR FRONTEND --------
timeout /t 5 > nul

:: ---------------- OPEN FRONTEND ONLY ----------------
start http://localhost:8080

echo ======================================
echo ✅ Project fully running!
echo ======================================
