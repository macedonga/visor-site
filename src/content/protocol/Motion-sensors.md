The glasses run a data collection daemon that streams their motion sensors to the phone on svc1027 (`miranda`), and speaks text in the glasses' voice. It needs no app on the glasses and puts nothing on the screen. The phone starts the daemon, configures it, starts a recording and subscribes to the sensor channels.

> [!NOTE]
> This works on Meta Ray-Ban Display. Ray-Ban Meta Gen 2 has the same daemon, untried.

## Starting the daemon

The daemon does not run until the phone asks for it. The phone sends svc28 type 2300 SNIntent with the action `action.miranda_data_collection_start`, and the glasses answer with type 2301. The daemon registers svc1027 about half a second later. The action `action.miranda_data_collection_stop` stops it. See [Device-state-and-build-info](Device-state-and-build-info) for SNIntent.

> [!WARNING]
> The daemon starts once on a change of a system property. A daemon that exited while the property was still set does not start again. Send the stop intent before the start intent.

## Messages

Each request carries a request id string in field 1. Each answer carries field 2, 1 for success, and field 3, an error text.

| Type | Direction | Message |
|---|---|---|
| 7 | Phone to glasses | Configure `{1 request id, 2 configuration JSON}` |
| 8 | Glasses to phone | Its answer `{2 success, 3 error}` |
| 1 | Phone to glasses | Start recording `{1 request id}` |
| 2 | Glasses to phone | Its answer `{2 success, 3 error}` |
| 30 | Phone to glasses | Subscribe `{1 request id, 2 repeated {1 channel, 2 rate in Hz}, 3 batch length in ms}` |
| 31 | Glasses to phone | Its answer `{2 success, 3 error, 4 repeated channel}`: the channels that will stream |
| 32 | Glasses to phone | A batch of samples |
| 33 | Phone to glasses | Unsubscribe `{1 request id, 2 repeated channel}` |
| 3 | Phone to glasses | Stop recording `{1 request id}` |
| 5 | Phone to glasses | Clean up `{1 request id}`. It deletes the recording |
| 40 | Phone to glasses | Play speech `{1 request id, 2 text}` |
| 41 | Glasses to phone | Its answer `{2 success, 3 error}` |

## Configuration

The configuration is JSON. At 30 samples a second:

```json
{"session_info": {"session_id": "x"},
 "config": {"sensors": {
   "accelerometer": {"enabled": true, "period_us": 33333, "use_sensor_manager": true},
   "gyroscope": {"enabled": true, "period_us": 33333, "use_sensor_manager": true},
   "magnetometer": {"enabled": true, "sampling_rate_hz": 30}}}}
```

> [!WARNING]
> `session_info` sits at the root of the JSON, beside `config`. Inside `config`, the configure succeeds and the start of the recording fails with code 205, "No session configured".

## Sequence

1. Send the stop intent, then the start intent.
2. Send stop recording. A daemon that is still recording refuses a new configuration.
3. Configure. Send it again while svc1027 is not registered yet.
4. Start recording. A subscription gets no samples until the recording runs.
5. Subscribe to `accelerometer`, `gyroscope` and `magnetometer` at the rate, for example with 100 ms batches.
6. Read the batches. To finish, unsubscribe, stop recording, clean up and send the stop intent.

Each start of the daemon registers svc1027 again. The phone's old channel to it stays dead: it answers `0xC001` or `0xC002`, and only a new channel reaches the daemon. See [DataX-channels](DataX-channels#error-codes-on-a-channel).

## Batches

A batch is `{1 repeated channel samples}`:

| Field | Content |
|---|---|
| 1 | The channel: `accelerometer`, `gyroscope` or `magnetometer` |
| 2 | Timestamps in ms, packed varints |
| 3 | The values, packed little endian doubles |
| 4 | Values per sample, 3 for these channels |

The accelerometer reads m/s^2: about 9.8 on the axis that points down. The accelerometer and the gyroscope share their timestamps. The magnetometer keeps times of its own. The glasses send no orientation: a phone that wants one fuses the three sensors, for example with Madgwick's filter.

## Speech

With `"tts": {"enabled": true}` among the sensors of the configuration, the daemon's speech provider plays text through the glasses' earcon service, in the voice of their assistant. Nothing is recorded, and no recording needs to run.

```json
{"session_info": {"session_id": "x"}, "config": {"sensors": {"tts": {"enabled": true}}}}
```

1. Start the daemon and configure it as above, or with `tts` beside the motion sensors.
2. Send type 40 with the text. The glasses answer type 41 with success once the line is queued.
3. Lines sent back to back play in order, each to its end.

A whole sentence of several hundred characters plays as sent. The daemon refuses an empty text. Speech needs no glasses' assistant turn and nothing on the screen, so a phone can make the glasses say something at any time.

## Open questions

- The units of the gyroscope and magnetometer values.
- The rates the daemon accepts, and its other sensors and channels.
- Whether Ray-Ban Meta Gen 2 serves the same messages.
- The configuration keys beyond these. The daemon also names `activity_classifier`, `heading`, `touchpad`, `gps`, `camera`, `highres_camera`, `audio` and `acoustic_dondoff`. With `heading`, `activity_classifier`, `touchpad` and `acoustic_dondoff` enabled, a subscribe to them answers "Some channels unavailable": they may only record to files, which PULL_DATA fetches.
- The longest text the speech provider takes, and whether it speaks other languages than the glasses' own.
