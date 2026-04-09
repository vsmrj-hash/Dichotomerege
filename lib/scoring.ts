import { ParsedResume, ScoreBreakdown } from './types';
import { byFrequency, normalizeWords, uniq } from './utils';

const STOPWORDS = new Set(['with', 'that', 'this', 'have', 'from', 'your', 'will', 'using', 'into', 'across', 'about']);

export const extractKeywordsFromJD = (jdText: string): string[] => {
  const tokens = normalizeWords(jdText).filter((token) => !STOPWORDS.has(token));
  return byFrequency(tokens, 1).slice(0, 30);
};

export const findWeakBullets = (bullets: string[]): string[] =>
  bullets.filter((bullet) => !/(\d+%|\$\d+|\d+\+|improved|increased|reduced|launched|delivered)/i.test(bullet));

export const scoreResumeAgainstJD = (resume: ParsedResume, jdText: string): ScoreBreakdown => {
  const jdKeywords = extractKeywordsFromJD(jdText);
  const resumeCorpus = `${resume.summary ?? ''} ${resume.bullets.join(' ')} ${resume.skills.join(' ')}`.toLowerCase();

  const matched = jdKeywords.filter((keyword) => resumeCorpus.includes(keyword));
  const keywordMatchPercent = jdKeywords.length ? Math.round((matched.length / jdKeywords.length) * 100) : 0;
  const missingSkills = uniq(jdKeywords.filter((keyword) => !matched.includes(keyword))).slice(0, 12);
  const weakBullets = findWeakBullets(resume.bullets);

  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(keywordMatchPercent * 0.6 + Math.max(0, 30 - weakBullets.length * 4) + Math.max(0, 10 - missingSkills.length))
    )
  );

  const gaps = [
    missingSkills.length ? `Missing ${missingSkills.length} job keywords` : 'Good keyword coverage',
    weakBullets.length ? `${weakBullets.length} bullets need stronger impact` : 'Bullets are impact-oriented'
  ];

  return {
    score,
    keywordMatchPercent,
    missingSkills,
    weakBullets,
    gaps
  };
};
