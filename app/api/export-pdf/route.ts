import { NextRequest, NextResponse } from 'next/server';
import { htmlToPdfBuffer } from '@/lib/pdf';

export async function POST(request: NextRequest) {
  try {
    const { improvedResume } = (await request.json()) as { improvedResume?: string };

    if (!improvedResume?.trim()) {
      return NextResponse.json({ error: 'improvedResume is required' }, { status: 400 });
    }

    const html = `
      <html>
      <body style="font-family: Arial; white-space: pre-wrap; line-height: 1.5;">
        <h1>Optimized Resume</h1>
        <hr/>
        <div>${improvedResume.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </body>
      </html>
    `;

    const pdfBuffer = await htmlToPdfBuffer(html);
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="optimized-resume.pdf"'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'PDF export failed' }, { status: 500 });
  }
}
