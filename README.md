# SahaMinds

A privacy-first digital platform connecting people with verified psychologists — built as a working product prototype covering the client, psychologist and admin experiences end to end.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Zustand (shared mock "database" linking all three personas)
- Framer Motion for scroll reveals, Recharts for the earnings dashboard

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/(marketing)` — public site: home, psychologist marketplace, profiles, registration
- `src/app/dashboard` — client workspace
- `src/app/psychologist` — psychologist login, application, and practice dashboard
- `src/app/admin` — platform console (psychologists, verification, appointments, payments)
- `src/lib/mock-data.ts` + `src/lib/store.ts` — seed data and the shared state that keeps a booking made as a client visible to the psychologist and admin views in real time

## Notes

This is a prototype: payments, video calls and document uploads are simulated. Demo data resets from `/admin/settings`.
