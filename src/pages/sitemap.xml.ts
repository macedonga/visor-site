// Every page for search engines, with when its source last changed.
import { allDocs, slugOf, hrefOf } from "../lib/docs";
import { pages, nameOf, hrefOfPage } from "../lib/protocol-book";
import { modified } from "../lib/describe";
import { SITE, text } from "../lib/markdown";

export const GET = async () => {
  const entries: { href: string; lastmod?: string }[] = [
    { href: "/" },
    { href: "/developers/" },
    ...(await allDocs()).map((d) => ({ href: hrefOf(slugOf(d)), lastmod: modified(d.filePath) })),
    ...(await pages()).map((p) => ({ href: hrefOfPage(nameOf(p)), lastmod: modified(p.filePath) })),
  ];
  const urls = entries.map((e) => `  <url><loc>${SITE}${e.href}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`);
  return text(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    "application/xml",
  );
};
