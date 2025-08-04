/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, place the full content of the column in the cell (not just img)
  const cells = columns.map((col) => {
    // If the column has only one child (like an image), just use that child directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, collect all children
    return Array.from(col.childNodes).filter(node => {
      // Only add element or text nodes (skip comments)
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
  });
  const rows = [
    ['Columns (columns7)'],
    cells
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
