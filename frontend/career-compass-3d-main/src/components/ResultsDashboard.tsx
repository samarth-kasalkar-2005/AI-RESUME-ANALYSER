import React from "react";
import HeroCard from "./HeroCard";
import SkillsCard from "./SkillsCard";
import JobMatchesCard from "./JobMatchesCard";
import type { ResultData } from "@/types/result";

interface ResultsDashboardProps {
  data: ResultData;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data }) => {
  const bestJob = data.job_matches[0];

  return (
    <div className="w-full animate-scale-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* HERO CARD */}
        <HeroCard
          score={bestJob?.ats_score ?? 0}
          role={bestJob?.job ?? "Unknown Role"}
        />

        {/* EXTRACTED SKILLS */}
        <SkillsCard
          title="Extracted Skills"
          skills={data.extracted_skills}
          type="extracted"
        />

        {/* MISSING SKILLS */}
        <SkillsCard
          title="Missing Skills"
          skills={bestJob?.missing_skills ?? []}
          type="missing"
        />

        {/* JOB MATCHES */}
        <JobMatchesCard jobs={data.job_matches} />

      </div>
    </div>
  );
};

export default ResultsDashboard;
