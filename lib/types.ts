export type ResumeExperience = {
  company: string;
  role: string;
  duration?: string;
  bullets: string[];
};

export type ParsedResume = {
  name: string;
  summary?: string;
  experience: ResumeExperience[];
  bullets: string[];
  skills: string[];
};

export type ScoreBreakdown = {
  score: number;
  keywordMatchPercent: number;
  missingSkills: string[];
  weakBullets: string[];
  gaps: string[];
};

export type AnalysisResponse = {
  originalText: string;
  parsedResume: ParsedResume;
  improvedResume: string;
  score: ScoreBreakdown;
};
