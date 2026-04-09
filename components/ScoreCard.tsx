import { ScoreBreakdown } from '@/lib/types';

export function ScoreCard({ score }: { score: ScoreBreakdown }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">Resume Score</p>
      <p className="mt-1 text-3xl font-bold text-brand-700">{score.score}/100</p>
      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 md:grid-cols-2">
        <p>Keyword match: {score.keywordMatchPercent}%</p>
        <p>Weak bullets: {score.weakBullets.length}</p>
      </div>
      <ul className="mt-3 list-disc pl-5 text-sm text-amber-700">
        {score.gaps.map((gap) => (
          <li key={gap}>{gap}</li>
        ))}
      </ul>
    </div>
  );
}
