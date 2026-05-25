import { getFullName } from "./model.js";

export function getDepartments(employees = []) {
    const departments = new Set(employees.map((employee) => employee.dept).filter(Boolean));
    return Array.from(departments).sort();
}

export function getStatuses(employees = []) {
    const statuses = new Set(employees.map((employee) => employee.status));
    return Array.from(statuses).sort();
}

export function createFilterSelect({ id, label, options = [] }) {
    const select = document.createElement("select");
    select.className = "input";
    select.id = id;
    select.setAttribute("aria-label", label);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = label;
    select.appendChild(defaultOption);

    options.forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        select.appendChild(option);
    });

    return select;
}

export function updateFilterSelect(select, { label, options = [], value = "" }) {
    if (!select) {
        return "";
    }

    const normalizedValue = options.includes(value) ? value : "";

    select.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = label;
    select.appendChild(defaultOption);

    options.forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        select.appendChild(option);
    });

    select.value = normalizedValue;

    return normalizedValue;
}

export function getInitials(fname = "", lname = "") {
    const first = fname.trim()[0] || "";
    const last = lname.trim()[0] || "";
    return `${first}${last}`.toUpperCase() || "?";
}

export function getInitialsFromEmployee(employee) {
    return getInitials(employee?.fname, employee?.lname);
}

export function formatEmployeeDate(date = new Date()) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

export function getToday() {
    return new Date().toISOString().slice(0, 10);
}

export function generateEmployeeId(employees = []) {
    const numbers = employees.map((employee) => {
        const match = String(employee.id).match(/EMP-(\d+)/i);
        return match ? Number.parseInt(match[1], 10) : 0;
    });
    const next = Math.max(0, ...numbers, 0) + 1;
    return `EMP-${String(next).padStart(3, "0")}`;
}

export function isValidEmail(value = "") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function getFileType(filename = "") {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    if (ext === "pdf") {
        return "pdf";
    }
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
        return "img";
    }
    if (["doc", "docx"].includes(ext)) {
        return "doc";
    }
    return "other";
}

export function formatFileSize(bytes = 0) {
    if (!bytes) {
        return "—";
    }
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDisplayName(employee) {
    return getFullName(employee) || "Employee";
}

export function getYearsOfService(startDate = "") {
    if (!startDate) {
        return "—";
    }
    const start = new Date(startDate);
    if (Number.isNaN(start.getTime())) {
        return "—";
    }
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    const monthDiff = now.getMonth() - start.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
        years -= 1;
    }
    if (years < 1) {
        return "Less than 1 year";
    }
    return years === 1 ? "1 year" : `${years} years`;
}
