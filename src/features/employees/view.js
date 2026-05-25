import { EMPLOYEES } from "../../data/employees.js";
import { createEmployeeDrawer } from "./drawer.js";
import { createEmployeesTable } from "./table.js";
import { createEmployeesToolbar } from "./toolbar.js";
import { createEmployeesStore } from "./store.js";

export function renderEmployeesView() {
    const section = document.createElement("section");
    section.className = "employees-view";

    const store = createEmployeesStore(EMPLOYEES);
    let drawer;

    const { employees } = store.getSnapshot();
    const {
        toolbar,
        searchInput,
        departmentSelect,
        statusSelect,
        updateOptions
    } = createEmployeesToolbar(employees);

    const { table, renderRows } = createEmployeesTable({
        onSelect: (employee, trigger) => {
            const selected = store.getEmployeeById(employee.id);
            if (selected) {
                drawer.open(selected, trigger);
            }
        }
    });

    const syncFilters = () => {
        store.setFilters({
            term: searchInput.value,
            department: departmentSelect.value,
            status: statusSelect.value
        });
    };

    const handleEdit = (employee) => {
        const name = window.prompt("Full name", employee.name);
        if (name === null) {
            return;
        }

        const email = window.prompt("Email", employee.email);
        if (email === null) {
            return;
        }

        const phone = window.prompt("Contact", employee.phone || "");
        if (phone === null) {
            return;
        }

        const updated = store.updateEmployee(employee.id, {
            name: name.trim() || employee.name,
            email: email.trim() || employee.email,
            phone: phone.trim() || employee.phone
        });

        if (updated) {
            drawer.open(updated);
        }
    };

    const handleDelete = (employee) => {
        const confirmed = window.confirm(`Delete ${employee.name}?`);
        if (!confirmed) {
            return;
        }

        const deleted = store.deleteEmployee(employee.id);
        if (!deleted) {
            return;
        }
        drawer.close();
    };

    drawer = createEmployeeDrawer({ onEdit: handleEdit, onDelete: handleDelete });

    section.append(toolbar, table, drawer.root);

    searchInput.addEventListener("input", syncFilters);
    departmentSelect.addEventListener("change", syncFilters);
    statusSelect.addEventListener("change", syncFilters);

    store.subscribe((snapshot) => {
        const normalized = updateOptions(snapshot.employees, snapshot.filters);
        renderRows(snapshot.filteredEmployees);

        if (
            normalized.department !== snapshot.filters.department ||
            normalized.status !== snapshot.filters.status
        ) {
            store.setFilters({
                department: normalized.department,
                status: normalized.status
            });
        }
    });

    renderRows(store.getSnapshot().filteredEmployees);

    return section;
}
