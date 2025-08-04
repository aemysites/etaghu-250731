/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract all immediate children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Defensive: If there are no columns, do nothing
  if (columns.length === 0) return;

  // The block name header must be in a single cell (one column)
  const headerRow = ['Columns (columns3)'];

  // The content row must have as many columns as the number of grid children
  const contentRow = columns;

  // Compose the table as per the specification: header is a single cell, next row has N cells (columns)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
