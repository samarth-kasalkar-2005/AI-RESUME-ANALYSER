import React from "react";
import {
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  FileSearch,
  KeyRound,
  Sparkles,
  Target,
} from "lucide-react";

import HeroCard from "./HeroCard";
import SkillsCard from "./SkillsCard";
import JobMatchesCard from "./JobMatchesCard";
import ScoreRing from "./ScoreRing";

import type { ResultData } from "@/types/result";

import ResumeQualityCard from "./ResumeQualityCard";
import AIRecruiterCard from "./AIRecruiterCard";

interface ResultsDashboardProps {
  data: ResultData;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data }) => {
  const bestJob = data.job_matches?.[0];
  const jd = data.job_description_analysis;
  const aiRecruiter = data.ai_recruiter;

  const getMatchLabel = (score: number) => {
    if (score >= 85) return "Excellent Match";
    if (score >= 70) return "Strong Match";
    if (score >= 55) return "Moderate Match";
    return "Needs Improvement";
  };

  return (
    <div className="w-full animate-scale-in space-y-8">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Sparkles className="w-4 h-4" />

          <span className="text-sm font-semibold uppercase tracking-wider">
            Resume Intelligence Report
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Your Career Analysis
        </h2>

        <p className="text-muted-foreground mt-2 max-w-2xl">
          Explore your resume strengths, skill gaps, career matches,
          and compatibility with your target opportunity.
        </p>
      </div>

      {/* ================================================= */}
      {/* JD INTELLIGENCE */}
      {/* Only appears when user supplied a JD */}
      {/* ================================================= */}

      {jd && (
        <section className="space-y-6">

          {/* OVERALL MATCH HERO */}

          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6 md:p-8">

            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center">

              <div className="flex justify-center">
                <ScoreRing
                  score={jd.overall_match_score}
                  size={180}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Target className="w-5 h-5" />

                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Target Job Compatibility
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {getMatchLabel(jd.overall_match_score)}
                </h3>

                <p className="text-muted-foreground mt-3 max-w-xl">
                  Your overall score combines explicit skill
                  compatibility, semantic relevance, and important
                  keywords found in the target job description.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="px-4 py-2 rounded-xl border border-border bg-background/40">
                    <span className="text-xs text-muted-foreground">
                      Matched Skills
                    </span>

                    <p className="font-bold text-foreground">
                      {jd.matched_skills.length}
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-xl border border-border bg-background/40">
                    <span className="text-xs text-muted-foreground">
                      Missing Skills
                    </span>

                    <p className="font-bold text-foreground">
                      {jd.missing_skills.length}
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-xl border border-border bg-background/40">
                    <span className="text-xs text-muted-foreground">
                      Required Skills
                    </span>

                    <p className="font-bold text-foreground">
                      {jd.required_skills.length}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* SCORE BREAKDOWN */}
          {/* ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-primary" />

              <h3 className="text-xl font-bold text-foreground">
                Match Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <MetricCard
                icon={<Target className="w-5 h-5" />}
                title="Skill Match"
                description="Required technical skills found in your resume."
                score={jd.score_breakdown.skill_match}
              />

              <MetricCard
                icon={<BrainCircuit className="w-5 h-5" />}
                title="Semantic Match"
                description="How closely your resume meaning aligns with the role."
                score={jd.score_breakdown.semantic_match}
              />

              <MetricCard
                icon={<KeyRound className="w-5 h-5" />}
                title="Keyword Match"
                description="Important job-description terms found in your resume."
                score={jd.score_breakdown.keyword_match}
              />

            </div>
          </div>

          {/* ================================================= */}
          {/* MATCHED + MISSING SKILLS */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* MATCHED */}

            <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Matched Skills
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Skills you already have for this role
                  </p>
                </div>

              </div>

              {jd.matched_skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {jd.matched_skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-xl text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      ✓ {skill}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No explicit technical skill matches were detected.
                </p>
              )}

            </div>

            {/* MISSING */}

            <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                  <CircleAlert className="w-5 h-5 text-destructive" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Skill Gaps
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Skills worth learning or demonstrating
                  </p>
                </div>

              </div>

              {jd.missing_skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {jd.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-xl text-sm font-medium bg-destructive/10 text-destructive border border-destructive/20"
                    >
                      + {skill}
                    </span>
                  ))}

                </div>
              ) : (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />

                  <p className="text-sm font-medium">
                    Great — all detected required skills are present.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* REQUIRED SKILLS */}

          {jd.required_skills.length > 0 && (
            <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <FileSearch className="w-5 h-5 text-primary" />

                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Skills Detected in Job Description
                  </h3>

                  <p className="text-xs text-muted-foreground mt-1">
                    Technical requirements recognized by the
                    intelligence engine.
                  </p>
                </div>

              </div>

              <div className="flex flex-wrap gap-2">

                {jd.required_skills.map((skill) => {
                  const matched =
                    jd.matched_skills.includes(skill);

                  return (
                    <span
                      key={skill}
                      className={
                        matched
                          ? "px-3 py-2 rounded-xl text-sm border border-primary/20 bg-primary/10 text-primary"
                          : "px-3 py-2 rounded-xl text-sm border border-border bg-background/40 text-muted-foreground"
                      }
                    >
                      {matched ? "✓ " : ""}
                      {skill}
                    </span>
                  );
                })}

              </div>

            </div>
          )}

        </section>
      )}

      {/* ================================================= */}
      {/* RESUME QUALITY INTELLIGENCE */}
      {/* ================================================= */}

      {data.resume_quality && (
        <ResumeQualityCard
          quality={data.resume_quality}
        />
      )}

      {/* ================================================= */}
      {/* AI RECRUITER REPORT */}
      {/* ================================================= */}

      {aiRecruiter && (
        <AIRecruiterCard analysis={aiRecruiter} />
      )}

      {data.ai_recruiter_error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <p className="font-semibold text-destructive">
            AI Recruiter unavailable
          </p>

          <p className="text-sm text-muted-foreground mt-1">
            {data.ai_recruiter_error}
          </p>
        </div>
      )}

      {/* ================================================= */}
      {/* EXISTING GENERAL CAREER ANALYSIS */}
      {/* ================================================= */}

      <section>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />

          <h3 className="text-xl font-bold text-foreground">
            Career Intelligence
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <HeroCard
            score={bestJob?.ats_score ?? 0}
            role={bestJob?.job ?? "Unknown Role"}
          />

          <SkillsCard
            title="Extracted Skills"
            skills={data.extracted_skills}
            type="extracted"
          />

          <SkillsCard
            title="Career Skill Gaps"
            skills={bestJob?.missing_skills ?? []}
            type="missing"
          />

          <JobMatchesCard jobs={data.job_matches} />

        </div>

      </section>

    </div>
  );
};


/* ===================================================== */
/* SCORE METRIC CARD */
/* ===================================================== */

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  score: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  description,
  score,
}) => {
  const safeScore = Math.max(
    0,
    Math.min(100, Math.round(score))
  );

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-5">

      <div className="flex items-center justify-between gap-4 mb-4">

        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>

        <span className="text-2xl font-black text-foreground">
          {safeScore}%
        </span>

      </div>

      <h4 className="font-bold text-foreground">
        {title}
      </h4>

      <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
        {description}
      </p>

      {/* PROGRESS BAR */}

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-4">

        <div
          className="h-full bg-primary rounded-full transition-all duration-1000"
          style={{
            width: `${safeScore}%`,
          }}
        />

      </div>

    </div>
  );
};

export default ResultsDashboard;