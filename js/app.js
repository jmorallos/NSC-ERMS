import { renderSidebar } from './ui/sidebar.js';
import { renderMainContent, updateMainContent } from './ui/mainContent.js';

const viewCreators = {
  employees: () => import('./views/employees.js').then(module => module.createEmployeesView()),
  employeeDetail: (employeeId) => import('./views/employeeDetail.js').then(module => module.createEmployeeDetailView(employeeId)),
  // documents: () => import('./views/documents.js').then(module => module.createDocumentsView()),
  // settings: () => import('./views/settings.js').then(module => module.createSettingsView()),
};

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderMainContent();
  loadView('employees'); // Load employees view by default

  // Sidebar navigation
  document.querySelector('.sidebar-nav').addEventListener('click', (e) => {
    if (e.target.matches('.sidebar-link')) {
      e.preventDefault();
      const viewName = e.target.dataset.view;
      loadView(viewName);
    }
  });

  // Content area navigation (for back buttons and table rows)
  document.querySelector('.main-content').addEventListener('click', (e) => {
    const backButton = e.target.closest('.back-button');
    const tableRow = e.target.closest('.clickable-row');

    if (backButton && backButton.dataset.view) {
      e.preventDefault();
      loadView(backButton.dataset.view);
    } else if (tableRow && tableRow.dataset.id) {
      e.preventDefault();
      loadView('employeeDetail', tableRow.dataset.id);
    }
  });
});

async function loadView(viewName, param) {
  if (viewCreators[viewName]) {
    try {
      const viewElement = await viewCreators[viewName](param);
      updateMainContent(viewElement);
    } catch (error) {
      console.error(`Error loading view: ${viewName}`, error);
      const errorElement = document.createElement('div');
      const heading = document.createElement('h2');
      heading.textContent = `Error loading ${viewName} view`;
      errorElement.appendChild(heading);
      updateMainContent(errorElement);
    }
  } else {
    const viewElement = document.createElement('div');
    const heading = document.createElement('h2');
    heading.textContent = `${viewName} view not implemented`;
    viewElement.appendChild(heading);
    updateMainContent(viewElement);
  }
}
