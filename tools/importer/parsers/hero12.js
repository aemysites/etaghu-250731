/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (single .cover-image img in the first grid container that is NOT inside the card)
  let bgImg = null;
  const gridContainers = element.querySelectorAll('.w-layout-grid');
  for (const grid of gridContainers) {
    // Only consider .cover-image img that is NOT inside a .card
    const imgs = grid.querySelectorAll('img.cover-image');
    for (const img of imgs) {
      if (!img.closest('.card')) {
        bgImg = img;
        break;
      }
    }
    if (bgImg) break;
  }
  const row2 = [bgImg ? bgImg : ''];

  // 3. Content (heading, subtitle, cta)
  // We want just the main card's body content as a block
  // This is in .card-body (which contains the grid with image+text+button)
  let contentCell = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  } else {
    // Fallback: include the main .container if .card-body missing
    const mainContent = element.querySelector('.container');
    contentCell = mainContent ? mainContent : '';
  }
  const row3 = [contentCell];

  // Compose the final table
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
