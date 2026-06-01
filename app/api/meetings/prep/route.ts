import { NextRequest } from 'next/server';
import { createMeetingPrep } from '@/lib/revenue/operator';
import { db } from '@/lib/revenue/supabase-rest';
import type { Lead, Meeting, Project } from '@/lib/revenue/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { lead_id, meeting_date } = await req.json();
    const lead = (await db.select<Lead>('leads', { id: `eq.${lead_id}`, limit: 1 }))[0];
    if (!lead) return Response.json({ error: 'Lead not found' }, { status: 404 });
    const project = (await db.select<Project>('projects', { id: `eq.${lead.project_id}`, limit: 1 }))[0];
    const prep = await createMeetingPrep(project, lead, meeting_date);
    const meeting = await db.insert<Meeting>('meetings', { lead_id: lead.id, meeting_date, prep_doc: prep.prep_doc });
    return Response.json({ meeting });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
