import { EmployeesPanel } from "../../employees_panel/employeesPanel.js";

export const ContentContainer = () => {
    return /* html */ `
        <div id="content-container">
            ${EmployeesPanel()}
        </div>
    `;
}