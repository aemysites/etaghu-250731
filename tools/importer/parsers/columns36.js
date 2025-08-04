/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid layout (should contain two columns: text and image)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // 2. First column: left (text block with heading, subheading, buttons)
  const leftCol = gridChildren[0];

  // 3. Second column: right (grid of images)
  const rightCol = gridChildren[1];
  // The images are inside a nested .w-layout-grid
  let imagesGrid = rightCol.querySelector('.w-layout-grid');
  // fallback: if not found, use rightCol directly
  if (!imagesGrid) imagesGrid = rightCol;

  // 4. Compose table data
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftCol, imagesGrid];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
