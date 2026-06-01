import { NextRequest } from 'next/server';
import { db } from '@/lib/revenue/supabase-rest';
import { discoverContacts, discoverLeads } from '@/lib/revenue/operator';
import type { Contact, Lead, Project } from '@/lib/revenue/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { project_id } = await req.json();
    const project = (await db.select<Project>('projects', { id: `eq.${project_id}`, limit: 1 }))[0];
    if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });

    const discovered = await discoverLeads(project);
    const leads: Lead[] = [];
    const contacts: Contact[] = [];

    for (const item of discovered) {
      const lead = await db.insert<Lead>('leads', {
        project_id: project.id,
        company_name: item.company_name,
        website: item.website,
        industry: item.industry,
        employee_count: item.employee_count || null,
        reason_match: item.reason_match,
        score: Math.max(0, Math.min(100, item.score || 50))
      });
      leads.push(lead);
      const discoveredContacts = await discoverContacts(project, lead);
      for (const item of discoveredContacts.slice(0, 3)) {
        const contact = await db.insert<Contact>('contacts', {
          lead_id: lead.id,
          name: item.name,
          role: item.role,
          linkedin_url: item.linkedin_url || null,
          email: item.email || null
        });
        contacts.push(contact);
      }
    }

    return Response.json({ leads, contacts });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
