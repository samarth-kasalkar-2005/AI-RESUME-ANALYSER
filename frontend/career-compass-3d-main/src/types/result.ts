export interface JobMatch {
  job: string;
  semantic_score: number;
  ats_score: number;
  missing_skills: string[];
}

export interface ResultData {
  extracted_skills: string[];
  job_matches: JobMatch[];
}
