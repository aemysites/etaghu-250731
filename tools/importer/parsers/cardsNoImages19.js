/* global WebImporter */
export default function parse(element, { document }) {
  // Set up the header row as in the example: exactly 'Cards'
  const rows = [['Cards']];

  // Each card is a direct child div of the grid
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // The text content is always in the <p> element (may be optional in future, so check)
    const p = cardDiv.querySelector('p');
    if (p) {
      rows.push([p]); // Reference the existing <p> directly
    }
  });
  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
