import { getCollection, type CollectionEntry } from "astro:content";
import { describe } from "./describe";

export type Doc = CollectionEntry<"vdk">;

/** The docs' sidebar, in the order a developer reads them. A page missing here goes under "More". */
const GROUPS: { title: string; pages: string[] }[] = [
  { title: "Start", pages: ["overview", "getting-started", "scopes-and-consent", "connection"] },
  {
    title: "Capabilities",
    pages: ["glasses", "camera-and-captures", "neural-band", "display", "briefing-cards", "web-apps", "voice-and-assistant", "settings"],
  },
  { title: "Reference", pages: ["errors", "testing", "json-rpc", "network", "compatibility"] },
  { title: "More", pages: ["porting-from-dat", "ai-tools", "for-agents", "developer-mode"] },
];

export interface NavGroup {
  title: string;
  items: { slug: string; title: string; href: string }[];
}

/** A doc's slug: its file name without `.md`, and `index` for the docs' README. */
export function slugOf(doc: Doc): string {
  const id = doc.id.toLowerCase();
  return id === "readme" ? "index" : id;
}

export function hrefOf(slug: string): string {
  return slug === "index" ? "/developers/docs/" : `/developers/docs/${slug}/`;
}

/** The first `# ` heading, which every doc starts with. */
export function titleOf(doc: Doc): string {
  const match = /^#\s+(.+)$/m.exec(doc.body ?? "");
  return match ? match[1].trim() : doc.id;
}

/** The page's description. A page that opens with its scope, or says little first, leads with the README's line. */
export function summaryOf(doc: Doc, blurb = ""): string {
  const body = doc.body ?? "";
  const own = describe(body);
  return /^Scope:/.test(body.split(/\n\s*\n/)[1]?.trim() ?? "") || own.length < 60 ? describe(body, 200, blurb) : own;
}

export async function allDocs(): Promise<Doc[]> {
  return getCollection("vdk");
}

export async function nav(): Promise<NavGroup[]> {
  const docs = await allDocs();
  const bySlug = new Map(docs.map((d) => [slugOf(d), d]));
  const placed = new Set<string>(["index"]);
  const groups = GROUPS.map((g) => ({
    title: g.title,
    items: g.pages.filter((s) => bySlug.has(s)).map((s) => {
      placed.add(s);
      return { slug: s, title: titleOf(bySlug.get(s)!), href: hrefOf(s) };
    }),
  }));
  const rest = docs.map(slugOf).filter((s) => !placed.has(s)).sort();
  if (rest.length) {
    groups[groups.length - 1].items.push(...rest.map((s) => ({ slug: s, title: titleOf(bySlug.get(s)!), href: hrefOf(s) })));
  }
  return groups;
}

/** The one-line descriptions the docs' README gives each page: `[Title](page.md): what it holds`. */
export async function blurbs(): Promise<Map<string, string>> {
  const readme = (await allDocs()).find((d) => slugOf(d) === "index");
  const lines = (readme?.body ?? "").replace(/\n\s+(?=[a-z])/g, " ").split("\n");
  const found = new Map<string, string>();
  for (const line of lines) {
    const match = /\[[^\]]+\]\(([\w-]+)\.md\):\s*(.+)$/.exec(line);
    if (match) found.set(match[1], match[2].trim().replace(/^./, (c) => c.toUpperCase()));
  }
  return found;
}

/** The group a page sits in, for the docs' breadcrumbs. */
export async function groupOf(slug: string): Promise<string | undefined> {
  return (await nav()).find((g) => g.items.some((i) => i.slug === slug))?.title;
}

/** The pages before and after [slug] in the sidebar's order. */
export async function neighbours(slug: string) {
  const flat = (await nav()).flatMap((g) => g.items);
  const at = flat.findIndex((i) => i.slug === slug);
  return { previous: at > 0 ? flat[at - 1] : undefined, next: at >= 0 ? flat[at + 1] : flat[0] };
}
