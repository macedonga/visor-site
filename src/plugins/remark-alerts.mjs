// GitHub's alerts in Markdown, `> [!NOTE]` and its kin, as asides the site styles: the docs read the same on GitHub
// and here.
const KINDS = { NOTE: "Note", TIP: "Tip", IMPORTANT: "Important", WARNING: "Warning", CAUTION: "Caution" };

export function remarkAlerts() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node.children) return;
  for (const child of node.children) {
    if (child.type === "blockquote") alert(child);
    walk(child);
  }
}

function alert(quote) {
  const first = quote.children[0];
  const text = first?.type === "paragraph" ? first.children[0] : null;
  if (text?.type !== "text") return;
  const match = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/.exec(text.value);
  if (!match) return;
  const kind = match[1];
  text.value = text.value.slice(match[0].length);
  // The marker sits on a line of its own: drop the line break that follows it.
  if (text.value === "" && first.children[1]?.type === "break") first.children.splice(0, 2);
  else if (text.value === "") first.children.shift();
  if (first.children.length === 0) quote.children.shift();
  quote.data = {
    hName: "aside",
    hProperties: { className: ["alert", `alert-${kind.toLowerCase()}`], "data-label": KINDS[kind] },
  };
}
