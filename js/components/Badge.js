// js/components/Badge.js
function createBadge(text) {
  const badge = document.createElement('span');
  const statusClass = `status-${text.toLowerCase().replace(' ', '-')}`;
  badge.className = `status-badge ${statusClass}`;
  badge.textContent = text;
  return badge;
}

export { createBadge };
