/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as per example
  const headerRow = ['Hero (hero6)'];

  // Row 2: Background Image
  // Find the FIRST <img> that is a direct or indirect descendant (background image)
  const bgImg = element.querySelector('img');
  const backgroundRow = [bgImg ? bgImg : ''];

  // Row 3: Content (title, subheading, CTA)
  // Look for the card containing the main content (heading, subheading, buttons)
  const card = element.querySelector('.card');
  const contentRow = [card ? card : ''];

  // Compose the table rows
  const cells = [
    headerRow,    // Header
    backgroundRow, // Background image
    contentRow    // Content block
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
