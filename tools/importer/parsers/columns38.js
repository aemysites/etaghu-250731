/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Create the table manually to ensure the header row contains exactly one column with colspan
  const table = document.createElement('table');

  // Header row: one <th> spanning all columns
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Columns (columns38)';
  if (columns.length > 1) {
    headerTh.setAttribute('colspan', columns.length);
  }
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Second row: one <td> per column
  const contentTr = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.appendChild(col);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  // Replace the original element with the new table
  element.replaceWith(table);
}
