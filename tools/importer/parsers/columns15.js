/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Typically, leftCol is text/buttons, rightCol is image
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Group leftCol's content by block (based on structure in example)
  // - First block: heading + paragraph + button group
  // Add to left cell of first row
  const row1Left = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) row1Left.push(h1);
  const p = leftCol.querySelector('p');
  if (p) row1Left.push(p);
  const btnGroup = leftCol.querySelector('.button-group');
  if (btnGroup) row1Left.push(btnGroup);

  // RightCol: image goes in right cell of first row
  let img = null;
  if (rightCol && rightCol.tagName.toLowerCase() === 'img') {
    img = rightCol;
  } else if (rightCol) {
    img = rightCol.querySelector('img');
  }

  // Compose rows as in markdown example (single content row, but easily extensible)
  const rows = [
    ['Columns (columns15)'],
    [row1Left, img]
  ];

  // To generalize: if there are other content blocks (in longer HTML),
  // additional rows can be built and pushed to rows[] the same way.

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
