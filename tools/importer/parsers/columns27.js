/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  if (!grid) {
    return; // Nothing to do if no grid
  }

  // Get all the immediate child nodes of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) {
    // Columns block should be at least 2 columns
    return;
  }

  // Prepare the table rows: first is header, then one row with all columns
  const headerRow = ['Columns (columns27)'];
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
