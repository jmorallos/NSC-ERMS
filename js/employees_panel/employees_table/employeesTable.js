export const EmployeesTable = () => {
    return /* html */ `
        <div class="card__table">
            <table class="emp-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="emp-tbody">
                    <tr>
                        <td>1</td>
                        <td>
                            <p>John Doe</p>
                            <p>example@email.com</p>
                        </td>
                        <td>09123456789</td>
                        <td>Faculty</td>
                        <td>Information Technology</td>
                        <td>Active</td>
                        <td class="action-cell">
                            <button>...</button>
                        </td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>
                            <p>John Doe</p>
                            <p>example@email.com</p>
                        </td>
                        <td>09123456789</td>
                        <td>Faculty</td>
                        <td>Information Technology</td>
                        <td>Active</td>
                        <td class="action-cell">
                            <button>...</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    `;
}