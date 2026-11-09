import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// The site is the only home of these pages: the VDK's docs, and the protocol pages that were Visor's wiki.
export const collections = {
  vdk: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/docs" }),
  }),
  // _Sidebar.md and _Footer.md are not pages.
  protocol: defineCollection({
    loader: glob({ pattern: "[!_]*.md", base: "./src/content/protocol" }),
  }),
};
