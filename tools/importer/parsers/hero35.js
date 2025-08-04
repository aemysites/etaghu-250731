/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row exactly as in the instructions
  const headerRow = ['Hero (hero35)'];

  // No background image is present in the provided HTML
  const backgroundRow = [''];

  // Find the grid container; if not present, fallback to entire element
  const grid = element.querySelector('.w-layout-grid');
  let contentRowCells = [];
  if (grid) {
    // We expect two main children: left (text) and right (CTA), but order may vary
    // Get all children of the grid
    const gridChildren = Array.from(grid.children);
    // Find the text block: should have an h2
    const textBlock = gridChildren.find(child => child.querySelector('h2'));
    // Find the CTA: an <a> with button class
    const cta = gridChildren.find(child => child.tagName === 'A' && child.classList.contains('button'));

    // Build the cell content in document order
    const content = [];
    if (textBlock) {
      // Add h2
      const h2 = textBlock.querySelector('h2');
      if (h2) content.push(h2);
      // Add subheading if present
      const sub = textBlock.querySelector('p');
      if (sub) content.push(sub);
    }
    if (cta) {
      content.push(cta);
    }
    // If there is any content, place it in a single cell; else leave empty
    contentRowCells = [content.length ? content : ''];
  } else {
    // If no grid found, fallback to the element's content
    contentRowCells = [element];
  }

  const cells = [
    headerRow,
    backgroundRow,
    contentRowCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
