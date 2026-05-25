import { EMPLOYEES } from "../../data/employees.js";
import {
    cloneEmployee,
    getNextDocId,
    getSearchHaystack,
    normalizeEmployee
} from "./model.js";
import { loadEmployees, saveEmployees } from "./persistence.js";
import { formatEmployeeDate, formatFileSize, generateEmployeeId, getFileType, getToday } from "./utils.js";

let sharedStore = null;

export function getEmployeesStore() {
    if (!sharedStore) {
        const seed = loadEmployees(EMPLOYEES);
        sharedStore = createEmployeesStore(seed);
    }
    return sharedStore;
}

export function createEmployeesStore(initialEmployees = []) {
    let state = {
        employees: initialEmployees.map(normalizeEmployee),
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
                updated = normalizeEmployee({
                    ...employee,
                    ...updates,
                    updated: formatEmployeeDate()
                });
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
        const nextEmployee = normalizeEmployee(employee);
        state = {
            ...state,
            employees: [...state.employees, nextEmployee]
        };
        notify();
        return cloneEmployee(nextEmployee);
    };

    const createEmployee = (values = {}) => {
        const employee = {
            id: generateEmployeeId(state.employees),
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            contact: values.contact || "",
            address: values.address || "",
            position: values.position,
            dept: values.dept,
            status: values.status || "Active",
            start_date: values.start_date || getToday(),
            updated: formatEmployeeDate(),
            picture: values.picture ?? null,
            docs: []
        };
        return addEmployee(employee);
    };

    const addDocument = (employeeId, file) => {
        let added = null;
        state = {
            ...state,
            employees: state.employees.map((employee) => {
                if (employee.id !== employeeId) {
                    return employee;
                }
                const doc = {
                    id: getNextDocId(state.employees),
                    name: file.name,
                    type: getFileType(file.name),
                    size: formatFileSize(file.size),
                    date: getToday(),
                    source: "upload"
                };
                added = doc;
                return normalizeEmployee({
                    ...employee,
                    docs: [...employee.docs, doc],
                    updated: formatEmployeeDate()
                });
            })
        };
        if (added) {
            notify();
        }
        return added;
    };

    const deleteDocument = (employeeId, docId) => {
        let removed = false;
        state = {
            ...state,
            employees: state.employees.map((employee) => {
                if (employee.id !== employeeId) {
                    return employee;
                }
                const nextDocs = employee.docs.filter((doc) => doc.id !== docId);
                if (nextDocs.length === employee.docs.length) {
                    return employee;
                }
                removed = true;
                return normalizeEmployee({
                    ...employee,
                    docs: nextDocs,
                    updated: formatEmployeeDate()
                });
            })
        };
        if (removed) {
            notify();
        }
        return removed;
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
        saveEmployees(state.employees);
        const snapshot = getSnapshot();
        listeners.forEach((listener) => listener(snapshot));
    };

    return {
        getSnapshot,
        setFilters,
        updateEmployee,
        deleteEmployee,
        addEmployee,
        createEmployee,
        addDocument,
        deleteDocument,
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
            const matchesDepartment = department ? employee.dept === department : true;
            const matchesStatus = status ? employee.status === status : true;
            const matchesTerm = term ? getSearchHaystack(employee).includes(term) : true;
            return matchesDepartment && matchesStatus && matchesTerm;
        })
        .map(cloneEmployee);
}
