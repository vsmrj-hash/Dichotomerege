import { env, requireEnv } from './config';

export async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${requireEnv('resendApiKey')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from: env.resendFromEmail, to, subject, html })
  });

  if (!res.ok) {
    throw new Error(`Resend request failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}
