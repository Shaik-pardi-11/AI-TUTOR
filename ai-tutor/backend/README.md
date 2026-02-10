# Backend for project

This folder contains a minimal Express + TypeScript backend that serves data from `../data`.

Quick start:

```bash
cd project/backend
npm install
npm run dev
```

Endpoints:
- `GET /api/domains` — returns `data/domains.json`
- `GET /api/topics` — returns `data/topics.json` (optional `?domain=` filter)
