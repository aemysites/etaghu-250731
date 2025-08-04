/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid element that contains the columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  // Find the heading (the first heading element inside any column)
  let headingEl = null;
  for (const col of cols) {
    const h = col.querySelector('h1,h2,h3,h4,h5,h6');
    if (h) {
      headingEl = h;
      break;
    }
  }
  // If no heading found, fallback to first column's entire content as heading
  if (!headingEl && cols[0]) {
    headingEl = cols[0];
  }
  // Second column: all other content except the heading
  let contentEls = [];
  for (const col of cols) {
    // If this col contains the heading, use all siblings after heading
    if (col.contains(headingEl)) {
      // If the heading is not the only child, get siblings after heading
      let foundHeading = false;
      for (const node of Array.from(col.childNodes)) {
        if (node === headingEl) {
          foundHeading = true;
          continue;
        }
        if (foundHeading) {
          // skip empty text nodes
          if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) continue;
          contentEls.push(node);
        }
      }
    } else {
      // For other columns, push all content nodes
      for (const node of Array.from(col.childNodes)) {
        // skip empty text nodes
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) continue;
        contentEls.push(node);
      }
    }
  }
  // If contentEls is empty, fallback to all content from second column
  if (contentEls.length === 0 && cols[1]) {
    contentEls = Array.from(cols[1].childNodes).filter(node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
  }
  // Table rows
  const headerRow = ['Columns (columns14)'];
  const contentRow = [headingEl, contentEls];
  // Build table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
