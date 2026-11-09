// Links between pages point at the site: `foo.md` in the VDK's docs, `Page-Name` in the protocol pages (the wiki's
// link style), and old links to the wiki or to visor-kit/docs on GitHub.
import { sep } from "node:path";
import { titleOfPage, hrefOfPage } from "../lib/protocol.mjs";

const DOCS = "/developers/docs/";
const OLD_WIKI = /^https:\/\/github\.com\/macedonga\/visor\/wiki\/?([\w-]*)(#.*)?$/;
const OLD_DOCS = /^https:\/\/github\.com\/macedonga\/visor-kit\/blob\/main\/docs\/([\w-]+)\.md(#.*)?$/;
// The pages link to the site by its full address, so the links also work in `visor docs` and on GitHub.
const SITE = /^https:\/\/visor\.macedonga\.com(\/.*)$/;

export function rehypeDocLinks() {
  return (tree, file) => {
    const path = String(file?.path ?? "").split(sep).join("/");
    const protocol = path.includes("/src/content/protocol/");
    walk(tree, (a) => {
      const href = a.properties.href;
      const wiki = OLD_WIKI.exec(href);
      if (wiki) return (a.properties.href = hrefOfPage(wiki[1] || "Home") + (wiki[2] ?? ""));
      const own = SITE.exec(href);
      if (own) return (a.properties.href = own[1]);
      const doc = OLD_DOCS.exec(href);
      if (doc) return (a.properties.href = docHref(doc[1]) + (doc[2] ?? ""));
      if (/^([a-z]+:|#|\/)/i.test(href)) return;
      const [target, hash] = href.split("#");
      const anchor = hash ? `#${hash}` : "";
      if (protocol && /^[\w-]+$/.test(target)) {
        a.properties.href = hrefOfPage(target) + anchor;
        // The wiki shows a bare page name as the link text; the site shows the page's title.
        const only = a.children.length === 1 ? a.children[0] : null;
        if (only?.type === "text" && only.value === target) only.value = titleOfPage(target);
      } else if (target.endsWith(".md")) {
        a.properties.href = docHref(target.replace(/^\.\//, "").replace(/\.md$/, "")) + anchor;
      } else if (target === "llms.txt") {
        a.properties.href = "/llms.txt";
      }
    });
  };
}

const docHref = (name) => (name.toLowerCase() === "readme" ? DOCS : `${DOCS}${name}/`);

function walk(node, visit) {
  if (node.type === "element" && node.tagName === "a" && typeof node.properties?.href === "string") visit(node);
  if (node.children) node.children.forEach((child) => walk(child, visit));
}
