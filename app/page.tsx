'use client';

import { ReactNode, useMemo, useState } from 'react';

type Duration = 'lt20' | '20to60' | 'gt60';
type Symptom =
  | 'loud-thoughts'
  | 'racing-heart'
  | 'acidity-heartburn'
  | 'physical-restlessness';

const durationOptions: Array<{ id: Duration; label: string; helper: string }> = [
  { id: 'lt20', label: '< 20 minutes', helper: 'Early intervention window.' },
  { id: '20to60', label: '20–60 minutes', helper: 'Escalate structured calming.' },
  { id: 'gt60', label: '1 hour+', helper: 'Use reset + targeted protocol.' }
];

const symptomOptions: Array<{ id: Symptom; label: string; helper: string }> = [
  {
    id: 'loud-thoughts',
    label: 'Loud Thoughts',
    helper: 'Mind chatter, looping plans, rumination.'
  },
  {
    id: 'racing-heart',
    label: 'Racing Heart',
    helper: 'Elevated pulse, tension, anxious chest sensation.'
  },
  {
    id: 'acidity-heartburn',
    label: 'Acidity / Heartburn',
    helper: 'Upper-abdomen discomfort, reflux sensations.'
  },
  {
    id: 'physical-restlessness',
    label: 'Physical Restlessness',
    helper: 'Can’t settle body, frequent repositioning.'
  }
];

const shuffleWords = [
  'lantern',
  'cactus',
  'river',
  'cabin',
  'anchor',
  'velvet',
  'canyon',
  'maple',
  'pencil',
  'harbor'
];

export default function Page() {
  const [tab, setTab] = useState<'rescue' | 'pro-tips'>('rescue');
  const [duration, setDuration] = useState<Duration | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);

  const showSosReset = duration === '20to60' || duration === 'gt60';

  const interventions = useMemo(() => {
    return {
      loudThoughts: selectedSymptoms.includes('loud-thoughts'),
      racingHeart: selectedSymptoms.includes('racing-heart'),
      acidity: selectedSymptoms.includes('acidity-heartburn'),
      restlessness: selectedSymptoms.includes('physical-restlessness')
    };
  }, [selectedSymptoms]);

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((value) => value !== symptom)
        : [...current, symptom]
    );
  };

  const canRenderInterventions = duration !== null && selectedSymptoms.length > 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-4 py-6 sm:px-6">
      <header className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-5 shadow-lg shadow-teal-950/30">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-300">Night Shift</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">I can&apos;t sleep.</h1>
        <p className="mt-2 text-sm text-slate-300">
          Calm protocol. One decision at a time. No extra noise.
        </p>

        <div className="mt-4 inline-flex rounded-xl border border-slate-700 p-1">
          {(['rescue', 'pro-tips'] as const).map((item) => {
            const active = tab === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-teal-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item === 'rescue' ? 'Sleep Rescue' : 'Pro-Tips'}
              </button>
            );
          })}
        </div>
      </header>

      {tab === 'rescue' ? (
        <section className="space-y-4">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-white">1) How long have you been trying?</h2>
            <div className="mt-3 grid gap-2">
              {durationOptions.map((option) => {
                const active = duration === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDuration(option.id)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? 'border-orange-400 bg-orange-400/10'
                        : 'border-slate-700 hover:border-teal-400/60 hover:bg-slate-800'
                    }`}
                  >
                    <p className="font-medium text-white">{option.label}</p>
                    <p className="text-xs text-slate-400">{option.helper}</p>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-white">2) What is the friction?</h2>
            <p className="mt-1 text-xs text-slate-400">Multi-select all that apply.</p>
            <div className="mt-3 grid gap-2">
              {symptomOptions.map((option) => {
                const active = selectedSymptoms.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleSymptom(option.id)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? 'border-teal-400 bg-teal-400/10'
                        : 'border-slate-700 hover:border-orange-300/60 hover:bg-slate-800'
                    }`}
                  >
                    <p className="font-medium text-white">{option.label}</p>
                    <p className="text-xs text-slate-400">{option.helper}</p>
                  </button>
                );
              })}
            </div>
          </article>

          {canRenderInterventions && (
            <article className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold text-white">3) Night Shift response</h2>

              {interventions.loudThoughts && (
                <Card title="A) Cognitive Shuffler" accent="teal">
                  <p className="text-sm text-slate-300">
                    Read each noun slowly in your mind, 1 word per breath. No storyline.
                  </p>
                  <p className="mt-3 rounded-lg bg-slate-950 p-3 text-sm text-slate-200">
                    {shuffleWords.join(' • ')}
                  </p>
                </Card>
              )}

              {interventions.racingHeart && (
                <Card title="B) 4-7-8 Breathing" accent="orange">
                  <p className="text-sm text-slate-300">
                    Inhale 4s • Hold 7s • Exhale 8s. Follow the circle for rhythm.
                  </p>
                  <div className="mt-4 flex items-center justify-center py-4">
                    <div className="breathe-circle flex h-28 w-28 items-center justify-center rounded-full bg-orange-400/25 ring-2 ring-orange-300/70">
                      <span className="text-xs font-semibold uppercase tracking-widest text-orange-200">
                        4-7-8
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {interventions.acidity && (
                <Card title="C) Left-Side Protocol" accent="teal">
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                    <li>Move to left-side sleeping position now.</li>
                    <li>Raise head-of-bed by ~6 inches if available.</li>
                    <li>Keep neck neutral; avoid flat-back posture.</li>
                  </ul>
                </Card>
              )}

              {interventions.restlessness && (
                <Card title="D) Body Downshift" accent="orange">
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                    <li>Tense toes-to-calves for 5s, release 10s.</li>
                    <li>Repeat up body segments for 2 full rounds.</li>
                    <li>End with jaw unclench + shoulder drop.</li>
                  </ul>
                </Card>
              )}

              {showSosReset && (
                <Card title="E) SOS Reset" accent="teal">
                  <p className="text-sm text-slate-300">
                    If awake beyond 20 minutes, leave bed calmly. Sit in a dim room,
                    no bright screens, and return only when drowsy.
                  </p>
                </Card>
              )}
            </article>
          )}
        </section>
      ) : (
        <section className="space-y-4">
          <InfoCard title="A) Caffeine Curfew" accent="teal">
            <p>Stop caffeine by <strong>2:00 PM</strong> daily.</p>
          </InfoCard>

          <InfoCard title="B) Exercise Daily" accent="orange">
            <p>Target 30 minutes/day. Stop vigorous sessions 3 hours before bed.</p>
          </InfoCard>

          <InfoCard title="C) 3-2-1 Rule" accent="teal">
            <ul className="space-y-1">
              <li>3h: No food.</li>
              <li>2h: No work/problem solving.</li>
              <li>1h: No blue light.</li>
            </ul>
          </InfoCard>

          <InfoCard title="D) Environment" accent="orange">
            <ul className="space-y-1">
              <li>☑ Room target: <strong>18°C</strong>.</li>
              <li>☑ Phone mode: <strong>Grayscale</strong> at night.</li>
            </ul>
          </InfoCard>
        </section>
      )}
    </main>
  );
}

function Card({
  title,
  accent,
  children
}: {
  title: string;
  accent: 'teal' | 'orange';
  children: ReactNode;
}) {
  const border = accent === 'teal' ? 'border-teal-500/40' : 'border-orange-400/40';

  return (
    <div className={`rounded-xl border ${border} bg-slate-950/70 p-4`}>
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}

function InfoCard({
  title,
  accent,
  children
}: {
  title: string;
  accent: 'teal' | 'orange';
  children: ReactNode;
}) {
  const titleColor = accent === 'teal' ? 'text-teal-300' : 'text-orange-300';

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-300">
      <h2 className={`text-base font-semibold ${titleColor}`}>{title}</h2>
      <div className="mt-2">{children}</div>
    </article>
  );
}
