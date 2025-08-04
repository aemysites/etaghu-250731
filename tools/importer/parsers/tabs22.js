/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Get tab labels from menu links
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];
  const labels = tabLinks.map(link => {
    // Prefer text from a child div, fallback to link text
    const childWithText = Array.from(link.children).find(child => child.textContent && child.textContent.trim());
    return childWithText ? childWithText.textContent.trim() : link.textContent.trim();
  });

  // Get tab panes (one per tab, in order)
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];
  // For each pane, grab the main grid inside as the content block
  const paneContents = tabPanes.map(pane => {
    // Look for the grid inside the pane (prefer more specific selector)
    const grid = pane.querySelector('.w-layout-grid, .grid-layout');
    return grid ? grid : pane;
  });

  // Build the table: header row is a single cell, subsequent rows are two columns
  const rows = [];
  rows.push(['Tabs']);
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i] || '';
    const content = paneContents[i] || '';
    rows.push([label, content]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
