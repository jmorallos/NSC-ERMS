# NSC-ERMS

Employee Records Management System UI for Northern Samar Colleges. Vanilla JavaScript (ES modules), no build step.

## Run locally

ES modules require an HTTP server. From the project root:

```bash
npx --yes serve .
```

Then open the URL shown (for example `http://localhost:3000`).

## Features

- **Employees** — search, filter, detail drawer, add/edit form, delete (persisted in `localStorage`)
- **Quick Export, Backup and Restore, Settings** — placeholder screens
- Per-employee **201 File** (upload/remove document metadata) is in the employee drawer

## Data model (schema v2)

Each employee record uses:

- `fname`, `lname`, `email`, `contact`, `address`
- `position`, `dept`, `status`, `start_date`, `updated`
- `picture` (optional base64 image)
- `docs`: `[{ id, name, type, size, date, source }]`

Seed data lives in `src/data/employees.js`. Edits persist in `localStorage` (`nsc-erms-employees`). Legacy records are migrated automatically on load. Clear site data in DevTools to reset to the seed list.

## Structure

- `src/app/` — shell, routing, global store
- `src/features/` — feature views (employees is fully implemented)
- `src/shared/` — sidebar, placeholders
- `src/data/` — seed employee records
