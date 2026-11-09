# visor-site

The site at visor.macedonga.com: Visor's page, the developers' page, the VDK docs and the protocol reference. It is
the only home of those docs.

| Folder | What it holds |
|---|---|
| `src/content/docs` | The VDK docs, one Markdown page each. The `visor` command in visor-kit bundles them. |
| `src/content/protocol` | The protocol pages, in the wiki's style: `Page-Name.md`, links as `[Page-Name](Page-Name)`, groups in `_Sidebar.md`. |
| `src/pages` | The pages: Visor (`index.astro`), developers, and the two books. |
| `public/shots` | Renders from `visor fake`'s Display simulator. |

    npm ci
    npm run dev        # http://localhost:4321, also on the network
    npm run build      # the site and its search index in dist/

A push to main deploys it (`.github/workflows/deploy.yml`).
