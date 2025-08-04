/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Accordion (accordion34)'];
  const cells = [headerRow];
  // Find all accordion blocks in the container
  const accordions = element.querySelectorAll(':scope > .accordion');
  accordions.forEach((accordion) => {
    // Title extraction
    let titleCell = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Try to find a direct child (not the icon) with the title
      const children = Array.from(toggle.children);
      // Find the first child that's not the icon
      const titleDiv = children.find(child => !child.classList.contains('dropdown-icon'));
      if (titleDiv) {
        titleCell = titleDiv;
      } else {
        // fallback: use the toggle's text
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    }
    // Content extraction
    let contentCell = '';
    const nav = accordion.querySelector('.w-dropdown-list');
    if (nav) {
      // Try to find the first content wrapper
      const contentWrapper = nav.querySelector('.utility-padding-all-1rem.utility-padding-horizontal-0');
      if (contentWrapper) {
        // If it contains only one child (like .rich-text), use it directly
        if (contentWrapper.childNodes.length === 1) {
          contentCell = contentWrapper.firstChild;
        } else if (contentWrapper.childNodes.length > 1) {
          contentCell = Array.from(contentWrapper.childNodes);
        } else {
          contentCell = '';
        }
      } else {
        // fallback: use nav directly
        if (nav.childNodes.length === 1) {
          contentCell = nav.firstChild;
        } else if (nav.childNodes.length > 1) {
          contentCell = Array.from(nav.childNodes);
        } else {
          contentCell = '';
        }
      }
    }
    cells.push([titleCell, contentCell]);
  });
  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
