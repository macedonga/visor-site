This page collects what is not known about the protocol. The first section lists the gaps that matter most. The rest copies the open questions of every page, 189 in all.

> [!NOTE]
> Each page keeps its own list at its end. This page is rebuilt from those lists, so edit the page, not this one.

## The biggest gaps

1. **COMMAND frames on a byte stream.** The length rule reads a two-byte AirShield COMMAND frame as a DataX message and loses step. Whether the glasses ever send one on RFCOMM or TCP is unknown. See [Transport-and-framing](Transport-and-framing).
2. **Why EndLinkSetup must follow trust.** The order is required. The reason, that the glasses assign a scope at EndLinkSetup, is unconfirmed. See [Link-setup-and-AirShield](Link-setup-and-AirShield).
3. **QCS7 end to end.** Setup on Ray-Ban Meta Burbank Audio with both QCS7 changes is not yet confirmed. See [Link-setup-and-AirShield](Link-setup-and-AirShield#quirks).
4. **Unread payloads.** The svc36 push of about 551 bytes, kind 3076 captures, events 59, 107 and 340, and svc15 types 1036 and 1037 have no known content.
5. **Pushed RLDrive values.** A kv object pushed into RLDrive is stored and reads back. Whether the settings service applies it while the glasses run is unknown. See [Settings-and-RLDrive](Settings-and-RLDrive).
6. **MobileConfig.** Which params need a restart or a reboot is not known for every param. See [MobileConfig](MobileConfig).
7. **Receipts.** Whether the glasses verify the signatures on Meta's ownership receipts is not visible on the link. See [Meta-login-and-ownership](Meta-login-and-ownership).
8. **Units and values.** The thermal temperature unit, the privacy LED flags, svc100 fields 5 and 9, and the airship LOW and MEDIUM values are not pinned down.
9. **The Display's untried services.** Maps routes and trips, svc42 guidance, the Display's assistant tools and the band's firmware update follow the message tables and are not yet confirmed on hardware. See [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display).
10. **Other models.** Values marked with a model, such as the codenames and the camera sizes, may differ on other Meta glasses.

## The glasses

### [Glasses hardware](Glasses-hardware)

- Why the product codename in the build fingerprint is `hammerhead` on Ray-Ban Meta Gen 2, which the table gives to product 258.
- The meaning of `PVT`. It is inferred from the usual stage names.
- Which video setting produces the 1728x2304 frames.
- Why the live-photo clip runs at a variable rate, about 14 frames per second on average, when the video runs at 30.
- The minimum hold time for pairing mode.
- Which physical control sends the action button, field 29.
- Which touch gestures the glasses send for a real tap.
- The unit of the thermal temperature field, svc28 field 13 field 2.
- What the privacy LED flags mean during a recording.
- Whether tamper, water, hot-car and overhead events ever arrive from the glasses.
- Whether peak power throttling causes large transfers to pause at low battery.

### [Firmware](Firmware)

- Whether the glasses take delta updates at all. The query has shown none.
- What the build id `UKQ1.250303.001` means.
- Whether the release field `14` is the real Android version.
- What `128.0.0.0.0` in svc100 field 9 means.
- Which other service 29 types exist beyond the pack install.

### [Radios and links](Radios-and-links)

- Whether the LE connection priority changes the throughput.
- Whether the Classic address stays the same across pairings and the LE address rotates on each.
- Whether the phone's Wi-Fi Direct group address is always the same.
- Whether the glasses ever send a COMMAND frame over RFCOMM.
- Whether the 20 MHz width in the join has any effect.

### [Service catalogue](Service-catalogue)

- Which services do the glasses open on their own? The known list is 30, 79, 2000, 20, 4 and 41102, and many more on Meta Ray-Ban Display. Whether the list is complete is unknown.
- Whether any of the 40 new ids appear on the wire is unknown.
- The role of id 2 is unknown.
- The role of id 25 is unknown.

## The link

### [Protocol overview](Protocol-overview)

- Whether the glasses send COMMAND frames over RFCOMM, LE or TCP. See [Transport-and-framing](Transport-and-framing).
- Whether any AirShield stream other than 0 carries traffic.

### [Transport and framing](Transport-and-framing)

- Whether the glasses send COMMAND frames over RFCOMM, LE or TCP.
- What bit 6 of the DataX first byte does.
- Whether other units publish the same RFCOMM service record.
- Whether a DataX message ever arrives after encryption.

### [Link setup and AirShield](Link-setup-and-AirShield)

- Unknown: whether the glasses accept a field 7 value other than 17 in RequestEncryption.
- Unknown: how the glasses react to a peer public key that is not on the curve.
- Unknown: whether the glasses ever send fewer than two handshake messages.
- Unknown: whether the glasses' fields 7 and 8 ever change the outcome.
- Unknown: whether QCS7 changes anything besides the HKDF info and the MAC word. Setup on Ray-Ban Meta Burbank Audio with both changes is not yet confirmed.
- Unknown: whether a QCS7 peer needs the phone to send quirks 1 in its own messages.
- Unknown: whether the status answer to the glasses' EndLinkSetup is the only answer they need.
- Unknown: why EndLinkSetup must follow trust. The section above gives the likely reason.
- Unknown: whether COMMAND frames can arrive during link setup over Bluetooth. See [AirShield-frames-and-ciphers](AirShield-frames-and-ciphers).

### [AirShield frames and ciphers](AirShield-frames-and-ciphers)

- Unknown: whether COMMAND frames arrive over Bluetooth at all. If they do, the length collision decides what the reader does.
- Unknown: the effect of the length collision on hardware. Whether the reader blocks, desyncs or reports an error.
- Unknown: whether the glasses send COMMAND codes other than the stream-0 LOST.
- Unknown: what the glasses do after a MAC failure on their side, and whether they close the link or answer.
- Unknown: whether the glasses ever send frames with type bits 00 or 11.
- Unknown: whether the glasses use relay sub-streams.

### [DataX channels](DataX-channels)

- What the glasses do with a push that gets no answer is not confirmed.
- Whether tagging the type on every message starves the glasses' decoder in an audio burst is not confirmed.
- Whether the glasses need the phone's channel ids to skip the ids they use is not confirmed.
- `0xD001` has more than one meaning, and its meaning depends on the service. How to tell them apart on a given channel is not known.
- The content of the 551-byte type 4096 push from the glasses is unknown.
- No full table of error codes per service is known.

## Identity

### [Identity and trust](Identity-and-trust)

- The content of the type 4096 push of about 551 bytes is unknown. Its size suggests a certificate, but that is not confirmed.
- Whether the glasses expect the phone to check the content of their push is unknown.
- The effect of a high `s` on the glasses is not known.
- The meaning of `0x1041` is unknown.
- Which error a given mistake in the signature gives is not fully confirmed.
- Whether the glasses accept one owner key that also owns other pairs is not confirmed.
- The meaning of field 1 and the other fields of the type 4097 push is unknown.
- What the glasses use the device entries' addresses and the group id for.

### [Meta login and ownership](Meta-login-and-ownership)

- Unknown: whether the glasses verify the receipt signatures. The glasses' check of the final receipt is not visible on the link. The phone reads only the acknowledgement and the status frames.
- The lifetime of a FRLA is not known. A refusal from Meta is the only sign that a login has expired.
- Unknown: whether any call needs the universe value `fb`. Setup uses only `ar`.

### [Device state and build info](Device-state-and-build-info)

- Whether the field-to-kind mapping for svc28 is exact is unknown. The mapping above is inferred from the names.
- No svc28 type for field 39 (`overhead`) is known.
- The content of types 2039 and 2044 is unknown. No field is known for them.
- The thermal temperature unit is unknown.
- The lux unit in field 12 is inferred from its name.
- Fields 5 and 9 of the svc100 answer are not identified.
- Whether value 6 of the attention enum (`LONG_RUNNING_SESSION_ACTIVATED`) arrives from the glasses is unknown.
- The start-app status list may not be complete.
- Whether the pushes come back on the subscribe channel is unconfirmed.
- The content of the 1001 acknowledgement beyond its size is unknown.
- The full field list of the svc22 response is unknown.
- Only the `ready` signal on service 2000 is confirmed. The other signal names are unconfirmed.

## Media

### [Capture list](Capture-list)

- The content of kind 3076 captures and of their kind 9 asset is not known.
- Size separates the two stills on a live photo. The glasses' own rule for choosing the full still is not known.
- Whether a photo capture with only one still exists is not known.
- The meaning of the other type-code flag bits, such as 0x40000 and some 0x14xx values, is not known.
- Whether battery throttling holds back large Bluetooth transfers is not known. The throttling level is not read back.
- The payload of svc18 type 2 is not known.

### [Airship file transfer](Airship-file-transfer)

- The values of LOW and MEDIUM are not confirmed. The names are known, but no source gives the numbers.
- FileStop reason 2 (UNKNOWN) comes with the Bluetooth stall. Its cause is not known. Battery throttling is a candidate.
- Whether the glasses send type 12 in practice is not known. A phone can accept it.
- Whether a checksum mismatch on a type 6 happens in practice is not known.
- Whether the glasses slow their sends when checks arrive late is not known.
- Whether the glasses take 4096-byte chunks from the phone on a HIGH link is not known.

### [Live photos and capture formats](Live-photos-and-capture-formats)

- Unconfirmed: whether the live clip has an audio track. The 48 kHz AAC track is seen only on videos.
- Unconfirmed: whether the clip's frame index matches the frame log's index on every capture.
- Unconfirmed: the signs of the accelerometer x and z axes.
- The meaning of the 0x40000 flag bit, which shows up on some assets, is unknown.
- What type 3076 holds is unknown.
- Unconfirmed: whether every live photo is stored landscape with Exif orientation 6.

### [Wi-Fi Direct](Wi-Fi-Direct)

- Unconfirmed: whether 5 GHz at 20 or 40 MHz avoids the hang.
- Unconfirmed: whether a long bulk transfer at 5 GHz can hit the hang.
- Unconfirmed: whether LeaveAccessPoint is needed for the next join to succeed.
- Unconfirmed: whether the INTERNAL_ERROR after a firmware restart is the same channel retry as a rejoin, or a second cause.
- The effect of SetSessionInfo (0x1009) on a join is unknown. The phone does not send it.
- Unconfirmed: whether the group-owner address is 192.168.49.1 on every phone.
- Whether the glasses move the session to a ready Wi-Fi link by themselves, for example when Bluetooth weakens.

### [Live stream](Live-stream)

- Unconfirmed: whether 1080p at 30 fps holds on a long stream.
- The effect of application type 3 on the glasses is unknown.
- Unconfirmed: how often the glasses send health events.
- Unconfirmed: whether Bluetooth carries about 1 Mbit/s of video.
- Unknown: what the glasses do with the step-up and step-down ladders (VideoConfig fields 11 and 12).
- Unknown: the field numbers inside StreamTelemetryEvent.

## Settings

### [Settings and RLDrive](Settings-and-RLDrive)

- Unconfirmed: whether the settings service applies a kv object pushed into RLDrive while the glasses run. Storing and reading back is confirmed.
- Unconfirmed: whether the glasses accept outgoing chunked round 2 pieces with an explicit index 0.
- Unconfirmed: whether any svc31 write gets a non-SUCCESS ack.

### [Settings catalogue](Settings-catalogue)

- Unconfirmed: the wire encoding of kind `other`. Five keys use it.
- Unconfirmed: whether the glasses enforce the per-product lists, or whether they only drive the Meta AI app.
- Unconfirmed: how the glasses apply `oxide_enabled`, which is parsed but has no svc31 field.

### [MobileConfig](MobileConfig)

- Unconfirmed: which params need a restart, and which need a reboot, for every param.
- Unconfirmed: whether the glasses apply every value in a sent pair of tables. The next bug report shows the values they hold.
- Unknown: which gates protect other people or follow regional rules. The flag names are the only evidence.

### [Notifications and contacts](Notifications-and-contacts)

- What the glasses do with a removal (type 1022) beyond dropping the notification.
- The name of provider 9.
- Unknown: whether a glasses with default settings mirrors any notification. The settings that control mirroring are `sg_allow_mirrored_notifications` and `mirrored_notification_app_settings`.
- Unconfirmed: whether the glasses announce type 14 notifications on other firmware.
- Unknown: whether the announcer needs other settings before it speaks chat messages from a glasses with default settings.
- Unknown: which fields the glasses use for the sender beyond the thread name.
- Unknown: whether the glasses need the WhatsApp, Messenger and Instagram contact namespaces for their senders.

## Assistant

### [Assistant protocol](Assistant-protocol)

- The meaning of field 4 in the registration, which is 2 in every registration.
- Whether the glasses need a pause between the bring-up messages. The phone sends them back to back.
- The bodies of types 1036 and 1037 are unknown. Type 1026 may carry more than the locale.
- Whether ev71 must be sent once per interaction or once per stream. The phone sends it once per interaction id.
- The meaning of fields 7 and 19 in the stream header. The phone sends 1 for both.
- Field 13 (speakRequestVoiceId) on the glasses' voice path. The phone fills it in. Whether it has any effect is unconfirmed.
- Whether non-streaming with speakRequestText can speak. The phone does not use it.
- The meaning of the fixed intent IN:GET_WEATHER in ev342.
- The transitions of the attention states.
- Whether a second turn on the same link works in every case.
- Whether an event over 1 KB sent whole is lost, or only slower.
- Why some firmware sends svc15 events without the 9000 envelope.

### [Assistant events](Assistant-events)

- Ids 59, 107 and 340 have no known contents. The phone never sends or reads id 107.
- Id 389 field 3 (7000) has no known meaning.
- Id 392 has two bodies. The meaning of the second body is not settled.
- Ids 73 and 74: whether every visual question gets a photo back through these ids, and what the body of 74 holds.
- Types 1036 and 1037: no body is known for either.

### [Assistant voice and languages](Assistant-voice-and-languages)

- The VARM field 13 `speakRequestVoiceId` is filled in on the own-voice path. The glasses may use only `assistant_voice_id`. Which one applies is unconfirmed.
- Whether field 4 of the fulfillment result in ev60 is needed is unknown. Fields 3, 7, 8 and 11 are on [Assistant-protocol](Assistant-protocol#ending-a-turn).
- Spanish has two pack suffixes, es_es and es_us. Which pack Meta serves for each country is not confirmed.
- Whether the default English voice is en_US.58 or en_US.mai_01 is not confirmed.
- Whether the session path is on for locales other than English, such as Italian, is not known.

### [Assistant follow-ups and photos](Assistant-follow-ups-and-photos)

- Whether the second ev71 for a follow-up matters. The phone sends ev71 when it takes the utterance, then again in the answer preamble.
- Whether Italian questions use the bare s0 layout on the glasses is not confirmed.
- The meaning of the range field in the timed record is unknown.
- The exact effect of the chatty follow-up switches and the Live AI switches is not known.
- Which switches need a restart to take effect, and whether writes apply without one, is not known for each switch.

## Meta Ray-Ban Display and the Neural Band

### [Meta Ray Ban Display](Meta-Ray-Ban-Display)

- Whether the Display ever uses the svc76 ping answer. It has been seen once in a day.
- What the Display does with the motion activity answer beyond "not driving".
- Why a svc72 turn carries two pairs of shown text, fields 4 and 5 and fields 10 and 9.
- When the health and workout relays get a reader on the Display.
- Whether A2UI cards (AssistantTemplate type 28) draw when the phone sends them in ev60.

### [Display phone services](Display-phone-services)

- What the Display uses the svc11006 call log for.
- Whether an MMS photo share reaches the recipient end to end.
- What the Display does with the playlist answers, which the phone sends empty.
- The meaning of the svc70 response kind, field 5 of LoadMessagesResponse.

### [Display maps and location](Display-maps-and-location)

- The binary layouts of svc11004 types 2, 3 and 5 to 9 beyond what a trip needs.
- How often the Display wants svc42 keepalives.
- Which svc11020 requests the Display needs real answers to.
- What type 10 on svc11004 carries.

### [Display internet](Display-internet)

- The internet lease types besides BLOCK, and when the Display sends each.
- Whether the Display ever uses the HTTP relay when the tunnel is up.
- The full list of data fetcher schemes.
- Which svc43 app ids the Display uses beyond the screens seen.

### [Briefing panel](Briefing-panel)

- How the Display reads an answer on svc43 type 12, and whether Visor's minimal action `{"layout":{"bloks_payload":{"data":[],"ft":{},"action":"\t(e2f 1)"}}}` runs the click's done callback.
- How an action can refresh an open detail, with `bk.action.bloks.InvalidateCachedAsyncComponents` or a new fetch.
- What the pager's key 42 and Flexbox keys 56 and 57 do.
- Whether ShowToast's AFFIRMATIVE draws a check.
- The width of a Briefing card on the Display.

### [Neural Band](Neural-Band)

- Most svc52822 bodies beyond the call list.
- Whether the band's own firmware update flow works end to end from a phone other than Meta's.
- The full svc41109 message table and its error codes.
- When the Display asks for each lease type.
- Whether the phone's band link and the Display's work together under a RELAY lease, and what `emgrelay_receiver` takes from the phone.

## Apps

### [Device Access Toolkit](Device-Access-Toolkit)

- Which sensors back the IMU capability, and where speech is recognised.
- The svc7009 pause and resume messages, types 6 and 7, and the session's errors.
- Whether touchpad swipes are forwarded.
- Whether any setting lets the DWA keep the band's back on the Display.
- Whether the DWA takes a video sent as raw chunks: `VideoStreamStartRequest` and `VideoDataChunk` exist in the messages, and Meta's toolkit never sends them.
- The svc6501 message table.
- The protobuf view tree beside the Bloks bytes.

### [Motion sensors](Motion-sensors)

- The units of the gyroscope and magnetometer values.
- The rates the daemon accepts, and its other sensors and channels.
- Whether Ray-Ban Meta Gen 2 serves the same messages.
- The configuration keys beyond these. The daemon also names `activity_classifier`, `heading`, `touchpad`, `gps`, `camera`, `highres_camera`, `audio` and `acoustic_dondoff`. With `heading`, `activity_classifier`, `touchpad` and `acoustic_dondoff` enabled, a subscribe to them answers "Some channels unavailable": they may only record to files, which PULL_DATA fetches.
- The longest text the speech provider takes, and whether it speaks other languages than the glasses' own.
