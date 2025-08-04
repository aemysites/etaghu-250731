/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the block name exactly
  const headerRow = ['Hero (hero5)'];

  // Find the main grid containing the two columns (content + image)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Find all direct children of this grid
  const gridItems = mainGrid.querySelectorAll(':scope > *');

  // Find the image (background/decorative asset)
  let image = null;
  // The image is always an <img> element among the children
  for (const child of gridItems) {
    if (child.tagName === 'IMG') {
      image = child;
      break;
    }
  }
  // If not found, leave image as null

  // Find the content area (the non-image, typically a <div> with heading/text/buttons)
  let content = null;
  for (const child of gridItems) {
    if (child.tagName !== 'IMG') {
      content = child;
      break;
    }
  }
  // If not found, leave content as null

  // Compose rows
  const imageRow = [image || ''];
  const contentRow = [content || ''];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
