/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the two main grids
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrids = container.querySelectorAll(':scope > .w-layout-grid');
  if (mainGrids.length < 2) return;

  // First main grid: two columns (headline + right section)
  const topGrid = mainGrids[0];
  const topColumns = Array.from(topGrid.children);
  // left: heading/eyebrow, right: intro, author, button
  
  // Second main grid: two images
  const bottomGrid = mainGrids[1];
  const bottomImages = Array.from(bottomGrid.children);

  // Build the two columns for the block

  // LEFT COLUMN: headline/eyebrow + right section (intro, author, button)
  const leftCol = document.createElement('div');
  if (topColumns[0]) leftCol.appendChild(topColumns[0]);
  if (topColumns[1]) leftCol.appendChild(topColumns[1]);

  // RIGHT COLUMN: both images stacked
  const rightCol = document.createElement('div');
  bottomImages.forEach(imgDiv => rightCol.appendChild(imgDiv));

  // Table structure: header row, then one row with both columns
  const rows = [
    ['Columns (columns11)'],
    [leftCol, rightCol],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
