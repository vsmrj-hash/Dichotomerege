export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  product_name: string;
  description: string;
  pricing: string;
  icp: string;
  website: string;
  created_at?: string;
};

export type Lead = {
  id: string;
  project_id: string;
  company_name: string;
  website: string;
  industry: string;
  employee_count: number | null;
  reason_match: string;
  score: number;
  research_summary?: string | null;
  pain_points?: string[];
  outreach_angle?: string | null;
  created_at?: string;
};

export type Contact = {
  id: string;
  lead_id: string;
  name: string;
  role: string;
  linkedin_url: string | null;
  email: string | null;
  created_at?: string;
};

export type Outreach = {
  id: string;
  contact_id: string;
  email_subject: string;
  email_body: string;
  status: 'draft' | 'queued' | 'sent' | 'replied' | 'bounced';
  sent_at: string | null;
  created_at?: string;
};

export type Reply = {
  id: string;
  outreach_id: string;
  content: string;
  sentiment: 'interested' | 'objection' | 'not_now' | 'no';
  next_action: string;
  created_at?: string;
};

export type Meeting = {
  id: string;
  lead_id: string;
  meeting_date: string;
  prep_doc: string;
  created_at?: string;
};

export type DashboardStats = {
  leadsFound: number;
  emailsSent: number;
  positiveReplies: number;
  meetingsBooked: number;
};

export type ResearchResult = {
  summary: string;
  pain_points: string[];
  why_match: string;
  outreach_angle: string;
};

export type OutreachDraft = {
  subject: string;
  body: string;
};

export type ReplyAnalysis = {
  sentiment: Reply['sentiment'];
  best_reply: string;
  next_action: string;
};
