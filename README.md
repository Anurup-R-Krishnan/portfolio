<div align="center">

# ✦ Anurup R Krishnan — Portfolio

### A living index of engineering work, experiments, and systems

[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](src/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](src/)
[![Vite](https://img.shields.io/badge/Vite-frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)](vite.config.ts)
[![GitHub data](https://img.shields.io/badge/data-verified%20GitHub%20repos-181717?style=for-the-badge&logo=github)](src/data/)
[![Cloudflare](https://img.shields.io/badge/deploy-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](wrangler.toml)

<p><a href="#highlights">Highlights</a> · <a href="#run-locally">Run locally</a> · <a href="#deployment">Deployment</a></p>

</div>

The source for my personal portfolio: selected engineering work, project archive, technical skills, background, résumé, and contact page.

## Highlights

- Project data backed by verified GitHub repositories
- Separate featured and archive views
- Searchable command palette and keyboard shortcuts
- Responsive light and AMOLED-style dark themes
- Page transitions and reduced-motion-aware animation
- Static fallback data so the portfolio works without Firebase
- Optional Firebase and EmailJS contact integrations
- Cloudflare Workers deployment configuration

## Technology

React 18, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Firebase, and EmailJS.

## Run locally

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Content

Verified project, archive, and skill data live in `data/portfolio.ts`. Personal copy and page structure are organised under `pages/` and reusable interface elements under `components/`.

If Firebase is not configured or cannot be reached, the application automatically uses the checked-in project and skill data. The résumé and profile image are served from `public/`.

## Optional services

`services/firebase.ts` contains the optional Firestore and EmailJS adapters used by the contact form and remote content loading. A local build does not need either service; it remains fully navigable with the repository data.

Do not commit service credentials. Any public browser key should be restricted to the intended domain and service operations.

## Deployment

`wrangler.toml` defines the Cloudflare Workers project name. Build the site before deploying the `dist/` output through the configured Cloudflare project.

## Repository map

- `data/portfolio.ts` — project, archive, and skill records
- `pages/` — home, about, projects, contact, and not-found views
- `components/` — navigation, project cards, command palette, transitions, and footer
- `services/firebase.ts` — optional content and contact adapters
- `public/` — profile image and résumé
