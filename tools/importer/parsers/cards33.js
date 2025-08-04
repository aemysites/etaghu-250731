/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as in the example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is a direct child <a>
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach(card => {
    // First column: the card's image (if present)
    const img = card.querySelector('img');
    
    // Second column: text content (tag/meta, heading, description, CTA)
    const contentDiv = card.querySelector('div > div'); // inner div containing info
    const textContent = [];

    if (contentDiv) {
      // Tag/meta row
      const metaRow = contentDiv.querySelector('.flex-horizontal');
      if (metaRow) {
        // Tag (if exists)
        const tag = metaRow.querySelector('.tag div');
        if (tag) {
          const tagSpan = document.createElement('span');
          tagSpan.textContent = tag.textContent.trim();
          tagSpan.style.fontSize = '0.85em';
          tagSpan.style.fontWeight = 'bold';
          tagSpan.style.marginRight = '0.5em';
          textContent.push(tagSpan);
        }
        // Read time (if exists)
        const time = metaRow.querySelector('.paragraph-sm');
        if (time) {
          const timeSpan = document.createElement('span');
          timeSpan.textContent = time.textContent.trim();
          timeSpan.style.fontSize = '0.85em';
          textContent.push(timeSpan);
        }
        // Add a <br> only if we added tag or time
        if (textContent.length) {
          textContent.push(document.createElement('br'));
        }
      }

      // Heading
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) {
        const h = document.createElement('strong');
        h.textContent = heading.textContent.trim();
        textContent.push(h);
        textContent.push(document.createElement('br'));
      }

      // Description (p)
      const desc = contentDiv.querySelector('p');
      if (desc && desc.textContent.trim()) {
        textContent.push(document.createTextNode(desc.textContent.trim()));
        textContent.push(document.createElement('br'));
      }

      // CTA (last div with text 'Read')
      // Look for div children that are not .flex-horizontal and not the heading
      const divs = Array.from(contentDiv.querySelectorAll(':scope > div'));
      let ctaDiv = null;
      for (let i = divs.length - 1; i >= 0; i--) {
        if (
          divs[i] !== metaRow &&
          divs[i].textContent.trim().toLowerCase() === 'read'
        ) {
          ctaDiv = divs[i];
          break;
        }
      }
      if (ctaDiv) {
        const ctaLink = document.createElement('a');
        ctaLink.href = card.href;
        ctaLink.textContent = ctaDiv.textContent.trim();
        textContent.push(ctaLink);
      }
    }

    // Compose the full row for this card
    rows.push([
      img, // left: image or undefined (will be empty cell)
      textContent.filter(Boolean)
    ]);
  });

  // Create the structured table block and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
