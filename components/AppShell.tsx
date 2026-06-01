import Link from 'next/link';
import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.12),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl">
        <aside className="hidden w-64 border-r border-white/10 p-6 lg:block">
          <Link href="/dashboard" className="text-lg font-semibold tracking-tight">Revenue Operator</Link>
          <p className="mt-2 text-xs text-slate-500">Replace the first sales hire.</p>
          <nav className="mt-10 space-y-2 text-sm text-slate-400">
            <Link className="block rounded-xl px-3 py-2 hover:bg-white/5 hover:text-white" href="/dashboard">Dashboard</Link>
            <Link className="block rounded-xl px-3 py-2 hover:bg-white/5 hover:text-white" href="/projects/new">New Project</Link>
          </nav>
        </aside>
        <section className="flex-1 p-4 sm:p-8">{children}</section>
      </div>
    </main>
  );
}
