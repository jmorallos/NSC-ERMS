import { renderSidebar } from './ui/sidebar.js';
import { renderMainContent, updateMainContent } from './ui/mainContent.js';
import { createEmployeesView } from './views/employees.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderMainContent();
  loadView('employees'); // Load employees view by default

  document.querySelector('.sidebar-nav').addEventListener('click', (e) => {
    if (e.target.matches('.sidebar-link')) {
      e.preventDefault();
      const viewName = e.target.dataset.view;
      loadView(viewName);
    }
  });
});

function loadView(viewName) {
  let viewElement;
  switch (viewName) {
    case 'employees':
      viewElement = createEmployeesView();
      break;
    // Add cases for other views here
    default:
      viewElement = document.createElement('div');
      const heading = document.createElement('h2');
      heading.textContent = `${viewName} view not implemented`;
      viewElement.appendChild(heading);
  }
  updateMainContent(viewElement);
}
