import type { GetStaticPaths } from "astro";
import { allDocs, slugOf } from "../../../lib/docs";
import { text } from "../../../lib/markdown";

export const getStaticPaths = (async () =>
  (await allDocs()).filter((d) => slugOf(d) !== "index").map((doc) => ({ params: { slug: slugOf(doc) }, props: { body: doc.body ?? "" } }))) satisfies GetStaticPaths;

export const GET = ({ props }: { props: { body: string } }) => text(props.body);
