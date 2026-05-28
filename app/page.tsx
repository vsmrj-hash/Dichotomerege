"use client";

import { useCallback, useMemo, useState } from "react";

type CareerPath = {
  name: string;
  baselineGrowth: number;
  automationRisk: number;
  demandHotspots: string[];
  salaryBand: [number, number];
  coreSkills: string[];
};

type SkillCategory = {
  name: string;
  items: string[];
};

const careerPaths: CareerPath[] = [
  { name: "AI Automation Specialist", baselineGrowth: 0.94, automationRisk: 0.18, demandHotspots: ["United States", "India", "Singapore", "United Arab Emirates"], salaryBand: [85000, 210000], coreSkills: ["AI Automation", "Workflow Automation", "No-Code Automation", "API Integration", "Prompt Engineering"] },
  { name: "AI Generalist", baselineGrowth: 0.9, automationRisk: 0.22, demandHotspots: ["United States", "United Kingdom", "Canada", "Germany"], salaryBand: [75000, 190000], coreSkills: ["AI Tooling", "Prompt Engineering", "Data Literacy", "Product Strategy", "Technical Writing"] },
  { name: "Software Engineer", baselineGrowth: 0.82, automationRisk: 0.35, demandHotspots: ["United States", "Germany", "India", "Singapore"], salaryBand: [70000, 180000], coreSkills: ["JavaScript", "Python", "System Design", "Cloud Computing", "Testing"] },
  { name: "Data Analyst", baselineGrowth: 0.76, automationRisk: 0.45, demandHotspots: ["United Kingdom", "Canada", "India", "Australia"], salaryBand: [50000, 120000], coreSkills: ["SQL", "Data Visualization", "Excel", "Statistics", "Business Intelligence"] },
  { name: "Nurse", baselineGrowth: 0.9, automationRisk: 0.1, demandHotspots: ["United States", "Japan", "United Arab Emirates", "Canada"], salaryBand: [45000, 110000], coreSkills: ["Patient Care", "Clinical Judgment", "Empathy", "Emergency Response", "Medication Administration"] },
  { name: "Gym Trainer", baselineGrowth: 0.78, automationRisk: 0.16, demandHotspots: ["United States", "Australia", "United Arab Emirates", "United Kingdom"], salaryBand: [35000, 95000], coreSkills: ["Strength Training", "Nutrition Coaching", "Client Motivation", "Injury Prevention", "Sales"] },
  { name: "Restaurant Manager", baselineGrowth: 0.74, automationRisk: 0.2, demandHotspots: ["United States", "France", "United Arab Emirates", "Singapore"], salaryBand: [42000, 95000], coreSkills: ["Hospitality Operations", "Inventory Management", "Team Scheduling", "Customer Service", "Food Safety"] },
  { name: "SMMA CEO", baselineGrowth: 0.8, automationRisk: 0.38, demandHotspots: ["United States", "United Kingdom", "India", "United Arab Emirates"], salaryBand: [50000, 220000], coreSkills: ["Agency Operations", "Client Acquisition", "Paid Ads", "Content Strategy", "Sales"] },
  { name: "Social Media Manager", baselineGrowth: 0.77, automationRisk: 0.42, demandHotspots: ["United States", "India", "Brazil", "United Kingdom"], salaryBand: [42000, 120000], coreSkills: ["Content Strategy", "Community Management", "Short-Form Video", "Analytics", "Copywriting"] },
  { name: "Electrician", baselineGrowth: 0.85, automationRisk: 0.15, demandHotspots: ["United States", "Australia", "New Zealand", "Netherlands"], salaryBand: [50000, 100000], coreSkills: ["Electrical Systems", "Safety Compliance", "Troubleshooting", "Blueprint Reading", "Customer Service"] },
  { name: "Teacher", baselineGrowth: 0.72, automationRisk: 0.2, demandHotspots: ["Finland", "Singapore", "United States", "Ireland"], salaryBand: [40000, 95000], coreSkills: ["Curriculum Design", "Public Speaking", "Mentoring", "Assessment", "Classroom Management"] },
  { name: "UX Designer", baselineGrowth: 0.73, automationRisk: 0.4, demandHotspots: ["United States", "Sweden", "Germany", "South Korea"], salaryBand: [60000, 140000], coreSkills: ["User Research", "Figma", "Wireframing", "Design Systems", "Accessibility"] },
  { name: "Supply Chain Manager", baselineGrowth: 0.8, automationRisk: 0.3, demandHotspots: ["China", "United States", "Vietnam", "Mexico"], salaryBand: [70000, 150000], coreSkills: ["Logistics", "Procurement", "Forecasting", "Vendor Management", "Operations"] },
  { name: "Cybersecurity Specialist", baselineGrowth: 0.92, automationRisk: 0.2, demandHotspots: ["United States", "Israel", "India", "United Kingdom"], salaryBand: [80000, 190000], coreSkills: ["Network Security", "Threat Modeling", "Incident Response", "Cloud Security", "Risk Management"] },
  { name: "Doctor", baselineGrowth: 0.88, automationRisk: 0.12, demandHotspots: ["United States", "Germany", "Canada", "Australia"], salaryBand: [120000, 320000], coreSkills: ["Clinical Judgment", "Diagnosis", "Patient Care", "Research", "Emergency Response"] },
  { name: "Lawyer", baselineGrowth: 0.68, automationRisk: 0.34, demandHotspots: ["United States", "United Kingdom", "Singapore", "Switzerland"], salaryBand: [70000, 240000], coreSkills: ["Legal Research", "Negotiation", "Writing", "Risk Management", "Client Advisory"] },
  { name: "Product Manager", baselineGrowth: 0.79, automationRisk: 0.33, demandHotspots: ["United States", "Germany", "India", "Canada"], salaryBand: [85000, 210000], coreSkills: ["Product Strategy", "Roadmapping", "Stakeholder Management", "Analytics", "User Research"] },
  { name: "Accountant", baselineGrowth: 0.65, automationRisk: 0.5, demandHotspots: ["United States", "Singapore", "United Kingdom", "Canada"], salaryBand: [48000, 120000], coreSkills: ["Accounting", "Tax Planning", "Excel", "Compliance", "Financial Modeling"] },
  { name: "Sales Executive", baselineGrowth: 0.76, automationRisk: 0.28, demandHotspots: ["United States", "United Kingdom", "India", "Brazil"], salaryBand: [50000, 180000], coreSkills: ["Sales", "Negotiation", "CRM", "Prospecting", "Public Speaking"] },
  { name: "Digital Marketer", baselineGrowth: 0.78, automationRisk: 0.43, demandHotspots: ["United States", "India", "United Kingdom", "Australia"], salaryBand: [45000, 135000], coreSkills: ["SEO", "Paid Ads", "Email Marketing", "Analytics", "Copywriting"] },
  { name: "Construction Manager", baselineGrowth: 0.81, automationRisk: 0.18, demandHotspots: ["United States", "Saudi Arabia", "Australia", "Canada"], salaryBand: [65000, 155000], coreSkills: ["Project Management", "Safety Compliance", "Budgeting", "Vendor Management", "Leadership"] },
  { name: "Graphic Designer", baselineGrowth: 0.62, automationRisk: 0.48, demandHotspots: ["United States", "India", "United Kingdom", "Canada"], salaryBand: [38000, 105000], coreSkills: ["Adobe Creative Suite", "Branding", "Typography", "Visual Storytelling", "Client Communication"] },
  { name: "Financial Advisor", baselineGrowth: 0.75, automationRisk: 0.28, demandHotspots: ["United States", "Switzerland", "Singapore", "United Arab Emirates"], salaryBand: [60000, 180000], coreSkills: ["Financial Planning", "Risk Management", "Client Advisory", "Sales", "Compliance"] },
  { name: "Logistics Coordinator", baselineGrowth: 0.73, automationRisk: 0.37, demandHotspots: ["United States", "China", "Mexico", "Netherlands"], salaryBand: [42000, 95000], coreSkills: ["Logistics", "Inventory Management", "Vendor Management", "Excel", "Operations"] }
];

const skillCategories: SkillCategory[] = [
  { name: "AI, Automation & Data", items: ["AI Automation", "AI Tooling", "AI Agents", "Prompt Engineering", "AI Prompting", "Machine Learning", "Data Literacy", "SQL", "Python", "Data Visualization", "Business Intelligence", "Statistics", "Workflow Automation", "No-Code Automation", "API Integration", "RPA", "Chatbot Design", "Model Evaluation", "Data Cleaning", "Analytics"] },
  { name: "Technology & Product", items: ["JavaScript", "TypeScript", "React", "Cloud Computing", "Cloud Security", "System Design", "Testing", "DevOps", "Cybersecurity", "Network Security", "Incident Response", "Threat Modeling", "Product Strategy", "Roadmapping", "User Research", "Figma", "Wireframing", "Design Systems", "Accessibility", "Technical Writing"] },
  { name: "Business, Marketing & Creator", items: ["Sales", "Negotiation", "Client Acquisition", "CRM", "Paid Ads", "SEO", "Email Marketing", "Content Strategy", "Copywriting", "Short-Form Video", "Community Management", "Analytics", "Branding", "Agency Operations", "SMMA Operations", "Influencer Marketing", "Public Relations", "Market Research", "Customer Success", "Customer Service"] },
  { name: "Leadership, Operations & Finance", items: ["Leadership", "Project Management", "Operations", "Vendor Management", "Procurement", "Logistics", "Inventory Management", "Forecasting", "Budgeting", "Financial Modeling", "Accounting", "Tax Planning", "Compliance", "Risk Management", "Stakeholder Management", "Team Scheduling", "Quality Control", "Process Improvement", "Strategic Planning", "Hiring"] },
  { name: "Healthcare, Fitness & Human Care", items: ["Patient Care", "Clinical Judgment", "Medication Administration", "Diagnosis", "Emergency Response", "Empathy", "Care Planning", "Strength Training", "Nutrition Coaching", "Injury Prevention", "Client Motivation", "Mobility Training", "First Aid", "Mental Health Awareness", "Coaching", "Mentoring", "Classroom Management", "Curriculum Design", "Assessment", "Public Speaking"] },
  { name: "Trades, Physical & Hospitality", items: ["Electrical Systems", "Plumbing", "Carpentry", "Welding", "HVAC", "Blueprint Reading", "Troubleshooting", "Safety Compliance", "Equipment Maintenance", "Food Safety", "Hospitality Operations", "Restaurant Operations", "Event Planning", "Barista Skills", "Cooking", "Driving", "Warehouse Operations", "Manual Dexterity", "Physical Stamina", "On-Site Problem Solving"] },
  { name: "Transferable Soft Skills", items: ["Communication", "Problem Solving", "Critical Thinking", "Adaptability", "Time Management", "Creativity", "Writing", "Language Fluency", "Research", "Attention to Detail", "Conflict Resolution", "Emotional Intelligence", "Decision Making", "Presentation Skills", "Remote Collaboration", "Learning Agility", "Personal Branding", "Networking", "Resilience", "Ethical Judgment"] }
];

const defaultSkills = Array.from(new Set(skillCategories.flatMap((category) => category.items)));
const futurePlans = ["Move abroad", "Switch careers", "Upskill in AI", "Start a business", "Take management track", "Freelance/Consulting", "Remote-first lifestyle", "Build a personal brand", "Open a local service business"];
const universalUpskills = ["AI Automation", "AI Tooling", "Prompt Engineering", "Data Literacy", "Sales", "Personal Branding", "Communication", "Project Management", "Financial Planning", "Remote Collaboration"];

export default function Page() {
  const [role, setRole] = useState(careerPaths[0].name);
  const [customRole, setCustomRole] = useState("");
  const [location, setLocation] = useState("United States");
  const [age, setAge] = useState(28);
  const [experience, setExperience] = useState(5);
  const [timeFrame, setTimeFrame] = useState(10);
  const [ownedSkills, setOwnedSkills] = useState<string[]>(["Problem Solving", "Communication"]);
  const [learningSkills, setLearningSkills] = useState<string[]>(["Cloud Computing", "AI Prompting"]);
  const [plans, setPlans] = useState<string[]>(["Upskill in AI"]);
  const [resultVisible, setResultVisible] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [customSkill, setCustomSkill] = useState("");
  const [extraSkills, setExtraSkills] = useState<string[]>([]);

  const allSkills = useMemo(() => Array.from(new Set([...defaultSkills, ...extraSkills])).sort(), [extraSkills]);
  const selectedCareer = useMemo(() => careerPaths.find((p) => p.name === role) ?? careerPaths[0], [role]);
  const displayedRole = customRole.trim() || selectedCareer.name;

  const recommendedUpskills = useMemo(() => {
    const recommendations = Array.from(new Set([...selectedCareer.coreSkills, ...universalUpskills]));
    return recommendations.filter((skill) => !ownedSkills.includes(skill) && !learningSkills.includes(skill)).slice(0, 12);
  }, [learningSkills, ownedSkills, selectedCareer.coreSkills]);

  const calculateScores = useCallback((ownedCount: number, learningCount: number) => {
    const skillCoverage = Math.min(ownedCount / 18, 1);
    const learningBias = Math.min(learningCount / 14, 1);
    const expFactor = Math.min(Math.max(experience, 1) / 15, 1);
    const ageFactor = age < 30 ? 0.82 : age < 45 ? 1 : 0.9;
    const locationBoost = selectedCareer.demandHotspots.includes(location) ? 1.08 : 0.95;
    const ambitionFactor = plans.length > 0 ? 1.04 + Math.min(plans.length * 0.01, 0.04) : 0.97;
    const timeRisk = Math.max(0.78, 1 - timeFrame * 0.015);
    const rawSecurity = selectedCareer.baselineGrowth * (1 - selectedCareer.automationRisk * 0.45) * (0.42 + skillCoverage * 0.36 + learningBias * 0.22) * expFactor * ageFactor * locationBoost * ambitionFactor * timeRisk;
    const jobSecurity = Math.max(6, Math.min(99, Math.round(rawSecurity * 140)));
    const avgSalary = (selectedCareer.salaryBand[0] + selectedCareer.salaryBand[1]) / 2;
    const annualSavings = avgSalary * 0.22;
    const retirementGoal = 1200000;
    const yearsToRetire = Math.max(3, Math.round(retirementGoal / Math.max(annualSavings, 1) - experience * 0.35));

    return { jobSecurity, yearsToRetire, avgSalary };
  }, [age, experience, location, plans.length, selectedCareer, timeFrame]);

  const scores = useMemo(() => calculateScores(ownedSkills.length, learningSkills.length), [calculateScores, learningSkills.length, ownedSkills.length]);
  const improvedScores = useMemo(() => calculateScores(ownedSkills.length, learningSkills.length + recommendedUpskills.length), [calculateScores, learningSkills.length, ownedSkills.length, recommendedUpskills.length]);

  const toggle = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const addCustomSkill = () => {
    const normalizedSkill = customSkill.trim();

    if (!normalizedSkill || allSkills.includes(normalizedSkill)) {
      setCustomSkill("");
      return;
    }

    setExtraSkills((current) => [...current, normalizedSkill]);
    setOwnedSkills((current) => [...current, normalizedSkill]);
    setCustomSkill("");
  };

  const addAllRecommendations = () => {
    setLearningSkills((current) => Array.from(new Set([...current, ...recommendedUpskills])));
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6 md:p-10">
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 to-blue-950 p-8 text-white shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">Global career risk simulator</p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">Career Security Forecast</h1>
        <p className="mt-3 max-w-3xl text-slate-200">Estimate your job security and retirement timeline with a larger skill universe spanning AI automation, physical work, healthcare, creator businesses, management, trades, hospitality, and soft skills.</p>
      </div>

      <section className="mt-8 grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-medium">Current Job Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-slate-300 p-2">
            {careerPaths.map((path) => <option key={path.name}>{path.name}</option>)}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="font-medium">Custom role, if missing</span>
          <input value={customRole} onChange={(e) => setCustomRole(e.target.value)} placeholder="e.g. Tattoo artist, farmer, pilot, founder" className="rounded-lg border border-slate-300 p-2" />
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

        <label className="grid gap-2">
          <span className="font-medium">Forecast Time Frame: {timeFrame} years</span>
          <input type="range" min={1} max={30} value={timeFrame} onChange={(e) => setTimeFrame(Number(e.target.value))} />
        </label>
      </section>

      <section className="mt-6 grid gap-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Skills & Future Endeavors</h2>
            <p className="mt-1 text-sm text-slate-600">Browse categorized skills or add any custom skill so the list can represent niche, local, technical, non-technical, micro, and macro abilities.</p>
          </div>
          <button onClick={() => setShowRecommendations(true)} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Increase Probability</button>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 md:flex-row">
          <input value={customSkill} onChange={(e) => setCustomSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomSkill()} placeholder="Add any missing skill: AI automation, boxing, farming, restaurant ops..." className="flex-1 rounded-lg border border-slate-300 p-2" />
          <button onClick={addCustomSkill} className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">Add Custom Skill</button>
        </div>

        <div>
          <p className="mb-2 font-medium">Skills you already have ({ownedSkills.length} selected)</p>
          <div className="grid gap-4">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <button key={skill} onClick={() => toggle(skill, ownedSkills, setOwnedSkills)} className={`rounded-full border px-3 py-1 text-sm ${ownedSkills.includes(skill) ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 hover:border-blue-300"}`}>
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {extraSkills.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Your custom skills</h3>
                <div className="flex flex-wrap gap-2">
                  {extraSkills.map((skill) => (
                    <button key={skill} onClick={() => toggle(skill, ownedSkills, setOwnedSkills)} className={`rounded-full border px-3 py-1 text-sm ${ownedSkills.includes(skill) ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 hover:border-blue-300"}`}>
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Skills you are ready to learn ({learningSkills.length} selected)</p>
          <div className="flex max-h-64 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-slate-200 p-3">
            {allSkills.map((skill) => (
              <button key={`learn-${skill}`} onClick={() => toggle(skill, learningSkills, setLearningSkills)} className={`rounded-full border px-3 py-1 text-sm ${learningSkills.includes(skill) ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300 hover:border-emerald-300"}`}>
                {skill}
              </button>
            ))}
          </div>
        </div>

        {showRecommendations && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-emerald-950">Recommended upskills for {displayedRole}</h3>
                <p className="text-sm text-emerald-800">Add these to your learning plan to raise the forecast from {scores.jobSecurity}% to a potential {improvedScores.jobSecurity}%.</p>
              </div>
              <button onClick={addAllRecommendations} className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800">Add all to learning</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {recommendedUpskills.length > 0 ? recommendedUpskills.map((skill) => (
                <button key={`recommended-${skill}`} onClick={() => toggle(skill, learningSkills, setLearningSkills)} className="rounded-full border border-emerald-500 bg-white px-3 py-1 text-sm font-medium text-emerald-800 hover:bg-emerald-100">
                  + {skill}
                </button>
              )) : <p className="text-sm text-emerald-800">You already selected the strongest recommended upskills for this role.</p>}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 font-medium">Future endeavors</p>
          <div className="flex flex-wrap gap-2">
            {futurePlans.map((plan) => (
              <button key={plan} onClick={() => toggle(plan, plans, setPlans)} className={`rounded-full border px-3 py-1 text-sm ${plans.includes(plan) ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-300 hover:border-violet-300"}`}>
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

          <button onClick={() => setShowRecommendations(true)} className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-emerald-950 hover:bg-emerald-400 md:col-span-3">Increase Probability with recommended upskills</button>
          <p className="md:col-span-3 text-xs text-slate-300">Demo estimator only. Not financial, immigration, legal, or employment advice. Use custom roles and custom skills when a local career or niche ability is missing from the starter dataset.</p>
        </section>
      )}
    </main>
  );
}
