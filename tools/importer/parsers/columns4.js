/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Build columns by extracting the img in each div
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img || div;
  });
  // Correction: The header row must have exactly one cell, but the content row can have N columns.
  const cells = [
    ['Columns (columns4)'], // Header row: exactly one cell
    columns                // Content row: one cell for each column
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
