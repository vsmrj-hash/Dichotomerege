'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { ScoreCard } from '@/components/ScoreCard';
import { ScoreBreakdown } from '@/lib/types';

type ResultPayload = {
  originalText: string;
  improvedResume: string;
  score: ScoreBreakdown;
};

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<ResultPayload | null>(null);
  const [jdText, setJdText] = useState('');
  const [loadingAction, setLoadingAction] = useState<'fix-bullets' | 'rewrite-jd' | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('analysis_result');
    const rawJd = sessionStorage.getItem('jd_text');

    if (!raw) {
      router.push('/');
      return;
    }

    setResult(JSON.parse(raw));
    setJdText(rawJd || '');
  }, [router]);

  const runAction = async (action: 'fix-bullets' | 'rewrite-jd') => {
    if (!result) return;

    setLoadingAction(action);
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, resumeText: result.originalText, jdText })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Action failed');

      const next = { ...result, improvedResume: data.output as string };
      setResult(next);
      sessionStorage.setItem('analysis_result', JSON.stringify(next));
    } catch (error) {
      // Light-touch fallback for MVP
      alert(error instanceof Error ? error.message : 'Unable to complete action');
    } finally {
      setLoadingAction(null);
    }
  };

  const exportPdf = async () => {
    if (!result) return;

    const response = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ improvedResume: result.improvedResume })
    });

    if (!response.ok) {
      alert('Failed to export PDF');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'optimized-resume.pdf';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!result) {
    return <main className="p-6 text-sm text-slate-500">Loading results...</main>;
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Results</h1>
        <div className="flex gap-2">
          <button
            onClick={() => runAction('fix-bullets')}
            disabled={loadingAction !== null}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
          >
            {loadingAction === 'fix-bullets' ? 'Fixing...' : 'Fix bullets'}
          </button>
          <button
            onClick={() => runAction('rewrite-jd')}
            disabled={loadingAction !== null}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
          >
            {loadingAction === 'rewrite-jd' ? 'Rewriting...' : 'Rewrite for JD'}
          </button>
          <button
            onClick={exportPdf}
            className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
          >
            Export PDF
          </button>
        </div>
      </div>

      <ScoreCard score={result.score} />
      <ComparisonPanel originalText={result.originalText} improvedText={result.improvedResume} />
    </main>
  );
}
