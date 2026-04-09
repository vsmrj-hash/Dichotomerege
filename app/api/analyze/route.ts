import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromImage } from '@/lib/ocr';
import { improveBullets } from '@/lib/optimizer';
import { parseResume } from '@/lib/resume-parser';
import { scoreResumeAgainstJD } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jdText, imageBase64 } = body as {
      resumeText?: string;
      jdText?: string;
      imageBase64?: string;
    };

    if (!jdText?.trim()) {
      return NextResponse.json({ error: 'Job description is required.' }, { status: 400 });
    }

    let rawResume = resumeText?.trim() || '';
    if (!rawResume && imageBase64) {
      const payload = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      rawResume = await extractTextFromImage(Buffer.from(payload, 'base64'));
    }

    if (!rawResume) {
      return NextResponse.json({ error: 'Resume text or image is required.' }, { status: 400 });
    }

    const parsedResume = parseResume(rawResume);
    const score = scoreResumeAgainstJD(parsedResume, jdText);

    let improvedResume = rawResume;
    try {
      improvedResume = await improveBullets(parsedResume);
    } catch {
      improvedResume = parsedResume.bullets
        .map((bullet) => `- ${bullet}${/\d/.test(bullet) ? '' : ' (impact metric estimated)'}`)
        .join('\n');
    }

    return NextResponse.json({
      originalText: rawResume,
      parsedResume,
      improvedResume,
      score
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to analyze resume.'
      },
      { status: 500 }
    );
  }
}
