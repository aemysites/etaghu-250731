/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [['Cards (cards25)']];

  // Get all direct children, which are the cards
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // Find the first image in the card
    const img = card.querySelector('img');
    // Collect all headings and paragraphs inside the card (in document order)
    const textNodes = Array.from(card.querySelectorAll('h1,h2,h3,h4,h5,h6,p'));
    // Only create a card if both image and at least one text node
    if (img && textNodes.length > 0) {
      // Place the text nodes into a wrapper div
      const textBlock = document.createElement('div');
      textNodes.forEach(node => textBlock.appendChild(node));
      rows.push([img, textBlock]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
