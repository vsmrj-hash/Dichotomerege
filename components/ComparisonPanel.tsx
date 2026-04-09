export function ComparisonPanel({
  originalText,
  improvedText
}: {
  originalText: string;
  improvedText: string;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Original Resume</h3>
        <pre className="max-h-[640px] overflow-auto whitespace-pre-wrap text-sm text-slate-800">{originalText}</pre>
      </article>
      <article className="rounded-2xl border border-brand-200 bg-brand-50 p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">Improved Resume</h3>
        <pre className="max-h-[640px] overflow-auto whitespace-pre-wrap text-sm text-brand-900">{improvedText}</pre>
      </article>
    </section>
  );
}
