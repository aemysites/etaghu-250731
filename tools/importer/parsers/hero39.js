/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must exactly match desired block name)
  const headerRow = ['Hero (hero39)'];

  // Find the background image (the only <img> in the left-side grid cell)
  // There may be overlays, but we want just the image element
  const leftCol = element.querySelector('.utility-min-height-100dvh, .cover-image')?.parentElement || element.querySelector('img')?.parentElement;
  let imgEl = null;
  if (leftCol) {
    imgEl = leftCol.querySelector('img');
  }
  // If no image found for any reason, let cell be null
  const backgroundRow = [imgEl ? imgEl : ''];

  // The right column has the content (heading, paragraph, CTA)
  // Find the container with class 'container' and then its first .grid-layout (which has the content)
  let contentCol = element.querySelector('.container');
  let contentBlock = null;
  if (contentCol) {
    const innerGrid = contentCol.querySelector('.grid-layout');
    // If found, use it; else, use the container itself
    contentBlock = innerGrid ? innerGrid : contentCol;
  }
  // If not found, fallback to the element itself (should never happen with supplied HTML)
  if (!contentBlock) contentBlock = element;
  
  // Output: table with 1 col, 3 rows
  const cells = [
    headerRow,
    backgroundRow,
    [contentBlock]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
