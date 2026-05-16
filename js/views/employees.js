import { createTable } from '../components/Table.js';
import { createBadge } from '../components/Badge.js';
import { createProfileCell } from '../components/ProfileCell.js';

const employeesData = [
  { listno: 1, empId: '2023-001', profileImage: 'https://via.placeholder.com/40', name: 'Dr. Evelyn Reed', email: 'e.reed@university.edu', contact: '123-456-7890', position: 'Professor', department: 'Computer Science', status: 'Active' },
  { listno: 2, empId: '2023-002', profileImage: 'https://via.placeholder.com/40', name: 'Dr. Samuel Green', email: 's.green@university.edu', contact: '234-567-8901', position: 'Associate Professor', department: 'Physics', status: 'Active' },
  { listno: 3, empId: '2023-003', profileImage: 'https://via.placeholder.com/40', name: 'Anna Gomez', email: 'a.gomez@university.edu', contact: '345-678-9012', position: 'Librarian', department: 'Library', status: 'On Leave' },
  { listno: 4, empId: '2023-004', profileImage: 'https://via.placeholder.com/40', name: 'Marcus Wright', email: 'm.wright@university.edu', contact: '456-789-0123', position: 'IT Support', department: 'Administration', status: 'Active' },
];

const columns = [
  { key: 'listno', label: 'List No.' },
  { key: 'empId', label: 'Emp ID' },
  { key: 'name', label: 'Name', render: (item) => createProfileCell({ imageUrl: item.profileImage, name: item.name, email: item.email }) },
  { key: 'contact', label: 'Contact' },
  { key: 'position', label: 'Position' },
  { key: 'department', label: 'Department' },
  {
    key: 'status', label: 'Status', render: (item) => {
      const cell = document.createElement('td');
      cell.appendChild(createBadge(item.status));
      return cell;
    }
  },
];

function createEmployeesView() {
  const view = document.createElement('div');

  const heading = document.createElement('h2');
  heading.textContent = 'Employees';
  view.appendChild(heading);

  const table = createTable(columns, employeesData);
  view.appendChild(table);

  return view;
}

export { createEmployeesView };
