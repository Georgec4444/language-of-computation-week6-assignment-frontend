# Language of Computation — Week 6 Assignment (Frontend)

**Course:** MSAI-5523 — Language of Computation, Lipscomb University
**Module:** 6
**Frontend:** George (`Georgec4444`) — React + Vite (JavaScript)
**Backend:** Asha Abdulkadir (`AshaAbdulkadir`) — Python, FastAPI, PostgreSQL (Docker)

## Project overview

A library application for managing **books**, **members**, and **loans**.
This repository contains the frontend only. The backend lives in a separate
repository maintained by Asha.

## Current status

- [x] React + Vite project scaffolded
- [x] Interface layout: Dashboard, Books, Members, Loans (no API calls yet)
- [ ] Backend cloned into a sister folder
- [ ] API layer built from the backend's real `openapi.json`
- [ ] Books, Members, and Loans pages
- [ ] End-to-end testing against the running backend

## Approach to the backend

The frontend is built against the **real** backend contract. No endpoints
are invented or mocked. Once the backend is available:

1. Clone it into a sister folder next to this one:

   ```
   language-of-computation/
   ├── week6-assignment-frontend/   ← this repo
   └── week6-assignment-backend/    ← Asha's repo
   ```

2. Start it with Docker, following the backend README.
3. Read the generated contract at `http://<backend-host>/openapi.json`
   (interactive docs at `/docs`).
4. Build the frontend API calls to match that specification exactly.

## Requirements

- Node.js 20.19+ or 22.12+ (developed on Node 24)
- npm

## Getting started

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:5173
```

## Scripts

| Command           | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload       |
| `npm run build`   | Build a production bundle into `dist/`          |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`    | Lint the source with oxlint                     |

## Project structure

```
src/
├── main.jsx              # React entry point + router
├── App.jsx               # route definitions
├── config/backend.js     # backend connection flag (false until connected)
├── data/sampleData.js    # STATIC SAMPLE DATA — visual preview only
├── components/           # shared UI (layout, table, forms, badges, etc.)
├── pages/                # Dashboard, Books, Members, Loans, Not Found
├── styles/               # tokens, base, layout, component styles
└── utils/format.js       # date, year, and search helpers
```

## Preview data and disabled actions

Until the backend is connected:

- A red **Backend not connected** indicator is shown in the top bar.
- Each list page shows clearly labeled **sample data** and a toggle to
  preview the **empty state**. Sample field names are placeholders, not
  the database schema.
- Add, edit, delete, checkout, and return actions are visibly disabled.
  Forms open for layout review, but their submit buttons do not work.
