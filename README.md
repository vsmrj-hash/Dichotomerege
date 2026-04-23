# Night Shift — Sleep Rescue MVP

Night Shift is a mobile-first sleep rescue app with a dark, low-stimulation interface and deterministic intervention routing.

## Implemented Stack (React)
- Next.js 14 App Router
- TypeScript + Tailwind CSS
- Client-side state mapping MCQ input -> intervention cards

## Product Flow
1. Entry: “I can’t sleep.”
2. Duration MCQ (`<20m`, `20-60m`, `1h+`)
3. Symptom multi-select
4. Payment gateway step (UPI or PayPal)
5. Dynamic interventions:
   - Cognitive Shuffler (Loud Thoughts)
   - 4-7-8 Breathing (Racing Heart)
   - Left-Side Protocol (Acidity/Heartburn)
   - Body Downshift (Physical Restlessness)
   - SOS Reset (20m+ awake)
6. Pro-Tips settings/checklist page

## React Code Structure
```text
app/
├── globals.css
├── layout.tsx
└── page.tsx

docs/
└── PRD-night-shift.md
```

## Flutter Reference Structure
See `docs/PRD-night-shift.md` for the complete Flutter parity architecture.

## Run
```bash
npm install
npm run dev
```
