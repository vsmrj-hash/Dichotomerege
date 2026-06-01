import { env, requireEnv } from './config';

export async function claudeJson<T>(system: string, prompt: string): Promise<T> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': requireEnv('anthropicApiKey'),
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: env.anthropicModel,
      max_tokens: 1600,
      temperature: 0.35,
      system,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!res.ok) {
    throw new Error(`Claude request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const text = data.content?.map((part: { type: string; text?: string }) => part.type === 'text' ? part.text : '').join('') || '';
  const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleaned) as T;
}
