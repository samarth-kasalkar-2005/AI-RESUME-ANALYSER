export interface JobMatch {
  job: string;
  semantic_score: number;
  ats_score: number;
  missing_skills: string[];
}

export interface ScoreBreakdown {
  skill_match: number;
  semantic_match: number;
  keyword_match: number;
}

export interface JobDescriptionAnalysis {
  overall_match_score: number;
  score_breakdown: ScoreBreakdown;

  resume_skills: string[];
  required_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
}

export interface ResumeQualityBreakdown {
  structure: number;
  contact_information: number;
  action_language: number;
  measurable_impact: number;
  content_length: number;
  writing_quality: number;
}

export interface ResumeSections {
  summary: boolean;
  education: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
  certifications: boolean;
}

export interface ResumeContact {
  email: boolean;
  phone: boolean;
  linkedin: boolean;
  github: boolean;
}

export interface ResumeRecommendation {
  priority: "high" | "medium" | "low";
  category: string;
  message: string;
}

export interface ResumeQuality {
  overall_score: number;

  score_breakdown: ResumeQualityBreakdown;

  sections: ResumeSections;

  contact: ResumeContact;

  action_verbs_found: string[];

  measurable_achievements: number;

  word_count: number;

  weak_phrases: string[];

  recommendations: ResumeRecommendation[];
}

export interface AIRecruiterVerdict {
  summary: string;
  strength_level: "strong" | "moderate" | "weak";
}

export interface AICriticalImprovement {
  title: string;
  reason: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

export interface AISectionFeedback {
  summary: string;
  experience: string;
  projects: string;
  skills: string;
  education: string;
}

export interface AIBulletRewrite {
  original: string;
  improved: string;
  why_better: string;
}

export interface AIInterviewQuestion {
  question: string;
  reason: string;
}

export interface AIRecruiterAnalysis {
  recruiter_verdict: AIRecruiterVerdict;

  top_strengths: string[];

  critical_improvements: AICriticalImprovement[];

  section_feedback: AISectionFeedback;

  bullet_rewrites: AIBulletRewrite[];

  interview_questions: AIInterviewQuestion[];
}

export interface ResultData {
  extracted_skills: string[];
  job_matches: JobMatch[];

  // Optional because users can analyze without a JD
  job_description_analysis?: JobDescriptionAnalysis;
  ai_recruiter?: AIRecruiterAnalysis;
  ai_recruiter_error?: string;
}