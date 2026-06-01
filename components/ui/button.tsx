import type { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  primary: 'bg-white text-slate-950 hover:bg-slate-200',
  secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
  danger: 'bg-red-500 text-white hover:bg-red-400'
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: keyof typeof variants }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
