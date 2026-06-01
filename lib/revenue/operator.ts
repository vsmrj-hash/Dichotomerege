import { claudeJson } from './claude';
import { tavilySearch } from './tavily';
import type { Contact, Lead, OutreachDraft, Project, ReplyAnalysis, ResearchResult } from './types';

const system = 'You are a precise B2B revenue operator. Return only valid JSON. Avoid generic AI language. Be concise, specific, and commercially useful.';

function hostname(url: string) {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  }
}

export async function discoverLeads(project: Project) {
  const queries = [
    `companies hiring ${project.icp} ${project.product_name}`,
    `recently funded companies ${project.icp}`,
    `companies scaling sales ${project.icp}`,
    `companies matching ideal customer profile ${project.icp} ${project.description}`
  ];

  const results = (await Promise.all(queries.map(tavilySearch))).flat();
  const deduped = Array.from(new Map(results.map((result) => [hostname(result.url), result])).values()).slice(0, 12);

  return claudeJson<Array<Omit<Lead, 'id' | 'project_id'>>>(
    system,
    `Turn these search results into qualified B2B leads for this product. Product: ${JSON.stringify(project)}. Results: ${JSON.stringify(deduped)}. Return a JSON array. Each item must have company_name, website, industry, employee_count, reason_match, score. Scores must be 0-100.`
  );
}


export async function discoverContacts(project: Project, lead: Lead) {
  const web = await tavilySearch(`${lead.company_name} founder head of growth sales leader linkedin email`);
  return claudeJson<Array<Omit<Contact, 'id' | 'lead_id'>>>(
    system,
    `Identify the best likely outbound contacts for this lead using only the provided evidence. If an exact email is not evidenced, set email to null. If LinkedIn is not evidenced, set linkedin_url to null. Product: ${JSON.stringify(project)}. Lead: ${JSON.stringify(lead)}. Evidence: ${JSON.stringify(web)}. Return a JSON array of 1-3 contacts with name, role, linkedin_url, email.`
  );
}

export async function researchLead(project: Project, lead: Lead) {
  const web = await tavilySearch(`${lead.company_name} ${lead.website} growth hiring funding pain points`);
  return claudeJson<ResearchResult>(
    system,
    `Research this lead for outbound sales. Product: ${JSON.stringify(project)}. Lead: ${JSON.stringify(lead)}. Web evidence: ${JSON.stringify(web)}. Return JSON with summary, pain_points array, why_match, outreach_angle.`
  );
}

export async function generateOutreach(project: Project, lead: Lead, contact: Contact) {
  return claudeJson<OutreachDraft>(
    system,
    `Write a concise cold email to this contact. No buzzwords, no em dash, no generic AI phrasing. Make it specific to the company and one clear CTA. Product: ${JSON.stringify(project)}. Lead: ${JSON.stringify(lead)}. Contact: ${JSON.stringify(contact)}. Return JSON with subject and body.`
  );
}

export async function analyzeReply(project: Project, lead: Lead, reply: string) {
  return claudeJson<ReplyAnalysis>(
    system,
    `Classify the buyer reply as interested, objection, not_now, or no. Then write the best concise response and next action. Product: ${JSON.stringify(project)}. Lead: ${JSON.stringify(lead)}. Reply: ${reply}. Return JSON with sentiment, best_reply, next_action.`
  );
}

export async function createMeetingPrep(project: Project, lead: Lead, meetingDate: string) {
  return claudeJson<{ prep_doc: string }>(
    system,
    `Create a markdown meeting prep doc with company summary, stakeholders, likely objections, discovery questions, and closing strategy. Product: ${JSON.stringify(project)}. Lead: ${JSON.stringify(lead)}. Meeting date: ${meetingDate}. Return JSON with prep_doc.`
  );
}
