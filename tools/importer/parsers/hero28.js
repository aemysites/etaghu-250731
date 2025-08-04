/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Hero (hero28)'];

  // --- Extract Background Image ---
  let bgImg = null;
  // Look for an image inside immediate child divs (to handle layout variations robustly)
  const immediateDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  for (const div of immediateDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const bgRow = [bgImg ? bgImg : ''];

  // --- Extract Main Text Content ---
  let textContainer = null;
  // Look for the first container with an h1 in it (as hero title is usually the h1)
  for (const div of immediateDivs) {
    if (div.querySelector('h1')) {
      textContainer = div;
      break;
    }
  }
  const contentRow = [textContainer ? textContainer : ''];

  // Create the hero block table
  const cells = [headerRow, bgRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
