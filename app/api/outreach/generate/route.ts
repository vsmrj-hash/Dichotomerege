import { NextRequest } from 'next/server';
import { db } from '@/lib/revenue/supabase-rest';
import { generateOutreach } from '@/lib/revenue/operator';
import type { Contact, Lead, Outreach, Project } from '@/lib/revenue/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { contact_id } = await req.json();
    const contact = (await db.select<Contact>('contacts', { id: `eq.${contact_id}`, limit: 1 }))[0];
    if (!contact) return Response.json({ error: 'Contact not found' }, { status: 404 });
    const lead = (await db.select<Lead>('leads', { id: `eq.${contact.lead_id}`, limit: 1 }))[0];
    const project = (await db.select<Project>('projects', { id: `eq.${lead.project_id}`, limit: 1 }))[0];
    const draft = await generateOutreach(project, lead, contact);
    const outreach = await db.insert<Outreach>('outreach', {
      contact_id: contact.id,
      email_subject: draft.subject,
      email_body: draft.body,
      status: 'draft',
      sent_at: null
    });
    return Response.json({ outreach });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
