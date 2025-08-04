/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Get the immediate children corresponding to the columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // 3. The header row must exactly be 'Columns (columns1)'
  const headerRow = ['Columns (columns1)'];
  // 4. The content row must reference the column elements directly
  const contentRow = columns;

  // 5. Create the table using the helper
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original element with the block table
  element.replaceWith(table);
}
