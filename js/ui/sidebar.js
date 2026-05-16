const root = document.getElementById('root');

function renderSidebar() {
  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar';

  const navList = document.createElement('ul');
  navList.className = 'sidebar-nav';

  const items = ['Employees', 'Documents', 'Settings'];
  items.forEach(itemText => {
    const listItem = document.createElement('li');
    listItem.className = 'sidebar-item';

    const link = document.createElement('a');
    link.href = '#';
    link.className = 'sidebar-link';
    link.textContent = itemText;
    link.dataset.view = itemText.toLowerCase();

    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  sidebar.appendChild(navList);
  root.appendChild(sidebar);
}

export { renderSidebar };
