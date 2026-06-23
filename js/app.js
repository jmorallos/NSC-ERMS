import { Sidebar } from "./components/Sidebar/sidebar.js";
import { ContentContainer } from "./components/ContentContainer/contentContainer.js";
import { renderEmployees } from "./employees_panel/employees_table/tableRow.js";

import { DATA } from "../MOCK_DATA.js";

const root = document.getElementById('app');
const contentContainer = document.getElementById('content-container');


const employeesData = DATA.EMPLOYEE_TABLE;


function initApp() {
    root.replaceChildren('');
    root.innerHTML = `
        ${Sidebar()}
        ${ContentContainer()}
    `;

    renderEmployees(employeesData);
}

initApp();

