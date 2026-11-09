import { llmsFull, text } from "../lib/markdown";

export const GET = async () => text(await llmsFull(), "text/plain");
