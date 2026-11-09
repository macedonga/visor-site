The Meta Ray-Ban Display runs web apps in its own browser (`SmartglassBrowserRelease`). The phone keeps their list, opens them, and serves the phone side of the browser's web-app SDK: the phone's sensors, a location check, and Bluetooth scans.

## The list and opening an app

svc55074 (`smartglass_browser`) carries both directions. Its message types, from the browser's `C08Y` enum:

| Type | Message | Direction |
|---|---|---|
| 1, 2 | Start an agent task, its answer | phone to Display |
| 3, 4 | Browser screenshot chunk, its answer | Display to phone |
| 5, 6 | Inject text, its answer | phone to Display |
| 7, 8 | Input focus, its answer | Display to phone |
| 9, 10 | Set cookies, its answer | either |
| 11, 12 | Get cookies, its answer | Display to phone |
| 13, 14 | Clear cookies, its answer | either |
| 15, 16 | Manage apps (`WebappManageAppsRequest`), its answer | either |
| 17 | BLE scan start | Display to phone |
| 18 | BLE advertisement | phone to Display |
| 19 | BLE scan stop | Display to phone |
| 20 | BLE scan start answer | phone to Display |

The list lives in the setting `partner_app_settings`, field 3: a map from a key (`dev_mode_web_app_N` for apps added by hand) to `DisplayConfig {1 Item {1 title, 2 icon}, 2 url, 3 signed manifest}`. Manage apps has the actions 1 create, 2 delete, 3 list, 4 update, 5 open and 6 developer-mode status. To open an app, the phone takes a lease on the browser (svc56, feature 19), waits for its lifecycle, then sends manage with action 5, a name and a URL.

## The web-app SDK

The browser injects polyfills into each page. These reach the phone:

| Page API | Phone service | Notes |
|---|---|---|
| `navigator.geolocation` | svc41102, then svc51 | See [Location](#location) |
| Generic Sensor API with `sensorId: 'phone'` | svc41120 | See [Phone sensors](#phone-sensors) |
| `navigator.bluetooth.requestLEScan` | svc55074, one channel a scan | See [Bluetooth scans](#bluetooth-scans) |

Others stay on the glasses: speech recognition and synthesis, the band's wrist orientation (`RelativeOrientationSensor` with `sensorId: 'emg-wrist'`), `navigator.install`, authenticated fetch for allowlisted hosts, the camera bridge, and WebMCP tools for the glasses' agent.

### Location

The browser asks svc41102 with the same `LocationRequest` the Maps app sends (type 3, accuracy best) and stops with type 5. See [Display-maps-and-location](Display-maps-and-location).

Before that, it opens svc51 and sends `UserLocationRequest` (type 30, empty), to learn whether the phone may share a location. The answer is type 1, `UserLocationResponse`:

| Field | Content |
|---|---|
| 1 | `GeoCoordinate {1 lat, 2 lng, 3 bearing}` |
| 2 | Time in ms |
| 3 | Error: 0 success, 1 location permission off, 2 Google location accuracy off, 3 other |
| 4 | Accuracy in m |
| 5 | Phone heading |

The browser stops only on errors 1 and 2. An origin in `persist.experimental.web_on_hn_webapp_location_fused_origins`, with `persist.sys.smartglass.web_on_hn_webapp_location_fused` on, uses the glasses' own fused location instead.

### Phone sensors

svc41120 (`webapp_phone_imu`) gives a page the phone's sensors. The Display asks the wearer for each site first.

| Type | Message |
|---|---|
| 1 | `PhoneImuStartRequest {1 sensors, packed enum, 2 frequency in Hz, float}` |
| 2 | `PhoneImuStopRequest {1 sensors}` |
| 10 | `PhoneImuResponse {1 readings}`, from the phone |
| 11 | `PhoneImuErrorResponse {1 sensor, 2 code, 3 message}`, from the phone |

Sensors: 0 accelerometer, 1 gyroscope, 2 magnetometer, 3 linear acceleration, 4 gravity, 5 absolute orientation. A reading is `{1 sensor, 2 time in ms, 3 x, 4 y, 5 z}`, or for the orientation `{6 qw, 7 qx, 8 qy, 9 qz}`, all floats. Error codes: 0 unknown, 1 permission denied, 2 sensor unavailable, 3 not connected, 4 backgrounded. The browser clamps the rate to 1 to 100 Hz.

### Bluetooth scans

Each scan opens its own svc55074 channel.

- Type 17, `WebappBleScanStartRequest {1 request id, 2 accept all, 3 keep repeated devices, 4 filters}`. A filter is `{1 service UUIDs, 2 name, 3 name prefix, 4 manufacturer data, 5 service data}`. Field 4 maps a company id and field 5 a service UUID to `BluetoothDataFilter {1 prefix, 2 mask}`.
- Type 20, the phone's answer: `{1 request id}`.
- Type 18, one for each device seen: `WebappBleAdvertisement {1 request id, 2 address, 3 name, 4 rssi, 5 tx power, 6 has tx power, 7 UUIDs, 8 manufacturer data {1 company, 2 data}, 9 service data {1 UUID, 2 data}, 10 time in ms, 11 has rssi}`.
- Type 19, `{1 request id}`, stops the scan. So does closing the channel.

> [!IMPORTANT]
> The browser lets a page scan only when its origin is in MobileConfig `web_on_hn.webapp_ble_scan_allowed_origins` (config 90969, param 66), or in the property `persist.experimental.web_on_hn_webapp_ble_scan_origins`, which wins when set. The value is a JSON array of origins, or a comma-separated list. Each is matched exactly: scheme, host and port. Any other page gets "This site is not allowed to scan for Bluetooth devices".

Visor scans on the phone with the page's filters, in hardware where Android has a filter for them, and writes that MobileConfig value for the apps the person allows in **Settings > Apps**. See [MobileConfig](MobileConfig). Not measured on the glasses yet.

## The VDK over scans

Visor uses the scan channel to give web apps the [VDK](https://github.com/macedonga/visor-kit), since a page cannot reach the phone any other way: its traffic leaves through the IP tunnel to the internet. A scan whose filter has manufacturer data for company `0xFFFF` starting with `VDK1` is a message to Visor, and Visor does not scan for it.

A frame is `VDK1`, a flags byte (1 means more frames of the message follow), a 4-byte big-endian message id, then the bytes. A message is JSON: `{v, origin, session, open}` opens a session on that scan's channel, and `{v, origin, session, rpc}` hands one JSON-RPC message to it. Visor answers on the session's channel with advertisements from `56:44:4B:00:00:01`, named `Visor`, with frames in the manufacturer data for `0xFFFF`. The session ends with its scan.

The browser does not filter advertisements again: it hands the page whatever the phone sends on the scan, with a device id that is an HMAC of the origin and the address. Only origins on the allowlist can scan, so the allowlist is also the gate for the VDK. Visor's [KitWebApps.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/outside/KitWebApps.kt) serves it. Not measured on the glasses yet.

## WebMCP tools and the assistant

A page registers tools with `document.modelContext.registerTool` (the WebMCP draft). The browser hands them to the glasses' agentic runtime. The browser's `WebMcpEligibilityChecker` offers `modelContext` only with MobileConfig `web_on_hn.web_app` on and `web_on_hn.webapp_webmcp` on, or `web_on_hn.webmcp_developer_mode` with developer mode. The app context of each turn says whether the foreground page has tools: `BrowserContext {1 foregrounded, 2 title, 3 description, 4 hasWebMcpTools}`.

The glasses' assistant runtime (`libassistantruntime.so`, `WebMcpRoutingGate`) answers such a turn on the glasses, unless MobileConfig `wearables_agentic_nova.forward_webmcp_requests_to_server` is on. Then it forces the turn to the server, which is the phone. The server can call the tools with ev311 `tools/call`, as it calls the Display's own tools. See [Assistant-protocol](Assistant-protocol).

ev57 field 54 names the tools but gives no description or schema. Visor asks the glasses for them with an MCP `tools/list` on ev311. Whether the glasses answer `tools/list` is not checked. Visor turns both flags on from **Settings > Apps**. Not measured on the glasses yet.

## Open questions

- The answer formats of agent tasks, screenshots, text injection and input focus.
- Whether the glasses answer MCP `tools/list` on ev311, and how field 54 names a web app's tools.
