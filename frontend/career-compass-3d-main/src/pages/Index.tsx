import React, { useState, useCallback } from "react";
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
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [results, setResults] = useState<ResultData | null>(null);

  // 🔥 REAL BACKEND CALL (FIXED)
  const simulateProcessing = useCallback(async (file: File) => {
    setCurrentScreen("loading");
    setLoadingSteps([]);

    const steps = [
      "🔍 Parsing resume...",
      "🧠 Analyzing skills & experience...",
      "📊 Calculating ATS compatibility...",
      "📌 Finding best job matches...",
    ];

    for (const step of steps) {
      setCurrentMessage(step);
      await new Promise((res) => setTimeout(res, 500));
      setLoadingSteps((prev) => [...prev, { message: step, completed: true }]);
    }

    try {
      const formData = new FormData();
      formData.append("resume", file); // ✅ THIS IS CRITICAL

      const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend returned error");
      }

      const data = await response.json();
      setResults(data);
      setCurrentScreen("results");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to analyze resume. Backend unreachable.");
      setCurrentScreen("landing");
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      simulateProcessing(file);
    },
    [simulateProcessing]
  );

  return (
    <div className="min-h-screen relative">
      <FloatingOrbs />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex items-center justify-between pb-8 border-b border-border/50 mb-12">
          <img src={logo} alt="Career Compass" className="h-10" />
        </header>

        {currentScreen === "landing" && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Compass className="w-4 h-4" />
                AI-Powered Career Analysis
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                Find Your <span className="text-gradient">Perfect Career</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and let AI calculate ATS score and best career
                matches.
              </p>
            </div>

            <UploadZone onFileSelect={handleFileSelect} />
          </div>
        )}

        {currentScreen === "loading" && (
          <LoadingScreen
            steps={loadingSteps}
            currentMessage={currentMessage}
          />
        )}

        {currentScreen === "results" && results && (
          <ResultsDashboard data={results} />
        )}
      </div>
    </div>
  );
};

export default Index;
