import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import type {
  AIRecruiterAnalysis,
  AICriticalImprovement,
} from "@/types/result";

interface AIRecruiterCardProps {
  analysis: AIRecruiterAnalysis;
}

const AIRecruiterCard: React.FC<AIRecruiterCardProps> = ({
  analysis,
}) => {
  const [showSectionFeedback, setShowSectionFeedback] =
    useState(false);

  const strengthLevel =
    analysis.recruiter_verdict?.strength_level ??
    "moderate";

  const sectionFeedback = Object.entries(
    analysis.section_feedback ?? {}
  );

  const getStrengthLabel = () => {
    if (strengthLevel === "strong") {
      return "Strong Candidate";
    }

    if (strengthLevel === "weak") {
      return "Needs Improvement";
    }

    return "Promising Candidate";
  };

  return (
    <section className="space-y-6">
      {/* ===================================== */}
      {/* SECTION HEADER */}
      {/* ===================================== */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary" />

          <h3 className="text-xl font-bold text-foreground">
            AI Recruiter Report
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-3.5 h-3.5 text-primary" />

          <span className="text-xs font-semibold text-primary">
            Gemini AI
          </span>
        </div>
      </div>

      {/* ===================================== */}
      {/* RECRUITER VERDICT */}
      {/* ===================================== */}

      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6 md:p-8">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-7 h-7 text-primary" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Recruiter Verdict
                </span>

                <StrengthBadge level={strengthLevel} />
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-foreground mt-3">
                {getStrengthLabel()}
              </h3>

              <p className="text-muted-foreground mt-3 leading-relaxed max-w-4xl">
                {analysis.recruiter_verdict?.summary ??
                  "No recruiter verdict was generated."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* TOP STRENGTHS */}
      {/* ===================================== */}

      {analysis.top_strengths?.length > 0 && (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h4 className="font-bold text-lg text-foreground">
                Top Strengths
              </h4>

              <p className="text-xs text-muted-foreground">
                What stands out positively to the AI recruiter
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {analysis.top_strengths.map(
              (strength, index) => (
                <div
                  key={`${strength}-${index}`}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-primary/10 bg-primary/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />

                  <p className="text-sm text-foreground leading-relaxed">
                    {strength}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* CRITICAL IMPROVEMENTS */}
      {/* ===================================== */}

      {analysis.critical_improvements?.length > 0 && (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h4 className="font-bold text-lg text-foreground">
                Recruiter Priorities
              </h4>

              <p className="text-xs text-muted-foreground">
                The most important changes to improve your resume
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.critical_improvements.map(
              (improvement, index) => (
                <ImprovementCard
                  key={`${improvement.title}-${index}`}
                  improvement={improvement}
                  number={index + 1}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* BULLET REWRITES */}
      {/* ===================================== */}

      {analysis.bullet_rewrites?.length > 0 && (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h4 className="font-bold text-lg text-foreground">
                AI Bullet Rewrites
              </h4>

              <p className="text-xs text-muted-foreground">
                Stronger ways to present existing resume content
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {analysis.bullet_rewrites.map(
              (rewrite, index) => (
                <div
                  key={`${rewrite.original}-${index}`}
                  className="rounded-2xl border border-border/50 bg-background/30 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
                    {/* BEFORE */}

                    <div className="p-5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Before
                      </span>

                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {rewrite.original}
                      </p>
                    </div>

                    {/* ARROW */}

                    <div className="hidden lg:flex items-center justify-center px-2">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* AFTER */}

                    <div className="p-5 bg-primary/5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                        Improved
                      </span>

                      <p className="text-sm text-foreground mt-2 leading-relaxed font-medium">
                        {rewrite.improved}
                      </p>
                    </div>
                  </div>

                  {rewrite.why_better && (
                    <div className="px-5 py-4 border-t border-border/50">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />

                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            Why this is better:{" "}
                          </span>

                          {rewrite.why_better}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* SECTION FEEDBACK */}
      {/* ===================================== */}

      {sectionFeedback.length > 0 && (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl overflow-hidden">
          <button
            type="button"
            onClick={() =>
              setShowSectionFeedback(
                (previous) => !previous
              )
            }
            className="w-full p-6 flex items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h4 className="font-bold text-lg text-foreground">
                  Section-by-Section Feedback
                </h4>

                <p className="text-xs text-muted-foreground">
                  Detailed recruiter feedback for each resume
                  section
                </p>
              </div>
            </div>

            {showSectionFeedback ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {showSectionFeedback && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionFeedback.map(
                  ([section, feedback]) => (
                    <div
                      key={section}
                      className="p-4 rounded-2xl border border-border/50 bg-background/30"
                    >
                      <h5 className="font-semibold text-foreground capitalize">
                        {formatLabel(section)}
                      </h5>

                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {feedback}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================== */}
      {/* INTERVIEW QUESTIONS */}
      {/* ===================================== */}

      {analysis.interview_questions?.length > 0 && (
        <div className="rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MessageSquareText className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h4 className="font-bold text-lg text-foreground">
                Prepare for the Interview
              </h4>

              <p className="text-xs text-muted-foreground">
                Questions a recruiter may ask based on your resume
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.interview_questions.map(
              (item, index) => (
                <div
                  key={`${item.question}-${index}`}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-border/50 bg-background/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-foreground leading-relaxed">
                      {item.question}
                    </p>

                    {item.reason && (
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        <span className="font-medium text-foreground">
                          Why they may ask:{" "}
                        </span>

                        {item.reason}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
};

// ==========================================
// STRENGTH BADGE
// ==========================================

const StrengthBadge = ({
  level,
}: {
  level: "strong" | "moderate" | "weak";
}) => {
  const label =
    level === "strong"
      ? "Strong"
      : level === "weak"
      ? "Needs Work"
      : "Moderate";

  return (
    <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
      {label}
    </span>
  );
};

// ==========================================
// IMPROVEMENT CARD
// ==========================================

const ImprovementCard = ({
  improvement,
  number,
}: {
  improvement: AICriticalImprovement;
  number: number;
}) => {
  const isHigh = improvement.priority === "high";

  return (
    <div className="p-5 rounded-2xl border border-border/50 bg-background/30">
      <div className="flex items-start gap-4">
        <div
          className={
            isHigh
              ? "w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0"
              : "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
          }
        >
          {isHigh ? (
            <AlertTriangle className="w-4 h-4 text-destructive" />
          ) : (
            <span className="text-sm font-bold text-primary">
              {number}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h5 className="font-bold text-foreground">
              {improvement.title}
            </h5>

            <span
              className={
                isHigh
                  ? "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive"
                  : "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary"
              }
            >
              {improvement.priority}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            {improvement.reason}
          </p>

          <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-primary">
                What to do:{" "}
              </span>

              {improvement.suggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// FORMAT LABEL
// ==========================================

const formatLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

export default AIRecruiterCard;