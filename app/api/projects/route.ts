import { NextRequest } from 'next/server';
import { db } from '@/lib/revenue/supabase-rest';
import type { Contact, DashboardStats, Lead, Meeting, Outreach, Project, Reply, User } from '@/lib/revenue/types';

export const runtime = 'nodejs';

async function ensureUser(email: string) {
  return db.upsert<User>('users', { email }, 'email');
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email') || 'founder@example.com';
    const user = await ensureUser(email);
    const projects = await db.select<Project>('projects', { user_id: `eq.${user.id}`, order: 'created_at.desc' });
    const activeProject = projects[0] || null;

    let stats: DashboardStats = { leadsFound: 0, emailsSent: 0, positiveReplies: 0, meetingsBooked: 0 };
    let leads: Lead[] = [];
    let contacts: Contact[] = [];
    let outreach: Outreach[] = [];
    let replies: Reply[] = [];
    let meetings: Meeting[] = [];

    if (activeProject) {
      leads = await db.select<Lead>('leads', { project_id: `eq.${activeProject.id}`, order: 'score.desc' });
      const leadIds = leads.map((lead) => lead.id);
      if (leadIds.length) {
        contacts = await db.select<Contact>('contacts', { lead_id: `in.(${leadIds.join(',')})` });
        meetings = await db.select<Meeting>('meetings', { lead_id: `in.(${leadIds.join(',')})` });
      }
      const contactIds = contacts.map((contact) => contact.id);
      if (contactIds.length) {
        outreach = await db.select<Outreach>('outreach', { contact_id: `in.(${contactIds.join(',')})` });
      }
      const outreachIds = outreach.map((item) => item.id);
      if (outreachIds.length) {
        replies = await db.select<Reply>('replies', { outreach_id: `in.(${outreachIds.join(',')})` });
      }
      stats = {
        leadsFound: leads.length,
        emailsSent: outreach.filter((item) => item.status === 'sent').length,
        positiveReplies: replies.filter((reply) => reply.sentiment === 'interested').length,
        meetingsBooked: meetings.length
      };
    }

    return Response.json({ user, projects, activeProject, leads, contacts, outreach, replies, meetings, stats });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await ensureUser(body.email || 'founder@example.com');
    const project = await db.insert<Project>('projects', {
      user_id: user.id,
      product_name: body.product_name,
      description: body.description,
      pricing: body.pricing,
      icp: body.icp,
      website: body.website
    });

    return Response.json({ project });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
