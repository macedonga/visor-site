// The pages as agents read them: Markdown at each page's address with `.md`, and the two llms files.
import { allDocs, slugOf, titleOf, nav, blurbs } from "./docs";
import { pages, groups, nameOf, summaryOf, titleOfPage } from "./protocol-book";

export const SITE = "https://visor.macedonga.com";
export const docUrl = (slug: string) => `${SITE}/developers/docs/${slug}.md`;
export const protocolUrl = (name: string) => `${SITE}/protocol/${name.toLowerCase()}.md`;

export const text = (body: string, type = "text/markdown") =>
  new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8` } });

/** A protocol page as Markdown: its title on top, and its wiki links pointing at the other pages' Markdown. */
export function protocolMarkdown(name: string, body: string): string {
  const linked = body.replace(/\]\(([A-Za-z0-9-]+)(#[^)]*)?\)/g, (_, page: string, hash = "") => `](${page.toLowerCase()}.md${hash})`);
  return /^#\s/.test(linked) ? linked : `# ${titleOfPage(name)}\n\n${linked}`;
}

export async function llmsIndex(): Promise<string> {
  const docs = await allDocs();
  const about = await blurbs();
  const lines = [
    "# Visor",
    "",
    "> Visor is an open Android app that runs Meta glasses (Ray-Ban Meta, Oakley Meta, the Meta Ray-Ban Display and",
    "> the Meta Neural Band) in place of the Meta AI app. The Visor Development Kit (VDK) lets Android apps, scripts,",
    "> AI agents and web apps on the Display use the glasses through Visor, with the wearer's consent.",
    "",
    `Every page is Markdown at the address below. All the VDK docs in one file: ${SITE}/llms-full.txt`,
    "",
    "## Visor, the app",
    "",
    `- [Visor](${SITE}/): what the app does, every place it connects to, and how to install it.`,
    "- [Download](https://github.com/macedonga/visor/releases/latest): the APK, with a .sha256 file to check it against.",
    "  Needs Android 12 or later, a Meta account for setup, and an API key for the assistant.",
    "- [Source](https://github.com/macedonga/visor): Visor is AGPL-3.0, the VDK Apache-2.0.",
    "",
  ];
  for (const group of await nav()) {
    lines.push(`## VDK docs: ${group.title}`, "");
    for (const item of group.items) {
      const doc = docs.find((d) => slugOf(d) === item.slug)!;
      lines.push(`- [${titleOf(doc)}](${docUrl(item.slug)})${about.get(item.slug) ? `: ${about.get(item.slug)}` : ""}`);
    }
    lines.push("");
  }
  const all = await pages();
  for (const group of await groups()) {
    lines.push(`## Protocol: ${group.title}`, "");
    for (const item of group.items) {
      const page = all.find((p) => `/protocol/${nameOf(p).toLowerCase()}/` === item.href)!;
      lines.push(`- [${item.title}](${protocolUrl(nameOf(page))}): ${summaryOf(page, 140)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export async function llmsFull(): Promise<string> {
  const docs = await allDocs();
  const parts = [`# Visor Development Kit: all the docs\n\nFrom ${SITE}/developers/docs/. Each page starts at its own heading.\n`];
  for (const item of (await nav()).flatMap((g) => g.items)) {
    const doc = docs.find((d) => slugOf(d) === item.slug)!;
    parts.push(`<!-- ${docUrl(item.slug)} -->\n\n${(doc.body ?? "").trim()}\n`);
  }
  return parts.join("\n");
}
