import { getOpenAIClient } from './openai';
import { ParsedResume } from './types';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

const BASE_RULES = [
  'Never fabricate employers, job titles, dates, or achievements.',
  'If you add a metric, append "(estimated)" right after that metric.',
  'Keep bullet meaning grounded in the original statement.',
  'Return plain text only.'
].join('\n');

const withTimeout = async <T,>(promise: Promise<T>, ms = 5000): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('AI request timed out')), ms);
  });

  return Promise.race([promise, timeout]);
};

export const improveBullets = async (resume: ParsedResume): Promise<string> => {
  const client = getOpenAIClient();

  const prompt = `Rewrite only the bullets below to be stronger using action + impact + measurable outcome.\n${BASE_RULES}\n\nBullets:\n${resume.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}`;

  const response = await withTimeout(
    client.responses.create({
      model: MODEL,
      input: prompt,
      temperature: 0.2
    })
  );

  return response.output_text.trim();
};

export const rewriteForJD = async (resumeText: string, jdText: string): Promise<string> => {
  const client = getOpenAIClient();
  const prompt = `Rewrite this resume to better match the job description while staying factual.\n${BASE_RULES}\n\nResume:\n${resumeText}\n\nJob Description:\n${jdText}`;

  const response = await withTimeout(
    client.responses.create({
      model: MODEL,
      input: prompt,
      temperature: 0.3
    })
  );

  return response.output_text.trim();
};
