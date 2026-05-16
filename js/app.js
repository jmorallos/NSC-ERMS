import { renderSidebar } from './ui/sidebar.js';
import { renderMainContent, updateMainContent } from './ui/mainContent.js';

const viewCreators = {
  employees: () => import('./views/employees.js').then(module => module.create()),
  employeeDetail: (employeeId) => import('./views/employeeDetail.js').then(module => module.create(employeeId)),
  // documents: () => import('./views/documents.js').then(module => module.create()),
  // settings: () => import('./views/settings.js').then(module => module.create()),
};

let currentView = null; // To keep track of the current view's cleanup function

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
  // Clean up the old view first
  if (currentView && currentView.destroy) {
    currentView.destroy();
  }

  if (viewCreators[viewName]) {
    try {
      const view = await viewCreators[viewName](param);
      currentView = view; // Store the new view
      updateMainContent(view.element);
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
    currentView = { element: viewElement, destroy: () => { } };
  }
}
