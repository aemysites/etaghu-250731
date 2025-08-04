/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header (matches the example exactly)
  const headerRow = ['Accordion (accordion13)'];

  // Get all direct children with class 'divider' (each is an accordion item)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // For each divider, extract the title (heading) and content (body)
  const rows = dividers.map(divider => {
    // The structure is: .divider > .w-layout-grid
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return null;
    // Expect two children: heading and content
    const children = Array.from(grid.children);
    // Find the heading (title)
    let title = children.find(child => child.classList.contains('h4-heading'));
    // Fallback to first child if not found
    if (!title && children[0]) title = children[0];
    // Find the content
    let content = children.find(child => child.classList.contains('rich-text'));
    // Fallback to second child if not found
    if (!content && children[1]) content = children[1];
    // Defensive: If title or content missing, ensure at least empty element
    if (!title) title = document.createElement('div');
    if (!content) content = document.createElement('div');
    return [title, content];
  }).filter(Boolean); // Filter out nulls (if any divider structure is malformed)

  // Compose final table rows
  const cells = [headerRow, ...rows];

  // Use createTable to structure the block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
