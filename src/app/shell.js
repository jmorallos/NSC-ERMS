export function createShell({ sidebar }) {
    const root = document.createElement("div");
    root.className = "app-shell";

    const main = document.createElement("main");
    main.className = "app-main";

    const topbar = document.createElement("header");
    topbar.className = "topbar";

    const titleGroup = document.createElement("div");
    titleGroup.className = "topbar-title";

    const eyebrow = document.createElement("p");
    eyebrow.className = "topbar-eyebrow";
    eyebrow.textContent = "Northern Samar Colleges";

    const heading = document.createElement("h1");
    heading.className = "topbar-heading";
    heading.textContent = "Employees";

    titleGroup.append(eyebrow, heading);

    const actions = document.createElement("div");
    actions.className = "topbar-actions";

    const primary = document.createElement("button");
    primary.type = "button";
    primary.className = "btn btn-primary";
    primary.textContent = "Add record";

    const secondary = document.createElement("button");
    secondary.type = "button";
    secondary.className = "btn btn-ghost";
    secondary.textContent = "Quick export";

    actions.append(primary, secondary);
    topbar.append(titleGroup, actions);

    const content = document.createElement("section");
    content.className = "content-area";
    content.setAttribute("aria-live", "polite");

    main.append(topbar, content);
    root.append(sidebar, main);

    return { root, contentEl: content, titleEl: heading };
}
