# AI Resume Optimizer (MVP)

Production-ready MVP built with Next.js App Router, Tailwind, OpenAI, Tesseract OCR, and Puppeteer PDF export.

## Features

- Paste resume text or upload image screenshot for OCR extraction
- Paste job description and run analysis
- Structured resume parser output (`name`, `experience`, `bullets`, `skills`)
- Bullet enhancement (action + impact + metrics, with estimated metric labeling)
- JD rewrite mode
- Deterministic scoring engine:
  - keyword match %
  - missing skills
  - weak bullet detection
  - gap highlights
- Side-by-side original vs improved output
- PDF export
- Loading states + input validation + API error handling
- Sample test data + deterministic unit tests

## Tech Stack

- **Frontend:** Next.js App Router + TailwindCSS
- **Backend:** Next.js API routes
- **AI:** OpenAI API (`openai` SDK)
- **OCR:** `tesseract.js`
- **PDF:** `puppeteer`
- **Tests:** Vitest

## Folder Structure

```text
.
├── app
│   ├── api
│   │   ├── analyze/route.ts
│   │   ├── optimize/route.ts
│   │   └── export-pdf/route.ts
│   ├── results/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ComparisonPanel.tsx
│   └── ScoreCard.tsx
├── lib
│   ├── __tests__/scoring.test.ts
│   ├── ocr.ts
│   ├── openai.ts
│   ├── optimizer.ts
│   ├── pdf.ts
│   ├── resume-parser.ts
│   ├── sample-data.ts
│   ├── scoring.ts
│   ├── types.ts
│   └── utils.ts
├── public/sample-data
│   ├── jd.txt
│   └── resume.txt
├── .env.example
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenAI key in `.env.local`.
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open:
   - Home: `http://localhost:3000`
   - Results: generated after analysis.

## API Endpoints

- `POST /api/analyze` 
  - Input: `{ resumeText?, jdText, imageBase64? }`
  - Runs OCR (when needed), parsing, deterministic scoring, and bullet optimization.
- `POST /api/optimize`
  - Input: `{ action: 'fix-bullets' | 'rewrite-jd', resumeText, jdText? }`
- `POST /api/export-pdf`
  - Input: `{ improvedResume }`
  - Returns downloadable PDF.

## Notes & Constraints Enforcement

- No fabricated employers, roles, or timelines in AI prompts.
- Any added metrics must be explicitly marked `estimated`.
- Edits are reversible via side-by-side original content retention.
- If AI call fails or times out, backend falls back to deterministic bullet formatting.

## Testing

```bash
npm run test
npm run typecheck
npm run lint
```
