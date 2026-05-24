import { EMPLOYEES } from "./data.js";

const STATUS_CLASS = {
    Active: "status-active",
    "On Leave": "status-on-leave",
    "Pending Docs": "status-pending",
    Inactive: "status-inactive"
};

export function renderEmployeesView() {
    const section = document.createElement("section");
    section.className = "employees-view";

    const drawer = createEmployeeDrawer();

    const header = document.createElement("div");
    header.className = "employees-header";

    const titleGroup = document.createElement("div");
    titleGroup.className = "employees-title";

    const heading = document.createElement("h2");
    heading.textContent = "Employee Directory";

    const subtitle = document.createElement("p");
    subtitle.textContent = "Keep staff records organized, searchable, and ready for audits.";

    titleGroup.append(heading, subtitle);

    const meta = document.createElement("p");
    meta.className = "employees-meta";

    header.append(titleGroup, meta);


    const toolbar = document.createElement("div");
    toolbar.className = "employees-toolbar";

    const actions = document.createElement("div");
    actions.className = "employees-actions";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "btn btn-primary";
    addButton.textContent = "+ Add Employee";

    const departmentSelect = createFilterSelect({
        id: "department-filter",
        label: "All Departments",
        options: getDepartments()
    });

    const statusSelect = createFilterSelect({
        id: "status-filter",
        label: "All Status",
        options: getStatuses()
    });

    actions.append(addButton, departmentSelect, statusSelect);

    const searchGroup = document.createElement("label");
    searchGroup.className = "input-group input-search";
    searchGroup.textContent = "Search";

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "input";
    searchInput.placeholder = "Search employees...";
    searchInput.autocomplete = "off";
    searchInput.id = "employee-search";

    searchGroup.appendChild(searchInput);

    toolbar.append(actions, searchGroup);

    const table = document.createElement("table");
    table.className = "employees-table";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    ["No.", "ID", "Name", "Contact", "Position", "Department", "Status"].forEach((label) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = label;
        headRow.appendChild(th);
    });

    thead.appendChild(headRow);

    const tbody = document.createElement("tbody");
    table.append(thead, tbody);

    section.append(header, toolbar, table, drawer.root);

    const renderList = (items) => {
        tbody.replaceChildren();
        meta.textContent = `${items.length} record${items.length === 1 ? "" : "s"} shown`;

        if (!items.length) {
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.className = "employees-empty";
            emptyCell.colSpan = 7;
            emptyCell.textContent = "No employees match the current filters.";
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
            return;
        }

        items.forEach((employee, index) => {
            tbody.appendChild(createEmployeeRow(employee, index + 1, drawer.open));
        });
    };

    const applyFilters = () => {
        const term = searchInput.value.trim().toLowerCase();
        const department = departmentSelect.value;
        const status = statusSelect.value;

        const filtered = EMPLOYEES.filter((employee) => {
            const matchesDepartment = department ? employee.department === department : true;
            const matchesStatus = status ? employee.status === status : true;
            const haystack = `${employee.name} ${employee.role} ${employee.id} ${employee.email} ${employee.phone || ""}`.toLowerCase();
            const matchesTerm = term ? haystack.includes(term) : true;
            return matchesDepartment && matchesStatus && matchesTerm;
        });

        renderList(filtered);
    };

    searchInput.addEventListener("input", applyFilters);
    departmentSelect.addEventListener("change", applyFilters);
    statusSelect.addEventListener("change", applyFilters);

    renderList(EMPLOYEES);

    return section;
}

function createEmployeeRow(employee, index, onSelect) {
    const row = document.createElement("tr");
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute("aria-label", `View ${employee.name} details`);

    const indexCell = document.createElement("td");
    indexCell.textContent = index.toString();

    const idCell = document.createElement("td");
    idCell.textContent = employee.id;

    const nameCell = document.createElement("td");
    const employeeWrap = document.createElement("div");
    employeeWrap.className = "employee-cell";

    const avatar = document.createElement("div");
    avatar.className = "employee-avatar";
    avatar.textContent = getInitials(employee.name);

    const info = document.createElement("div");
    info.className = "employee-info";

    const name = document.createElement("p");
    name.className = "employee-name";
    name.textContent = employee.name;

    const email = document.createElement("p");
    email.className = "employee-email";
    email.textContent = employee.email;

    info.append(name, email);
    employeeWrap.append(avatar, info);
    nameCell.appendChild(employeeWrap);

    const contactCell = document.createElement("td");
    contactCell.textContent = employee.phone || "-";

    const roleCell = document.createElement("td");
    roleCell.textContent = employee.role;

    const departmentCell = document.createElement("td");
    departmentCell.textContent = employee.department;

    const statusCell = document.createElement("td");
    const status = document.createElement("span");
    status.className = `status-badge ${STATUS_CLASS[employee.status] || "status-default"}`;
    status.textContent = employee.status;
    statusCell.appendChild(status);
    row.append(indexCell, idCell, nameCell, contactCell, roleCell, departmentCell, statusCell);

    row.addEventListener("click", () => onSelect(employee));
    row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(employee);
        }
    });

    return row;
}

function createEmployeeDrawer() {
    const root = document.createElement("div");
    root.className = "employee-drawer";
    root.setAttribute("aria-hidden", "true");

    const overlay = document.createElement("div");
    overlay.className = "drawer-overlay";

    const panel = document.createElement("aside");
    panel.className = "drawer-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Employee details");
    panel.tabIndex = -1;

    const header = document.createElement("div");
    header.className = "drawer-header";

    const titleGroup = document.createElement("div");
    titleGroup.className = "drawer-title";

    const name = document.createElement("h3");
    name.className = "drawer-name";
    name.textContent = "Employee";

    const role = document.createElement("p");
    role.className = "drawer-role";

    titleGroup.append(name, role);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-ghost drawer-close";
    closeButton.textContent = "Close";

    header.append(titleGroup, closeButton);

    const status = document.createElement("span");
    status.className = "status-badge status-default";

    const details = document.createElement("dl");
    details.className = "drawer-details";

    const fields = {
        department: createDetailRow(details, "Department"),
        email: createDetailRow(details, "Email"),
        updated: createDetailRow(details, "Last update")
    };

    const actions = document.createElement("div");
    actions.className = "drawer-actions";

    const primary = document.createElement("button");
    primary.type = "button";
    primary.className = "btn btn-primary";
    primary.textContent = "View documents";

    const secondary = document.createElement("button");
    secondary.type = "button";
    secondary.className = "btn btn-ghost";
    secondary.textContent = "Edit profile";

    actions.append(primary, secondary);

    panel.append(header, status, details, actions);
    root.append(overlay, panel);

    const open = (employee) => {
        name.textContent = employee.name;
        role.textContent = `${employee.role} · ${employee.id}`;
        status.textContent = employee.status;
        status.className = `status-badge ${STATUS_CLASS[employee.status] || "status-default"}`;
        fields.department.textContent = employee.department;
        fields.email.textContent = employee.email;
        fields.updated.textContent = employee.updated;

        root.classList.add("is-open");
        root.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        panel.focus();
    };

    const close = () => {
        root.classList.remove("is-open");
        root.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    overlay.addEventListener("click", close);
    closeButton.addEventListener("click", close);
    panel.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            close();
        }
    });

    return { root, open, close };
}

function createDetailRow(container, label) {
    const row = document.createElement("div");
    row.className = "drawer-detail";

    const term = document.createElement("dt");
    term.textContent = label;

    const value = document.createElement("dd");
    value.textContent = "-";

    row.append(term, value);
    container.appendChild(row);

    return value;
}

function countByStatus(status) {
    return EMPLOYEES.filter((employee) => employee.status === status).length;
}

function getDepartments() {
    const departments = new Set(EMPLOYEES.map((employee) => employee.department));
    return Array.from(departments).sort();
}

function getStatuses() {
    const statuses = new Set(EMPLOYEES.map((employee) => employee.status));
    return Array.from(statuses).sort();
}

function createFilterSelect({ id, label, options }) {
    const select = document.createElement("select");
    select.className = "input";
    select.id = id;

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

function getInitials(name) {
    const parts = name.split(" ").filter(Boolean);
    const first = parts[0] ? parts[0][0] : "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase();
}
