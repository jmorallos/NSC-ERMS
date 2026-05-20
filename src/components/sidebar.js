/**
 * @param {Array<{label: string, href: string, icon?: string}>} navItems
 * @returns {HTMLElement} The sidebar element 
*/

export function renderSideBar(navItems = []) {
  const container = document.createElement('aside');
  container.className = "sidebar";
  container.id = "sidebar";

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  navItems.forEach(item => {
    const list = document.createElement('li');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('icon');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', item.icon);
    svg.appendChild(use);


    const link = document.createElement('a');
    link.textContent = item.label;
    link.href = item.href;
    link.className = "link";

    list.append(svg, link);
    ul.append(list);
  });

  nav.append(ul);
  container.append(nav);
  return container;
}