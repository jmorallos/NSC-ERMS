import { createFilterSelect, getDepartments, getStatuses, updateFilterSelect } from "./utils.js";

export function createEmployeesToolbar(employees) {
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
        options: getDepartments(employees)
    });

    const statusSelect = createFilterSelect({
        id: "status-filter",
        label: "All Status",
        options: getStatuses(employees)
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

    const updateOptions = (nextEmployees = [], filters = {}) => {
        const departments = getDepartments(nextEmployees);
        const statuses = getStatuses(nextEmployees);

        const department = updateFilterSelect(departmentSelect, {
            label: "All Departments",
            options: departments,
            value: filters.department || ""
        });

        const status = updateFilterSelect(statusSelect, {
            label: "All Status",
            options: statuses,
            value: filters.status || ""
        });

        if (typeof filters.term === "string") {
            searchInput.value = filters.term;
        }

        return { department, status };
    };

    return {
        toolbar,
        addButton,
        searchInput,
        departmentSelect,
        statusSelect,
        updateOptions
    };
}
