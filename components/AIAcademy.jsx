"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home, GraduationCap, Sparkles, Library, Trophy, Search, Command,
  Flame, Zap, Check, ChevronRight, Lock, Play, Copy, Star,
  Sun, Moon, ArrowRight, X, CircleCheck, Wand2, Terminal, Image as ImageIcon,
  Video, Boxes, Code2, Layers, Cpu, Rocket, Brain, Heart, Filter
} from "lucide-react";

const TOKENS = {
  dark: {
    bg: "#08080C",
    bgGrad: "radial-gradient(1200px 600px at 70% -10%, rgba(124,92,255,0.18), transparent 60%), radial-gradient(900px 500px at 0% 110%, rgba(34,211,238,0.10), transparent 55%), #08080C",
    surface: "rgba(255,255,255,0.035)",
    surfaceSolid: "#101019",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.14)",
    text: "#F4F4F8",
    sub: "#9A9AB0",
    faint: "#6A6A82",
    glass: "rgba(18,18,28,0.72)",
  },
  light: {
    bg: "#F6F6FA",
    bgGrad: "radial-gradient(1200px 600px at 70% -10%, rgba(124,92,255,0.14), transparent 60%), radial-gradient(900px 500px at 0% 110%, rgba(34,211,238,0.10), transparent 55%), #F6F6FA",
    surface: "rgba(255,255,255,0.7)",
    surfaceSolid: "#FFFFFF",
    border: "rgba(15,15,30,0.08)",
    borderStrong: "rgba(15,15,30,0.14)",
    text: "#14141F",
    sub: "#55556B",
    faint: "#8A8AA0",
    glass: "rgba(255,255,255,0.78)",
  },
};

const ACCENT = "#7C5CFF";
const ACCENT2 = "#22D3EE";
const AMBER = "#FFB23E";
const GRAD = `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`;

const ACADEMIES = [
  { id: "claude", name: "Claude", tint: "#D97757", icon: Brain, lessons: 24, blurb: "Projects, Artifacts, MCP, agentic work.", vibe: "Warm. Rounded. Thoughtful." },
  { id: "chatgpt", name: "ChatGPT", tint: "#10A37F", icon: Sparkles, lessons: 21, blurb: "Custom GPTs, Canvas, voice, tools.", vibe: "Modern. Minimal. Pro." },
  { id: "gemini", name: "Gemini", tint: "#4285F4", icon: Star, lessons: 18, blurb: "Multimodal, Workspace, Deep Research.", vibe: "Bright. Colorful." },
  { id: "gamma", name: "Gamma", tint: "#8B5CF6", icon: Layers, lessons: 12, blurb: "Decks that build themselves.", vibe: "Elegant. Presentation-first." },
  { id: "codex", name: "Codex", tint: "#22C55E", icon: Terminal, lessons: 16, blurb: "Agentic coding from the terminal.", vibe: "Developer. Code. Motion." },
  { id: "lovable", name: "Lovable", tint: "#FF5C8A", icon: Heart, lessons: 19, blurb: "Idea to deployed app, fast.", vibe: "Startup energy." },
  { id: "cursor", name: "Cursor", tint: "#64748B", icon: Code2, lessons: 17, blurb: "AI-native editor mastery.", vibe: "Dark. Productive." },
  { id: "bolt", name: "Bolt", tint: "#F59E0B", icon: Zap, lessons: 11, blurb: "Build-first full-stack prompting.", vibe: "Minimal. Fast." },
  { id: "veo", name: "Veo", tint: "#06B6D4", icon: Video, lessons: 9, blurb: "Prompt to cinematic motion.", vibe: "Creative. Motion." },
  { id: "sora", name: "Sora", tint: "#A855F7", icon: Play, lessons: 8, blurb: "Cinematic generation & editing.", vibe: "Big previews." },
  { id: "midjourney", name: "Midjourney", tint: "#EC4899", icon: ImageIcon, lessons: 15, blurb: "Style, params, the craft of taste.", vibe: "Artistic. Gallery." },
  { id: "flux", name: "Flux", tint: "#14B8A6", icon: Wand2, lessons: 10, blurb: "Open image generation playground.", vibe: "Creative sandbox." },
  { id: "mcp", name: "MCP", tint: "#7C5CFF", icon: Cpu, lessons: 13, blurb: "Model Context Protocol, real servers.", vibe: "Integrations. Deep." },
];

const PROMPTS = [
  { t: "Cold outreach that gets replies", c: "Marketing", body: "You are a B2B SDR. Write a 70-word cold email to {role} at {company}. One specific observation about their business, one outcome we drive, one soft CTA. No buzzwords." },
  { t: "Refactor with reasoning", c: "Coding", body: "Refactor this function for readability and performance. First list the issues you see, then show the rewrite, then explain each change in one line.\n\n```\n{code}\n```" },
  { t: "SEO cluster planner", c: "SEO", body: "For the topic {topic}, give me a pillar page plus 8 supporting articles. For each: title, search intent, primary keyword, and one internal-link target." },
  { t: "Research synthesizer", c: "Research", body: "Here are 5 sources. Extract the claims they agree on, the claims they disagree on, and the single biggest open question. Cite which source said what." },
  { t: "Build an n8n workflow", c: "Automation", body: "Design an automation: when {trigger}, do {action}. List the nodes in order, the data passed between them, and the one failure case I should handle." },
  { t: "Pitch in one breath", c: "Business", body: "Compress my product into a 12-word pitch a 12-year-old understands. Then a 30-word version for an investor. Then the 8-word tagline." },
  { t: "Explain like I build", c: "Students", body: "Teach me {concept} by having me build the smallest possible working version of it, step by step. Stop after each step and ask me to predict the next." },
  { t: "Design system audit", c: "Design", body: "Review this UI for hierarchy, contrast, and spacing rhythm. Give 5 specific fixes ranked by impact. Be blunt, skip the praise." },
  { t: "Shot list from a vibe", c: "Video", body: "Turn this mood into a 6-shot list for an 8-second clip: {vibe}. Per shot: camera move, subject, lighting, and one word of pacing." },
  { t: "Style probe", c: "Images", body: "Generate 4 variations of {subject}, each in a distinct art-historical movement. Name the movement and the 2 params that define it." },
  { t: "Prompt that critiques itself", c: "Prompt Engineering", body: "Answer my question. Then grade your own answer 1–10 on accuracy and usefulness, and rewrite the weakest sentence." },
  { t: "Ship-ready commit", c: "Programming", body: "Write a conventional-commits message for this diff: a one-line summary under 60 chars, then 3 bullet body lines on what and why.\n\n{diff}" },
];

const PROMPT_CATS = ["All", ...Array.from(new Set(PROMPTS.map((p) => p.c)))];

const MISSION_STEPS = [
  {
    id: 1,
    label: "Name your Project",
    hint: "Projects keep context in one place. Give it a clear name.",
    kind: "input",
    placeholder: "e.g. Q3 Launch Brain",
    check: (v) => v.trim().length >= 3,
    fail: "Give it at least 3 characters — a name you'd recognize later.",
  },
  {
    id: 2,
    label: "Add custom instructions",
    hint: "Instructions shape every chat in the Project. Tell Claude how to behave.",
    kind: "textarea",
    placeholder: "Always answer concisely. Use my brand voice: warm, direct, no jargon.",
    check: (v) => v.trim().length >= 15,
    fail: "Write a real instruction — 15+ characters so it actually guides responses.",
  },
  {
    id: 3,
    label: "Attach knowledge",
    hint: "Drop a file into Project knowledge so every chat can reference it.",
    kind: "files",
    options: ["brand-guide.pdf", "pricing.csv", "past-launches.md", "tone.txt"],
    check: (v) => Array.isArray(v) && v.length >= 1,
    fail: "Select at least one file to add to Project knowledge.",
  },
  {
    id: 4,
    label: "Start your first chat",
    hint: "Now use it. Ask something that depends on the knowledge you added.",
    kind: "input",
    placeholder: "Draft launch copy using the brand guide.",
    check: (v) => v.trim().length >= 8,
    fail: "Ask a real question that leans on your Project knowledge.",
  },
];

function useTheme() {
  const [mode, setMode] = useState("dark");
  const t = TOKENS[mode];
  return { mode, setMode, t };
}

function Ring({ value, size = 56, stroke = 5, color = ACCENT, track }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.2,.8,.2,1)" }}
      />
    </svg>
  );
}

export default function AIAcademy() {
  const { mode, setMode, t } = useTheme();
  const [view, setView] = useState("home");
  const [activeAcademy, setActiveAcademy] = useState("claude");
  const [palette, setPalette] = useState(false);
  const [paletteQ, setPaletteQ] = useState("");
  const [xp, setXp] = useState(1240);
  const [streak] = useState(7);
  const [done, setDone] = useState(() => new Set());
  const [toast, setToast] = useState(null);

  const level = Math.floor(xp / 500) + 1;
  const levelProg = ((xp % 500) / 500) * 100;

  const fireToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }, []);

  const award = useCallback((id, amount) => {
    setDone((d) => {
      if (d.has(id)) return d;
      const n = new Set(d); n.add(id); return n;
    });
    setXp((x) => x + amount);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPalette((p) => !p);
      }
      if (e.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav = [
    { id: "home", label: "Home", icon: Home },
    { id: "academies", label: "Academies", icon: GraduationCap },
    { id: "mission", label: "Live Mission", icon: Rocket },
    { id: "prompts", label: "Prompt Library", icon: Library },
    { id: "progress", label: "Progress", icon: Trophy },
  ];

  const paletteItems = useMemo(() => {
    const items = [
      ...nav.map((n) => ({ kind: "Go to", label: n.label, run: () => setView(n.id) })),
      ...ACADEMIES.map((a) => ({ kind: "Academy", label: a.name + " Academy", run: () => { setActiveAcademy(a.id); setView("academies"); } })),
      ...PROMPTS.slice(0, 6).map((p) => ({ kind: "Prompt", label: p.t, run: () => setView("prompts") })),
      { kind: "Action", label: mode === "dark" ? "Switch to light mode" : "Switch to dark mode", run: () => setMode(mode === "dark" ? "light" : "dark") },
    ];
    if (!paletteQ.trim()) return items.slice(0, 8);
    return items.filter((i) => (i.label + i.kind).toLowerCase().includes(paletteQ.toLowerCase())).slice(0, 8);
  }, [paletteQ, mode]);

  const styleTag = `
    @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes pop { 0%{transform:scale(.6);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes burst { 0%{transform:scale(0);opacity:1} 100%{transform:scale(3.2);opacity:0} }
    @keyframes drift { 0%{transform:translate(0,0)} 50%{transform:translate(8px,-12px)} 100%{transform:translate(0,0)} }
    .fade-up{animation:fadeUp .5s cubic-bezier(.2,.8,.2,1) both}
    .hover-rise{transition:transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s, border-color .25s}
    .hover-rise:hover{transform:translateY(-4px)}
    @media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
    ::-webkit-scrollbar{width:10px;height:10px}
    ::-webkit-scrollbar-thumb{background:rgba(124,92,255,.35);border-radius:99px}
    *:focus-visible{outline:2px solid ${ACCENT};outline-offset:2px;border-radius:8px}
  `;

  return (
    <div style={{ minHeight: "100vh", background: t.bgGrad, color: t.text, fontFamily: "ui-sans-serif, -apple-system, Inter, system-ui, sans-serif" }}>
      <style>{styleTag}</style>

      <div className="flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside
          className="hidden md:flex"
          style={{ width: 250, flexDirection: "column", padding: "22px 16px", borderRight: `1px solid ${t.border}`, position: "sticky", top: 0, height: "100vh", background: t.glass, backdropFilter: "blur(18px)" }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: 26, paddingLeft: 6 }}>
            <div style={{ width: 34, height: 34, borderRadius: 11, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 24px ${ACCENT}55` }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: 16 }}>AI Academy</div>
              <div style={{ fontSize: 11, color: t.faint }}>Learn by doing</div>
            </div>
          </div>

          <nav className="flex" style={{ flexDirection: "column", gap: 4 }}>
            {nav.map((n) => {
              const on = view === n.id;
              return (
                <button key={n.id} onClick={() => setView(n.id)}
                  className="flex items-center gap-3"
                  style={{
                    padding: "10px 12px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left",
                    background: on ? t.surface : "transparent",
                    color: on ? t.text : t.sub, fontWeight: on ? 700 : 500, fontSize: 14,
                    boxShadow: on ? `inset 0 0 0 1px ${t.border}` : "none", transition: "all .18s",
                  }}>
                  <n.icon size={18} color={on ? ACCENT : t.faint} />
                  {n.label}
                </button>
              );
            })}
          </nav>

          <button onClick={() => setPalette(true)}
            className="flex items-center justify-between"
            style={{ marginTop: 16, padding: "9px 12px", borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, color: t.sub, cursor: "pointer", fontSize: 13 }}>
            <span className="flex items-center gap-2"><Search size={15} /> Search</span>
            <span className="flex items-center gap-1" style={{ fontSize: 11, color: t.faint }}><Command size={11} />K</span>
          </button>

          <div style={{ marginTop: "auto" }}>
            <div style={{ padding: 14, borderRadius: 16, background: t.surface, border: `1px solid ${t.border}` }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: t.sub, fontWeight: 600 }}>Level {level}</span>
                <span className="flex items-center gap-1" style={{ fontSize: 12, color: AMBER, fontWeight: 700 }}><Flame size={13} /> {streak}d</span>
              </div>
              <div style={{ height: 7, borderRadius: 99, background: t.border, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${levelProg}%`, background: GRAD, borderRadius: 99, transition: "width .8s cubic-bezier(.2,.8,.2,1)" }} />
              </div>
              <div className="flex items-center gap-1" style={{ marginTop: 8, fontSize: 12, color: t.text, fontWeight: 700 }}>
                <Zap size={13} color={AMBER} /> {xp.toLocaleString()} XP
              </div>
            </div>
            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="flex items-center justify-center gap-2"
              style={{ width: "100%", marginTop: 10, padding: "9px", borderRadius: 12, background: "transparent", border: `1px solid ${t.border}`, color: t.sub, cursor: "pointer", fontSize: 13 }}>
              {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              {mode === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Mobile top bar */}
          <div className="flex md:hidden items-center justify-between" style={{ padding: "14px 16px", borderBottom: `1px solid ${t.border}`, background: t.glass, position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(14px)" }}>
            <div className="flex items-center gap-2" style={{ fontWeight: 800 }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={15} color="#fff" /></div>
              AI Academy
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1" style={{ fontSize: 13, color: AMBER, fontWeight: 700 }}><Flame size={14} />{streak}</span>
              <button onClick={() => setPalette(true)} style={{ background: "none", border: "none", color: t.sub }}><Search size={18} /></button>
            </div>
          </div>

          <div style={{ padding: "28px clamp(16px,4vw,44px)", maxWidth: 1180, margin: "0 auto" }}>
            {view === "home" && <HomeView t={t} setView={setView} setActiveAcademy={setActiveAcademy} done={done} xp={xp} streak={streak} level={level} />}
            {view === "academies" && <AcademiesView t={t} active={activeAcademy} setActive={setActiveAcademy} setView={setView} done={done} />}
            {view === "mission" && <MissionView t={t} award={award} fireToast={fireToast} done={done} />}
            {view === "prompts" && <PromptsView t={t} fireToast={fireToast} />}
            {view === "progress" && <ProgressView t={t} xp={xp} streak={streak} level={level} done={done} />}
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden" style={{ position: "sticky", bottom: 0, borderTop: `1px solid ${t.border}`, background: t.glass, backdropFilter: "blur(14px)", padding: "8px 6px", justifyContent: "space-around", zIndex: 20 }}>
            {nav.map((n) => (
              <button key={n.id} onClick={() => setView(n.id)} className="flex" style={{ flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", color: view === n.id ? ACCENT : t.faint, fontSize: 10, padding: "4px 6px" }}>
                <n.icon size={20} />
                {n.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </main>
      </div>

      {/* Command palette */}
      {palette && (
        <div onClick={() => setPalette(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 60, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh" }}>
          <div onClick={(e) => e.stopPropagation()} className="fade-up"
            style={{ width: "min(560px, 92vw)", background: t.surfaceSolid, border: `1px solid ${t.borderStrong}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.5)" }}>
            <div className="flex items-center gap-3" style={{ padding: "16px 18px", borderBottom: `1px solid ${t.border}` }}>
              <Search size={18} color={t.faint} />
              <input autoFocus value={paletteQ} onChange={(e) => setPaletteQ(e.target.value)} placeholder="Search academies, prompts, actions…"
                style={{ flex: 1, background: "none", border: "none", color: t.text, fontSize: 15, outline: "none" }} />
              <span style={{ fontSize: 11, color: t.faint, border: `1px solid ${t.border}`, padding: "2px 6px", borderRadius: 6 }}>ESC</span>
            </div>
            <div style={{ maxHeight: 340, overflowY: "auto", padding: 8 }}>
              {paletteItems.length === 0 && <div style={{ padding: 24, textAlign: "center", color: t.faint, fontSize: 14 }}>No matches.</div>}
              {paletteItems.map((it, i) => (
                <button key={i} onClick={() => { it.run(); setPalette(false); setPaletteQ(""); }}
                  className="flex items-center justify-between"
                  style={{ width: "100%", padding: "11px 12px", borderRadius: 11, background: "transparent", border: "none", cursor: "pointer", color: t.text, textAlign: "left" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = t.surface)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <span className="flex items-center gap-3">
                    <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: ".06em", width: 64 }}>{it.kind}</span>
                    <span style={{ fontSize: 14 }}>{it.label}</span>
                  </span>
                  <ArrowRight size={15} color={t.faint} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fade-up" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: t.surfaceSolid, border: `1px solid ${t.borderStrong}`, color: t.text, padding: "12px 18px", borderRadius: 14, zIndex: 70, fontSize: 14, fontWeight: 600, boxShadow: "0 16px 40px rgba(0,0,0,.4)", display: "flex", gap: 10, alignItems: "center" }}>
          <CircleCheck size={18} color={ACCENT2} /> {toast}
        </div>
      )}
    </div>
  );
}

function HomeView({ t, setView, setActiveAcademy, done, xp, streak, level }) {
  return (
    <div className="fade-up">
      <section style={{ position: "relative", borderRadius: 28, overflow: "hidden", border: `1px solid ${t.border}`, padding: "clamp(28px,5vw,56px)", marginBottom: 28, background: t.surface }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 300px at 85% 0%, rgba(124,92,255,0.22), transparent 60%)", pointerEvents: "none" }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", width: 90, height: 90, borderRadius: 22, background: GRAD, opacity: 0.10, top: 20 + i * 60, right: 30 + i * 90, animation: `drift ${6 + i}s ease-in-out infinite`, pointerEvents: "none", filter: "blur(2px)" }} />
        ))}
        <div style={{ position: "relative", maxWidth: 640 }}>
          <div className="flex items-center gap-2" style={{ fontSize: 12, fontWeight: 700, color: ACCENT2, marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: ACCENT2, boxShadow: `0 0 12px ${ACCENT2}` }} /> 13 academies · 200+ live missions
          </div>
          <h1 style={{ fontSize: "clamp(34px,5.5vw,58px)", lineHeight: 1.02, fontWeight: 850, letterSpacing: "-0.035em", margin: 0 }}>
            Master every AI tool<br />through <span style={{ background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>real work</span>.
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: t.sub, marginTop: 18, maxWidth: 480 }}>
            Stop watching tutorials. Open a simulator, complete the mission, get it checked. Every lesson is a task you actually finish.
          </p>
          <div className="flex" style={{ gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <button onClick={() => setView("mission")} className="flex items-center gap-2 hover-rise"
              style={{ padding: "13px 22px", borderRadius: 14, background: GRAD, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: `0 12px 30px ${ACCENT}55` }}>
              <Play size={17} /> Start a live mission
            </button>
            <button onClick={() => setView("academies")} className="flex items-center gap-2 hover-rise"
              style={{ padding: "13px 22px", borderRadius: 14, background: t.surfaceSolid, color: t.text, border: `1px solid ${t.borderStrong}`, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Browse academies <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 30 }}>
        {[
          { label: "Day streak", value: streak, suffix: "days", icon: Flame, color: AMBER },
          { label: "Total XP", value: xp.toLocaleString(), icon: Zap, color: ACCENT },
          { label: "Level", value: level, icon: Trophy, color: ACCENT2 },
          { label: "Missions done", value: done.size, icon: CircleCheck, color: "#10B981" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 18, borderRadius: 18, background: t.surface, border: `1px solid ${t.border}` }}>
            <s.icon size={20} color={s.color} />
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 12, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: t.sub }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 30 }}>
        <div style={{ padding: 22, borderRadius: 20, background: t.surface, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 13, color: t.faint, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Continue learning</div>
          <div className="flex items-center gap-4" style={{ marginTop: 16 }}>
            <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
              <Ring value={62} track={t.border} />
              <span style={{ position: "absolute", fontSize: 13, fontWeight: 800 }}>62%</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>Claude Academy · Projects</div>
              <div style={{ fontSize: 14, color: t.sub, marginTop: 2 }}>Build a Project with knowledge & instructions.</div>
            </div>
            <button onClick={() => setView("mission")} className="hover-rise" style={{ padding: "10px 16px", borderRadius: 12, background: GRAD, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              Resume <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div onClick={() => setView("mission")} className="hover-rise" style={{ cursor: "pointer", padding: 22, borderRadius: 20, border: `1px solid ${t.border}`, background: `linear-gradient(135deg, ${AMBER}22, transparent)` }}>
          <div className="flex items-center gap-2" style={{ fontSize: 13, color: AMBER, fontWeight: 800 }}><Flame size={15} /> Daily challenge</div>
          <div style={{ fontWeight: 800, fontSize: 18, marginTop: 12, letterSpacing: "-0.02em" }}>Ship a working MCP server</div>
          <div style={{ fontSize: 14, color: t.sub, marginTop: 4 }}>+150 XP · resets in 9h</div>
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Trending academies</h2>
        <button onClick={() => setView("academies")} style={{ background: "none", border: "none", color: ACCENT, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 14 }}>See all <ArrowRight size={15} /></button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
        {ACADEMIES.slice(0, 6).map((a) => (
          <AcademyCard key={a.id} a={a} t={t} onClick={() => { setActiveAcademy(a.id); setView("academies"); }} />
        ))}
      </div>
    </div>
  );
}

function AcademyCard({ a, t, onClick, active }) {
  const Icon = a.icon;
  return (
    <button onClick={onClick} className="hover-rise"
      style={{ textAlign: "left", padding: 18, borderRadius: 18, cursor: "pointer",
        background: active ? `linear-gradient(135deg, ${a.tint}22, ${t.surface})` : t.surface,
        border: `1px solid ${active ? a.tint + "88" : t.border}` }}>
      <div className="flex items-center justify-between">
        <div style={{ width: 42, height: 42, borderRadius: 13, background: a.tint + "22", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${a.tint}44` }}>
          <Icon size={21} color={a.tint} />
        </div>
        <span style={{ fontSize: 12, color: t.faint, fontWeight: 600 }}>{a.lessons} lessons</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 17, marginTop: 14, letterSpacing: "-0.02em" }}>{a.name} Academy</div>
      <div style={{ fontSize: 13, color: t.sub, marginTop: 3, lineHeight: 1.45 }}>{a.blurb}</div>
      <div style={{ fontSize: 11, color: a.tint, marginTop: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>{a.vibe}</div>
    </button>
  );
}

function AcademiesView({ t, active, setActive, setView, done }) {
  const a = ACADEMIES.find((x) => x.id === active);
  const Icon = a.icon;
  const lessons = useMemo(() => [
    { n: "Overview & first principles", type: "Watch", min: 4 },
    { n: "Interactive demo: the interface", type: "Practice", min: 6 },
    { n: "Mission: build something real", type: "Build", min: 12 },
    { n: "AI feedback & common mistakes", type: "Verify", min: 5 },
    { n: "Pro tips & hidden tricks", type: "Improve", min: 7 },
    { n: "Cheat sheet & certification", type: "Complete", min: 3 },
  ], [active]);

  return (
    <div className="fade-up">
      <h1 style={{ fontSize: 30, fontWeight: 850, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Academies</h1>
      <p style={{ color: t.sub, margin: "0 0 22px" }}>Thirteen tools. Each with its own identity, simulators, and missions.</p>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 22 }}>
        {ACADEMIES.map((x) => (
          <button key={x.id} onClick={() => setActive(x.id)}
            style={{ whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 99, cursor: "pointer", fontSize: 13, fontWeight: 700,
              border: `1px solid ${active === x.id ? x.tint : t.border}`,
              background: active === x.id ? x.tint + "22" : t.surface,
              color: active === x.id ? x.tint : t.sub }}>
            {x.name}
          </button>
        ))}
      </div>

      <section style={{ borderRadius: 24, overflow: "hidden", border: `1px solid ${a.tint}44`, padding: "clamp(24px,4vw,40px)", marginBottom: 24, background: `linear-gradient(135deg, ${a.tint}26, ${t.surface})`, position: "relative" }}>
        <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: a.tint, opacity: 0.16, top: -60, right: -40, filter: "blur(40px)" }} />
        <div className="flex items-center gap-4" style={{ position: "relative" }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: a.tint + "33", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${a.tint}66` }}>
            <Icon size={32} color={a.tint} />
          </div>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 850, letterSpacing: "-0.03em", margin: 0 }}>{a.name} Academy</h2>
            <div style={{ color: t.sub, marginTop: 2 }}>{a.blurb}</div>
          </div>
        </div>
        <button onClick={() => setView("mission")} className="hover-rise flex items-center gap-2"
          style={{ position: "relative", marginTop: 22, padding: "12px 20px", borderRadius: 13, background: a.tint, color: "#fff", border: "none", fontWeight: 800, cursor: "pointer", fontSize: 14 }}>
          <Play size={16} /> Open the simulator
        </button>
      </section>

      <div className="flex" style={{ flexDirection: "column", gap: 10 }}>
        {lessons.map((l, i) => {
          const locked = i > 2;
          return (
            <div key={i} className="flex items-center gap-4" style={{ padding: "14px 18px", borderRadius: 16, background: t.surface, border: `1px solid ${t.border}`, opacity: locked ? 0.55 : 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", background: locked ? t.border : a.tint + "22", color: locked ? t.faint : a.tint, fontWeight: 800, fontSize: 14 }}>
                {locked ? <Lock size={15} /> : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.n}</div>
                <div style={{ fontSize: 12, color: t.faint }}>{l.type} · {l.min} min</div>
              </div>
              {!locked && <button onClick={() => setView("mission")} style={{ padding: "7px 14px", borderRadius: 10, background: "transparent", border: `1px solid ${t.borderStrong}`, color: t.text, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Start</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MissionView({ t, award, fireToast, done }) {
  const [step, setStep] = useState(0);
  const [vals, setVals] = useState({});
  const [err, setErr] = useState("");
  const [complete, setComplete] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [coachMsgs, setCoachMsgs] = useState([]);
  const [coachInput, setCoachInput] = useState("");
  const [coachBusy, setCoachBusy] = useState(false);
  const coachEndRef = useRef(null);
  const cur = MISSION_STEPS[step];
  const isDone = done.has("mission-claude-project");

  const setVal = (v) => setVals((s) => ({ ...s, [cur.id]: v }));
  const val = vals[cur.id] ?? (cur.kind === "files" ? [] : "");

  useEffect(() => {
    coachEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [coachMsgs, coachBusy]);

  const askCoach = async (raw) => {
    const userText = (raw ?? coachInput).trim();
    if (!userText || coachBusy) return;
    const history = [...coachMsgs, { role: "user", content: userText }];
    setCoachMsgs(history);
    setCoachInput("");
    setCoachBusy(true);

    const stepContext = `The learner is on step ${step + 1} of ${MISSION_STEPS.length} of the "Build a Claude Project" mission.
Current step: "${cur.label}" — goal: ${cur.hint}
Their current draft for this step: ${JSON.stringify(val) || "(empty)"}`;

    const system = `You are the AI Coach inside AI Academy, a hands-on learning platform.
Rules:
- Teach by guiding, never by handing over the finished answer. Hints first; only reveal a full solution if the learner has clearly tried and explicitly asks.
- Be brief: 2-4 short sentences, plain language, encouraging but not fluffy.
- Stay on the current step's goal. If they ask something off-topic, gently redirect.
- Never invent Claude features that don't exist.
${stepContext}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const text = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      setCoachMsgs((m) => [...m, { role: "assistant", content: text || "Let me think about that differently — try rephrasing what you're stuck on." }]);
    } catch (e) {
      setCoachMsgs((m) => [...m, { role: "assistant", content: "Coach is offline for a second. Try again — your progress is safe." }]);
    } finally {
      setCoachBusy(false);
    }
  };

  const openCoach = () => {
    setCoachOpen((o) => {
      const next = !o;
      if (next && coachMsgs.length === 0) askCoach(`I'm on "${cur.label}". Give me a nudge to get started.`);
      return next;
    });
  };

  const submit = () => {
    if (!cur.check(val)) { setErr(cur.fail); return; }
    setErr("");
    if (step < MISSION_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setComplete(true);
      award("mission-claude-project", 150);
      fireToast("Mission complete · +150 XP · Achievement unlocked");
    }
  };

  const reset = () => { setStep(0); setVals({}); setErr(""); setComplete(false); };

  return (
    <div className="fade-up">
      <div className="flex items-center justify-between" style={{ marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div className="flex items-center gap-2" style={{ fontSize: 12, color: "#D97757", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>
            <Brain size={14} /> Claude Academy · Live Mission
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 850, letterSpacing: "-0.03em", margin: "6px 0 0" }}>Build a Claude Project</h1>
        </div>
        <span style={{ fontSize: 13, color: t.sub, fontWeight: 600 }}>+150 XP</span>
      </div>

      <div className="flex items-center gap-2" style={{ margin: "16px 0 22px" }}>
        {MISSION_STEPS.map((s, i) => (
          <div key={s.id} style={{ flex: 1, height: 6, borderRadius: 99, background: i < step || complete ? "#D97757" : i === step ? "#D9775788" : t.border, transition: "background .4s" }} />
        ))}
      </div>

      {!complete ? (
        <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 16 }}>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${t.border}`, background: t.surfaceSolid }}>
            <div className="flex items-center gap-2" style={{ padding: "12px 16px", borderBottom: `1px solid ${t.border}`, background: t.surface }}>
              <div className="flex gap-2">
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />)}
              </div>
              <span style={{ fontSize: 12, color: t.faint, marginLeft: 8, fontFamily: "ui-monospace, monospace" }}>claude.ai / projects / new</span>
            </div>

            <div style={{ padding: "clamp(20px,4vw,34px)" }}>
              <div className="flex items-center gap-2" style={{ fontSize: 13, color: t.faint, marginBottom: 6 }}>
                Step {step + 1} of {MISSION_STEPS.length}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{cur.label}</h3>
              <p style={{ color: t.sub, margin: "0 0 20px", fontSize: 15 }}>{cur.hint}</p>

              {cur.kind === "input" && (
                <input value={val} onChange={(e) => setVal(e.target.value)} placeholder={cur.placeholder} onKeyDown={(e) => e.key === "Enter" && submit()}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 13, border: `1px solid ${t.borderStrong}`, background: t.surface, color: t.text, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              )}
              {cur.kind === "textarea" && (
                <textarea value={val} onChange={(e) => setVal(e.target.value)} placeholder={cur.placeholder} rows={4}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 13, border: `1px solid ${t.borderStrong}`, background: t.surface, color: t.text, fontSize: 15, outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
              )}
              {cur.kind === "files" && (
                <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
                  {cur.options.map((f) => {
                    const sel = (val || []).includes(f);
                    return (
                      <button key={f} onClick={() => setVal(sel ? val.filter((x) => x !== f) : [...val, f])}
                        className="flex items-center gap-2"
                        style={{ padding: "14px 16px", borderRadius: 13, cursor: "pointer", textAlign: "left",
                          border: `1px solid ${sel ? "#D97757" : t.borderStrong}`, background: sel ? "#D9775722" : t.surface, color: t.text, fontSize: 14, fontWeight: 600 }}>
                        {sel ? <Check size={16} color="#D97757" /> : <Boxes size={16} color={t.faint} />}
                        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13 }}>{f}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {err && <div className="fade-up" style={{ marginTop: 14, padding: "11px 14px", borderRadius: 11, background: "#EF444418", border: "1px solid #EF444455", color: "#F87171", fontSize: 14 }}>{err}</div>}

              <div className="flex items-center gap-3" style={{ marginTop: 22, flexWrap: "wrap" }}>
                <button onClick={submit} className="hover-rise flex items-center gap-2"
                  style={{ padding: "13px 22px", borderRadius: 13, background: "#D97757", color: "#fff", border: "none", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
                  {step === MISSION_STEPS.length - 1 ? "Verify & complete" : "Check & continue"} <ArrowRight size={16} />
                </button>
                {step > 0 && <button onClick={() => { setStep(step - 1); setErr(""); }} style={{ padding: "13px 18px", borderRadius: 13, background: "transparent", border: `1px solid ${t.border}`, color: t.sub, fontWeight: 700, cursor: "pointer" }}>Back</button>}
                <button onClick={openCoach} className="flex items-center gap-2" style={{ marginLeft: "auto", padding: "13px 16px", borderRadius: 13, background: coachOpen ? ACCENT + "22" : "transparent", border: `1px solid ${ACCENT}55`, color: ACCENT, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  <Sparkles size={15} /> AI Coach
                </button>
              </div>

              {coachOpen && (
                <div className="fade-up" style={{ marginTop: 16, borderRadius: 16, background: `linear-gradient(135deg, ${ACCENT}14, transparent)`, border: `1px solid ${ACCENT}44`, overflow: "hidden" }}>
                  <div className="flex items-center gap-2" style={{ padding: "12px 16px", borderBottom: `1px solid ${ACCENT}33`, fontWeight: 800, color: ACCENT }}>
                    <Sparkles size={15} /> AI Coach
                    <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: t.faint }}>powered by Claude</span>
                  </div>

                  <div style={{ maxHeight: 280, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    {coachMsgs.map((m, i) => (
                      <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                        <div style={{
                          padding: "10px 14px", borderRadius: 14, fontSize: 14, lineHeight: 1.5,
                          background: m.role === "user" ? GRAD : t.surfaceSolid,
                          color: m.role === "user" ? "#fff" : t.text,
                          border: m.role === "user" ? "none" : `1px solid ${t.border}`,
                          whiteSpace: "pre-wrap",
                        }}>{m.content}</div>
                      </div>
                    ))}
                    {coachBusy && (
                      <div style={{ alignSelf: "flex-start", display: "flex", gap: 4, padding: "12px 14px" }}>
                        {[0, 1, 2].map((d) => (
                          <span key={d} style={{ width: 7, height: 7, borderRadius: 99, background: ACCENT, animation: `floaty 0.9s ease-in-out ${d * 0.15}s infinite` }} />
                        ))}
                      </div>
                    )}
                    <div ref={coachEndRef} />
                  </div>

                  <div className="flex items-center gap-2" style={{ padding: 12, borderTop: `1px solid ${t.border}` }}>
                    <input value={coachInput} onChange={(e) => setCoachInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && askCoach()}
                      placeholder="Ask the coach for a hint…"
                      style={{ flex: 1, padding: "11px 14px", borderRadius: 12, border: `1px solid ${t.borderStrong}`, background: t.surface, color: t.text, fontSize: 14, outline: "none" }} />
                    <button onClick={() => askCoach()} disabled={coachBusy || !coachInput.trim()}
                      style={{ padding: "11px 14px", borderRadius: 12, background: coachBusy || !coachInput.trim() ? t.border : GRAD, color: "#fff", border: "none", fontWeight: 700, cursor: coachBusy ? "default" : "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CompletionCard t={t} reset={reset} already={isDone} />
      )}
    </div>
  );
}

function CompletionCard({ t, reset }) {
  return (
    <div className="fade-up" style={{ position: "relative", borderRadius: 24, border: `1px solid #10B98155`, background: `linear-gradient(135deg, #10B98122, ${t.surface})`, padding: "clamp(30px,6vw,56px)", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: 70, width: 60, height: 60, marginLeft: -30, borderRadius: "50%", border: "3px solid #10B981", animation: "burst 1s ease-out forwards" }} />
      <div style={{ width: 84, height: 84, margin: "0 auto", borderRadius: 26, background: "linear-gradient(135deg,#10B981,#22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pop .6s cubic-bezier(.2,.8,.2,1) both", boxShadow: "0 18px 50px #10B98166" }}>
        <Check size={44} color="#fff" strokeWidth={3} />
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 850, letterSpacing: "-0.03em", margin: "22px 0 6px" }}>Mission complete</h2>
      <p style={{ color: t.sub, maxWidth: 420, margin: "0 auto 8px", fontSize: 15 }}>
        You built a real Claude Project — named it, gave it instructions, added knowledge, and ran a grounded first chat.
      </p>
      <div className="flex items-center justify-center" style={{ gap: 12, margin: "20px 0 26px", flexWrap: "wrap" }}>
        <span className="flex items-center gap-2" style={{ padding: "9px 16px", borderRadius: 99, background: t.surfaceSolid, border: `1px solid ${t.border}`, fontWeight: 800 }}><Zap size={16} color={AMBER} /> +150 XP</span>
        <span className="flex items-center gap-2" style={{ padding: "9px 16px", borderRadius: 99, background: t.surfaceSolid, border: `1px solid ${t.border}`, fontWeight: 800 }}><Trophy size={16} color={ACCENT2} /> Project Builder</span>
        <span className="flex items-center gap-2" style={{ padding: "9px 16px", borderRadius: 99, background: t.surfaceSolid, border: `1px solid ${t.border}`, fontWeight: 800 }}><Sparkles size={16} color={ACCENT} /> Next lesson unlocked</span>
      </div>
      <button onClick={reset} className="hover-rise" style={{ padding: "12px 22px", borderRadius: 13, background: GRAD, color: "#fff", border: "none", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
        Replay mission
      </button>
    </div>
  );
}

function PromptsView({ t, fireToast }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [favs, setFavs] = useState(() => new Set());
  const [copied, setCopied] = useState(null);

  const list = PROMPTS.filter((p) => (cat === "All" || p.c === cat) && (p.t + p.body).toLowerCase().includes(q.toLowerCase()));

  const copy = (p, i) => {
    if (navigator.clipboard) navigator.clipboard.writeText(p.body).catch(() => {});
    setCopied(i); fireToast("Prompt copied");
    setTimeout(() => setCopied(null), 1500);
  };
  const toggleFav = (i) => setFavs((f) => { const n = new Set(f); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <div className="fade-up">
      <h1 style={{ fontSize: 30, fontWeight: 850, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Prompt Library</h1>
      <p style={{ color: t.sub, margin: "0 0 20px" }}>Battle-tested prompts. Filter, copy, make them yours.</p>

      <div className="flex items-center gap-3" style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <div className="flex items-center gap-2" style={{ flex: 1, minWidth: 220, padding: "11px 14px", borderRadius: 13, background: t.surface, border: `1px solid ${t.border}` }}>
          <Search size={16} color={t.faint} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts…" style={{ flex: 1, background: "none", border: "none", color: t.text, outline: "none", fontSize: 14 }} />
        </div>
        <span className="flex items-center gap-1" style={{ fontSize: 13, color: t.faint }}><Filter size={14} /> {list.length}</span>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 18 }}>
        {PROMPT_CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} style={{ whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 99, cursor: "pointer", fontSize: 13, fontWeight: 700, border: `1px solid ${cat === c ? ACCENT : t.border}`, background: cat === c ? ACCENT + "22" : t.surface, color: cat === c ? ACCENT : t.sub }}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
        {list.map((p, i) => (
          <div key={i} className="hover-rise" style={{ padding: 18, borderRadius: 18, background: t.surface, border: `1px solid ${t.border}`, display: "flex", flexDirection: "column" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: ACCENT, textTransform: "uppercase", letterSpacing: ".05em", padding: "3px 9px", borderRadius: 99, background: ACCENT + "1A" }}>{p.c}</span>
              <button onClick={() => toggleFav(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                <Star size={17} color={favs.has(i) ? AMBER : t.faint} fill={favs.has(i) ? AMBER : "none"} />
              </button>
            </div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>{p.t}</div>
            <pre style={{ marginTop: 10, fontSize: 12.5, color: t.sub, whiteSpace: "pre-wrap", fontFamily: "ui-monospace, monospace", background: t.surfaceSolid, padding: 12, borderRadius: 11, border: `1px solid ${t.border}`, flex: 1, maxHeight: 130, overflow: "auto", margin: 0 }}>{p.body}</pre>
            <button onClick={() => copy(p, i)} className="flex items-center justify-center gap-2" style={{ marginTop: 12, padding: "10px", borderRadius: 11, background: copied === i ? "#10B981" : t.surfaceSolid, color: copied === i ? "#fff" : t.text, border: `1px solid ${t.borderStrong}`, fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all .2s" }}>
              {copied === i ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy prompt</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressView({ t, xp, streak, level, done }) {
  const weeks = 18, days = 7;
  const cells = useMemo(() => Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5)), []);
  const levels = ["transparent", ACCENT + "33", ACCENT + "66", ACCENT + "AA", ACCENT];

  const skills = [
    { name: "Prompt Engineering", v: 88 }, { name: "Agentic Workflows", v: 64 },
    { name: "Image & Video Gen", v: 42 }, { name: "MCP & Integrations", v: 71 },
    { name: "AI-Native Coding", v: 79 },
  ];

  return (
    <div className="fade-up">
      <h1 style={{ fontSize: 30, fontWeight: 850, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Your progress</h1>
      <p style={{ color: t.sub, margin: "0 0 22px" }}>Every mission you finish moves these.</p>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 26 }}>
        {[
          { l: "Current streak", v: `${streak} days`, i: Flame, c: AMBER },
          { l: "Total XP", v: xp.toLocaleString(), i: Zap, c: ACCENT },
          { l: "Level", v: level, i: Trophy, c: ACCENT2 },
          { l: "Missions done", v: done.size, i: CircleCheck, c: "#10B981" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 18, borderRadius: 18, background: t.surface, border: `1px solid ${t.border}` }}>
            <s.i size={20} color={s.c} />
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 10 }}>{s.v}</div>
            <div style={{ fontSize: 13, color: t.sub }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: 22, borderRadius: 20, background: t.surface, border: `1px solid ${t.border}`, marginBottom: 22, overflow: "hidden" }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14 }}>Learning heatmap</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${weeks}, 1fr)`, gap: 4 }}>
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} style={{ display: "grid", gridTemplateRows: `repeat(${days},1fr)`, gap: 4 }}>
              {Array.from({ length: days }).map((_, d) => {
                const v = cells[w * days + d];
                return <div key={d} style={{ aspectRatio: "1", borderRadius: 4, background: levels[v], border: `1px solid ${t.border}` }} />;
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2" style={{ marginTop: 12, fontSize: 12, color: t.faint }}>
          Less {levels.map((l, i) => <span key={i} style={{ width: 12, height: 12, borderRadius: 3, background: l, border: `1px solid ${t.border}`, display: "inline-block" }} />)} More
        </div>
      </div>

      <div style={{ padding: 22, borderRadius: 20, background: t.surface, border: `1px solid ${t.border}` }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Skill graph</div>
        <div className="flex" style={{ flexDirection: "column", gap: 16 }}>
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 13, color: t.sub, fontWeight: 700 }}>{s.v}%</span>
              </div>
              <div style={{ height: 9, borderRadius: 99, background: t.border, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.v}%`, background: GRAD, borderRadius: 99, transition: "width 1s cubic-bezier(.2,.8,.2,1)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
