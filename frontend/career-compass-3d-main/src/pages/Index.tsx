import React, { useCallback, useState } from "react";
import { Compass } from "lucide-react";

import UploadZone from "@/components/UploadZone";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsDashboard from "@/components/ResultsDashboard";
import FloatingOrbs from "@/components/FloatingOrbs";

import logo from "@/assets/logo.png";

import type { ResultData } from "@/types/result";

type Screen = "landing" | "loading" | "results";

interface LoadingStep {
  message: string;
  completed: boolean;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("landing");

  const [loadingSteps, setLoadingSteps] =
    useState<LoadingStep[]>([]);

  const [currentMessage, setCurrentMessage] =
    useState("");

  const [results, setResults] =
    useState<ResultData | null>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  // ==========================================
  // RESUME ANALYSIS
  // ==========================================

  const analyzeResume = useCallback(
    async (
      file: File,
      jobDescription: string,
      aiRecruiterEnabled: boolean
    ) => {
      setIsAnalyzing(true);
      setCurrentScreen("loading");
      setLoadingSteps([]);
      setCurrentMessage("");
      setResults(null);

      // ========================================
      // DYNAMIC LOADING STEPS
      // ========================================

      let steps: string[];

      // AI Recruiter + Job Description
      if (aiRecruiterEnabled && jobDescription.trim()) {
        steps = [
          "🔍 Parsing resume...",
          "🧠 Extracting skills & experience...",
          "📋 Understanding target job...",
          "📊 Calculating job compatibility...",
          "🩺 Evaluating resume health...",
          "🎯 Identifying skill gaps...",
          "🤖 AI Recruiter is reviewing your resume...",
          "✍️ Generating personalized improvements...",
          "🎤 Preparing interview questions...",
          "✨ Building your intelligence report...",
        ];
      }

      // AI Recruiter without Job Description
      else if (aiRecruiterEnabled) {
        steps = [
          "🔍 Parsing resume...",
          "🧠 Extracting skills & experience...",
          "🩺 Evaluating resume health...",
          "📌 Finding best career matches...",
          "🤖 AI Recruiter is reviewing your resume...",
          "✍️ Generating personalized improvements...",
          "🎤 Preparing interview questions...",
          "✨ Building your intelligence report...",
        ];
      }

      // Job Description without AI Recruiter
      else if (jobDescription.trim()) {
        steps = [
          "🔍 Parsing resume...",
          "🧠 Extracting skills & experience...",
          "📋 Understanding job description...",
          "🔗 Comparing resume with job requirements...",
          "📊 Calculating ATS & semantic match...",
          "🎯 Identifying missing skills...",
          "✨ Preparing career intelligence...",
        ];
      }

      // Normal Resume Analysis
      else {
        steps = [
          "🔍 Parsing resume...",
          "🧠 Analyzing skills & experience...",
          "🩺 Evaluating resume health...",
          "📊 Calculating ATS compatibility...",
          "📌 Finding best career matches...",
          "✨ Preparing your results...",
        ];
      }

      try {
        // ========================================
        // LOADING ANIMATION
        // ========================================

        for (const step of steps) {
          setCurrentMessage(step);

          await new Promise((resolve) =>
            setTimeout(resolve, 350)
          );

          setLoadingSteps((previous) => [
            ...previous,
            {
              message: step,
              completed: true,
            },
          ]);
        }

        // ========================================
        // BUILD REQUEST
        // ========================================

        const formData = new FormData();

        // Resume
        formData.append("resume", file);

        // AI Recruiter toggle
        formData.append(
          "ai_recruiter",
          aiRecruiterEnabled ? "true" : "false"
        );

        // Job Description is optional
        if (jobDescription.trim()) {
          formData.append(
            "job_description",
            jobDescription.trim()
          );
        }

        // ========================================
        // DJANGO API
        // ========================================

        const response = await fetch(
          "http://127.0.0.1:8000/api/analyze/",
          {
            method: "POST",
            body: formData,
          }
        );

        // ========================================
        // PARSE RESPONSE
        // ========================================

        let data: ResultData & {
          error?: string;
          details?: string;
        };

        try {
          data = await response.json();
        } catch {
          throw new Error(
            "Backend returned an invalid response."
          );
        }

        // ========================================
        // BACKEND ERROR
        // ========================================

        if (!response.ok) {
          throw new Error(
            data?.details ||
              data?.error ||
              "Backend returned an error."
          );
        }

        // ========================================
        // AI RECRUITER WARNING
        // ========================================

        if (
          aiRecruiterEnabled &&
          data.ai_recruiter_error
        ) {
          console.warn(
            "AI Recruiter Error:",
            data.ai_recruiter_error
          );
        }
        console.log("FULL BACKEND RESPONSE:", data);
        console.log("AI RECRUITER:", data.ai_recruiter);
        console.log(
          "AI RECRUITER ERROR:",
          data.ai_recruiter_error
        );
        // ========================================
        // STORE RESULTS
        // ========================================

        setResults(data);

        setCurrentScreen("results");
      } catch (error) {
        console.error(
          "Resume analysis failed:",
          error
        );

        const message =
          error instanceof Error
            ? error.message
            : "Unknown error";

        alert(
          `❌ Failed to analyze resume.\n\n${message}`
        );

        setCurrentScreen("landing");
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  // ==========================================
  // RESET ANALYSIS
  // ==========================================

  const handleAnalyzeAnother =
    useCallback(() => {
      setResults(null);
      setLoadingSteps([]);
      setCurrentMessage("");
      setIsAnalyzing(false);
      setCurrentScreen("landing");
    }, []);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen relative">
      <FloatingOrbs />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <header className="flex items-center justify-between pb-8 border-b border-border/50 mb-12">

          <img
            src={logo}
            alt="Career Compass"
            className="h-10"
          />

          {currentScreen === "results" && (
            <button
              type="button"
              onClick={handleAnalyzeAnother}
              className="
                px-4
                py-2
                rounded-xl
                border
                border-border
                bg-card/50
                text-sm
                font-medium
                text-foreground
                hover:border-primary/50
                hover:bg-primary/5
                transition-all
              "
            >
              Analyze Another Resume
            </button>
          )}

        </header>

        {/* ================================= */}
        {/* LANDING */}
        {/* ================================= */}

        {currentScreen === "landing" && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">

            <div className="text-center mb-12">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">

                <Compass className="w-4 h-4" />

                AI-Powered Resume Intelligence

              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">

                Turn Your Resume Into Your{" "}

                <span className="text-gradient">
                  Career Advantage
                </span>

              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">

                Upload your resume for AI-powered career
                analysis, add a job description for targeted
                matching, or enable AI Recruiter Mode for
                personalized recruiter feedback.

              </p>

            </div>

            {/* ================================= */}
            {/* UPLOAD */}
            {/* ================================= */}

            <UploadZone
              onAnalyze={analyzeResume}
              isAnalyzing={isAnalyzing}
            />

          </div>
        )}

        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {currentScreen === "loading" && (
          <LoadingScreen
            steps={loadingSteps}
            currentMessage={currentMessage}
          />
        )}

        {/* ================================= */}
        {/* RESULTS */}
        {/* ================================= */}

        {currentScreen === "results" &&
          results && (
            <ResultsDashboard
              data={results}
            />
          )}

      </div>
    </div>
  );
};

export default Index;
