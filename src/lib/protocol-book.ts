import { getCollection, type CollectionEntry } from "astro:content";
import { sidebar, titleOfPage, hrefOfPage } from "./protocol.mjs";
import { describe } from "./describe";

export type Page = CollectionEntry<"protocol">;

/** A page's wiki name, the file name without `.md`: `Wi-Fi-Direct`. */
export const nameOf = (page: Page) => (page.filePath ?? page.id).split(/[\/]/).pop()!.replace(/\.md$/, "");

export async function pages(): Promise<Page[]> {
  return getCollection("protocol");
}

/** The sidebar's groups, with any page the sidebar leaves out under "More". */
export async function groups() {
  const names = (await pages()).map(nameOf).filter((n) => n !== "Home");
  const listed = sidebar().map((g) => ({
    title: g.title,
    items: g.items.filter((i) => names.includes(i.name)).map((i) => ({ href: hrefOfPage(i.name), title: i.label })),
  }));
  const placed = new Set(sidebar().flatMap((g) => g.items.map((i) => i.name)));
  const rest = names.filter((n) => !placed.has(n)).sort();
  if (rest.length) listed.push({ title: "More", items: rest.map((n) => ({ href: hrefOfPage(n), title: titleOfPage(n) })) });
  return listed;
}

/** The first paragraph's opening sentences, for the page's description. */
export const summaryOf = (page: Page, max = 200) => describe(page.body ?? "", max);

export { titleOfPage, hrefOfPage };
