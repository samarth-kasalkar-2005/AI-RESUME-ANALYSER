import React from "react";
import {
  Activity,
  AlertTriangle,
  Award,
  CheckCircle2,
  FileCheck2,
  FileText,
  Gauge,
  Lightbulb,
  Mail,
  Phone,
  Github,
  Linkedin,
  Target,
  TrendingUp,
  Type,
  XCircle,
} from "lucide-react";

import ScoreRing from "./ScoreRing";

import type {
  ResumeQuality,
  ResumeRecommendation,
} from "@/types/result";

interface ResumeQualityCardProps {
  quality: ResumeQuality;
}

const ResumeQualityCard: React.FC<
  ResumeQualityCardProps
> = ({ quality }) => {
  const metrics = [
    {
      title: "Structure",
      description: "Core resume sections",
      score: quality.score_breakdown.structure,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Contact Info",
      description: "Recruiter accessibility",
      score:
        quality.score_breakdown.contact_information,
      icon: <Mail className="w-5 h-5" />,
    },
    {
      title: "Action Language",
      description: "Strong achievement verbs",
      score: quality.score_breakdown.action_language,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Measurable Impact",
      description: "Quantified achievements",
      score:
        quality.score_breakdown.measurable_impact,
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Content Length",
      description: "Resume information density",
      score: quality.score_breakdown.content_length,
      icon: <FileCheck2 className="w-5 h-5" />,
    },
    {
      title: "Writing Quality",
      description: "Generic phrase detection",
      score: quality.score_breakdown.writing_quality,
      icon: <Type className="w-5 h-5" />,
    },
  ];

  const sections = Object.entries(quality.sections);

  const contactItems = [
    {
      label: "Email",
      available: quality.contact.email,
      icon: <Mail className="w-4 h-4" />,
    },
    {
      label: "Phone",
      available: quality.contact.phone,
      icon: <Phone className="w-4 h-4" />,
    },
    {
      label: "LinkedIn",
      available: quality.contact.linkedin,
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      label: "GitHub",
      available: quality.contact.github,
      icon: <Github className="w-4 h-4" />,
    },
  ];

  const getHealthLabel = (score: number) => {
    if (score >= 85) return "Excellent Resume";
    if (score >= 70) return "Strong Resume";
    if (score >= 55) return "Good Foundation";

    return "Needs Improvement";
  };

  return (
    <section className="space-y-6">

      {/* ===================================== */}
      {/* SECTION HEADER */}
      {/* ===================================== */}

      <div className="flex items-center gap-2">
        <Gauge className="w-5 h-5 text-primary" />

        <h3 className="text-xl font-bold text-foreground">
          Resume Health
        </h3>
      </div>

      {/* ===================================== */}
      {/* HEALTH HERO */}
      {/* ===================================== */}

      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6 md:p-8">

        <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center">

          <div className="flex justify-center">
            <ScoreRing
              score={quality.overall_score}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-primary mb-3">

              <Activity className="w-5 h-5" />

              <span className="text-sm font-semibold uppercase tracking-wider">
                Resume Health Score
              </span>

            </div>

            <h3 className="text-3xl md:text-4xl font-black text-foreground">
              {getHealthLabel(
                quality.overall_score
              )}
            </h3>

            <p className="text-muted-foreground mt-3 max-w-2xl">
              This score evaluates your resume structure,
              contact information, achievement language,
              measurable impact and overall content quality.
            </p>

            {/* QUICK STATS */}

            <div className="flex flex-wrap gap-3 mt-6">

              <Stat
                value={quality.word_count}
                label="Words"
              />

              <Stat
                value={
                  quality.action_verbs_found.length
                }
                label="Action Verbs"
              />

              <Stat
                value={
                  quality.measurable_achievements
                }
                label="Measured Results"
              />

              <Stat
                value={
                  quality.recommendations.length
                }
                label="Suggestions"
              />

            </div>
          </div>

        </div>
      </div>

      {/* ===================================== */}
      {/* QUALITY METRICS */}
      {/* ===================================== */}

      <div>

        <h4 className="font-bold text-lg text-foreground mb-4">
          Quality Breakdown
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {metrics.map((metric) => (
            <QualityMetric
              key={metric.title}
              {...metric}
            />
          ))}

        </div>
      </div>

      {/* ===================================== */}
      {/* SECTIONS + CONTACT */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* DETECTED SECTIONS */}

        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h4 className="font-bold text-foreground">
                Resume Sections
              </h4>

              <p className="text-xs text-muted-foreground">
                Sections detected by the analyzer
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            {sections.map(
              ([section, available]) => (
                <StatusItem
                  key={section}
                  label={formatLabel(section)}
                  available={available}
                />
              )
            )}

          </div>

        </div>

        {/* CONTACT CHECK */}

        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h4 className="font-bold text-foreground">
                Recruiter Contact Check
              </h4>

              <p className="text-xs text-muted-foreground">
                Important contact channels detected
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            {contactItems.map((item) => (
              <StatusItem
                key={item.label}
                label={item.label}
                available={item.available}
                icon={item.icon}
              />
            ))}

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* ACTION VERBS */}
      {/* ===================================== */}

      {quality.action_verbs_found.length >
        0 && (
        <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <Award className="w-5 h-5 text-primary" />

            <div>
              <h4 className="font-bold text-foreground">
                Strong Action Language
              </h4>

              <p className="text-xs text-muted-foreground">
                Achievement-oriented verbs detected
                in your resume
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {quality.action_verbs_found.map(
              (verb) => (
                <span
                  key={verb}
                  className="px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium capitalize"
                >
                  {verb}
                </span>
              )
            )}

          </div>

        </div>
      )}

      {/* ===================================== */}
      {/* RECOMMENDATIONS */}
      {/* ===================================== */}

      <div className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>

          <div>
            <h4 className="font-bold text-lg text-foreground">
              Resume Improvement Plan
            </h4>

            <p className="text-xs text-muted-foreground">
              Prioritized recommendations based on
              your resume analysis
            </p>
          </div>

        </div>

        <div className="space-y-3">

          {quality.recommendations.map(
            (recommendation, index) => (
              <Recommendation
                key={`${recommendation.category}-${index}`}
                recommendation={
                  recommendation
                }
              />
            )
          )}

        </div>

      </div>

    </section>
  );
};


/* ========================================== */
/* QUALITY METRIC */
/* ========================================== */

interface QualityMetricProps {
  title: string;
  description: string;
  score: number;
  icon: React.ReactNode;
}

const QualityMetric: React.FC<
  QualityMetricProps
> = ({
  title,
  description,
  score,
  icon,
}) => {
  const safeScore = Math.max(
    0,
    Math.min(100, Math.round(score))
  );

  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5">

      <div className="flex justify-between gap-4">

        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>

        <span className="text-2xl font-black">
          {safeScore}%
        </span>

      </div>

      <h5 className="font-bold mt-4">
        {title}
      </h5>

      <p className="text-xs text-muted-foreground mt-1">
        {description}
      </p>

      <div className="h-2 bg-muted rounded-full overflow-hidden mt-4">

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


/* ========================================== */
/* STAT */
/* ========================================== */

const Stat = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => (
  <div className="px-4 py-2 rounded-xl border border-border bg-background/40">

    <p className="font-black text-foreground">
      {value}
    </p>

    <span className="text-xs text-muted-foreground">
      {label}
    </span>

  </div>
);


/* ========================================== */
/* STATUS */
/* ========================================== */

const StatusItem = ({
  label,
  available,
  icon,
}: {
  label: string;
  available: boolean;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 p-3 rounded-xl border border-border/50 bg-background/30">

    {available ? (
      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
    ) : (
      <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />
    )}

    {icon}

    <span
      className={
        available
          ? "text-sm font-medium text-foreground"
          : "text-sm text-muted-foreground"
      }
    >
      {label}
    </span>

  </div>
);


/* ========================================== */
/* RECOMMENDATION */
/* ========================================== */

const Recommendation = ({
  recommendation,
}: {
  recommendation: ResumeRecommendation;
}) => {
  const isHigh =
    recommendation.priority === "high";

  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl border border-border/50 bg-background/30">

      <div
        className={
          isHigh
            ? "mt-0.5 w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0"
            : "mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
        }
      >
        {isHigh ? (
          <AlertTriangle className="w-4 h-4 text-destructive" />
        ) : (
          <Lightbulb className="w-4 h-4 text-primary" />
        )}
      </div>

      <div className="flex-1">

        <div className="flex flex-wrap items-center gap-2 mb-1">

          <span className="font-semibold text-sm text-foreground">
            {recommendation.category}
          </span>

          <span
            className={
              isHigh
                ? "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive"
                : "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary"
            }
          >
            {recommendation.priority}
          </span>

        </div>

        <p className="text-sm text-muted-foreground">
          {recommendation.message}
        </p>

      </div>

    </div>
  );
};


const formatLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );


export default ResumeQualityCard;