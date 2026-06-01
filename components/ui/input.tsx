import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-white/30 ${props.className || ''}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`min-h-28 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-white/30 ${props.className || ''}`} />;
}

export function Label({ children }: { children: string }) {
  return <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{children}</label>;
}
