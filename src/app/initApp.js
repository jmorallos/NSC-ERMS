import { NAV_LINKS } from "../shared/config/navlinks.js";
import { renderSidebar } from "../shared/components/sidebar.js";
import { createShell } from "./shell.js";
import { resolveRoute } from "./routes.js";
import { createAppStore } from "./store.js";

const root = document.getElementById("root");

export function initApp() {
    if (!root) {
        return;
    }

    const sidebar = renderSidebar(NAV_LINKS);
    const shell = createShell({ sidebar });

    root.replaceChildren(shell.root);

    if (!window.location.hash) {
        window.location.hash = "#employees";
    }

    const store = createAppStore({
        initialRoute: resolveRoute(window.location.hash)
    });

    const render = (snapshot) => {
        const route = snapshot.route || resolveRoute(window.location.hash);
        const view = route.render();

        shell.titleEl.textContent = route.title;
        shell.contentEl.replaceChildren(view);
        setActiveNav(sidebar, route.key);
    };

    store.subscribe(render);

    window.addEventListener("hashchange", () => {
        store.setRoute(resolveRoute(window.location.hash));
    });

    render(store.getSnapshot());
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
