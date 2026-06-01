import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/revenue/email';
import { db } from '@/lib/revenue/supabase-rest';
import type { Contact, Outreach } from '@/lib/revenue/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { outreach_id } = await req.json();
    const outreach = (await db.select<Outreach>('outreach', { id: `eq.${outreach_id}`, limit: 1 }))[0];
    if (!outreach) return Response.json({ error: 'Outreach not found' }, { status: 404 });
    const contact = (await db.select<Contact>('contacts', { id: `eq.${outreach.contact_id}`, limit: 1 }))[0];
    if (!contact.email) return Response.json({ error: 'Contact email is required before sending.' }, { status: 400 });
    await sendEmail(contact.email, outreach.email_subject, outreach.email_body.replace(/\n/g, '<br />'));
    const updated = await db.update<Outreach>('outreach', { id: `eq.${outreach.id}` }, { status: 'sent', sent_at: new Date().toISOString() });
    return Response.json({ outreach: updated });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
