export function getDepartments(employees = []) {
    const departments = new Set(employees.map((employee) => employee.department));
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

export function getInitials(name = "") {
    const parts = name.split(" ").filter(Boolean);
    const first = parts[0] ? parts[0][0] : "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase();
}
