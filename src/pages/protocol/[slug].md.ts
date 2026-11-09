import type { GetStaticPaths } from "astro";
import { pages, nameOf } from "../../lib/protocol-book";
import { protocolMarkdown, text } from "../../lib/markdown";

export const getStaticPaths = (async () =>
  (await pages()).filter((p) => nameOf(p) !== "Home").map((page) => ({
    params: { slug: nameOf(page).toLowerCase() },
    props: { markdown: protocolMarkdown(nameOf(page), page.body ?? "") },
  }))) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { markdown: string } }) => text(props.markdown);
