import { env, requireEnv } from './config';

type Query = Record<string, string | number | boolean | undefined | null>;

function tableUrl(table: string, query?: Query) {
  const base = `${requireEnv('supabaseUrl').replace(/\/$/, '')}/rest/v1/${table}`;
  const params = new URLSearchParams();
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.set(key, String(value));
  });
  const suffix = params.toString();
  return suffix ? `${base}?${suffix}` : base;
}

async function request<T>(table: string, init: RequestInit & { query?: Query } = {}) {
  const res = await fetch(tableUrl(table, init.query), {
    ...init,
    headers: {
      apikey: requireEnv('supabaseServiceRoleKey'),
      Authorization: `Bearer ${env.supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers || {})
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${table} request failed: ${res.status} ${text}`);
  }

  if (res.status === 204) return null as T;
  return (await res.json()) as T;
}

export const db = {
  select: <T>(table: string, query?: Query) => request<T[]>(table, { method: 'GET', query }),
  insert: async <T>(table: string, body: unknown) => {
    const rows = await request<T[]>(table, { method: 'POST', body: JSON.stringify(body) });
    return rows[0];
  },
  update: async <T>(table: string, query: Query, body: unknown) => {
    const rows = await request<T[]>(table, { method: 'PATCH', query, body: JSON.stringify(body) });
    return rows[0];
  },
  upsert: async <T>(table: string, body: unknown, onConflict: string) => {
    const rows = await request<T[]>(table, {
      method: 'POST',
      query: { on_conflict: onConflict },
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify(body)
    });
    return rows[0];
  }
};
