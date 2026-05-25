import { DOC_TYPE_CLASS, STATUS_CLASS } from "./constants.js";
import { getFullName } from "./model.js";
import {
    formatDisplayName,
    getInitialsFromEmployee,
    getYearsOfService
} from "./utils.js";

export function createEmployeeDrawer({ store, onEdit, onDelete } = {}) {
    const root = document.createElement("div");
    root.className = "employee-drawer";
    root.setAttribute("aria-hidden", "true");
    let activeEmployee = null;
    let lastFocusedElement = null;

    const overlay = document.createElement("div");
    overlay.className = "drawer-overlay";

    const panel = document.createElement("aside");
    panel.className = "drawer-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Employee details");
    panel.tabIndex = -1;

    const hero = document.createElement("header");
    hero.className = "employee-hero";

    const heroTop = document.createElement("div");
    heroTop.className = "employee-hero-top";

    const avatar = document.createElement("div");
    avatar.className = "employee-hero-avatar";

    const heroInfo = document.createElement("div");
    heroInfo.className = "employee-hero-info";

    const name = document.createElement("h3");
    name.className = "employee-hero-name";
    name.textContent = "Employee";

    const role = document.createElement("p");
    role.className = "employee-hero-role";

    const badges = document.createElement("div");
    badges.className = "employee-hero-badges";

    const status = document.createElement("span");
    status.className = "status-badge status-default";

    const idBadge = document.createElement("span");
    idBadge.className = "employee-pill";

    const sinceBadge = document.createElement("span");
    sinceBadge.className = "employee-pill";

    badges.append(status, idBadge, sinceBadge);
    heroInfo.append(name, role, badges);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "employee-close";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.textContent = "Close";

    heroTop.append(avatar, heroInfo, closeButton);

    const actions = document.createElement("div");
    actions.className = "employee-hero-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-light";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", () => {
        if (activeEmployee && onEdit) {
            onEdit(activeEmployee, editButton);
        }
    });

    deleteButton.addEventListener("click", () => {
        if (activeEmployee && onDelete) {
            onDelete(activeEmployee);
        }
    });

    actions.append(editButton, deleteButton);
    hero.append(heroTop, actions);

    const body = document.createElement("div");
    body.className = "employee-body";

    const tabs = document.createElement("div");
    tabs.className = "employee-tabs";

    const personalTab = document.createElement("button");
    personalTab.type = "button";
    personalTab.className = "employee-tab is-active";
    personalTab.textContent = "Personal Info";

    const employmentTab = document.createElement("button");
    employmentTab.type = "button";
    employmentTab.className = "employee-tab";
    employmentTab.textContent = "Employment";

    const fileTab = document.createElement("button");
    fileTab.type = "button";
    fileTab.className = "employee-tab";
    fileTab.textContent = "201 File";

    tabs.append(personalTab, employmentTab, fileTab);

    const personalSection = document.createElement("section");
    personalSection.className = "employee-section";

    const personalTitle = document.createElement("p");
    personalTitle.className = "employee-section-title";
    personalTitle.textContent = "Personal Information";

    const personalList = document.createElement("dl");
    personalList.className = "employee-info-list";

    const personalFields = {
        name: createInfoRow(personalList, "Full Name"),
        email: createInfoRow(personalList, "Email"),
        contact: createInfoRow(personalList, "Contact"),
        address: createInfoRow(personalList, "Address")
    };

    personalSection.append(personalTitle, personalList);

    const employmentSection = document.createElement("section");
    employmentSection.className = "employee-section";
    employmentSection.hidden = true;

    const employmentTitle = document.createElement("p");
    employmentTitle.className = "employee-section-title";
    employmentTitle.textContent = "Employment";

    const employmentList = document.createElement("dl");
    employmentList.className = "employee-info-list";

    const employmentFields = {
        position: createInfoRow(employmentList, "Position"),
        department: createInfoRow(employmentList, "Department"),
        status: createInfoRow(employmentList, "Status"),
        hired: createInfoRow(employmentList, "Date Hired"),
        service: createInfoRow(employmentList, "Years of Service")
    };

    employmentSection.append(employmentTitle, employmentList);

    const fileSection = document.createElement("section");
    fileSection.className = "employee-section";
    fileSection.hidden = true;

    const fileToolbar = document.createElement("div");
    fileToolbar.className = "employee-file-toolbar";

    const uploadLabel = document.createElement("label");
    uploadLabel.className = "btn btn-primary btn-sm";
    uploadLabel.textContent = "Upload";

    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
    uploadInput.hidden = true;
    uploadLabel.setAttribute("for", "employee-doc-upload");
    uploadInput.id = "employee-doc-upload";

    uploadLabel.appendChild(uploadInput);
    fileToolbar.appendChild(uploadLabel);

    const fileCount = document.createElement("p");
    fileCount.className = "employee-file-count";

    const fileItems = document.createElement("div");
    fileItems.className = "employee-file-list";

    fileSection.append(fileToolbar, fileCount, fileItems);

    uploadInput.addEventListener("change", () => {
        const file = uploadInput.files[0];
        if (!file || !activeEmployee || !store) {
            return;
        }
        store.addDocument(activeEmployee.id, file);
        uploadInput.value = "";
        refreshActiveEmployee();
    });

    const setActiveTab = (tabButton, section) => {
        [personalTab, employmentTab, fileTab].forEach((button) => {
            button.classList.toggle("is-active", button === tabButton);
        });

        [personalSection, employmentSection, fileSection].forEach((panelSection) => {
            panelSection.hidden = panelSection !== section;
        });
    };

    personalTab.addEventListener("click", () => setActiveTab(personalTab, personalSection));
    employmentTab.addEventListener("click", () => setActiveTab(employmentTab, employmentSection));
    fileTab.addEventListener("click", () => setActiveTab(fileTab, fileSection));

    body.append(tabs, personalSection, employmentSection, fileSection);
    panel.append(hero, body);
    root.append(overlay, panel);

    const refreshActiveEmployee = () => {
        if (!activeEmployee || !store) {
            return;
        }
        const latest = store.getEmployeeById(activeEmployee.id);
        if (latest) {
            open(latest, lastFocusedElement);
        }
    };

    const renderAvatar = (employee) => {
        avatar.replaceChildren();
        avatar.className = "employee-hero-avatar";

        if (employee.picture) {
            const img = document.createElement("img");
            img.src = employee.picture;
            img.alt = getFullName(employee);
            img.className = "employee-hero-photo";
            avatar.appendChild(img);
            return;
        }

        avatar.textContent = getInitialsFromEmployee(employee);
    };

    const open = (employee, trigger) => {
        activeEmployee = employee;
        lastFocusedElement = trigger || document.activeElement;
        const displayName = formatDisplayName(employee);

        renderAvatar(employee);
        name.textContent = displayName;
        role.textContent = `${employee.position} · ${employee.dept}`;
        status.textContent = employee.status;
        status.className = `status-badge ${STATUS_CLASS[employee.status] || "status-default"}`;
        idBadge.textContent = `ID: ${employee.id}`;
        sinceBadge.textContent = `Since ${employee.start_date || employee.updated || "-"}`;

        personalFields.name.textContent = displayName;
        personalFields.email.textContent = employee.email;
        personalFields.contact.textContent = employee.contact || "-";
        personalFields.address.textContent = employee.address || "-";

        employmentFields.position.textContent = employee.position;
        employmentFields.department.textContent = employee.dept;
        employmentFields.status.textContent = employee.status;
        employmentFields.hired.textContent = employee.start_date || "-";
        employmentFields.service.textContent = getYearsOfService(employee.start_date);

        renderDocuments(fileItems, employee, fileCount, (employeeId, docId) => {
            store?.deleteDocument(employeeId, docId);
            refreshActiveEmployee();
        });

        panel.setAttribute("aria-label", `${displayName} details`);

        setActiveTab(personalTab, personalSection);

        root.classList.add("is-open");
        root.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        focusFirstElementIn(panel);
    };

    const close = () => {
        root.classList.remove("is-open");
        root.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
        lastFocusedElement = null;
        activeEmployee = null;
        panel.setAttribute("aria-label", "Employee details");
    };

    overlay.addEventListener("click", close);
    closeButton.addEventListener("click", close);
    panel.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            close();
            return;
        }

        if (event.key === "Tab") {
            trapFocusWithin(panel, event);
        }
    });

    return { root, open, close, refreshActiveEmployee };
}

function renderDocuments(container, employee, countEl, onChange) {
    container.replaceChildren();
    const docs = employee.docs || [];
    countEl.textContent = `${docs.length} document(s) on file`;

    if (!docs.length) {
        const empty = document.createElement("div");
        empty.className = "employee-file-empty";
        empty.textContent = "No documents on file.";
        container.appendChild(empty);
        return;
    }

    docs.forEach((doc) => {
        const item = document.createElement("div");
        item.className = "employee-file-item";

        const main = document.createElement("div");
        main.className = "employee-file-main";

        const type = document.createElement("span");
        type.className = `employee-file-type ${DOC_TYPE_CLASS[doc.type] || DOC_TYPE_CLASS.other}`;
        type.textContent = (doc.type || "file").toUpperCase();

        const name = document.createElement("span");
        name.className = "employee-file-name";
        name.textContent = doc.name;

        const meta = document.createElement("span");
        meta.className = "employee-file-meta";
        meta.textContent = `${doc.size} · ${doc.date}`;

        main.append(type, name, meta);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "btn btn-ghost btn-sm";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            if (typeof onChange === "function") {
                onChange(employee.id, doc.id);
            }
        });

        item.append(main, removeButton);
        container.appendChild(item);
    });
}

function getFocusableElements(container) {
    const elements = container.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );

    return Array.from(elements).filter((element) => {
        const isHidden = element.getAttribute("aria-hidden") === "true";
        const isDisabled = element.hasAttribute("disabled");
        const isVisible = element.getClientRects().length > 0;
        return !isHidden && !isDisabled && isVisible;
    });
}

function focusFirstElementIn(container) {
    const focusable = getFocusableElements(container);
    const target = focusable[0] || container;
    target.focus();
}

function trapFocusWithin(container, event) {
    const focusable = getFocusableElements(container);
    if (!focusable.length) {
        event.preventDefault();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
            event.preventDefault();
            last.focus();
        }
        return;
    }

    if (active === last || !container.contains(active)) {
        event.preventDefault();
        first.focus();
    }
}

function createInfoRow(container, label) {
    const row = document.createElement("div");
    row.className = "employee-info-row";

    const term = document.createElement("dt");
    term.textContent = label;

    const value = document.createElement("dd");
    value.textContent = "-";

    row.append(term, value);
    container.appendChild(row);

    return value;
}
