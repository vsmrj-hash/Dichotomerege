import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Revenue Operator',
  description: 'An AI operator that finds leads, researches accounts, writes outreach, analyzes replies, and prepares meetings.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
