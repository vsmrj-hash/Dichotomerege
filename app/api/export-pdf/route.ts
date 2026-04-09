export const runtime = "nodejs";

import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html) {
      return new Response("Missing HTML", { status: 400 });
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new Response(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}