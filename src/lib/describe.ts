import { execFileSync } from "node:child_process";

/** Markdown inline syntax as plain text. */
const plain = (s: string) =>
  s.replace(/`([^`]+)`/g, "$1").replace(/!?\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*?([^*]+)\*\*?/g, "$1").replace(/\s+/g, " ").trim();

/** The first prose paragraph after the title, skipping a docs page's `Scope:` line. */
export function firstParagraph(body: string): string {
  const paras = body.replace(/^#\s.*$/m, "").split(/\n\s*\n/).map((p) => p.trim());
  return plain(paras.find((p) => p && !/^[#>|`<!-]/.test(p) && !/^Scope:/.test(p)) ?? "");
}

/** A page's description: [lead], then whole sentences of the first paragraph, at most [max] characters. */
export function describe(body: string, max = 200, lead = ""): string {
  const sentences = [plain(lead), ...firstParagraph(body).split(/(?<=[.!?])\s+(?=[A-Z"'])/)].filter(Boolean);
  let out = "";
  for (const s of sentences) {
    // A sentence that introduces a list says nothing without it.
    if (s.endsWith(":")) break;
    const next = out ? `${out} ${s}` : s;
    if (next.length <= max) {
      out = next;
      continue;
    }
    // Too little so far: the next sentence too, cut at a word.
    if (out.length < max / 2) out = `${next.slice(0, next.lastIndexOf(" ", max - 1)).replace(/[,;:]$/, "")}…`;
    break;
  }
  return out;
}

/** When [file] last changed in git, as an ISO date; undefined outside git or for a new file. */
export function modified(file: string | undefined): string | undefined {
  if (!file) return undefined;
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim() || undefined;
  } catch {
    return undefined;
  }
}
