// js/components/Table.js
function createTable(columns, data) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create table header
  const headerRow = document.createElement('tr');
  columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col.label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table body
  data.forEach(item => {
    const row = document.createElement('tr');
    columns.forEach(col => {
      const cell = col.render ? col.render(item) : createDefaultCell(item[col.key]);
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

function createDefaultCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}


export { createTable };
