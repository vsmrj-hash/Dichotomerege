'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input, Label, Textarea } from '@/components/ui/input';
import { useLocalUser } from '@/hooks/useLocalUser';

export default function NewProjectPage() {
  const router = useRouter();
  const { email, setEmail } = useLocalUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({
    product_name: '',
    description: '',
    pricing: '',
    icp: '',
    website: ''
  });

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, email })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Unable to save project');
      return;
    }
    router.push('/dashboard');
  }

  async function sendMagicLink() {
    setError('');
    setNotice('');
    const res = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Unable to send magic link');
    else setNotice(data.message);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-slate-500">New Project</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Tell the operator what you sell.</h1>
        <Card className="mt-8">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <Label>Founder email</Label>
              <div className="flex gap-2">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button type="button" variant="secondary" onClick={sendMagicLink}>Send magic link</Button>
              </div>
            </div>
            <div><Label>Product Name</Label><Input value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} required /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
            <div><Label>Pricing</Label><Input value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} required /></div>
            <div><Label>Ideal Customer Profile</Label><Textarea value={form.icp} onChange={(e) => setForm({ ...form, icp: e.target.value })} required /></div>
            <div><Label>Website</Label><Input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} required /></div>
            {notice && <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">{notice}</p>}
            {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
            <Button disabled={loading}>{loading ? 'Saving...' : 'Save project'}</Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
