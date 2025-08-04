/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid (the one with columns)
  // Only select direct grid child, not nested ones
  const mainGrid = Array.from(container.children).find(
    (c) => c.classList.contains('grid-layout')
  );
  if (!mainGrid) return;

  // Get all direct children of mainGrid
  const gridChildren = Array.from(mainGrid.children);
  // Defensive: there should be at least 3 children
  if (gridChildren.length < 3) return;

  const heading = gridChildren[0];
  const quote = gridChildren[1];
  const bottomGrid = gridChildren[2];

  // bottomGrid is a nested grid, whose children are:
  // 0: divider
  // 1: flex-horizontal y-center flex-gap-xs (avatar + name/title)
  // 2: utility-display-inline-block... (svg logo)
  const bottomChildren = Array.from(bottomGrid.children);
  // Defensive: check presence
  const avatarRow = bottomChildren[1];
  const companyLogo = bottomChildren[2];

  // Create two columns as in the visual layout
  // Left column: heading, avatarRow
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (avatarRow) leftCol.appendChild(avatarRow);

  // Right column: quote, companyLogo
  const rightCol = document.createElement('div');
  if (quote) rightCol.appendChild(quote);
  if (companyLogo) rightCol.appendChild(companyLogo);

  // Table header must match the spec
  const cells = [
    ['Columns (columns26)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
