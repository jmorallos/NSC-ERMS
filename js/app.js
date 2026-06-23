import { Sidebar } from "./components/Sidebar/sidebar.js";
import { ContentContainer } from "./components/ContentContainer/contentContainer.js";

const root = document.getElementById('app');
const contentContainer = document.getElementById('content-container');



function initApp() {
    root.replaceChildren('');
    root.innerHTML = `
        ${Sidebar()}
        ${ContentContainer()}
    `;
}

initApp();
