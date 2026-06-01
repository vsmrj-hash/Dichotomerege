'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { MetricCard } from '@/components/MetricCard';
import { PipelineChart } from '@/components/PipelineChart';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { useLocalUser } from '@/hooks/useLocalUser';
import type { Contact, DashboardStats, Lead, Meeting, Outreach, Project, Reply } from '@/lib/revenue/types';

type Data = {
  activeProject: Project | null;
  leads: Lead[];
  contacts: Contact[];
  outreach: Outreach[];
  replies: Reply[];
  meetings: Meeting[];
  stats: DashboardStats;
};

const emptyStats = { leadsFound: 0, emailsSent: 0, positiveReplies: 0, meetingsBooked: 0 };

export default function DashboardPage() {
  const { email, setEmail } = useLocalUser();
  const [data, setData] = useState<Data>({ activeProject: null, leads: [], contacts: [], outreach: [], replies: [], meetings: [], stats: emptyStats });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [replyText, setReplyText] = useState('');
  const [meetingDate, setMeetingDate] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch(`/api/projects?email=${encodeURIComponent(email)}`);
    const json = await res.json();
    if (!res.ok) setError(json.error || 'Unable to load dashboard');
    else setData(json);
    setLoading(false);
  }, [email]);

  useEffect(() => {
    load();
  }, [load]);

  async function run(label: string, path: string, body: unknown) {
    setBusy(label);
    setError('');
    const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json = await res.json();
    if (!res.ok) setError(json.error || `${label} failed`);
    await load();
    setBusy('');
  }

  const contactByLead = useMemo(() => new Map(data.contacts.map((contact) => [contact.lead_id, contact])), [data.contacts]);
  const firstOutreach = data.outreach[0];
  const firstLead = data.leads[0];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Pipeline command center</h1>
            <p className="mt-3 text-slate-400">Run lead discovery, research, outreach, replies, and meeting prep from one workspace.</p>
          </div>
          <div className="flex gap-3">
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-64" />
            <Link href="/projects/new"><Button variant="secondary">New Project</Button></Link>
          </div>
        </header>

        {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}

        {loading ? <Card>Loading revenue workspace...</Card> : !data.activeProject ? (
          <Card>
            <h2 className="text-xl font-semibold">Create your first project</h2>
            <p className="mt-2 text-slate-400">Add your product details before running discovery.</p>
            <Link href="/projects/new" className="mt-5 inline-block"><Button>Create project</Button></Link>
          </Card>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-4">
              <MetricCard title="Leads found" value={data.stats.leadsFound} helper="Qualified companies saved" />
              <MetricCard title="Emails sent" value={data.stats.emailsSent} helper="Outreach marked sent" />
              <MetricCard title="Positive replies" value={data.stats.positiveReplies} helper="Interested responses" />
              <MetricCard title="Meetings booked" value={data.stats.meetingsBooked} helper="Prep docs created" />
            </section>

            <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
              <Card>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>{data.activeProject.product_name}</CardTitle>
                    <p className="mt-1 text-sm text-slate-500">{data.activeProject.icp}</p>
                  </div>
                  <Button disabled={!!busy} onClick={() => run('Finding leads', '/api/leads/discover', { project_id: data.activeProject?.id })}>{busy === 'Finding leads' ? 'Finding...' : 'Find Leads'}</Button>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-500"><tr><th className="p-3">Company</th><th className="p-3">Score</th><th className="p-3">Why match</th><th className="p-3">Actions</th></tr></thead>
                    <tbody className="divide-y divide-white/10">
                      {data.leads.map((lead) => {
                        const contact = contactByLead.get(lead.id);
                        return (
                          <tr key={lead.id} className="align-top">
                            <td className="p-3"><a className="font-medium text-white hover:text-cyan-200" href={lead.website} target="_blank">{lead.company_name}</a><p className="mt-1 text-xs text-slate-500">{lead.industry}</p></td>
                            <td className="p-3"><span className="rounded-full bg-cyan-400/10 px-2 py-1 text-cyan-200">{lead.score}</span></td>
                            <td className="max-w-md p-3 text-slate-400">{lead.reason_match}</td>
                            <td className="space-y-2 p-3">
                              <Button variant="secondary" disabled={!!busy} onClick={() => run('Researching', '/api/leads/research', { lead_id: lead.id })}>Research</Button>
                              {contact && <Button variant="secondary" disabled={!!busy} onClick={() => run('Writing outreach', '/api/outreach/generate', { contact_id: contact.id })}>Generate Email</Button>}
                            </td>
                          </tr>
                        );
                      })}
                      {!data.leads.length && <tr><td className="p-6 text-slate-500" colSpan={4}>No leads yet. Click Find Leads to start discovery.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card>
                <CardTitle>Pipeline chart</CardTitle>
                <div className="mt-6"><PipelineChart stats={data.stats} /></div>
              </Card>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <Card>
                <CardTitle>Outreach drafts</CardTitle>
                <div className="mt-4 space-y-4">
                  {data.outreach.map((item) => (
                    <div key={item.id} className="rounded-xl bg-black/30 p-4">
                      <p className="font-medium">{item.email_subject}</p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-400">{item.email_body}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{item.status}</p>
                    </div>
                  ))}
                  {!data.outreach.length && <p className="text-sm text-slate-500">Generate outreach from a researched lead.</p>}
                </div>
              </Card>

              <Card>
                <CardTitle>Reply analyzer</CardTitle>
                <Textarea className="mt-4" placeholder="Paste buyer reply..." value={replyText} onChange={(event) => setReplyText(event.target.value)} />
                <Button className="mt-3" disabled={!firstOutreach || !replyText || !!busy} onClick={() => run('Analyzing reply', '/api/replies/analyze', { outreach_id: firstOutreach?.id, content: replyText })}>Analyze Reply</Button>
                <div className="mt-4 space-y-3">{data.replies.map((reply) => <div className="rounded-xl bg-black/30 p-3 text-sm" key={reply.id}><b>{reply.sentiment}</b><p className="mt-2 whitespace-pre-wrap text-slate-400">{reply.next_action}</p></div>)}</div>
              </Card>

              <Card>
                <CardTitle>Meeting prep</CardTitle>
                <Input className="mt-4" type="datetime-local" value={meetingDate} onChange={(event) => setMeetingDate(event.target.value)} />
                <Button className="mt-3" disabled={!firstLead || !meetingDate || !!busy} onClick={() => run('Creating prep', '/api/meetings/prep', { lead_id: firstLead?.id, meeting_date: meetingDate })}>Create Prep Doc</Button>
                <div className="mt-4 max-h-96 space-y-3 overflow-auto">{data.meetings.map((meeting) => <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-3 text-xs text-slate-300" key={meeting.id}>{meeting.prep_doc}</pre>)}</div>
              </Card>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
