/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as in the example
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get each card in the grid
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach(card => {
    // Left cell: image-containing div (contains the <img>)
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    // Right cell: the card's text/content container
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    // Only add rows where both image and content are present (robust against defects)
    if (imageDiv && contentDiv) {
      rows.push([imageDiv, contentDiv]);
    }
  });

  // Only replace if we have at least one card (plus header)
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
