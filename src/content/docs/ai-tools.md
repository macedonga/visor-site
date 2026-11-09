# AI-assisted development

A coding agent can set up the VDK, write the code and test it on fake glasses. Give it the prompts on this page,
and the VDK gives it the docs, the rules and the glasses themselves.

## Set up, by your agent

Paste this into Claude Code, Codex, Cursor or any agent that runs commands, in your project:

```text
Set up this project for the Visor Development Kit (VDK), which lets software use Meta glasses through Visor.
1. If `visor --version` fails, install the visor command. It needs Java 17 or later. On macOS or Linux: `curl -fsSL https://visor.macedonga.com/install.sh | sh`. On Windows: `irm https://visor.macedonga.com/install.ps1 | iex`.
2. Add the VDK's docs as an MCP server, `visor docs-mcp`. In Claude Code: `claude mcp add vdk-docs -- visor docs-mcp`.
3. Save the VDK's rules for agents with `visor agents > AGENTS.md`, and follow them.
4. Read https://visor.macedonga.com/llms.txt, then add the VDK to this project as the getting started guide says.
Check every method name in the docs before you use it.
```

## Prompts for common tasks

Each works once the agent is set up. Change the details to your app.

```text
Show a Briefing card on the Meta Ray-Ban Display with the next three events from the phone's calendar, updated when they change. Test it with `visor fake` and its Display simulator before the glasses.
```

```text
When the wearer double-taps with the index finger on the Neural Band, take a photo with the glasses and save it to the phone's gallery. Ask for the scopes it needs, and handle the person saying no.
```

```text
Answer the questions that name this app, such as "ask Recipes what to cook tonight", in the glasses' own voice.
```

```text
Port this app from Meta's Wearables Device Access Toolkit (DAT) to the VDK, with the porting guide: https://visor.macedonga.com/developers/docs/porting-from-dat.md
```

```text
Write unit tests for the glasses features with FakeVisor from kit-testing, then run them.
```

## What agents can read

| What | Where |
|---|---|
| An index of every page | [llms.txt](https://visor.macedonga.com/llms.txt) |
| All the VDK docs in one file | [llms-full.txt](https://visor.macedonga.com/llms-full.txt) |
| Any page as Markdown | The page's address with `.md` in place of the last `/`, such as [neural-band.md](https://visor.macedonga.com/developers/docs/neural-band.md) |
| Every method, topic and type, for any language | [`protocol/api/openrpc.json`](https://github.com/macedonga/visor-kit/blob/main/protocol/api/openrpc.json), an OpenRPC document |
| The glasses' own protocol, for work below the VDK | [The protocol reference](https://visor.macedonga.com/protocol/) |

Each page of the docs also has **Copy as Markdown**, to paste it into a chat.

## The docs as an MCP server

The `visor` command carries the docs, so an agent can search them with no network:

```
visor docs layout button click     # the sections that answer best
visor docs                         # the pages
```

`visor docs-mcp` serves them as an MCP server over standard input and output, with two tools:
`search_vdk_docs` (a query, and `max_results` up to 10) and `read_vdk_doc` (a page, such as `display`). Add it to
Claude Code with:

```
claude mcp add vdk-docs -- visor docs-mcp
```

Any assistant that runs MCP servers as commands takes the same command.

## Rules for agents

`visor agents` prints the rules for code that uses the VDK, the same as [for-agents.md](for-agents.md). Save them as
`AGENTS.md` in your app, which Codex, Cursor, GitHub Copilot and Claude Code read:

```
visor agents > AGENTS.md
```

## The Claude Code plugin

The VDK's repo is a Claude Code plugin marketplace. The `vdk` plugin adds skills for getting started, the VDK's
conventions, the Display, voice, testing and porting from DAT, and sets up the docs MCP server:

```
/plugin marketplace add macedonga/visor-kit
/plugin install vdk@visor-kit
```

## The glasses, for agents

An agent can use the glasses as well as write code for them. Visor's [network door](network.md) serves MCP with a
token the person makes for the agent, and each method the token allows becomes a tool:

```
claude mcp add --transport http visor http://127.0.0.1:7333/mcp --header "Authorization: Bearer <token>"
```

To let an agent try its code with no glasses, run `visor fake` and give it the fake's MCP, with no token. It calls
the same methods, and the Display simulator shows what it puts on the Display:

```
claude mcp add --transport http visor-fake http://127.0.0.1:7333/mcp
```

`visor --fake simulate band.gestures` then plays gestures to the app, as a band would.
