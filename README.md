# Sai Srinivas Pedhapolla — Portfolio

Personal portfolio site built with Next.js, showcasing experience as a Data Engineer / Analyst, along with projects, skills, and an AI assistant ("JAD") that answers questions about my background.

Live: https://saisrinivaspedhapolla.vercel.app/

## Features

- **Resume-driven content** — experience, education, skills, and projects are all defined in one place ([`src/data/portfolio.ts`](src/data/portfolio.ts)) so the UI and the AI assistant stay in sync.
- **JAD, the AI assistant** — a chat widget (`src/app/sections/chat-assistant.tsx`) backed by `/api/ai-assistant`, which answers recruiter questions using only the portfolio context. Uses Gemini (free tier, with automatic fallback across models) or OpenAI if configured.
- **GitHub activity** — pulls recent repo activity via `/api/github`.
- **Contact form** — sends email via Resend (`/api/contact`).
- **Downloadable resume** — served directly from `/public`.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# AI assistant (pick one — Gemini is free-tier friendly)
GEMINI_API_KEY=your_gemini_key      # https://aistudio.google.com/apikey
OPENAI_API_KEY=your_openai_key      # optional, used if GEMINI_API_KEY is not set

# Contact form email
RESEND_API_KEY=your_resend_key      # https://resend.com
RESEND_FROM_EMAIL=you@yourdomain.com  # optional, defaults to Resend's sandbox sender
```

Without these, the site still runs — the AI assistant and contact form will show a friendly "not configured" message instead of erroring.

## Updating Content

All resume/portfolio content — experience, education, projects, skills, and contact links — lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Edit it there and both the page and the AI assistant's context update automatically.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the codebase
```

## Deployment

See [DEPLOY.md](DEPLOY.md) for step-by-step instructions on deploying to Vercel.

## Tech Stack

Next.js · React · TypeScript · Tailwind CSS · Gemini / OpenAI · Resend
