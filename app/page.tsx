const metrics = [
  { value: "20+", label: "hours saved weekly", detail: "Admin, reporting, and follow-up removed from the team calendar." },
  { value: "43%", label: "faster response time", detail: "Leads and support requests answered before competitors react." },
  { value: "3x", label: "lead follow-up speed", detail: "Every inquiry gets routed, tagged, and chased automatically." },
  { value: "14 days", label: "typical first launch", detail: "Start with one workflow that pays back quickly." }
];

const pains = [
  "Leads sit in inboxes until they go cold.",
  "Your best people waste hours copying data between tools.",
  "Customers wait because support is buried in repetitive questions.",
  "Reports are built manually after decisions should already be made.",
  "Growth creates more admin instead of more profit."
];

const automations = [
  { title: "Lead follow-up", copy: "Instant replies, qualification questions, reminders, and handoff to sales before the buyer loses interest." },
  { title: "CRM updates", copy: "Contacts, notes, deal stages, tags, and next steps updated without manual data entry." },
  { title: "Appointment booking", copy: "Scheduling, confirmations, reminders, reschedules, and no-show recovery handled automatically." },
  { title: "Customer support", copy: "Answer common questions, escalate urgent issues, and keep customers informed without drowning your team." },
  { title: "Invoicing", copy: "Create invoices, send payment reminders, flag overdue accounts, and sync records across your stack." },
  { title: "Reporting", copy: "Daily or weekly KPI summaries delivered to your inbox so you see bottlenecks before they cost you." },
  { title: "Social media workflows", copy: "Turn raw ideas into briefs, calendars, approvals, repurposed posts, and publishing checklists." }
];

const process = [
  { step: "01", title: "Audit", copy: "We map the repetitive work, missed revenue points, and tools already inside your business." },
  { step: "02", title: "Build", copy: "We create the highest-ROI automation first, then test it against real scenarios before launch." },
  { step: "03", title: "Deploy", copy: "Your team gets a clean handoff, simple documentation, and support while the system goes live." }
];

const caseStudies = [
  { company: "Local service company", result: "31% more booked calls", copy: "Automated quote follow-up, reminders, and CRM updates so every new inquiry received a response in under two minutes." },
  { company: "B2B consulting firm", result: "18 hours saved weekly", copy: "Removed manual reporting and client status updates from the founder's week with a dashboard and email summary workflow." },
  { company: "Ecommerce support team", result: "47% fewer repetitive tickets", copy: "Built a support triage system that answered common order questions and escalated urgent cases with context." }
];

const logos = ["Northstar Dental", "Brightline HVAC", "Urban Eats", "Peak Legal", "Atlas Fitness"];

export const metadata = {
  title: "AI Automation Systems for SMBs",
  description: "AI automation systems that save time, reduce costs, and help small businesses scale faster."
};

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05060a] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Automation agency home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20">AI</span>
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">Ops Automations</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Primary navigation">
          <a className="transition hover:text-white" href="#automate">What we automate</a>
          <a className="transition hover:text-white" href="#process">Process</a>
          <a className="transition hover:text-white" href="#proof">Proof</a>
        </nav>
        <a href="#audit" className="hidden rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-cyan-100 md:inline-flex">Book Free Audit</a>
      </header>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            AI automation systems for businesses that want to save time, reduce costs, and scale faster.
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Replace Hours of Manual Work With Automations That Protect Your Profit.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            We build practical automation systems for small and medium businesses drowning in admin, slow follow-up, support overload, and messy workflows—so your team can move faster without hiring more people.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#audit" className="rounded-full bg-cyan-300 px-7 py-4 text-center text-base font-black text-slate-950 shadow-2xl shadow-cyan-400/25 transition hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300/40">Book Free Automation Audit</a>
            <a href="#automate" className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center text-base font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20">See What Can Be Automated</a>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><strong className="block text-lg text-white">No bloated project</strong>Launch one ROI workflow first.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><strong className="block text-lg text-white">No tool chaos</strong>Works with your current stack.</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><strong className="block text-lg text-white">No mystery</strong>Clear scope, timeline, and handoff.</div>
          </div>
        </div>

        <div className="relative min-h-[620px] lg:min-h-[680px]">
          <div className="absolute left-0 top-0 z-20 w-48 rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:w-56">
            <div className="aspect-[4/5] rounded-[1.45rem] border border-white/10 bg-gradient-to-br from-slate-700 to-slate-950 p-4">
              <div className="h-full rounded-[1.1rem] border border-dashed border-white/20 bg-black/20 p-4 text-center">
                <div className="mx-auto mt-8 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-200 to-violet-300" />
                <p className="mt-5 text-sm font-bold">Founder video</p>
                <p className="mt-2 text-xs leading-5 text-slate-300">60 seconds: where your time is leaking and what to automate first.</p>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-16 w-[88%] rounded-[2.25rem] border border-white/15 bg-slate-950/80 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl sm:p-5">
            <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-bold text-white">Workflow Command Center</p>
                  <p className="text-xs text-slate-400">Lead response automation</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Live</span>
              </div>

              <div className="mt-5 grid gap-3">
                {["New website lead captured", "Qualification message sent", "CRM updated + deal created", "Calendar link delivered", "Sales owner notified"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-cyan-300 p-4 text-slate-950">
                  <p className="text-3xl font-black">1.7m</p>
                  <p className="text-xs font-bold uppercase tracking-wider">Avg response</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-black">$8.4k</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pipeline recovered</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-8 right-6 z-30 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <p className="text-sm font-bold text-cyan-100">Manual work replaced this week</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-4xl font-black">22.5 hrs</p>
              <p className="text-right text-sm text-slate-300">Admin, follow-up,<br />reporting, support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.03] py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="text-center text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Built for operators tired of duct-taped workflows</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {logos.map((logo) => (
              <div key={logo} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center text-sm font-bold text-slate-300">{logo}</div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <p className="text-4xl font-black text-white">{metric.value}</p>
                <p className="mt-1 font-bold text-cyan-100">{metric.label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-28">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">The real problem</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Your team is not slow. Your systems are making them slow.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Every manual handoff creates delay, mistakes, and lost money. The cost is not just time—it is leads that never book, customers who churn, and staff who burn out doing work software should handle.</p>
        </div>
        <div className="grid gap-3">
          {pains.map((pain) => (
            <div key={pain} className="rounded-3xl border border-red-300/10 bg-red-500/[0.06] p-5 text-lg font-semibold text-red-50 shadow-lg shadow-red-950/10">
              {pain}
            </div>
          ))}
        </div>
      </section>

      <section id="automate" className="relative z-10 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">What we automate</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Start with the workflows closest to revenue and wasted payroll.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {automations.map((automation) => (
              <article key={automation.title} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-cyan-300/50 hover:bg-white/[0.07]">
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-xl font-black text-slate-950 transition group-hover:rotate-3 group-hover:scale-110">→</div>
                <h3 className="text-2xl font-black">{automation.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{automation.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Simple process</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Automate one painful workflow first. Then scale what works.</h2>
            </div>
            <a href="#audit" className="rounded-full bg-white px-6 py-4 text-center font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100">Start with an audit</a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {process.map((item) => (
              <article key={item.step} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
                <p className="text-sm font-black text-cyan-300">{item.step}</p>
                <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Proof examples</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Realistic systems. Measurable business impact.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">The goal is not to look innovative. The goal is to remove bottlenecks that cost money every week.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.company} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-2 hover:border-emerald-300/50">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{study.company}</p>
              <h3 className="mt-4 text-3xl font-black text-emerald-300">{study.result}</h3>
              <p className="mt-4 leading-7 text-slate-300">{study.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
          <div className="aspect-[4/5] rounded-[1.5rem] border border-dashed border-white/20 bg-gradient-to-br from-cyan-300/30 via-violet-400/20 to-slate-950 p-6">
            <div className="flex h-full flex-col justify-end rounded-[1.1rem] bg-black/20 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-100">Founder image</p>
              <p className="mt-2 text-2xl font-black">Replace the placeholder with a sharp founder portrait or short Loom video.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Founder-led build partner</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">I build automation for owners who need fewer moving parts, not more dashboards.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Most SMBs do not need another complicated platform. They need someone to find the repetitive work stealing margin, build a clean system around it, and make sure the team can actually use it.</p>
          <p className="mt-5 text-lg leading-8 text-slate-300">My mission is simple: help good businesses stop losing money to slow follow-up, manual admin, and disconnected tools—then turn those saved hours into capacity for growth.</p>
        </div>
      </section>

      <section id="audit" className="relative z-10 px-5 pb-28 pt-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-cyan-300/30 bg-cyan-300 p-8 text-slate-950 shadow-2xl shadow-cyan-500/25 sm:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-700">Free automation audit</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Find the workflow costing you the most money this month.</h2>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-800">In one call, we identify what should be automated first, estimate the time and cost savings, and outline the fastest path to launch. No vague strategy deck. Just a practical plan.</p>
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl">
              <p className="text-2xl font-black">What you get:</p>
              <ul className="mt-5 space-y-4 text-slate-300">
                <li className="flex gap-3"><span className="text-cyan-300">✓</span>Top 3 automation opportunities</li>
                <li className="flex gap-3"><span className="text-cyan-300">✓</span>Estimated hours and cost savings</li>
                <li className="flex gap-3"><span className="text-cyan-300">✓</span>Recommended first workflow to build</li>
              </ul>
              <a href="mailto:hello@example.com?subject=Free%20Automation%20Audit" className="mt-7 block rounded-full bg-cyan-300 px-6 py-4 text-center font-black text-slate-950 transition hover:-translate-y-1 hover:bg-white">Book Free Automation Audit</a>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 p-3 backdrop-blur md:hidden">
        <a href="#audit" className="block rounded-full bg-cyan-300 px-5 py-4 text-center font-black text-slate-950 shadow-lg shadow-cyan-400/20">Book Free Automation Audit</a>
      </div>
    </main>
  );
}
