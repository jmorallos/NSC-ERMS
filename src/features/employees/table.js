import { STATUS_CLASS } from "./constants.js";
import { getInitials } from "./utils.js";

export function createEmployeesTable({ onSelect } = {}) {
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

    const renderRows = (items) => {
        tbody.replaceChildren();
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
            tbody.appendChild(createEmployeeRow(employee, index + 1, onSelect));
        });
    };

    return { table, renderRows };
}

function createEmployeeRow(employee, index, onSelect) {
    const row = document.createElement("tr");
    row.className = "employee-row";

    const indexCell = document.createElement("td");
    indexCell.textContent = index.toString();

    const idCell = document.createElement("td");
    idCell.textContent = employee.id;

    const nameCell = document.createElement("td");
    const nameButton = document.createElement("button");
    nameButton.type = "button";
    nameButton.className = "employee-row-button";
    nameButton.setAttribute("aria-label", `View ${employee.name} details`);
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
    nameButton.appendChild(employeeWrap);
    nameCell.appendChild(nameButton);

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

    if (typeof onSelect === "function") {
        nameButton.addEventListener("click", (event) => {
            event.stopPropagation();
            onSelect(employee, nameButton);
        });

        row.addEventListener("click", (event) => {
            if (event.target.closest("button")) {
                return;
            }
            onSelect(employee, nameButton);
        });
    }

    return row;
}
