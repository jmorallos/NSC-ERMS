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
- **Documents, Quick Export, Backup and Restore, Settings** — placeholder screens

## Data

Seed data lives in `src/data/employees.js`. Edits are saved to the browser under the key `nsc-erms-employees`. Clear site data or remove that key in DevTools to reset to the seed list.

## Structure

- `src/app/` — shell, routing, global store
- `src/features/` — feature views (employees is fully implemented)
- `src/shared/` — sidebar, placeholders
- `src/data/` — seed employee records
