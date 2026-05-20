export function initializeContainer(view) {
  const div = document.createElement('div');
  div.className = "container-content";
  div.id = "container-content";
  div.textContent = "Main Conten Goes Here";

  return div;
}