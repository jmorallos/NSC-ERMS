export function renderSidebar(navItems = []) {
    const container = document.createElement("aside");
    container.className = "sidebar";
    container.id = "sidebar";

    const brand = document.createElement("div");
    brand.className = "sidebar-brand";

    const mark = document.createElement("div");
    mark.className = "brand-mark";

    const brandText = document.createElement("div");
    brandText.className = "brand-text";

    const name = document.createElement("p");
    name.className = "brand-name";
    name.textContent = "NSC";

    const sub = document.createElement("p");
    sub.className = "brand-sub";
    sub.textContent = "Employee Records";

    brandText.append(name, sub);
    brand.append(mark, brandText);

    const nav = document.createElement("nav");
    nav.className = "sidebar-nav";
    nav.setAttribute("aria-label", "Primary");

    const ul = document.createElement("ul");

    navItems.forEach((item) => {
        const list = document.createElement("li");

        const link = document.createElement("a");
        link.textContent = item.label;
        link.href = item.href;
        link.className = "nav-link";
        link.dataset.route = item.id;

        if (item.icon) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add("icon");
            svg.setAttribute("aria-hidden", "true");

            const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
            use.setAttributeNS("http://www.w3.org/1999/xlink", "href", item.icon);

            svg.appendChild(use);
            link.prepend(svg);
        }

        list.appendChild(link);
        ul.appendChild(list);
    });

    nav.appendChild(ul);

    const footer = document.createElement("div");
    footer.className = "sidebar-footer";
    footer.textContent = "Northern Samar Colleges";

    container.append(brand, nav, footer);
    return container;
}
