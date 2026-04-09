export const runtime = "nodejs";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { resume, jd } = await req.json();

    if (!resume) {
      return new Response("Missing resume", { status: 400 });
    }

    const score = Math.min(100, Math.floor(Math.random() * 40) + 60);

    return Response.json({
      score,
      feedback: [
        "Add measurable impact",
        "Use stronger action verbs",
        "Match keywords from job description",
      ],
      improved: resume,
    });
  } catch {
    return new Response("Server error", { status: 500 });
  }
}