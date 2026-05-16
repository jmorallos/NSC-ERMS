import { createTable } from '../components/Table.js';
import { createBadge } from '../components/Badge.js';
import { createProfileCell } from '../components/ProfileCell.js';
import { employeesData } from '../../data/employees.js';

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

function create() {
  const view = document.createElement('div');

  const heading = document.createElement('h2');
  heading.textContent = 'Employees';
  view.appendChild(heading);

  const table = createTable(columns, employeesData);
  view.appendChild(table);

  return {
    element: view,
    destroy: () => { }
  };
}

export { create };
