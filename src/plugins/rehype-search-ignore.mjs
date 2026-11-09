// Mermaid's source is drawn as a diagram on the page: kept out of the search index, it does not show up in excerpts.
export function rehypeSearchIgnore() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (node.type === "element" && node.tagName === "pre") {
    const code = node.children?.find((c) => c.type === "element" && c.tagName === "code");
    if (String(code?.properties?.className ?? "").includes("language-mermaid")) node.properties.dataPagefindIgnore = "";
    return;
  }
  if (node.children) node.children.forEach(walk);
}
