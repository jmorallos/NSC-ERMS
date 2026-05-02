# NSC-ERMS MVP Development Plan

## Problem Statement
NSC currently relies on manual 201 files for employee records, which slows retrieval, risks data loss, and makes document management difficult. The MVP should deliver a usable desktop system that digitizes core employee records and documents for HR.

## MVP Goal
Deliver a stable Electron-based desktop app that allows HR/Admin users to:
1. Log in securely.
2. Manage employees and departments.
3. Upload, categorize, preview, search, and print employee documents.

## MVP Scope
### In Scope (MVP)
1. Authentication and role-based access (Administrator, HR Staff).
2. Employee CRUD with required fields (Employee ID, Name, Address, Contact, Position, Department, Employment Type, Date Hired, Status).
3. Department CRUD and employee-to-department assignment.
4. Document upload and metadata storage linked to employees.
5. Document categorization (Personal, Employment, Educational, Performance, Financial, Legal).
6. File preview (PDF/image) before final save.
7. Search/filter by Employee ID, Name, Department.
8. Print employee profile and selected documents.
9. Basic audit-safe constraints (input validation, duplicate Employee ID protection, role checks).

### Out of Scope (Post-MVP)
1. Payroll.
2. Biometric attendance integration.
3. Cloud/web deployment.
4. Mobile app.
5. Advanced analytics/reporting dashboards.

## Proposed Architecture (Aligned with Documentation)
1. **Desktop Shell:** Electron.
2. **Frontend (Presentation Layer):** HTML, CSS, Vanilla JS.
3. **Backend (Application Layer):** Node.js + Express API.
4. **Database (Data Layer):** PostgreSQL.
5. **Storage Strategy:** Files on local/managed storage path + document metadata in PostgreSQL.

## Delivery Phases
## Phase 1: Foundation Setup
1. Initialize Electron + Express integration structure.
2. Configure PostgreSQL connection and environment management.
3. Create base project structure, routing, and shared error handling pattern.
4. Define coding conventions and folder layout.

## Phase 2: Data Model and Persistence
1. Design and create schema/tables:
   - users
   - departments
   - employees
   - document_categories
   - employee_documents
2. Add indexes and constraints:
   - unique employee_id
   - foreign keys for department and document relations
   - mandatory fields and valid status checks
3. Seed default roles and document categories.

## Phase 3: Authentication and Authorization
1. Implement login/logout flow.
2. Add password hashing and session/token strategy.
3. Enforce route-level role checks:
   - Admin: full access
   - HR Staff: employee/document operations only

## Phase 4: Core CRUD Modules
1. Department management UI + API.
2. Employee management UI + API.
3. Validation rules and clear form error messages.

## Phase 5: Document Management
1. Upload documents and save file metadata.
2. Attach documents to employee records.
3. Categorize documents.
4. Preview PDF/images before save.
5. Handle unsupported file types and oversized files with explicit errors.

## Phase 6: Search and Printing
1. Add dynamic search/filter for employee listings.
2. Implement print views for employee profile and selected documents.
3. Ensure printable layouts are clean and legible.

## Phase 7: Hardening and MVP Release
1. Run end-to-end smoke scenarios for Admin and HR Staff.
2. Validate key non-functional targets (usability, retrieval speed, reliability).
3. Package and test desktop build for distribution.
4. Prepare MVP handoff notes and known limitations list.

## MVP Backlog (Execution Order)
1. Project scaffolding and environment config.
2. Database schema + seed data.
3. Auth + role-based access.
4. Departments CRUD.
5. Employees CRUD.
6. Document upload + categorization + preview.
7. Search/filter.
8. Printing.
9. Packaging and release checks.

## Acceptance Criteria for MVP
1. Admin and HR Staff can successfully log in.
2. Users can create, edit, delete, and view departments and employees (with role restrictions enforced).
3. Users can upload documents, assign categories, preview files, and link them to employees.
4. Users can search employees by ID, name, and department with responsive results.
5. Users can print employee record details and selected documents.
6. Core workflows complete without crashes in normal usage.

## Key Risks and Mitigations
1. **File handling issues (corrupt/invalid uploads):** strict validation, clear user feedback, safe file naming.
2. **Role misconfiguration:** central middleware and route tests for permission checks.
3. **Data inconsistency:** schema constraints, foreign keys, and transactional operations where needed.
4. **Desktop packaging issues:** early packaging tests and repeatable build steps.

## Notes
This plan prioritizes operational value for HR first (record digitization, retrieval, and document lifecycle) and defers non-essential integrations to post-MVP iterations.
