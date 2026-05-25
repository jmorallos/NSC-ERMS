import { EMPLOYEE_STATUSES } from "./constants.js";
import { isValidEmail } from "./utils.js";

export function createEmployeeFormModal({ onSubmit } = {}) {
    const root = document.createElement("div");
    root.className = "employee-form-modal";
    root.setAttribute("aria-hidden", "true");

    const overlay = document.createElement("div");
    overlay.className = "form-modal-overlay";

    const dialog = document.createElement("div");
    dialog.className = "form-modal-panel";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.tabIndex = -1;

    const header = document.createElement("header");
    header.className = "form-modal-header";

    const title = document.createElement("h2");
    title.className = "form-modal-title";
    title.id = "employee-form-title";
    title.textContent = "Add employee";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "form-modal-close";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.textContent = "Close";

    header.append(title, closeButton);

    const form = document.createElement("form");
    form.className = "form-modal-form";
    form.setAttribute("aria-labelledby", "employee-form-title");
    form.noValidate = true;

    const fields = {
        name: createField("Full name", "text", { required: true }),
        email: createField("Email", "email", { required: true }),
        phone: createField("Contact", "tel"),
        role: createField("Position", "text", { required: true }),
        department: createField("Department", "text", { required: true }),
        status: createSelectField("Status", EMPLOYEE_STATUSES)
    };

    Object.values(fields).forEach((field) => form.appendChild(field.group));

    const error = document.createElement("p");
    error.className = "form-modal-error";
    error.hidden = true;
    error.setAttribute("role", "alert");

    const actions = document.createElement("div");
    actions.className = "form-modal-actions";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "btn btn-ghost";
    cancelButton.textContent = "Cancel";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.textContent = "Save";

    actions.append(cancelButton, submitButton);
    form.append(error, actions);

    dialog.append(header, form);
    root.append(overlay, dialog);

    let mode = "add";
    let employeeId = null;
    let lastFocusedElement = null;

    const close = () => {
        root.classList.remove("is-open");
        root.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        error.hidden = true;
        error.textContent = "";
        form.reset();
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
        lastFocusedElement = null;
        employeeId = null;
    };

    const open = ({ mode: nextMode = "add", employee = null, trigger = null } = {}) => {
        mode = nextMode;
        employeeId = employee?.id || null;
        lastFocusedElement = trigger || document.activeElement;

        title.textContent = mode === "edit" ? "Edit employee" : "Add employee";
        submitButton.textContent = mode === "edit" ? "Save changes" : "Add employee";

        fields.name.input.value = employee?.name || "";
        fields.email.input.value = employee?.email || "";
        fields.phone.input.value = employee?.phone || "";
        fields.role.input.value = employee?.role || "";
        fields.department.input.value = employee?.department || "";
        fields.status.select.value = employee?.status || EMPLOYEE_STATUSES[0];

        error.hidden = true;
        error.textContent = "";

        root.classList.add("is-open");
        root.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        fields.name.input.focus();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        error.hidden = true;
        error.textContent = "";

        const values = {
            name: fields.name.input.value.trim(),
            email: fields.email.input.value.trim(),
            phone: fields.phone.input.value.trim(),
            role: fields.role.input.value.trim(),
            department: fields.department.input.value.trim(),
            status: fields.status.select.value
        };

        if (!values.name || !values.role || !values.department) {
            error.textContent = "Name, position, and department are required.";
            error.hidden = false;
            return;
        }

        if (!values.email || !isValidEmail(values.email)) {
            error.textContent = "Enter a valid email address.";
            error.hidden = false;
            fields.email.input.focus();
            return;
        }

        if (onSubmit) {
            onSubmit({ mode, employeeId, values });
        }
        close();
    };

    overlay.addEventListener("click", close);
    closeButton.addEventListener("click", close);
    cancelButton.addEventListener("click", close);
    form.addEventListener("submit", handleSubmit);

    dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            close();
        }
    });

    return { root, open, close };
}

function createField(label, type, { required = false } = {}) {
    const group = document.createElement("label");
    group.className = "form-field";

    const name = document.createElement("span");
    name.className = "form-field-label";
    name.textContent = label;

    const input = document.createElement("input");
    input.className = "input";
    input.type = type;
    if (required) {
        input.required = true;
    }

    group.append(name, input);

    return { group, input };
}

function createSelectField(label, options) {
    const group = document.createElement("label");
    group.className = "form-field";

    const name = document.createElement("span");
    name.className = "form-field-label";
    name.textContent = label;

    const select = document.createElement("select");
    select.className = "input";

    options.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });

    group.append(name, select);

    return { group, select };
}
