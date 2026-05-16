// js/views/employees.js

const employeesData = [
  { listno: 1, empId: '2023-001', profileImage: 'https://via.placeholder.com/40', name: 'Dr. Evelyn Reed', email: 'e.reed@university.edu', contact: '123-456-7890', position: 'Professor', department: 'Computer Science', status: 'Active' },
  { listno: 2, empId: '2023-002', profileImage: 'https://via.placeholder.com/40', name: 'Dr. Samuel Green', email: 's.green@university.edu', contact: '234-567-8901', position: 'Associate Professor', department: 'Physics', status: 'Active' },
  { listno: 3, empId: '2023-003', profileImage: 'https://via.placeholder.com/40', name: 'Anna Gomez', email: 'a.gomez@university.edu', contact: '345-678-9012', position: 'Librarian', department: 'Library', status: 'On Leave' },
  { listno: 4, empId: '2023-004', profileImage: 'https://via.placeholder.com/40', name: 'Marcus Wright', email: 'm.wright@university.edu', contact: '456-789-0123', position: 'IT Support', department: 'Administration', status: 'Active' },
];

function createEmployeesView() {
  const view = document.createElement('div');

  const heading = document.createElement('h2');
  heading.textContent = 'Employees';
  view.appendChild(heading);

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create table header
  const headerRow = document.createElement('tr');
  const headers = ['List No.', 'Emp ID', 'Name', 'Contact', 'Position', 'Department', 'Status'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table body
  employeesData.forEach(emp => {
    const row = document.createElement('tr');

    // List No
    let cell = document.createElement('td');
    cell.textContent = emp.listno;
    row.appendChild(cell);

    // Emp ID
    cell = document.createElement('td');
    cell.textContent = emp.empId;
    row.appendChild(cell);

    // Name
    cell = document.createElement('td');
    cell.className = 'employee-name-cell';
    const profileImage = document.createElement('img');
    profileImage.src = emp.profileImage;
    profileImage.alt = 'Profile';
    profileImage.className = 'profile-image';
    const nameContainer = document.createElement('div');
    const nameSpan = document.createElement('span');
    nameSpan.className = 'employee-name';
    nameSpan.textContent = emp.name;
    const emailSpan = document.createElement('span');
    emailSpan.className = 'employee-email';
    emailSpan.textContent = emp.email;
    nameContainer.appendChild(nameSpan);
    nameContainer.appendChild(emailSpan);
    cell.appendChild(profileImage);
    cell.appendChild(nameContainer);
    row.appendChild(cell);

    // Contact
    cell = document.createElement('td');
    cell.textContent = emp.contact;
    row.appendChild(cell);

    // Position
    cell = document.createElement('td');
    cell.textContent = emp.position;
    row.appendChild(cell);

    // Department
    cell = document.createElement('td');
    cell.textContent = emp.department;
    row.appendChild(cell);

    // Status
    cell = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge status-${emp.status.toLowerCase().replace(' ', '-')}`;
    statusBadge.textContent = emp.status;
    cell.appendChild(statusBadge);
    row.appendChild(cell);

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  view.appendChild(table);

  return view;
}

export { createEmployeesView };
