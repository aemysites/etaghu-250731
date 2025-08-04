/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only add row if there is at least one column
  if (!columns.length) {
    element.remove();
    return;
  }

  // Construct the block table: header row is a single cell, second row contains each column in its own cell (matching example)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns29)'], // Header row: single cell
    columns                  // Content row: one cell per column
  ], document);

  element.replaceWith(table);
}
