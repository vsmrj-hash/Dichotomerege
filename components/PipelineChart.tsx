import { DashboardStats } from '@/lib/revenue/types';

export function PipelineChart({ stats }: { stats: DashboardStats }) {
  const rows = [
    ['Leads', stats.leadsFound],
    ['Emails', stats.emailsSent],
    ['Replies', stats.positiveReplies],
    ['Meetings', stats.meetingsBooked]
  ] as const;
  const max = Math.max(1, ...rows.map(([, value]) => value));

  return (
    <div className="space-y-4">
      {rows.map(([label, value]) => (
        <div key={label}>
          <div className="mb-2 flex justify-between text-sm text-slate-400"><span>{label}</span><span>{value}</span></div>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" style={{ width: `${Math.max(6, (value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
