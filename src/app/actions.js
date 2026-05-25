let addEmployeeHandler = null;

export function setAddEmployeeHandler(handler) {
    addEmployeeHandler = typeof handler === "function" ? handler : null;
}

export function requestAddEmployee() {
    if (addEmployeeHandler) {
        addEmployeeHandler();
    }
}
