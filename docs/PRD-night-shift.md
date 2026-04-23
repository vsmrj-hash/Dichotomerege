# Night Shift — Sleep Rescue MVP PRD

## 1) Product Summary
Night Shift is a mobile-first sleep rescue app that gives immediate, evidence-aligned interventions when a user is awake at night and unable to fall asleep.

### Goals
- Reduce time-to-intervention from app open to actionable protocol in under 20 seconds.
- Route users to tailored interventions using 2 MCQ steps.
- Keep visual and copy load low enough for sleepy, cognitively fatigued users.

### Non-Goals (MVP)
- No account system.
- No wearable integrations.
- No medical diagnosis claims.

## 2) Target User
- Adults who wake at night or cannot initiate sleep.
- Primary context: one-handed phone use in low-light conditions.

## 3) Core User Flow
1. Entry screen: “I can’t sleep.”
2. MCQ #1: “How long have you been trying?” (<20m, 20–60m, 1h+)
3. MCQ #2: “What is the friction?” (multi-select)
4. Dynamic intervention cards appear immediately based on state map.
5. User can switch to Pro-Tips tab for habit-level prevention settings.

## 4) Decision Engine Mapping

### Inputs
- `duration`: `lt20 | 20to60 | gt60`
- `symptoms[]`: `loud-thoughts | racing-heart | acidity-heartburn | physical-restlessness`

### Outputs
- Loud Thoughts → Cognitive Shuffler
- Racing Heart → 4-7-8 Breathing
- Acidity/Heartburn → Left-Side Protocol
- Physical Restlessness → Body Downshift
- Duration >= 20m → SOS Reset

## 5) Functional Requirements
- Multi-select symptom handling.
- Deterministic mapping (no probabilistic recommendations).
- Breathing module includes animated visual pacing cue.
- Pro-Tips page includes:
  - Caffeine curfew (2:00 PM)
  - Exercise guideline (30m/day, stop 3h pre-bed)
  - 3-2-1 rule visual checklist
  - Environment checklist (18°C + grayscale mode)

## 6) UX/UI Requirements
- Dark-first UI with teal/orange accents.
- Large tap targets (>= 44px).
- Card-first layout.
- Scannable A–Z checklist style labels.
- Calm, directive tone with short imperative lines.

## 7) Technical Scope

### React / Next.js (Implemented)
- App Router Next.js front-end
- Client-side state in `app/page.tsx`
- Tailwind-based dark theme in `app/globals.css`
- Metadata and shell layout in `app/layout.tsx`

### Flutter (Reference Architecture for parity)
```
lib/
├── main.dart
├── app/
│   ├── app_shell.dart
│   ├── theme.dart
│   └── routes.dart
├── features/sleep_rescue/
│   ├── models/
│   │   ├── duration.dart
│   │   └── symptom.dart
│   ├── state/
│   │   └── rescue_controller.dart
│   ├── ui/
│   │   ├── entry_screen.dart
│   │   ├── symptom_sheet.dart
│   │   ├── intervention_cards.dart
│   │   └── breathing_circle.dart
│   └── logic/
│       └── intervention_mapper.dart
└── features/pro_tips/
    ├── ui/pro_tips_screen.dart
    └── ui/checklist_tile.dart
```

## 8) Success Metrics (MVP)
- 90% of sessions reach at least one intervention card.
- Median time from open to first intervention < 20s.
- >= 70% users complete at least one breathing or shuffler cycle.

## 9) Risks & Mitigations
- **Risk:** Overstimulation at night.
  - **Mitigation:** Minimal motion, low-contrast dark base, short copy.
- **Risk:** Misuse as medical treatment substitute.
  - **Mitigation:** Add “not a diagnostic tool” statement in future iteration.

## 10) Milestones
- M1: MVP UI + deterministic engine.
- M2: Session memory + local persistence.
- M3: Optional audio guidance + offline pack.
