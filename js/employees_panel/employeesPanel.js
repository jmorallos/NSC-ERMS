import { EmployeesTable } from "./employees_table/employeesTable.js";

export const EmployeesPanel = () => {
    return /* html */ `
        <main role="tabpanel">
            <header>
                <h2 class="panel__title">Employees</h2>
            </header>

            <div class="panel__actions">
                <div class=""></div>
            </div>

            <section>
                ${EmployeesTable()}
            </section>
        </main>
    `;
}