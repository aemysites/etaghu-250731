/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table structure with the required header
  const cells = [['Cards (cards23)']];

  // Find the active tab pane or fallback to the first tab pane
  let activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) activePane = element.querySelector('.w-tab-pane');
  if (!activePane) return;

  // Find the grid containing the cards
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each card is an immediate child of the grid
  const cardEls = Array.from(grid.children);

  cardEls.forEach(card => {
    // First cell: image (if present)
    let img = card.querySelector('img') || '';

    // Second cell: all non-image visible content (preserving structure)
    // We'll build an array of text/element nodes to cover all content
    const content = [];
    // Prefer heading (h3 or .h4-heading)
    const heading = card.querySelector('h3,.h4-heading');
    if (heading) content.push(heading);
    // Add description (first .paragraph-sm inside card that is not inside a heading)
    const descs = Array.from(card.querySelectorAll('.paragraph-sm'));
    descs.forEach(desc => {
      if (!content.includes(desc)) content.push(desc);
    });
    // Fallback: if nothing in content, use all child nodes except images
    if (content.length === 0) {
      Array.from(card.childNodes).forEach(node => {
        if (
          node.nodeType === 1 && node.tagName !== 'IMG' && node.tagName !== 'DIV' && node.textContent.trim() !== ''
        ) {
          content.push(node);
        }
        if (node.nodeType === 3 && node.textContent.trim() !== '') {
          content.push(node.textContent.trim());
        }
      });
    }
    // Ensure at least one element or string is present
    if (content.length === 0) {
      const fallbackText = card.textContent.trim();
      if (fallbackText) content.push(fallbackText);
    }
    cells.push([
      img,
      content.length === 1 ? content[0] : content
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
