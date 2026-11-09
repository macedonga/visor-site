Meta's Device Access Toolkit (DAT) lets a phone app other than Meta's use the glasses. The app opens a link of its own to the glasses, with a key of its own. On the glasses a Meta-signed broker app, the DWA, does the work for it. This page describes the services that carry a DAT session.

> [!NOTE]
> The app's link, the session, the forwarded gestures, and the Display, IMU and Input capabilities work on Meta Ray-Ban Display from a phone other than Meta's, with a manifest that phone made. The other capabilities follow their message tables; see [Open questions](#open-questions).

## The app's link

An app opens a link of its own beside the owner's: an L2CAP channel to the same PSM (see [Radios-and-links](Radios-and-links#l2cap-channel-and-psm)), with the usual handshake. Trust runs on svc79 instead of svc36, with the app's own EC key, and EndLinkSetup follows it. The glasses accept the key when the owner's [constellation manifest](Identity-and-trust#the-constellation-manifest) lists it in its app list. They file the link apart from the owner's, with the App scope of that package. The owner's own link does not have that scope.

Both sides send svc79 type 1 EnableTrust and answer the other's with a DataX status.

| Field | Content |
|---|---|
| 1 | The key's tag: the first 8 bytes of SHA-256(SHA-256(public key) \|\| the manifest's key salt) |
| 2 | The signature over the link's channel binding, made as on svc36 |
| 3 | The manifest version |
| 5 | A client version string, such as `acdc-android:8.0.0.0.0` |

| Status | Meaning |
|---|---|
| 0 | OK |
| 1 | The glasses could not load the manifest's devices. A key wrap they cannot open gives this for every app |
| 2 | The manifest is not valid |
| 3 | The peer asks for the other side's manifest |
| 4 | The manifest does not list the key |
| 5 | The manifest is older than the peer's |

## svc7009: the session

svc7009 `remote_session_service` starts, pauses, resumes and stops a session. The glasses' system serves it on both models.

`SessionStartRequest`:

| Field | Name | Value |
|---|---|---|
| 1 | app_id | The app's package name |
| 2 | session_id | Chosen by the app |
| 3 | session_name | |
| 4 | is_dev_mode | True for an app in developer mode |
| 5 | uses_dam | True |
| 6 | dwa_package_name | `com.dat.app_` and the app's Meta app id. Left out in developer mode |
| 7 | platform | 2, Android |
| 8 | sdk_version | |

| Type | Direction | Message |
|---|---|---|
| 1 | Phone to glasses | SessionStartRequest, above |
| 2 | Glasses to phone | SessionStartResponse `{1 status, 2 session id, 3 DWA version name, 4 DWA version code, 5 DWA launch, 6 compatibility}` |
| 3 | Phone to glasses | SessionStopRequest `{1 session id, 2 is_dev_mode}` |
| 4 | Glasses to phone | SessionStopResponse |
| 5 | Glasses to phone | The session ended |
| 1 | Glasses to phone | SessionInput, a forwarded gesture. See [Forwarded gestures](#forwarded-gestures) |

The start status is 0 OK, 1 unauthorized, 2 device unavailable or 3 SDK too old. The DWA launch is 1 launched, 2 not requested or 4 failed.

Rules:

- The glasses admit only a link with the App scope.
- Sessions start only while the glasses are worn. The glasses check nothing else about the app.
- The glasses start the DWA only when MobileConfig `wearables_dat.enable_dwa` is on and `uses_dam` is set. Without `uses_dam`, the session starts with launch 2: nothing shows on the screen, and svc6500 is not served.
- The DWA holds the screen while it runs, black and kept on, under the app's layout. Back, a middle-finger tap on the band, closes it and ends the session with type 5.
- A session without the DWA ends when another app comes to the front. A session with the DWA is not watched that way.
- A one-finger tap on the touchpad pauses and resumes a session, and a one-finger hold stops it.

### Forwarded gestures

During a session, active or paused, the glasses forward band and touchpad gestures on svc7009 type 1 when MobileConfig `wearables_dat.enable_inputs_captouch` or `wearables_dat.enable_gesture_forwarding` is on. The Display still acts on each gesture as usual. Forwarding works without the DWA, so a session without `uses_dam` reads the band with nothing on the screen and the band left with the Display.

| SessionInput field | Content |
|---|---|
| 1 | Source: 1 the Neural Band, 2 the touchpad |
| 2 | Gesture: 1 tap, 2 double tap, 3 triple tap, 4 hold, 5 to 8 a swipe up, down, left or right |
| 3 | Finger: 3 thumb, 4 index, 5 middle |
| 4 | Timestamp, ms |

The glasses tell taps apart before they forward them: a double tap comes as one double tap, after its first tap. The same input can arrive twice with the same timestamp. A one-finger touchpad tap is the session's pause key and is not forwarded.

## svc6500: the capabilities

svc6500 `dwa` carries every capability. Only the DWA serves it: no service of the glasses' system does.

| Type | Message | Fields |
|---|---|---|
| 1 | DwaRequest | 1 header {1 protocol version 1, 2 message id, 3 capability, 4 timestamp}, 2 body {1 query, 2 add capability, 3 remove capability, 4 capability payload}, 3 fragment |
| 2 | DwaApiResponse | The capability's answer in field 12 |
| 3 | DwaEvent | The capability's event in field 6, a heartbeat in field 7 |

A payload over 15000 bytes goes in fragments. Each capability is added, then used, then removed.

| Capability | Number |
|---|---|
| Display | 1 |
| Stream | 2 |
| Capture | 3 |
| Speech | 4 |
| IMU | 5 |
| Input | 6 |

### Display

A layout is Bloks minified JSON, gzipped: `{"layout":{"bloks_payload":{"tree":...,"ft":{}}}}`. It goes in `DisplayRequest` field 4, inside `DisplayRequestPayload` field 3 (display content). A layout replaces the whole screen.

A node is `{chr(style): {chr(key): value}}`. Its children are under key 32, its id under 33, its style under 132 and its extensions under 133. The Display's Briefing uses more components (a pager, decorations, themed colours, absolute positions): see [Briefing-panel](Briefing-panel#components-and-keys).

| Component | Style |
|---|---|
| Flexbox | 13320 |
| Text | 13335 |
| Image | 13323 |
| Base style | 24201 |
| Container | 22655 |
| StaticContainer | 17256 |
| ContainerMaterial | 23457 |
| Button | 24996 |
| ButtonGroup | 24998 |
| VideoPlayer | 25506 |
| OnClickExtension | 23426 |
| RenderLifecycleExtensionV2 | 16529 |

- **Text** uses the font `optimistic-iris-hd-700` at 40 or 48 sp for headings and `optimistic-iris-sd-400` at 28 or 36 sp for body text, in `#FFFFFF` or `#CFD3D9`. A button is 88 dp tall.
- **An image** is a string under key 41: an `https://` URL, a `data:image/jpeg;base64,...` or `data:image/png;base64,...` URI of at most 600 pixels a side, or an icon as `drawable://<name>_filled_32` or `drawable://<name>_outline_32`.
- **A video** is a URL, in `DisplayRequestPayload {4 video_view {1 uri}}`, `http` or `https`. The DWA fetches it through the phone's internet and plays it alone on the screen, in place of any layout. `{7 video_stop}` stops it. Its progress comes back as `DisplayEventPayload {2 video_event {1 type: 1 started, 2 ended, 3 stopped, 4 error; 2 error: 1 invalid URL, 2 already playing, 3 playback failed, 4 invalid dimensions}}`. A 10-second 320x176 MP4 started about 8 s after the request and ended 10 s later.
- **A click target** gets an id and the script `(jl9 "<id>")`, under key 45 on a Flexbox or key 65 on a Button. A click comes back as a DwaEvent: `DisplayEventPayload {1 DisplayEvent {1 ClickEvent {1 identifier}}}`.

`DisplayRequestPayload` also has a protobuf view tree beside the Bloks bytes, and start and stop messages with fade or slide transitions.

### IMU

`MotionStartRequest {1 rate}`, where 1 to 6 mean 5, 10, 15, 24, 30 or 60 samples a second. Events are `ImuDataEvent {repeated MotionSample}`:

| Field | Value |
|---|---|
| 1 | Timestamp, nanoseconds |
| 2 | Accelerometer, three floats, m/s^2 |
| 3 | Gyroscope, three floats, rad/s |
| 4 | Magnetometer, three floats, microtesla |
| 5 | Orientation, a quaternion x, y, z, w |
| 6 | Source: the glasses or the Neural Band |

The IMU capability needs the DWA, so the screen shows it. The glasses' own sensors also stream with nothing on the screen. See [Motion-sensors](Motion-sensors).

### Speech

After AddCapability(4), the phone sends `SpeechRequestPayload {1 speech_start {}}`, or `{2 speech_stop {}}` to end it. The answer is `SpeechResponsePayload {1 speech_start {1 started, 2 locale}}`: the toolkit app hears in the Display's own language. No audio reaches the phone.

Events come as `SpeechEventPayload {1 SpeechEvent}`, with one of:

| Field | Event |
|---|---|
| 1 | Transcription `{1 text, 2 is_final, 3 confidence (float)}`. Partial texts come with `is_final` false |
| 2 | Error `{1 code, 2 message}`. Code -2 is a completion, from older firmware |
| 3 | Completion `{}`: the utterance ended, and recognition stops |

Recognition runs one utterance per start, as in DAT: a phone that wants more sends `speech_start` again after the completion. The toolkit app must be on the screen while it listens.

### Input

After AddCapability(6), the phone sends `InputRequestPayload {1 InputStartRequest {1 packed sources, 2 consume_back}}`. The sources are 1 touchpad, 2 Neural Band, 3 capture button, 4 action button and 5 Neural Band drag.

Events come as `InputEventPayload {1 InputDataEvent {1 repeated InputEvent}}`:

| InputEvent field | Content |
|---|---|
| 1 | Source, as above |
| 2 | Timestamp, ms |
| 3 | Nav `{1 direction}`: 1 up, 2 down, 3 left, 4 right |
| 4 | Select, empty |
| 5 | Back, empty |
| 6 | Button `{1 type}`: 1 action |
| 7 | Capture `{1 press}`: 1 short, 2 hold, 3 double |
| 8 | Drag `{1 action, 2 x, 3 y, 4 dx, 5 dy}`: action 1 down, 2 move, 3 up; the rest are floats |

The DWA sends them only while it is in the foreground. On the Display an index-finger pinch of the band comes as a drag from down to up and then a select, while the session's SessionInput gives the same pinch as a tap. A band swipe comes as a nav.

`consume_back` decides whether the DWA hands back to the app. On the Display it does not stop the system: the band's back, a middle-finger tap, goes to the Display's own input filter as a system back, the window manager removes the DWA's task, and the session ends with type 5.

### Stream and capture

The stream capability starts and stops the camera. The video and the audio themselves come on svc51350, as in the [Live stream](Live-stream). A photo is a capture request. The photo arrives over [airship](Airship-file-transfer) and svc18.

## Consent

The owner's phone stores each app's consent in RLDrive database `ecosystem_permissions`, as objects of type `permission_manifest`. The key is `<package>_android.permission.<NAME>`. The fields are `app_package`, `permission` and `user_consent`: NEVER, ALWAYS, ONCE or NA. The names are CAMERA, MICROPHONE, DISPLAY, IMU, ASR, INPUTS, VOICE_INVOCATION and DEV_MODE. See [Settings-and-RLDrive](Settings-and-RLDrive).

The DWA admits a developer-mode session only when the store grants `android.permission.DEV_MODE` to the app's package. The owner's phone can write these grants.

## The other services

- svc6501 `dat_app_tools` registers an app's tools and carries their calls. The glasses' system serves it.
- svc6502 `dwa_remote_config` is served by the phone.
- svc6503 and svc6504 are in the phone's service table only.

## Open questions

- Which sensors back the IMU capability, and where speech is recognised.
- The svc7009 pause and resume messages, types 6 and 7, and the session's errors.
- Whether touchpad swipes are forwarded.
- Whether any setting lets the DWA keep the band's back on the Display.
- Whether the DWA takes a video sent as raw chunks: `VideoStreamStartRequest` and `VideoDataChunk` exist in the messages, and Meta's toolkit never sends them.
- The svc6501 message table.
- The protobuf view tree beside the Bloks bytes.
