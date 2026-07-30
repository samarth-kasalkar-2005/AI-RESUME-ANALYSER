import React, { useCallback, useRef, useState } from "react";
import {
  Upload,
  FileText,
  BriefcaseBusiness,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onAnalyze: (
    file: File,
    jobDescription: string,
    aiRecruiterEnabled: boolean
  ) => void;

  isAnalyzing?: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({
  onAnalyze,
  isAnalyzing = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [aiRecruiterEnabled, setAiRecruiterEnabled] =
    useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // -----------------------------------
  // Validate selected resume
  // -----------------------------------
  const selectFile = useCallback((file: File) => {
    const fileName = file.name.toLowerCase();

    const isValid =
      fileName.endsWith(".pdf") ||
      fileName.endsWith(".docx");

    if (!isValid) {
      alert("Please upload a PDF or DOCX resume.");
      return;
    }

    setSelectedFile(file);
  }, []);

  // -----------------------------------
  // Drag events
  // -----------------------------------
  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;

      if (files.length > 0) {
        selectFile(files[0]);
      }
    },
    [selectFile]
  );

  // -----------------------------------
  // File browser
  // -----------------------------------
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files.length > 0) {
        selectFile(files[0]);
      }
    },
    [selectFile]
  );

  const openFileBrowser = () => {
    if (!isAnalyzing) {
      fileInputRef.current?.click();
    }
  };

  // -----------------------------------
  // Remove selected file
  // -----------------------------------
  const removeFile = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -----------------------------------
  // Analyze
  // -----------------------------------
  const handleAnalyze = () => {
    if (!selectedFile || isAnalyzing) return;

    onAnalyze(
      selectedFile,
      jobDescription.trim(),
      aiRecruiterEnabled
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      {/* ============================= */}
      {/* RESUME UPLOAD */}
      {/* ============================= */}

      <div
        className={`
          upload-zone group
          ${isDragOver ? "dragover" : ""}
          ${selectedFile ? "border-primary/50" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileBrowser}
      >
        {/* Background glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">

          {!selectedFile ? (
            <>
              {/* Upload Icon */}

              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />

                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center animate-float">
                  <FileText className="w-12 h-12 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">
                Drop your resume here
              </h3>

              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Upload your resume and let our intelligence engine
                analyze your skills, career fit, and job compatibility.
              </p>

              <Button
                type="button"
                variant="hero"
                size="lg"
                disabled={isAnalyzing}
              >
                <Upload className="w-5 h-5 mr-2" />
                Browse Files
              </Button>

              <p className="text-sm text-muted-foreground mt-4">
                Supports PDF and DOCX
              </p>
            </>
          ) : (
            <>
              {/* Selected Resume */}

              <div className="relative mb-6">

                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />

                <div className="relative w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>

              </div>

              <p className="text-sm text-primary font-medium mb-2">
                Resume ready
              </p>

              <h3 className="text-xl font-bold text-foreground text-center break-all max-w-lg">
                {selectedFile.name}
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-6">

                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileBrowser();
                  }}
                  disabled={isAnalyzing}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Resume
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={removeFile}
                  disabled={isAnalyzing}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>

              </div>
            </>
          )}

          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>

      {/* ============================= */}
      {/* JOB DESCRIPTION */}
      {/* ============================= */}

      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 md:p-8">

        {/* Glow */}

        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">

          <div className="flex items-start gap-4 mb-5">

            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <BriefcaseBusiness className="w-5 h-5 text-primary" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-lg font-semibold text-foreground">
                  Target Job Description
                </h3>

                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Optional
                </span>

              </div>

              <p className="text-sm text-muted-foreground mt-1">
                Paste a job description to calculate how well your
                resume matches that specific opportunity.
              </p>
            </div>

          </div>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            disabled={isAnalyzing}
            placeholder={`Paste the job description here...

Example:
We're looking for a Python developer with Django, PostgreSQL, Docker, REST API and AWS experience...`}
            className="
              w-full
              min-h-[190px]
              resize-y
              rounded-2xl
              border
              border-border
              bg-background/60
              px-5
              py-4
              text-sm
              text-foreground
              placeholder:text-muted-foreground
              outline-none
              transition-all
              focus:border-primary/60
              focus:ring-2
              focus:ring-primary/20
              disabled:opacity-60
            "
          />

          <div className="flex items-center justify-between gap-4 mt-3">

            <p className="text-xs text-muted-foreground">
              No JD? Leave this empty for general career analysis.
            </p>

            <span className="text-xs text-muted-foreground shrink-0">
              {jobDescription.length} characters
            </span>

          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* AI RECRUITER MODE */}
      {/* ============================= */}

      <div
        className={`
          relative overflow-hidden rounded-3xl border
          backdrop-blur-xl p-5 md:p-6
          transition-all duration-300
          ${
            aiRecruiterEnabled
              ? "border-primary/40 bg-primary/5"
              : "border-border/50 bg-card/40"
          }
        `}
      >
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-5">

          <div className="flex items-start gap-4">

            <div
              className={`
                w-11 h-11 rounded-xl
                border flex items-center justify-center
                shrink-0 transition-all
                ${
                  aiRecruiterEnabled
                    ? "bg-primary/15 border-primary/30"
                    : "bg-muted/50 border-border"
                }
              `}
            >
              <Sparkles
                className={
                  aiRecruiterEnabled
                    ? "w-5 h-5 text-primary"
                    : "w-5 h-5 text-muted-foreground"
                }
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <h3 className="font-bold text-foreground">
                  AI Recruiter Mode
                </h3>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Gemini
                </span>

              </div>

              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Get recruiter-style feedback, personalized improvements,
                bullet rewrites and interview questions based on your
                actual resume.
              </p>

            </div>

          </div>

          {/* TOGGLE */}

          <button
            type="button"
            role="switch"
            aria-checked={aiRecruiterEnabled}
            disabled={isAnalyzing}
            onClick={() =>
              setAiRecruiterEnabled(
                (previous) => !previous
              )
            }
            className={`
              relative w-14 h-8 rounded-full shrink-0
              transition-all duration-300
              ${
                aiRecruiterEnabled
                  ? "bg-primary"
                  : "bg-muted"
              }
              disabled:opacity-50
            `}
          >
            <span
              className={`
                absolute top-1
                w-6 h-6 rounded-full
                bg-white shadow-md
                transition-all duration-300
                ${
                  aiRecruiterEnabled
                    ? "left-7"
                    : "left-1"
                }
              `}
            />
          </button>

        </div>

        {aiRecruiterEnabled && (
          <div className="relative z-10 mt-4 pt-4 border-t border-primary/10">

            <div className="flex items-center gap-2 text-xs text-primary">

              <CheckCircle2 className="w-4 h-4" />

              AI Recruiter analysis will be included in this report.

            </div>

          </div>
        )}
      </div>

      {/* ============================= */}
      {/* ANALYZE BUTTON */}
      {/* ============================= */}

      <Button
        type="button"
        variant="hero"
        size="lg"
        onClick={handleAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className="w-full h-14 text-base"
      >
        <Sparkles
          className={`w-5 h-5 mr-2 ${
            isAnalyzing ? "animate-spin" : ""
          }`}
        />

        {isAnalyzing
          ? "Analyzing Resume..."
          : jobDescription.trim()
          ? "Analyze Resume Against Job"
          : "Analyze Resume"}
      </Button>

      {!selectedFile && (
        <p className="text-center text-sm text-muted-foreground">
          Upload your resume to start the analysis.
        </p>
      )}
    </div>
  );
};

export default UploadZone;