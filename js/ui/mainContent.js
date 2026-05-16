const root = document.getElementById('root');
let mainContent;

function renderMainContent() {
  mainContent = document.createElement('main');
  mainContent.className = 'main-content';
  root.appendChild(mainContent);
}

function updateMainContent(viewElement) {
  if (mainContent) {
    // Clear existing content
    while (mainContent.firstChild) {
      mainContent.removeChild(mainContent.firstChild);
    }
    mainContent.appendChild(viewElement);
  }
}

export { renderMainContent, updateMainContent };
