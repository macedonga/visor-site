The Meta Ray-Ban Display's home has a Briefing panel: glanceable cards for the weather, sports, stocks and reminders. The phone serves the panel on svc9002, and the detail screens a card opens on svc43, as Bloks. Visor serves Meta's cards from Meta's servers, and apps' own cards beside them, details and buttons included. This page covers the panel, the cards' payloads, the detail screens, their buttons and the icons. See [Display-internet](Display-internet#meta-content-through-the-phone) for svc43 and [Device-Access-Toolkit](Device-Access-Toolkit#display) for Bloks as DAT uses it.

## svc9002: the panels

| Type | Direction | Message |
|---|---|---|
| 1 | Display to phone | Which panels are on |
| 2 | Phone to Display | PanelInfo `{1 id, 2 name, 3 ttl s, 4 renderer (2 = Bloks), 5 data provider (1 = DataX), 6 cache policy}` |
| 0 | Display to phone | OpenPanel `{2 HostInfo}` |
| 0 | Phone to Display | Command `{1 command (0 create, 3 error), 2 widget (5 data payload), 3 stats {1 os, 3 ms}, 10 data, 11 error details}` |
| 3, 4 | Both | Prewarm, and its answer `{1 0}` |

The Briefing is panel 30. HostInfo is `{1 device (2 = wrist), 4 Bloks version, 5 design system, 7 repeated card config, 8 persist, 9 request id}`, each card config `{1 id, 2 name, 4 enabled, 5 panel id, 6 cached hash}`.

The answer's data is `{1 payloads, 2 repeated catalogue entry, 3 fresh ttl s, 4 ttl s}`:

- Payloads are gzipped: `{1 repeated {1 card id, 2 Bloks JSON, 3 content hash}, 2 preview}`.
- A catalogue entry is `{1 id, 2 name, 3 description, 4 enabled, 6 hash, 7 icon}`, the icon as `drawable://<name>_filled_32`. It fills the Display's list of Briefing cards, where the wearer turns cards off.
- The Display asks again when the wearer opens the Briefing after the fresh TTL. Meta answers 300 s, and Visor 15 s while apps have cards there. It keeps a card's payload while its hash stays the same.

> [!WARNING]
> The Display keeps a card, with its click scripts, for as long as its hash stays the same, and keeps a detail for an hour by its params. A hash must cover everything in the payload. Hashing only the layout left the Display opening the old detail.

Meta's cards come from the GraphQL query `XFBGlanceablesQuery` (doc id `168198258811666417495687582669`). Its variables are `{bloks_version_id, device_type ("GREATWHITE" or "WRIST"), design_system_version, timezone, request_id, assistant_locale, display_locale, latitude, longitude, enabled_glanceables [{id, name, cached_hash}]}`. It answers `xfb_glanceables {l1_payload_list [{id, payload, content_hash}], all_glanceables [{id, name, enabled, icon_uri}], preview, fresh_ttl, ttl}`. The card ids are the names: `Weather`, `Stocks`, `Sports`, `Reminders`.

## A card

A card's payload is `{"layout":{"bloks_payload":{"data":[],"tree":...}}}`. Its tree is a Container (22655) of the panel's material (23457 `{38 "meta-ai-kinetic"}`) around a Flexbox with the card's content, padded 24 dp. Meta's cards style their text as:

| Line | Font | Size, line height |
|---|---|---|
| Title ("Weather") | `optimistic-iris-sd-700` | 24, 32 sp |
| Figure ("8 degrees") | `optimistic-iris-hd-700` | 36, 44 sp, or 40, 48 sp in a detail |
| Detail line | `optimistic-iris-sd-400` | 22, 28 sp |

They also use `optimistic-iris-sd-500` for names. Meta's Stocks colours a rise `#FF009914` and grey text `#FFC6C9CF`. The Weather card pins a 104 dp illustration in its top corner with an absolute position.

## Clicking into a card

A card's root carries extensions (key 133): an OnClickExtension (23426) whose script (key 35) opens the detail screen, prefetch scripts (13914), and a focus and accessibility extension (14001). The click script runs `bk.action.bloks.FetchAsyncComponents` and opens `com.bloks.www.screen.query.wearables.GlanceablesDetailScreenQuery`, container config 22942. Its preloaded params are `{data_type, design_system_version, latitude, longitude, ttl 3600, data_hash, timezone, assistant_locale}`, where `data_type` is the card's name and `data_hash` a hash of its detail. The Weather card's scripts also carry the location and a spoken label. The Stocks card's carry neither, so Visor copies the Stocks card's scripts onto apps' cards, with the name and the hash replaced.

The screen is a generic shell. It asks for the detail on svc43 type 9, app id `com.bloks.www.async.components.GlanceablesDetailQuery`, with params `{data_hash, design_system_version, timezone, assistant_locale, latitude, data_type, longitude}`. The answer, gzipped on type 10:

```
{"component_query_responses": [{
  "payload": "<JSON: {\"components\": [{\"id\": \"component\", \"payload\": {\"layout\": {\"bloks_payload\": {...}}}}]}>",
  "consumed_params": {"data_hash": "data_hash", ...},
  "app_id": "com.bloks.www.async.components.GlanceablesDetailQuery"
}]}
```

A bloks payload with only `data` and `tree` is enough: Visor answers apps' details that way, and the Display draws them. Meta's carry `ft`, `embedded_payloads` and `error_attribution` too, and a render lifecycle script (16529) that reports `__infra_component_did_render`.

## Pages

Meta's Weather (now, the next hours, the week) and Stocks (one page a stock) details are a horizontal pager, component 17259:

| Key | Value |
|---|---|
| 35 | `"horizontal"` |
| 36 | `true`, snapping page by page |
| 38 | `"DOTS"`, the page indicator |
| 40 | `"UNDER"`, its place |
| 42 | `"flex_end"` |

Each page is a Container (22655) of the kinetic material with an id, inside a Flexbox with 24 dp at its sides (keys 56 and 57). The pager's bind extension (13914, key 42) focuses the first page 100 ms after it binds: `(e1w (e24 (e23 100 (e24 (e1w (e24 (dps (dn3 "<page id>"))))))))`, that is Apply, FuncConst, Delay, RequestFocus and Find.

> [!IMPORTANT]
> The wearer's swipes move the focus from page to page. A pager whose pages are plain flexboxes shows its first page and does not move. The pages must be focusable containers, and one must have the focus.

## Buttons in a detail

Meta's Stocks detail has "Add stock" and "Remove stock". Each one calls the phone with `bk.action.bloks.AsyncActionWithDataManifestV2`:

```
(AsyncActionWithDataManifestV2 "com.bloks.www.glanceables.remove_subscription"
  (mins.CallRuntime 6 "params" <JSON {"server_params": {"item_type": "stock", "timezone": ..., "source": "per_card_tap"},
                                       "client_input_params": {"item": "^IXIC"}}>)
  (tree.Make 16131 36 <done> 35 <failed> 40 <client params> 38 "current-screen")
  (array.Make))
```

That reaches the phone as svc43 type 11, and the phone answers on type 12. On failure Meta shows `bk.action.wearables.ShowToast "Something went wrong. Please check connection" null "NEGATIVE"`. The toast's third argument is one of AFFIRMATIVE, NEGATIVE, EXIT and UNKNOWN.

Visor gives apps' buttons the same call with its own app id, `com.bloks.www.visor.card_click`, and `server_params {card, id}`, answers it on the phone, and hands the click to the card's app. Done shows the element's toast, AFFIRMATIVE.

## Components and keys

Seen in Meta's Briefing payloads. A guessed role says so.

| Component | Keys |
|---|---|
| 13320 Flexbox | 32 children, 41 direction, 42 wrap, 44 justify, 36 align items, 59 54 58 55 padding top, bottom, start, end, 56 57 the sides (guessed), 38 background, 133 extensions |
| 13314 Decoration | 35 drawable, 43 `false` (role unknown) |
| 13340 Solid colour | 35 a themed colour |
| 13365 Themed colour | 35 and 36: `#AARRGGBB` for the two themes |
| 13335 Text | 41 text, 45 size and 53 its unit (`"sp"`), 46 `"normal"`, 35 font, 48 themed colour, 59 line height, 38 max lines, 42 alignment (`"end"`) |
| 13323 Image | 41 URL, 35 tint (a themed colour) |
| 24201 Base style | 41 height, 58 width, 54 position (`"absolute"`), 57 top, 36 bottom, 42 start, 55 end, 59 z order (999), 61 align self, 63 grow, 65 shrink, 49 43 48 44 margins |
| 22655 Container | 32 children, 41 material, 33 id, 133 extensions |
| 23457 Material | 38 `"meta-ai-kinetic"`, 40 corners |
| 17259 Pager | above |
| 16851 | Draws one of `embedded_payloads` by `bk.action.template.Make` (guessed) |
| 24214 | A text input ("Say a stock name or ticker...") |
| 24020 | An error view: 46 title, 45 body, 42 icon |
| 17233 | A rail action: 42 label, 40 icon, 41 script |
| 23426 OnClickExtension | 35 script |
| 13914 | Bind scripts: 41 and 42 |
| 14001 | Focus and accessibility: 35 label, 40 focusable, 42 `"yes"`, 45 role, 55 actions (14117 `{35 "click", 36 label, 38 script}`), 70 on focus, 71 test id |
| 16529 | Render lifecycle: 35 script |

DAT's toolkit app takes a plain `"#FFFFFF"` under text key 43. The Briefing's own text uses the themed colour under 48. Visor sends `#RRGGBB` under 43 in both, and the Display draws it.

## Scripts

A script is a string that starts with a tab, its functions named by base-36 ids: `dn1` is 17677, `bk.action.bloks.FetchAsyncComponents`. The Display's own table is in its System UI, `GreatwhiteSystemUIRelease`, class `X.AbstractC529337u`. It has the Display-only `bk.action.wearables.*` functions, among them `ShowToast` 23898 (`ifu`), `ShowToastV2` 24489 and `NativeOnClickAction` 23958. The Meta AI app's table has the rest under the same ids.

## Icons

An icon is `drawable://<name>_filled_32` or `_outline_32`, which the Display draws from its own set. Meta's cards add a fallback: `drawable://<name>_filled_32/?img_url=<encoded URL>`, the URL `https://static.xx.fbcdn.net/assets/?set=wearables_icons&name=<name with dashes>-filled-32-light&density=1`.

The CDN answers 404 for a name it lacks, so it can check a name. It sends `Access-Control-Allow-Origin: *`. Found there and in Meta's cards:

| Set | Names |
|---|---|
| Weather illustrations, in colour, no `_filled_32` | `bks_sunny`, `bks_partly_cloudy`, `bks_cloudy`, `bks_rainy`, `bks_snow`, `bks_thunderstorm`, `bks_foggy`; at night `bks_nt_clear`, `bks_nt_partly_cloudy`, `bks_nt_cloudy`, `bks_nt_rainy`, `bks_nt_snow`, `bks_nt_thunderstorm`, `bks_nt_foggy` |
| Glyphs | `small_triangle_up`, `small_triangle_down`, `chart_line`, `trophy`, `checkmark_stacked_folder`, `horizontal_line_circle`, `plus_circle`, `phone_x` |

Missing on the CDN: `bks_clear`, `bks_snowy`, `bks_windy`, `bks_drizzle`, `bks_mostly_cloudy`. A tint (image key 35) would flatten an illustration's colours, so Meta's weather images carry none.

Reference code: [Panels.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/connection/Panels.kt), [BloksRelay.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/connection/BloksRelay.kt), [DatLayout.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/dat/DatLayout.kt), [BriefingCards.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/dat/BriefingCards.kt)

## Open questions

- How the Display reads an answer on svc43 type 12, and whether Visor's minimal action `{"layout":{"bloks_payload":{"data":[],"ft":{},"action":"\t(e2f 1)"}}}` runs the click's done callback.
- How an action can refresh an open detail, with `bk.action.bloks.InvalidateCachedAsyncComponents` or a new fetch.
- What the pager's key 42 and Flexbox keys 56 and 57 do.
- Whether ShowToast's AFFIRMATIVE draws a check.
- The width of a Briefing card on the Display.
