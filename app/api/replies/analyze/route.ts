import { NextRequest } from 'next/server';
import { analyzeReply } from '@/lib/revenue/operator';
import { db } from '@/lib/revenue/supabase-rest';
import type { Contact, Lead, Outreach, Project, Reply } from '@/lib/revenue/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { outreach_id, content } = await req.json();
    const outreach = (await db.select<Outreach>('outreach', { id: `eq.${outreach_id}`, limit: 1 }))[0];
    if (!outreach) return Response.json({ error: 'Outreach not found' }, { status: 404 });
    const contact = (await db.select<Contact>('contacts', { id: `eq.${outreach.contact_id}`, limit: 1 }))[0];
    const lead = (await db.select<Lead>('leads', { id: `eq.${contact.lead_id}`, limit: 1 }))[0];
    const project = (await db.select<Project>('projects', { id: `eq.${lead.project_id}`, limit: 1 }))[0];
    const analysis = await analyzeReply(project, lead, content);
    const reply = await db.insert<Reply>('replies', {
      outreach_id: outreach.id,
      content,
      sentiment: analysis.sentiment,
      next_action: `${analysis.next_action}\n\nSuggested reply:\n${analysis.best_reply}`
    });
    await db.update<Outreach>('outreach', { id: `eq.${outreach.id}` }, { status: 'replied' });
    return Response.json({ reply, analysis });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
