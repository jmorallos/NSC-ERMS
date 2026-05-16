const root = document.getElementById('root');

function renderSidebar() {
  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar';

  // Logo Section
  const logoContainer = document.createElement('div');
  logoContainer.className = 'sidebar-logo';

  const logoCircle = document.createElement('div');
  logoCircle.className = 'logo-circle';

  const logoTextContainer = document.createElement('div');
  logoTextContainer.className = 'logo-text';

  const logoTitle = document.createElement('span');
  logoTitle.className = 'logo-title';
  logoTitle.textContent = 'NSC';

  const logoSubtitle = document.createElement('span');
  logoSubtitle.className = 'logo-subtitle';
  logoSubtitle.textContent = 'Employee Records Management System';

  logoTextContainer.appendChild(logoTitle);
  logoTextContainer.appendChild(logoSubtitle);

  logoContainer.appendChild(logoCircle);
  logoContainer.appendChild(logoTextContainer);

  sidebar.appendChild(logoContainer);


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
