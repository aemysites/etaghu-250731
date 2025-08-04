/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with columns within the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child elements of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Create header row: exactly one column, matching the markdown example
  const headerRow = ['Columns (columns9)'];

  // Content row: as many cells as columns
  const contentRow = columns;

  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
