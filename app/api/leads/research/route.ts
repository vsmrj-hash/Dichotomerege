import { NextRequest } from 'next/server';
import { db } from '@/lib/revenue/supabase-rest';
import { researchLead } from '@/lib/revenue/operator';
import type { Lead, Project } from '@/lib/revenue/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { lead_id } = await req.json();
    const lead = (await db.select<Lead>('leads', { id: `eq.${lead_id}`, limit: 1 }))[0];
    if (!lead) return Response.json({ error: 'Lead not found' }, { status: 404 });
    const project = (await db.select<Project>('projects', { id: `eq.${lead.project_id}`, limit: 1 }))[0];
    const research = await researchLead(project, lead);
    const updated = await db.update<Lead>('leads', { id: `eq.${lead.id}` }, {
      research_summary: research.summary,
      pain_points: research.pain_points,
      reason_match: research.why_match,
      outreach_angle: research.outreach_angle
    });
    return Response.json({ lead: updated, research });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
