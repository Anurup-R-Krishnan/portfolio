import { Project, Skill } from '../types';

const githubPreview = (repository: string) =>
  `https://opengraph.githubassets.com/portfolio-project/${repository}`;

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'trustline',
    title: 'TrustLine',
    description: 'Bounded credit infrastructure for autonomous agents with deterministic financial controls.',
    longDescription: 'TrustLine binds autonomous agents to principal-signed Ed25519 mandates, applies deterministic risk and spending policies, prevents concurrent overspending with PostgreSQL row locks, and records decisions in a SHA-256 hash-chained audit ledger. Gemini turns precomputed facts into explanations but cannot approve transactions or change limits.',
    imageUrl: 'https://raw.githubusercontent.com/Anurup-R-Krishnan/TrustLine/main/docs/screenshots/overview-desktop.png',
    tags: ['Python', 'Django', 'PostgreSQL', 'TypeScript', 'Security'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/TrustLine',
    featured: true
  },
  {
    id: 'api-larp',
    title: 'API-LARP',
    description: 'An MCP server that connects OpenAPI changes to scoped consumer-code evidence.',
    longDescription: 'API-LARP, also called APIGuard, is a TypeScript MCP server built with NitroStack. It performs deterministic OpenAPI diffs, gathers bounded consumer evidence, uses an LLM only for ambiguous snippet classification, and records versioned human release decisions with fail-closed validation.',
    imageUrl: githubPreview('Anurup-R-Krishnan/api-larp'),
    tags: ['TypeScript', 'MCP', 'OpenAPI', 'NitroStack'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/api-larp'
  },
  {
    id: 'misinformation-cascade',
    title: 'Misinformation Cascade',
    description: 'A deterministic OpenEnv benchmark for misinformation containment under limited budgets.',
    longDescription: 'Misinformation Cascade models graph-driven spread, partial observability, intervention costs, and deterministic evaluation tasks for RL agents and LLMs. The submission passed its Hugging Face endpoint check, Docker build, and OpenEnv validation.',
    imageUrl: githubPreview('Anurup-R-Krishnan/MisinformationCascade'),
    tags: ['Python', 'FastAPI', 'OpenEnv', 'Agent Evaluation'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/MisinformationCascade'
  },
  {
    id: 'securemed',
    title: 'SecureMed',
    description: 'A security-first healthcare platform with role-based clinical workflows and auditability.',
    longDescription: 'SecureMed combines a Django REST backend with a Next.js frontend, PostgreSQL, Redis, and Docker. Its implemented domains include appointments, records, prescriptions, diagnostics, pharmacy, billing, telemedicine, consent history, MFA, account lockout, audit logging, and role-aware access controls.',
    imageUrl: githubPreview('Anurup-R-Krishnan/SecureMed'),
    tags: ['Django', 'Next.js', 'PostgreSQL', 'Redis', 'Security'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/SecureMed'
  },
  {
    id: 'sanctuary',
    title: 'Sanctuary',
    description: 'A cross-platform EPUB reader with synchronized libraries and reading progress.',
    longDescription: 'Sanctuary is a TypeScript monorepo for web, desktop, and mobile reading experiences. It uses React, Epub.js, Cloudflare Workers, Clerk, Tailwind CSS, and containerized development to support authenticated libraries, EPUB rendering, and synchronized reading state.',
    imageUrl: githubPreview('Anurup-R-Krishnan/Sanctuary'),
    tags: ['React', 'TypeScript', 'Epub.js', 'Cloudflare'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/Sanctuary'
  },
  {
    id: 'focusboard',
    title: 'FocusBoard',
    description: 'A desktop productivity system for automatic activity capture and local categorization.',
    longDescription: 'FocusBoard combines a Tauri and React desktop client, a Rust monitoring layer, Node.js services, and a FastAPI categorization service. It captures window-level activity without keystroke logging or screen recording and turns that data into timelines and focus insights.',
    imageUrl: githubPreview('Anurup-R-Krishnan/FocusBoard'),
    tags: ['React', 'Rust', 'FastAPI', 'Tauri', 'Machine Learning'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/FocusBoard'
  }
];

export const PORTFOLIO_SKILLS: Skill[] = [
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend' },
  { id: 'go', name: 'Go', category: 'Backend' },
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend' },
  { id: 'django', name: 'Django REST Framework', category: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend' },
  { id: 'node', name: 'Node.js', category: 'Backend' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Backend' },
  { id: 'redis', name: 'Redis', category: 'Backend' },
  { id: 'docker', name: 'Docker', category: 'Tools' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'Tools' },
  { id: 'git', name: 'Git/GitHub', category: 'Tools' }
];

export const ARCHIVE_PROJECTS = [
  { year: '2026', title: 'TASM', builtWith: 'Vue / Go', link: 'https://github.com/Anurup-R-Krishnan/tasm' },
  { year: '2026', title: 'Online FIR Portal', builtWith: 'React / Node.js', link: 'https://github.com/Anurup-R-Krishnan/OnlineFirPortal' },
  { year: '2026', title: 'Fire and Smoke Detection', builtWith: 'Python / CV', link: 'https://github.com/Anurup-R-Krishnan/fire-smoke-cv' },
  { year: '2026', title: 'Astra 5G Slicing', builtWith: 'RYU / Mininet', link: 'https://github.com/Anurup-R-Krishnan/astra-5g-slicing' },
  { year: '2026', title: 'ARIMA Sales Forecasting', builtWith: 'Python / ARIMA', link: 'https://github.com/Anurup-R-Krishnan/ARIMA-Sales-Forecasting-' },
  { year: '2026', title: 'Let\'s Redirect', builtWith: 'Plasmo / React', link: 'https://github.com/Anurup-R-Krishnan/lets-redirect' }
];
