/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row
  const headerRow = ['Cards (cards24)'];

  // Gather all immediate card <a> elements
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // IMAGE CELL
    // Find the first <img> inside the aspect-ratio container
    let img = null;
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // If for any reason there's no img, the cell will be null

    // TEXT CELL
    const fragments = [];
    // Find the horizontal flex row for tag+date
    const flex = card.querySelector('.flex-horizontal');
    if (flex) {
      const tag = flex.querySelector('.tag');
      const date = flex.querySelector('.paragraph-sm');
      if (tag || date) {
        // Wrap tags+date in a div for grouping
        const metaDiv = document.createElement('div');
        if (tag) {
          // Directly reference
          metaDiv.appendChild(tag);
        }
        if (date) {
          // Add a space if both
          if (tag) metaDiv.appendChild(document.createTextNode(' '));
          metaDiv.appendChild(date);
        }
        fragments.push(metaDiv);
      }
    }
    // Title (h3 or .h4-heading)
    let heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      fragments.push(heading);
    }
    // No further description or CTA in this HTML
    return [img, fragments];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
