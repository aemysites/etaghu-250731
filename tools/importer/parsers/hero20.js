/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exact block name
  const headerRow = ['Hero (hero20)'];

  // Extract background images (all images in the hero grid)
  let bgImgs = [];
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (grid) {
    const imgs = grid.querySelectorAll('img.cover-image');
    if (imgs.length) {
      bgImgs = Array.from(imgs);
    }
  }

  // Extract hero text content: heading, subheading, CTA buttons
  let contentEls = [];
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentSection) {
    const container = contentSection.querySelector('.container');
    if (container) {
      const heading = container.querySelector('h1');
      if (heading) contentEls.push(heading);
      const subheading = container.querySelector('p');
      if (subheading) contentEls.push(subheading);
      const btnGroup = container.querySelector('.button-group');
      if (btnGroup) contentEls.push(btnGroup);
    }
  }

  // Only include as block cell if populated, otherwise empty array
  const rows = [
    headerRow,
    [bgImgs.length ? bgImgs : ''],
    [contentEls.length ? contentEls : '']
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}