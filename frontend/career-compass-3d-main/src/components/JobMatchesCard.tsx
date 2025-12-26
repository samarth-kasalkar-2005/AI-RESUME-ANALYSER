import React from "react";
import { Trophy } from "lucide-react";

interface JobMatch {
  job: string;
  semantic_score: number;
  ats_score: number;
  missing_skills: string[];
}

interface JobMatchesCardProps {
  jobs: JobMatch[];
}

const JobMatchesCard: React.FC<JobMatchesCardProps> = ({ jobs }) => {
  return (
    <div className="glass-card p-6 col-span-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          Top Job Matches
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => {
          const percentage = Number.isFinite(job.semantic_score)
            ? Math.round(job.semantic_score)
            : 0;

          const isTop = index === 0;

          return (
            <div
              key={job.job}
              className={`glass-card-hover p-5 ${
                isTop ? "ring-2 ring-primary/50" : ""
              }`}
            >
              {isTop && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                    Best Match
                  </span>
                </div>
              )}

              <h4 className="font-semibold text-foreground mb-3">
                {job.job}
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Semantic Match
                  </span>
                  <span className="font-semibold text-primary">
                    {percentage}%
                  </span>
                </div>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobMatchesCard;
