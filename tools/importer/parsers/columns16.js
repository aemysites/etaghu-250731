/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // For each column, extract all content of the innermost div or directly from the column if no nested divs
  const columnCells = columns.map(col => {
    // Descend to innermost div if the structure is a chain of single-child divs
    let node = col;
    while (node && node.children.length === 1 && node.children[0].tagName === 'DIV') {
      node = node.children[0];
    }
    // Collect all child nodes (including text, images, buttons, etc.)
    const cellContent = Array.from(node.childNodes).filter(n => {
      // Keep elements, and non-empty text nodes
      return n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
    });
    // If only one content node, return that node, else return array of nodes
    if (cellContent.length === 1) return cellContent[0];
    if (cellContent.length > 1) return cellContent;
    // If no content, just return empty string
    return '';
  });

  // Header row: exactly one cell
  const rows = [
    ['Columns (columns16)'],
    columnCells
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
