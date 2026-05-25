const STORAGE_KEY = "nsc-erms-employees";

export function loadEmployees(fallback = []) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return fallback.map(cloneStoredEmployee);
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || !parsed.length) {
            return fallback.map(cloneStoredEmployee);
        }
        return parsed.map(cloneStoredEmployee);
    } catch {
        return fallback.map(cloneStoredEmployee);
    }
}

export function saveEmployees(employees) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {
        // Storage full or unavailable; in-memory state still works.
    }
}

function cloneStoredEmployee(employee) {
    return {
        ...employee,
        documents: [...(employee.documents || [])]
    };
}
