import { findEmployeeById } from '../../data/employees.js';
import { createTable } from '../components/Table.js';

const documentColumns = [
  { key: 'name', label: 'Document Name' },
  { key: 'category', label: 'Category' },
  { key: 'dateAdded', label: 'Date Added' },
  {
    key: 'actions', label: 'Actions', render: (item) => {
      const cell = document.createElement('td');
      const viewButton = document.createElement('a');
      viewButton.href = item.url;
      viewButton.className = 'button-link';
      viewButton.textContent = 'View';
      viewButton.target = '_blank'; // Open in new tab
      cell.appendChild(viewButton);
      return cell;
    }
  },
];

function createEmployeeDetailView(employeeId) {
  const view = document.createElement('div');
  view.className = 'employee-detail-view';

  const employee = findEmployeeById(employeeId);

  if (!employee) {
    view.innerHTML = '<h2>Employee not found</h2>';
    return view;
  }

  // Header with back button and employee name
  const header = document.createElement('div');
  header.className = 'view-header';

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.textContent = '‹ Back to Employees';
  backButton.dataset.view = 'employees'; // For the router

  const heading = document.createElement('h2');
  heading.textContent = employee.name;

  header.appendChild(backButton);
  header.appendChild(heading);
  view.appendChild(header);

  // Employee Info Section (can be expanded)
  // ...

  // Documents Section
  const documentsHeading = document.createElement('h3');
  documentsHeading.textContent = 'Documents';
  view.appendChild(documentsHeading);

  if (employee.documents && employee.documents.length > 0) {
    const documentsTable = createTable(documentColumns, employee.documents);
    view.appendChild(documentsTable);
  } else {
    const noDocuments = document.createElement('p');
    noDocuments.textContent = 'No documents found for this employee.';
    view.appendChild(noDocuments);
  }

  return view;
}

export { createEmployeeDetailView };
