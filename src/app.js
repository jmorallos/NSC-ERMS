import { NAV_LINKS } from "./config/navlinks.js";
import { renderSideBar } from "./components/sidebar.js";
import { initializeContainer } from "./components/containerContent.js";
const root = document.getElementById('root');

const div = document.createElement('div');
div.appendChild(renderSideBar(NAV_LINKS));
div.appendChild(initializeContainer());
div.className = "grid-container";

root.appendChild(div);