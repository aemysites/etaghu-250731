/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  const children = Array.from(grid.children);
  if (children.length !== 3) {
    return;
  }

  const leftInfo = children[0];
  const contactList = children[1];
  const rightImage = children[2];

  // Compose left column by referencing both info and contact list in order
  const leftCol = document.createElement('div');
  leftCol.appendChild(leftInfo);
  leftCol.appendChild(contactList);

  // Right column: just the image
  const rightCol = rightImage;

  // Create the table
  const table = document.createElement('table');

  // Header row with one cell, spanning two columns
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns (columns18)';
  headerCell.colSpan = 2;
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);

  // Data row with two cells
  const dataRow = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.appendChild(leftCol);
  const td2 = document.createElement('td');
  td2.appendChild(rightCol);
  dataRow.appendChild(td1);
  dataRow.appendChild(td2);
  table.appendChild(dataRow);

  element.replaceWith(table);
}
