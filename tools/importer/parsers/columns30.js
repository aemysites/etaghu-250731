/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be the columns)
  const columns = Array.from(grid.children);

  // Defensive: expect at least 4 children for this layout
  if (columns.length < 4) return;

  // Prepare the 3 columns for the data row
  const col1 = columns[0]; // Taylor Brooks
  const col2 = columns[1]; // Tag list
  // Combine heading and description for third column
  const col3wrapper = document.createElement('div');
  if (columns[2]) col3wrapper.appendChild(columns[2]);
  if (columns[3]) col3wrapper.appendChild(columns[3]);

  // Create the table cells: header row has a single cell, data row has three
  const cells = [
    ['Columns (columns30)'],
    [col1, col2, col3wrapper]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
