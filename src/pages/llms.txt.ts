import { llmsIndex, text } from "../lib/markdown";

export const GET = async () => text(await llmsIndex(), "text/plain");
