// A link to itself on every h2 and h3, shown on hover, so a section can be shared.
export function rehypeHeadingLinks() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
    node.children.push({
      type: "element",
      tagName: "a",
      properties: { className: ["heading-link"], href: `#${node.properties.id}`, ariaLabel: "Link to this section" },
      // The "#" is drawn by CSS, so it stays out of the heading's text and out of the search index.
      children: [],
    });
    return;
  }
  if (node.children) node.children.forEach(walk);
}
