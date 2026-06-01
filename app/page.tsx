import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <AppShell>
      <section className="flex min-h-[80vh] items-center">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200">AI pipeline for solo founders</div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl">Replace your first sales hire with an AI revenue operator.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">Upload your product, ICP, pricing, and website. The system finds leads, researches companies, writes concise personalized outreach, analyzes replies, and creates meeting prep docs.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/projects/new"><Button>Launch project</Button></Link>
            <Link href="/dashboard"><Button variant="secondary">View dashboard</Button></Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {['Lead discovery with Tavily', 'Claude-powered research', 'Reply and meeting workflows'].map((item) => (
              <Card key={item}><p className="text-sm text-slate-300">{item}</p></Card>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
