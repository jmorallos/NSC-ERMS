import { STATUS_CLASS } from "./constants.js";
import { getInitials } from "./utils.js";

export function createEmployeeDrawer({ onEdit, onDelete } = {}) {
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
    avatar.textContent = "";

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
    closeButton.textContent = "x";

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
            onEdit(activeEmployee);
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
    fileTab.textContent = "Documents";

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
        phone: createInfoRow(personalList, "Contact"),
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
        type: createInfoRow(employmentList, "Employment Type"),
        hired: createInfoRow(employmentList, "Date Hired"),
        supervisor: createInfoRow(employmentList, "Supervisor")
    };

    employmentSection.append(employmentTitle, employmentList);

    const fileSection = document.createElement("section");
    fileSection.className = "employee-section";
    fileSection.hidden = true;

    const fileItems = document.createElement("div");
    fileItems.className = "employee-file-list";

    fileSection.append(fileItems);

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

    const open = (employee, trigger) => {
        activeEmployee = employee;
        lastFocusedElement = trigger || document.activeElement;
        avatar.textContent = getInitials(employee.name);
        name.textContent = employee.name;
        role.textContent = `${employee.role} · ${employee.department}`;
        status.textContent = employee.status;
        status.className = `status-badge ${STATUS_CLASS[employee.status] || "status-default"}`;
        idBadge.textContent = `ID: ${employee.id}`;
        sinceBadge.textContent = `Since ${employee.since || employee.updated || "-"}`;
        personalFields.name.textContent = employee.name;
        personalFields.email.textContent = employee.email;
        personalFields.phone.textContent = employee.phone || "-";
        personalFields.address.textContent = employee.address || "-";
        employmentFields.position.textContent = employee.role;
        employmentFields.department.textContent = employee.department;
        employmentFields.status.textContent = employee.status;
        employmentFields.type.textContent = employee.employmentType || "-";
        employmentFields.hired.textContent = employee.since || "-";
        employmentFields.supervisor.textContent = employee.supervisor || "-";
        renderDocuments(fileItems, employee.documents || []);

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

    return { root, open, close };
}

function renderDocuments(container, documents = []) {
    container.replaceChildren();

    if (!documents.length) {
        const empty = document.createElement("div");
        empty.className = "employee-file-empty";
        empty.textContent = "No documents on file.";
        container.appendChild(empty);
        return;
    }

    documents.forEach((documentName) => {
        const item = document.createElement("div");
        item.className = "employee-file-item";

        const name = document.createElement("span");
        name.className = "employee-file-name";
        name.textContent = documentName;

        item.appendChild(name);
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
