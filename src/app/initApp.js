import { NAV_LINKS } from "../shared/config/navlinks.js";
import { renderSidebar } from "../shared/components/sidebar.js";
import { createShell } from "./shell.js";
import { resolveRoute } from "./routes.js";

const root = document.getElementById("root");

export function initApp() {
    if (!root) {
        return;
    }

    const sidebar = renderSidebar(NAV_LINKS);
    const shell = createShell({ sidebar });

    root.replaceChildren(shell.root);

    const render = () => {
        const route = resolveRoute(window.location.hash);
        const view = route.render();

        shell.titleEl.textContent = route.title;
        shell.contentEl.replaceChildren(view);
        setActiveNav(sidebar, route.key);
    };

    window.addEventListener("hashchange", render);

    if (!window.location.hash) {
        window.location.hash = "#employees";
    }

    render();
}

function setActiveNav(sidebar, routeKey) {
    const links = sidebar.querySelectorAll("[data-route]");

    links.forEach((link) => {
        const isActive = link.dataset.route === routeKey;
        link.classList.toggle("is-active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}
