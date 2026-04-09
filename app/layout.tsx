import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Resume Optimizer',
  description: 'Optimize resumes against job descriptions with OCR, AI rewrite, and deterministic scoring.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
