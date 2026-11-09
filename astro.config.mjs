// The site at visor.macedonga.com: Visor's pages, and the VDK's docs read from visor-kit/docs at build time.
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { unified, rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkAlerts } from "./src/plugins/remark-alerts.mjs";
import { rehypeDocLinks } from "./src/plugins/rehype-doc-links.mjs";
import { rehypeHeadingLinks } from "./src/plugins/rehype-heading-links.mjs";
import { rehypeSearchIgnore } from "./src/plugins/rehype-search-ignore.mjs";

export default defineConfig({
  site: "https://visor.macedonga.com",
  trailingSlash: "always",
  vite: { plugins: [tailwindcss()] },
  // Reachable from other devices on the network, for trying the site on a phone.
  server: { host: "0.0.0.0", port: 4321, allowedHosts: ["fisso", "localhost"] },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkAlerts],
      // Ids first, so the heading links have something to point at.
      rehypePlugins: [rehypeHeadingIds, rehypeHeadingLinks, rehypeDocLinks, rehypeSearchIgnore],
      smartypants: false,
    }),
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid"] },
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
      wrap: false,
    },
  },
});
