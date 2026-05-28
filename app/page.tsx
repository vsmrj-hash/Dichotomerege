"use client";

import { useMemo, useState } from "react";

type CareerPath = {
  name: string;
  baselineGrowth: number;
  automationRisk: number;
  demandHotspots: string[];
  salaryBand: [number, number];
};

const careerPaths: CareerPath[] = [
  { name: "Software Engineer", baselineGrowth: 0.82, automationRisk: 0.35, demandHotspots: ["United States", "Germany", "India", "Singapore"], salaryBand: [70000, 180000] },
  { name: "Data Analyst", baselineGrowth: 0.76, automationRisk: 0.45, demandHotspots: ["United Kingdom", "Canada", "India", "Australia"], salaryBand: [50000, 120000] },
  { name: "Nurse", baselineGrowth: 0.9, automationRisk: 0.1, demandHotspots: ["United States", "Japan", "United Arab Emirates", "Canada"], salaryBand: [45000, 110000] },
  { name: "Electrician", baselineGrowth: 0.85, automationRisk: 0.15, demandHotspots: ["United States", "Australia", "New Zealand", "Netherlands"], salaryBand: [50000, 100000] },
  { name: "Teacher", baselineGrowth: 0.72, automationRisk: 0.2, demandHotspots: ["Finland", "Singapore", "United States", "Ireland"], salaryBand: [40000, 95000] },
  { name: "UX Designer", baselineGrowth: 0.73, automationRisk: 0.4, demandHotspots: ["United States", "Sweden", "Germany", "South Korea"], salaryBand: [60000, 140000] },
  { name: "Supply Chain Manager", baselineGrowth: 0.8, automationRisk: 0.3, demandHotspots: ["China", "United States", "Vietnam", "Mexico"], salaryBand: [70000, 150000] },
  { name: "Cybersecurity Specialist", baselineGrowth: 0.92, automationRisk: 0.2, demandHotspots: ["United States", "Israel", "India", "United Kingdom"], salaryBand: [80000, 190000] }
];

const skills = [
  "Communication", "Problem Solving", "Leadership", "Public Speaking", "Python", "JavaScript", "Project Management", "Data Visualization", "Cloud Computing", "AI Prompting", "Critical Thinking", "Negotiation", "Sales", "Product Strategy", "Financial Modeling", "Technical Writing", "Language Fluency", "Research", "Operations", "Customer Success"
];

const futurePlans = ["Move abroad", "Switch careers", "Upskill in AI", "Start a business", "Take management track", "Freelance/Consulting", "Remote-first lifestyle"];

export default function Page() {
  const [role, setRole] = useState(careerPaths[0].name);
  const [location, setLocation] = useState("United States");
  const [age, setAge] = useState(28);
  const [experience, setExperience] = useState(5);
  const [timeFrame, setTimeFrame] = useState(10);
  const [ownedSkills, setOwnedSkills] = useState<string[]>(["Problem Solving", "Communication"]);
  const [learningSkills, setLearningSkills] = useState<string[]>(["Cloud Computing", "AI Prompting"]);
  const [plans, setPlans] = useState<string[]>(["Upskill in AI"]);
  const [resultVisible, setResultVisible] = useState(false);

  const selectedCareer = useMemo(() => careerPaths.find((p) => p.name === role) ?? careerPaths[0], [role]);

  const scores = useMemo(() => {
    const skillCoverage = Math.min(ownedSkills.length / 12, 1);
    const learningBias = Math.min(learningSkills.length / 8, 1);
    const expFactor = Math.min(experience / 15, 1);
    const ageFactor = age < 30 ? 0.8 : age < 45 ? 1 : 0.88;
    const locationBoost = selectedCareer.demandHotspots.includes(location) ? 1.08 : 0.95;
    const ambitionFactor = plans.length > 0 ? 1.04 : 0.97;
    const timeRisk = Math.max(0.78, 1 - timeFrame * 0.015);

    const rawSecurity = selectedCareer.baselineGrowth * (1 - selectedCareer.automationRisk * 0.45) * (0.45 + skillCoverage * 0.35 + learningBias * 0.2) * expFactor * ageFactor * locationBoost * ambitionFactor * timeRisk;
    const jobSecurity = Math.max(6, Math.min(99, Math.round(rawSecurity * 140)));

    const avgSalary = (selectedCareer.salaryBand[0] + selectedCareer.salaryBand[1]) / 2;
    const annualSavings = avgSalary * 0.22;
    const retirementGoal = 1200000;
    const yearsToRetire = Math.max(3, Math.round(retirementGoal / Math.max(annualSavings, 1) - experience * 0.35));

    return { jobSecurity, yearsToRetire, avgSalary };
  }, [age, experience, learningSkills.length, location, ownedSkills.length, plans.length, selectedCareer, timeFrame]);

  const toggle = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6 md:p-10">
      <h1 className="text-3xl font-bold md:text-4xl">Career Security Forecast</h1>
      <p className="mt-2 text-slate-600">Estimate your job security and retirement timeline across global career paths and future plans.</p>

      <section className="mt-8 grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-medium">Current Job Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-slate-300 p-2">
            {careerPaths.map((path) => <option key={path.name}>{path.name}</option>)}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="font-medium">Location (Country)</span>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-lg border border-slate-300 p-2" />
        </label>

        <label className="grid gap-2">
          <span className="font-medium">Age</span>
          <input type="number" min={16} max={80} value={age} onChange={(e) => setAge(Number(e.target.value) || 16)} className="rounded-lg border border-slate-300 p-2" />
        </label>

        <label className="grid gap-2">
          <span className="font-medium">Experience (Years)</span>
          <input type="number" min={0} max={50} value={experience} onChange={(e) => setExperience(Number(e.target.value) || 0)} className="rounded-lg border border-slate-300 p-2" />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="font-medium">Forecast Time Frame: {timeFrame} years</span>
          <input type="range" min={1} max={30} value={timeFrame} onChange={(e) => setTimeFrame(Number(e.target.value))} />
        </label>
      </section>

      <section className="mt-6 grid gap-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Skills & Future Endeavors</h2>

        <div>
          <p className="mb-2 font-medium">Skills you already have (unlimited selection)</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button key={skill} onClick={() => toggle(skill, ownedSkills, setOwnedSkills)} className={`rounded-full border px-3 py-1 text-sm ${ownedSkills.includes(skill) ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300"}`}>
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Skills you are ready to learn</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button key={`learn-${skill}`} onClick={() => toggle(skill, learningSkills, setLearningSkills)} className={`rounded-full border px-3 py-1 text-sm ${learningSkills.includes(skill) ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300"}`}>
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Future endeavors</p>
          <div className="flex flex-wrap gap-2">
            {futurePlans.map((plan) => (
              <button key={plan} onClick={() => toggle(plan, plans, setPlans)} className={`rounded-full border px-3 py-1 text-sm ${plans.includes(plan) ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-300"}`}>
                {plan}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setResultVisible(true)} className="mt-2 w-fit rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700">Calculate</button>
      </section>

      {resultVisible && (
        <section className="mt-6 grid gap-4 rounded-2xl bg-slate-900 p-6 text-white shadow-sm md:grid-cols-3">
          <article className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Career Security Probability</p>
            <p className="mt-2 text-4xl font-bold">{scores.jobSecurity}%</p>
            <p className="mt-2 text-sm text-slate-200">Target confidence line: 99% benchmark</p>
          </article>
          <article className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Estimated Retirement Horizon</p>
            <p className="mt-2 text-4xl font-bold">{scores.yearsToRetire} yrs</p>
            <p className="mt-2 text-sm text-slate-200">Based on role median income and savings assumptions</p>
          </article>
          <article className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">Estimated Median Income</p>
            <p className="mt-2 text-4xl font-bold">${scores.avgSalary.toLocaleString()}</p>
            <p className="mt-2 text-sm text-slate-200">Global blended estimate for selected role</p>
          </article>

          <p className="md:col-span-3 text-xs text-slate-300">Demo estimator only. Not financial, immigration, legal, or employment advice.</p>
        </section>
      )}
    </main>
  );
}
