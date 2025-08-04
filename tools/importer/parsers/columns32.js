/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that holds columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // Get top-level children of the grid (columns): usually images and content blocks
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Block table header: must be exact
  const headerRow = ['Columns (columns32)'];

  // Each column's content as cell. Use references to original nodes for resilience.
  // This grid is a two-column layout: left is image, right is content
  const firstCol = columns[0]; // the <img>
  const secondCol = columns[1]; // the <div> with all text

  // Compose the 2D array for createTable
  const cells = [
    headerRow,
    [firstCol, secondCol]
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
