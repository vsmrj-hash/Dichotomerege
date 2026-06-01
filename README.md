# AI Revenue Operator

Production-ready V1 for solo founders who need an AI-assisted outbound revenue workflow.

## What it does

- Creates founder projects with product, pricing, ICP, and website context.
- Finds qualified leads with Tavily search.
- Researches accounts and generates pain points, match rationale, and outreach angles with Claude.
- Generates concise personalized cold emails.
- Sends email through Resend when a contact email is present.
- Analyzes pasted replies and recommends the next action.
- Creates markdown meeting prep documents.
- Tracks leads found, emails sent, positive replies, and booked meetings on a dark SaaS dashboard.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Next.js API routes
- Supabase PostgREST using service role credentials
- Claude Messages API via direct HTTPS fetch
- Tavily Search API via direct HTTPS fetch
- Resend Email API via direct HTTPS fetch
- Vercel-compatible Node.js runtime routes

## Setup

1. Copy `.env.example` to `.env.local` and fill every key.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Install dependencies with `npm install`.
4. Start local development with `npm run dev`.

The app stores the current founder email in local storage and upserts that email into the `users` table before creating or loading projects.
