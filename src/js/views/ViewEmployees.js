export function viewEmployees() {

  return /* html */ `

<main class="table-container">
  <header>
    <h2 id="page-title">Employees</h2>
    <div class="search-wrapper">
      <input id="search" type="text" />
    </div>
  </header>

  <div id="emp-actions" class="emp-actions">
    <button id="btn-add-emp" class="btn-add-emp">
      <svg class="my-icon">
        <use href="./assets/icons/icons.svg#icon-plus"></use>
      </svg>
      Add Employee
    </button>
    <select id="departmentsFilter">
      <option value="">All Departments</option>
    </select>
    <select id="statusFilter">
      <option value="">All Status</option>
    </select>
  </div>

  <table id="emp-table">
    <thead>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>Employee</th>
        <th>Contact</th>
        <th>Position</th>
        <th>Department</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</main>

  `;
}