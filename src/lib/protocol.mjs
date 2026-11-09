// The protocol pages in src/content/protocol, once Visor's GitHub wiki: their titles, addresses and sidebar.
// Plain JavaScript, so the Markdown plugins in astro.config.mjs can use it too.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const PROTOCOL_DIR = resolve("src/content/protocol");
export const PROTOCOL = "/protocol/";

// A page's title is its file name with spaces for dashes; these names have dashes inside words.
const TITLES = {
  Home: "Meta glasses protocol",
  "Wi-Fi-Direct": "Wi-Fi Direct",
  "Meta-Ray-Ban-Display": "Meta Ray-Ban Display",
  "Assistant-follow-ups-and-photos": "Assistant follow-ups and photos",
};

export const titleOfPage = (name) => TITLES[name] ?? name.replace(/-/g, " ");
export const hrefOfPage = (name) => (name === "Home" ? PROTOCOL : `${PROTOCOL}${name.toLowerCase()}/`);

/** _Sidebar.md as groups of pages. The list before the first `####` is "Start". */
export function sidebar() {
  const text = readFileSync(resolve(PROTOCOL_DIR, "_Sidebar.md"), "utf8");
  const groups = [{ title: "Start", items: [] }];
  for (const line of text.split(/\r?\n/)) {
    const head = /^####\s+(.+)$/.exec(line);
    if (head) {
      groups.push({ title: head[1].trim(), items: [] });
      continue;
    }
    const item = /^-\s+\[([^\]]+)\]\(([^)#]+)\)/.exec(line);
    if (item) groups[groups.length - 1].items.push({ name: item[2].trim(), label: item[1].trim() });
  }
  return groups.filter((g) => g.items.length > 0);
}
