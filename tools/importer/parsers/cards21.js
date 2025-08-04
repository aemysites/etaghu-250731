/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row for the block
  const cells = [
    ['Cards (cards21)']
  ];

  // Locate the card body (where the card actual contents are)
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Get the image (mandatory)
    const img = cardBody.querySelector('img');
    // Get the heading (optional)
    const heading = cardBody.querySelector('.h4-heading');

    // Text content cell: priority to heading, since no further description in source HTML
    // If more elements existed (description, CTA), they should be added here as well
    let textCellContent = [];
    if (heading) {
      textCellContent.push(heading);
    }
    // If there was other text info, it would go here
    // For this HTML, only heading is present

    // Add the row for this card
    cells.push([
      img,
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  }

  // Create table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
