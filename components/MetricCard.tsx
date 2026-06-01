import { Card, CardTitle } from './ui/card';

export function MetricCard({ title, value, helper }: { title: string; value: number | string; helper: string }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <div className="mt-4 text-4xl font-semibold tracking-tight">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </Card>
  );
}
