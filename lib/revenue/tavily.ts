import { requireEnv } from './config';

export type TavilyResult = {
  title: string;
  url: string;
  content: string;
  score?: number;
};

export async function tavilySearch(query: string) {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${requireEnv('tavilyApiKey')}`
    },
    body: JSON.stringify({
      query,
      search_depth: 'advanced',
      include_answer: false,
      include_raw_content: false,
      max_results: 6
    })
  });

  if (!res.ok) {
    throw new Error(`Tavily request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return (data.results || []) as TavilyResult[];
}
