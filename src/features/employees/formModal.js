import { EMPLOYEE_STATUSES } from "./constants.js";
import { getFullName } from "./model.js";
import { isValidEmail } from "./utils.js";

export function createEmployeeFormModal({ onSubmit } = {}) {
    const root = document.createElement("div");
    root.className = "employee-form-modal";
    root.setAttribute("aria-hidden", "true");

    const overlay = document.createElement("div");
    overlay.className = "form-modal-overlay";

    const dialog = document.createElement("div");
    dialog.className = "form-modal-panel form-modal-panel-wide";
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

    const photoWrap = document.createElement("div");
    photoWrap.className = "form-photo-wrap";

    const photoPreview = document.createElement("div");
    photoPreview.className = "form-photo-preview";
    photoPreview.textContent = "?";

    const photoLabel = document.createElement("label");
    photoLabel.className = "form-photo-label";
    photoLabel.textContent = "Upload photo";
    photoLabel.setAttribute("for", "employee-photo-input");

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.id = "employee-photo-input";
    photoInput.accept = "image/*";
    photoInput.hidden = true;

    photoWrap.append(photoPreview, photoLabel, photoInput);
    form.appendChild(photoWrap);

    let tempPhoto = null;

    const fields = {
        fname: createField("First name", "text", { required: true }),
        lname: createField("Last name", "text", { required: true }),
        email: createField("Email", "email", { required: true }),
        contact: createField("Contact", "tel"),
        address: createField("Address", "textarea", { fullWidth: true }),
        position: createField("Position", "text", { required: true }),
        dept: createField("Department", "text", { required: true }),
        status: createSelectField("Status", EMPLOYEE_STATUSES),
        start_date: createField("Start date", "date")
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

    const resetPhotoPreview = (employee = null) => {
        tempPhoto = employee?.picture ?? null;
        photoPreview.replaceChildren();
        photoPreview.className = "form-photo-preview";

        if (tempPhoto) {
            const img = document.createElement("img");
            img.src = tempPhoto;
            img.alt = getFullName(employee) || "Employee photo";
            img.className = "form-photo-image";
            photoPreview.appendChild(img);
            return;
        }

        photoPreview.textContent = "?";
    };

    photoInput.addEventListener("change", () => {
        const file = photoInput.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            tempPhoto = event.target.result;
            photoPreview.replaceChildren();
            const img = document.createElement("img");
            img.src = tempPhoto;
            img.alt = "Selected photo";
            img.className = "form-photo-image";
            photoPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    const close = () => {
        root.classList.remove("is-open");
        root.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        error.hidden = true;
        error.textContent = "";
        form.reset();
        photoInput.value = "";
        tempPhoto = null;
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

        fields.fname.input.value = employee?.fname || "";
        fields.lname.input.value = employee?.lname || "";
        fields.email.input.value = employee?.email || "";
        fields.contact.input.value = employee?.contact || "";
        fields.address.input.value = employee?.address || "";
        fields.position.input.value = employee?.position || "";
        fields.dept.input.value = employee?.dept || "";
        fields.status.select.value = employee?.status || EMPLOYEE_STATUSES[0];
        fields.start_date.input.value = employee?.start_date || "";

        resetPhotoPreview(employee);
        photoInput.value = "";

        error.hidden = true;
        error.textContent = "";

        root.classList.add("is-open");
        root.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        fields.fname.input.focus();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        error.hidden = true;
        error.textContent = "";

        const values = {
            fname: fields.fname.input.value.trim(),
            lname: fields.lname.input.value.trim(),
            email: fields.email.input.value.trim(),
            contact: fields.contact.input.value.trim(),
            address: fields.address.input.value.trim(),
            position: fields.position.input.value.trim(),
            dept: fields.dept.input.value.trim(),
            status: fields.status.select.value,
            start_date: fields.start_date.input.value,
            picture: tempPhoto
        };

        if (!values.fname || !values.lname || !values.position || !values.dept) {
            error.textContent = "First name, last name, position, and department are required.";
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

function createField(label, type, { required = false, fullWidth = false } = {}) {
    const group = document.createElement("label");
    group.className = fullWidth ? "form-field full-width" : "form-field";

    const name = document.createElement("span");
    name.className = "form-field-label";
    name.textContent = label;

    const input =
        type === "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    input.className = "input";
    if (type !== "textarea") {
        input.type = type;
    }
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
