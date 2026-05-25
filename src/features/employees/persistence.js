import { SCHEMA_VERSION, normalizeEmployee } from "./model.js";

const STORAGE_KEY = "nsc-erms-employees";
const VERSION_KEY = "nsc-erms-schema-version";

export function loadEmployees(fallback = []) {
    try {
        const version = Number(localStorage.getItem(VERSION_KEY));
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return fallback.map(normalizeEmployee);
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || !parsed.length) {
            return fallback.map(normalizeEmployee);
        }

        const employees = parsed.map(normalizeEmployee);

        if (version !== SCHEMA_VERSION) {
            saveEmployees(employees);
        }

        return employees;
    } catch {
        return fallback.map(normalizeEmployee);
    }
}

export function saveEmployees(employees) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
        localStorage.setItem(VERSION_KEY, String(SCHEMA_VERSION));
    } catch {
        // Storage full or unavailable; in-memory state still works.
    }
}
