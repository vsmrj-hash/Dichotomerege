'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_JD, SAMPLE_RESUME } from '@/lib/sample-data';

type AnalyzePayload = {
  originalText: string;
  improvedResume: string;
  score: {
    score: number;
    keywordMatchPercent: number;
    missingSkills: string[];
    weakBullets: string[];
    gaps: string[];
  };
};

export default function HomePage() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jdText, setJdText] = useState(SAMPLE_JD);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImageBase64(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jdText, imageBase64 })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      sessionStorage.setItem('analysis_result', JSON.stringify(data as AnalyzePayload));
      sessionStorage.setItem('jd_text', jdText);
      router.push('/results');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">AI Resume Optimizer</h1>
        <p className="mt-2 text-slate-600">Paste a resume or upload a screenshot, then match it against a job description.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Resume Input</h2>
          <p className="mt-1 text-sm text-slate-500">Paste text directly or upload an image for OCR.</p>
          <textarea value={resumeText} onChange={(event) => setResumeText(event.target.value)} placeholder="Paste resume text" />
          <div className="mt-3">
            <label className="block text-sm font-medium text-slate-600">Upload screenshot (PNG/JPG)</label>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onFileUpload(file);
              }}
            />
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Job Description</h2>
          <p className="mt-1 text-sm text-slate-500">Paste the target JD to compute keyword and gap score.</p>
          <textarea value={jdText} onChange={(event) => setJdText(event.target.value)} placeholder="Paste job description" />
          <button
            onClick={onAnalyze}
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
          {error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
        </article>
      </section>
    </main>
  );
}
