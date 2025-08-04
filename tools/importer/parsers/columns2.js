/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid has 3 logical columns:
  // 1. The big main card (left)
  // 2. Two stacked cards (center)
  // 3. List of links/cards with dividers (right)

  // Column 1: main card (the first <a.utility-link-content-block> that is a direct child of .grid-layout)
  let firstCol = null;
  for (const node of grid.children) {
    if (node.matches && node.matches('a.utility-link-content-block')) {
      firstCol = node;
      break;
    }
  }

  // Column 2: the flex group with two cards
  let secondCol = null;
  // Look for the first direct child flex container (not the .grid-layout itself)
  for (const node of grid.children) {
    if (
      node.classList &&
      node.classList.contains('flex-horizontal') &&
      node.classList.contains('flex-vertical') &&
      node.classList.contains('flex-gap-sm')
    ) {
      // Compose a wrapper div containing the two <a> cards
      const colWrapper = document.createElement('div');
      Array.from(node.querySelectorAll('a.utility-link-content-block')).forEach(card => {
        colWrapper.appendChild(card);
      });
      secondCol = colWrapper;
      break;
    }
  }

  // Column 3: the next flex-horizontal group (with cards and dividers)
  let thirdCol = null;
  let foundFirstFlex = false;
  for (const node of grid.children) {
    if (
      node.classList &&
      node.classList.contains('flex-horizontal') &&
      node.classList.contains('flex-vertical') &&
      node.classList.contains('flex-gap-sm')
    ) {
      if (!foundFirstFlex) {
        foundFirstFlex = true;
        continue;
      }
      // This is the second flex group: make a wrapper div with all cards and horizontal rules.
      const colWrapper = document.createElement('div');
      const cards = Array.from(node.querySelectorAll('a.utility-link-content-block'));
      cards.forEach((card, idx) => {
        colWrapper.appendChild(card);
        if (idx < cards.length - 1) {
          // Insert horizontal rule for divider between cards
          colWrapper.appendChild(document.createElement('hr'));
        }
      });
      thirdCol = colWrapper;
      break;
    }
  }

  // Compose the columns array
  const columns = [];
  if (firstCol) columns.push(firstCol);
  if (secondCol) columns.push(secondCol);
  if (thirdCol) columns.push(thirdCol);

  // Safety: if any columns are missing, fill with empty divs to ensure 3 columns as in design
  while (columns.length < 3) {
    columns.push(document.createElement('div'));
  }

  // Compose the table with correct header
  const cells = [
    ['Columns (columns2)'],
    columns
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
