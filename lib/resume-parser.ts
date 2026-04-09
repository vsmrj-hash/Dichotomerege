import { ParsedResume } from './types';

const BULLET_PREFIX = /^[-•*]\s+/;

export const parseResume = (raw: string): ParsedResume => {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const name = lines[0] || 'Unknown Candidate';
  const bullets = lines.filter((line) => BULLET_PREFIX.test(line)).map((line) => line.replace(BULLET_PREFIX, '').trim());

  const skillsLine = lines.find((line) => /^skills?\b/i.test(line));
  const skills = skillsLine
    ? skillsLine
        .replace(/^skills?\s*:?/i, '')
        .split(/[;,|]/)
        .map((token) => token.trim())
        .filter(Boolean)
    : [];

  const experience = extractExperience(lines);

  return {
    name,
    summary: lines.slice(1, 3).join(' '),
    experience,
    bullets,
    skills
  };
};

const extractExperience = (lines: string[]) => {
  const sections: { company: string; role: string; duration?: string; bullets: string[] }[] = [];
  let current: { company: string; role: string; duration?: string; bullets: string[] } | null = null;

  for (const line of lines) {
    if (line.toLowerCase().includes('experience')) continue;

    if (/\(.{2,20}\d{2,4}.{0,10}\)/.test(line) || /\b\d{4}\b/.test(line)) {
      const [role, companyRaw] = line.split(',').map((entry) => entry.trim());
      if (current) sections.push(current);

      current = {
        role: role || 'Role',
        company: companyRaw || 'Company',
        duration: (line.match(/\((.*?)\)/)?.[1] ?? '').trim(),
        bullets: []
      };
      continue;
    }

    if (BULLET_PREFIX.test(line) && current) {
      current.bullets.push(line.replace(BULLET_PREFIX, '').trim());
    }
  }

  if (current) sections.push(current);

  return sections;
};
