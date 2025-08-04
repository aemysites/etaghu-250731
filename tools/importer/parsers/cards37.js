/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const cells = [['Cards (cards37)']];

  // Find the top-level grid container that contains card elements
  const topGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!topGrid) return;

  // The first child is the large left card, the second child is a nested grid with the remaining cards
  const children = Array.from(topGrid.children);

  // Helper to extract card data from a card element (usually an <a> or a <div>)
  function extractCard(cardEl) {
    // Find image: look for first <img> descendant
    let img = cardEl.querySelector('img');
    // Left cell: image element, or null if not found
    const leftCell = img ? img : '';
    
    // Right cell: collect heading, description, and CTA if present
    const content = [];
    // Heading: h2, h3, h4, etc.
    const heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) content.push(heading);
    // Description: first <p> that is not inside a heading
    const paragraphs = Array.from(cardEl.querySelectorAll('p'));
    // We only want paragraphs that are not in a heading or button
    const desc = paragraphs.find(p => !p.closest('h1,h2,h3,h4,h5,h6,[class*=button],button'));
    if (desc) content.push(desc);
    // CTA: .button or button element that is not a heading
    const cta = cardEl.querySelector('a.button, .button:not([class*=heading]), button');
    if (cta) content.push(cta);

    return [leftCell, content];
  }

  // Process the first, large left card
  const firstCard = children.find(child => child.matches('a.utility-link-content-block'));
  if (firstCard) {
    cells.push(extractCard(firstCard));
  }

  // Process the nested grid for the list of smaller cards
  const nestedGrid = children.find(child => child.matches('.w-layout-grid'));
  if (nestedGrid) {
    Array.from(nestedGrid.children).forEach(cardEl => {
      cells.push(extractCard(cardEl));
    });
  }

  // Build table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
