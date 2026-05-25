export function createEmployeesStore(initialEmployees = []) {
    let state = {
        employees: initialEmployees.map(cloneEmployee),
        filters: {
            term: "",
            department: "",
            status: ""
        }
    };

    const listeners = new Set();

    const getSnapshot = () => ({
        employees: state.employees.map(cloneEmployee),
        filters: { ...state.filters },
        filteredEmployees: getFilteredEmployees(state)
    });

    const setFilters = (nextFilters = {}) => {
        state = {
            ...state,
            filters: {
                ...state.filters,
                ...nextFilters
            }
        };
        notify();
    };

    const updateEmployee = (id, updates = {}) => {
        let updated = null;
        state = {
            ...state,
            employees: state.employees.map((employee) => {
                if (employee.id !== id) {
                    return employee;
                }
                updated = { ...employee, ...updates };
                return updated;
            })
        };
        if (updated) {
            notify();
            return cloneEmployee(updated);
        }
        return null;
    };

    const deleteEmployee = (id) => {
        const nextEmployees = state.employees.filter((employee) => employee.id !== id);
        if (nextEmployees.length === state.employees.length) {
            return false;
        }
        state = {
            ...state,
            employees: nextEmployees
        };
        notify();
        return true;
    };

    const addEmployee = (employee) => {
        const nextEmployee = cloneEmployee(employee);
        state = {
            ...state,
            employees: [...state.employees, nextEmployee]
        };
        notify();
        return cloneEmployee(nextEmployee);
    };

    const getEmployeeById = (id) => {
        const employee = state.employees.find((item) => item.id === id);
        return employee ? cloneEmployee(employee) : null;
    };

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const notify = () => {
        const snapshot = getSnapshot();
        listeners.forEach((listener) => listener(snapshot));
    };

    return {
        getSnapshot,
        setFilters,
        updateEmployee,
        deleteEmployee,
        addEmployee,
        getEmployeeById,
        subscribe
    };
}

function getFilteredEmployees(state) {
    const term = state.filters.term.trim().toLowerCase();
    const department = state.filters.department;
    const status = state.filters.status;

    return state.employees
        .filter((employee) => {
            const matchesDepartment = department ? employee.department === department : true;
            const matchesStatus = status ? employee.status === status : true;
            const haystack = `${employee.name} ${employee.role} ${employee.id} ${employee.email} ${employee.phone || ""}`
                .toLowerCase();
            const matchesTerm = term ? haystack.includes(term) : true;
            return matchesDepartment && matchesStatus && matchesTerm;
        })
        .map(cloneEmployee);
}

function cloneEmployee(employee) {
    return { ...employee };
}
