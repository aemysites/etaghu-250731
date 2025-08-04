/* global WebImporter */
export default function parse(element, { document }) {
  // Exact header row as in the example: single column
  const headerRow = ['Columns (columns17)'];

  // Get all immediate div children (each is a cell)
  const cellDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Reshape into 2 rows x 3 columns (as in the screenshot/example)
  const numColumns = 3;
  const rows = [];
  for (let i = 0; i < cellDivs.length; i += numColumns) {
    rows.push(cellDivs.slice(i, i + numColumns));
  }

  // Compose rows: header row, then data rows
  const tableRows = [headerRow, ...rows];

  // Create block table and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
