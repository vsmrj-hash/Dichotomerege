import { describe, expect, it } from 'vitest';
import { parseResume } from '@/lib/resume-parser';
import { scoreResumeAgainstJD } from '@/lib/scoring';

describe('scoreResumeAgainstJD', () => {
  it('computes keyword coverage and weak bullets deterministically', () => {
    const resume = parseResume(`Jordan Lee\nExperience\nProduct Manager, ABC Inc (2020-2024)\n- Improved activation by 18%\n- Worked on roadmap\nSkills: SQL, Jira, Leadership`);

    const result = scoreResumeAgainstJD(
      resume,
      'Need product manager with SQL, roadmap ownership, activation metrics and leadership skills.'
    );

    expect(result.keywordMatchPercent).toBeGreaterThan(10);
    expect(result.weakBullets.length).toBe(1);
    expect(result.score).toBeGreaterThan(0);
  });
});
