export const normalizeWords = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);

export const uniq = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

export const byFrequency = (tokens: string[], minCount = 1): string[] => {
  const counter = new Map<string, number>();
  for (const token of tokens) {
    counter.set(token, (counter.get(token) || 0) + 1);
  }

  return Array.from(counter.entries())
    .filter(([, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1])
    .map(([token]) => token);
};
