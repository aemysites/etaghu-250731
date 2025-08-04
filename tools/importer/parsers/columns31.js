/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid - these are the columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;
  // Header row: first cell with block name, rest are empty strings, to match column count
  const headerRow = Array(columns.length).fill('');
  headerRow[0] = 'Columns (columns31)';
  // Content row: each column element directly
  const contentRow = columns;
  // Assemble the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
