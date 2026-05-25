import { setAddEmployeeHandler } from "../../app/actions.js";
import { createEmployeeDrawer } from "./drawer.js";
import { createEmployeeFormModal } from "./formModal.js";
import { createEmployeesTable } from "./table.js";
import { createEmployeesToolbar } from "./toolbar.js";
import { getEmployeesStore } from "./store.js";
import { formatDisplayName } from "./utils.js";

export function renderEmployeesView() {
    const section = document.createElement("section");
    section.className = "employees-view";

    const store = getEmployeesStore();
    let drawer;

    const { employees } = store.getSnapshot();
    const {
        toolbar,
        addButton,
        searchInput,
        departmentSelect,
        statusSelect,
        updateOptions
    } = createEmployeesToolbar(employees);

    const formModal = createEmployeeFormModal({
        onSubmit: ({ mode, employeeId, values }) => {
            if (mode === "edit" && employeeId) {
                const updated = store.updateEmployee(employeeId, values);
                if (updated) {
                    drawer.open(updated);
                }
                return;
            }

            const created = store.createEmployee(values);
            if (created) {
                drawer.open(created);
            }
        }
    });

    const openAddForm = (trigger) => {
        formModal.open({ mode: "add", trigger });
    };

    const handleEdit = (employee, trigger) => {
        formModal.open({ mode: "edit", employee, trigger });
    };

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

    const handleDelete = (employee) => {
        const confirmed = window.confirm(`Delete ${formatDisplayName(employee)}?`);
        if (!confirmed) {
            return;
        }

        const deleted = store.deleteEmployee(employee.id);
        if (!deleted) {
            return;
        }
        drawer.close();
    };

    drawer = createEmployeeDrawer({
        store,
        onEdit: (employee, trigger) => handleEdit(employee, trigger),
        onDelete: handleDelete
    });

    section.append(toolbar, table, drawer.root, formModal.root);

    addButton.addEventListener("click", () => openAddForm(addButton));
    setAddEmployeeHandler(() => openAddForm(addButton));

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

        drawer.refreshActiveEmployee?.();
    });

    renderRows(store.getSnapshot().filteredEmployees);

    return section;
}
