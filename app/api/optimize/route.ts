import { NextRequest, NextResponse } from 'next/server';
import { parseResume } from '@/lib/resume-parser';
import { improveBullets, rewriteForJD } from '@/lib/optimizer';

export async function POST(request: NextRequest) {
  try {
    const { action, resumeText, jdText } = (await request.json()) as {
      action: 'fix-bullets' | 'rewrite-jd';
      resumeText: string;
      jdText?: string;
    };

    if (!resumeText?.trim()) {
      return NextResponse.json({ error: 'resumeText is required' }, { status: 400 });
    }

    if (action === 'fix-bullets') {
      const parsed = parseResume(resumeText);
      const improved = await improveBullets(parsed);
      return NextResponse.json({ output: improved });
    }

    if (action === 'rewrite-jd') {
      if (!jdText?.trim()) {
        return NextResponse.json({ error: 'jdText is required for rewrite-jd' }, { status: 400 });
      }
      const improved = await rewriteForJD(resumeText, jdText);
      return NextResponse.json({ output: improved });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Optimization failed' }, { status: 500 });
  }
}
