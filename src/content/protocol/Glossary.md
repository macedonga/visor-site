This page defines the terms these pages use. Each term has one meaning on every page.

## Devices and radios

| Term | Meaning |
|---|---|
| the glasses | One pair of Meta smart glasses. Models and product ids are on [Glasses-hardware](Glasses-hardware). |
| the phone | The companion phone that speaks the protocol. |
| the Meta AI app | Meta's own companion app, package `com.facebook.stella`. |
| product id | Meta's number for a glasses model, sent in the advertisement. 266 is Ray-Ban Meta Gen 2. |
| device type | Meta's group of products, such as 5 for Meta Ray-Ban Display. Settings and notifications depend on it. See [Glasses-hardware](Glasses-hardware#device-types). |
| the Display | Meta Ray-Ban Display, the glasses with a screen, product 259. See [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display). |
| the band | The Meta Neural Band, the wrist band for the Display, product 1537. See [Neural-Band](Neural-Band). |
| codename | The firmware's name for a model, such as `greathammerhead`. |
| link | One radio connection: LE L2CAP, Classic RFCOMM or TCP over Wi-Fi Direct. See [Radios-and-links](Radios-and-links). |
| PSM | The L2CAP channel number. The glasses publish it in a GATT characteristic. |
| SDP | The Bluetooth Classic service lookup. It maps the Meta service UUID to an RFCOMM channel. |
| identity address | The Bluetooth address a bond ends under. It can differ from the address in the advertisement. |
| Wi-Fi Direct group | A Wi-Fi network the phone creates and owns. The glasses join it. See [Wi-Fi-Direct](Wi-Fi-Direct). |
| one-session rule | The glasses hold one AirShield session across all links. A new session ends the old one. |

## The link

| Term | Meaning |
|---|---|
| SDU | One whole message from the transport. On a byte stream the phone cuts SDUs by length. See [Transport-and-framing](Transport-and-framing). |
| session | One AirShield session over one link, from the handshake to the close. |
| link setup | The handshake on service 5: RequestEncryption, EnableEncryption, then EndLinkSetup. See [Link-setup-and-AirShield](Link-setup-and-AirShield). |
| AirShield | The encryption layer. It seals each DataX payload in a DATA frame. |
| DATA frame | An encrypted frame: header byte, 8-byte tag, block count, ciphertext. See [AirShield-frames-and-ciphers](AirShield-frames-and-ciphers). |
| COMMAND frame | A two-byte cleartext control frame, such as stream 0 LOST. |
| block count | Byte 9 of a DATA frame: the number of 16-byte ciphertext blocks, minus one. |
| pad | The modified PKCS#7 tail on AirShield plaintext. Each pad byte is the pad length plus `0xC0`. |
| parameters | The encryption parameter bits each side offers in link setup. Glasses offer 31, the band 27. See [Link-setup-and-AirShield](Link-setup-and-AirShield#parameters). |
| Multikey | Parameter bit 0x04: separate AES and HMAC keys for a direction. |
| quirks, QCS7 | The quirks mode in link setup. QCS7 (1) changes the HKDF info and the MAC word. See [Link-setup-and-AirShield](Link-setup-and-AirShield#quirks). |
| MAC word | The 4 bytes ahead of the sequence in every frame MAC: `02 02 00 q`, with `q` the quirks mode. |
| key hint | A short hash of a public key with a salt, used to name a peer, such as the band in a lease. |
| channel binding | A 32-byte digest of the handshake values. The trust signature covers it. |
| EndLinkSetup UUIDs | The stream and link UUIDs in EndLinkSetup. They must be RFC 4122 version 4. A link switch names a link by its link UUID. |
| DataX | The message layer inside AirShield: a 4-byte header, extension tags and a payload. See [DataX-channels](DataX-channels). |
| channel | A numbered DataX conversation that carries one service. |
| originator bit | Bit 15 of a channel id. It is set on frames from the side that opened the channel. |
| mirror channel | The same channel id with bit 15 cleared. Replies and status frames go there. |
| service, svcN | A DataX service id, written svc28. See [Service-catalogue](Service-catalogue). |
| message type | A number that names a message within a service, written "type 2005". |
| continuation | A DataX message with no service or type tag. It belongs to the last type on its channel. |
| fragment | The head of a DataX message that runs past the end of an AirShield frame. The rest starts the next frame. |
| OK | DataX status 0. A bare status frame with error id 0 confirms a message or ends a reply. |
| status frame | A DataX message with an error tag and no payload. `0` is OK. `0x1000` is the svc36 trust result. |

## Identity

| Term | Meaning |
|---|---|
| owner key | The EC P-256 key that makes a phone the glasses' owner. The glasses know it by the SHA-256 of its public key. See [Identity-and-trust](Identity-and-trust). |
| trust | The exchange on svc36 that proves the phone holds the owner key, on every connect. |
| change owner | The svc36 flow that installs a new owner key with Meta's receipts. See [Meta-login-and-ownership](Meta-login-and-ownership). |
| ownership receipt | Meta's signed JSON that names the new owner key. The flow uses a pending, a device pending and a final receipt. |
| FRLA, ARAe | The two Meta tokens setup uses: the first comes from the login, the second from the AR login. |

## Media

| Term | Meaning |
|---|---|
| capture | One shutter press or one recording, as svc18 lists it. See [Capture-list](Capture-list). |
| capture handle | The id of a capture in svc18 requests. |
| asset, asset id | One file of a capture. Its id equals the uuid of the airship offer that brings it. |
| capture kind | The kind number of a capture: absent for a live photo, 3073 photo, 3074 video, 3076 unknown. |
| asset kind | The low byte of an asset's type code: 1 video, 2 still, 3 IMU log, 4 frame log. |
| delivered flag | Bit `0x100000` of an asset's type code. The glasses set it once a phone has the asset. |
| airship | The file transfer on svc20. See [Airship-file-transfer](Airship-file-transfer). |
| offer, cursor, chunk, drop | The airship steps: the sender offers a file, the receiver answers with a cursor, data comes in chunks, and a drop on type 7 ends the file. |
| link level | An airship link requirement: ALWAYS, LOW, MEDIUM or HIGH. HIGH is 7. |
| live photo | A still with a short clip, an IMU log and a frame log. See [Live-photos-and-capture-formats](Live-photos-and-capture-formats). |
| IMU log, frame log | The `SI` and `SF` sensor files of a capture. |
| live stream | The glasses' camera streamed on svc51350. See [Live-stream](Live-stream). |
| Annex-B | The HEVC byte format with start codes. |

## Settings

| Term | Meaning |
|---|---|
| RLDrive | The replicated key-value store on svc33 that holds the settings. See [Settings-and-RLDrive](Settings-and-RLDrive). |
| namespace | One RLDrive store, such as `<device-uuid>@individual_device_settings`. |
| kv object | An RLDrive object of type `kv`. Its uri is the setting key and its data is the value as text. |
| sync round | One of the four steps of an RLDrive sync, rounds 0 to 3. |
| writer id | The id of one replica that writes into a namespace. |
| parsed key | A setting key that svc31 applies. Other keys are acknowledged and dropped. See [Settings-catalogue](Settings-catalogue). |
| MobileConfig | Meta's feature flags and parameters on the glasses. See [MobileConfig](MobileConfig). |
| mctable | One MobileConfig table file, an FBMobileConfigTable flatbuffer in a small container. |
| params map | The glasses' map from each MobileConfig param to its type and slot. |

## Assistant

| Term | Meaning |
|---|---|
| Oxide, svc15 | The assistant service. The phone plays the role of Meta's server on it. See [Assistant-protocol](Assistant-protocol). |
| m0, s0 | The two svc15 channels: m0 for messages and events, s0 for the audio stream. |
| envelope | The glasses' wrapper for what they send on m0, type 9000, acked with type 9001. |
| NetEvent, evN | An svc15 event with an id, written ev57. See [Assistant-events](Assistant-events). |
| ev57 | The question from the glasses: transcript, intent, slots and visual context. |
| VARM | VoiceActionResponseMessage, ev53, the answer struct. |
| ev60 | MwaVoiceInteractionComplete. It ends every turn, and carries the text when the glasses speak the answer in their own voice. See [Assistant-protocol](Assistant-protocol#ending-a-turn). |
| ev65 | The glasses' own OCR of a question photo. |
| segmented message | A svc15 message sent in pieces: a 1002 header and 1003 buffers. |
| simplified forwarding | The MobileConfig flag the glasses report in ev57 field 30. It decides the order of the answer messages. |
| use case | Field 5 of START_INTERACTION: 3 is Live AI, 7 is a session turn. |
| session path | The path set by the flag `session_centric_air_infra`, where the glasses do not speak text from the phone. |
| attention state | The glasses' assistant state in svc28 field 31: IDLE, WAKE, LISTENING, PROCESSING, RESPONDING. |
| follow-up | A question after an answer. The glasses either open a new turn themselves, or send it as s0 audio with no ev57. See [Assistant-follow-ups-and-photos](Assistant-follow-ups-and-photos). |
| sub-interaction | A new interaction id the phone opens for a follow-up or a Live AI utterance. |
| Live AI | A continuous assistant session with the camera on. |
| language pack | A zip from Meta with the recognition and voices of one language, sent on airship `language_resource`. |
| feature pack | A zip from Meta that turns on a feature, such as live captions, installed over svc29. See [Firmware](Firmware#resource-packs-on-service-29). |

## Meta Ray-Ban Display

| Term | Meaning |
|---|---|
| internet switch | svc41108. The phone tells the Display it is online, which lifts the block on the phone's internet. See [Display-internet](Display-internet). |
| ICEE frame | The 6-byte head on each IP packet in the svc41111 tunnel. |
| constellation | Meta's name for its platform of connected devices: the phone, the glasses and the band. The name shows up in the update queries, in svc11004 and in the band's leases. |
| constellation manifest | The signed list of devices and apps the glasses and the band trust, installed on svc10 or svc102. See [Identity-and-trust](Identity-and-trust#the-constellation-manifest). |
| lease | A claim one device takes on a link or a peer: svc41107 for links and internet, svc150 for the band. |
| Bloks | Meta's server-driven UI: a tree of components keyed by code point, and scripts whose functions are base-36 ids. The Display draws its Briefing, detail screens and the toolkit app's layouts with it. See [Briefing-panel](Briefing-panel#components-and-keys). |
| Briefing | The Display home's panel of glanceable cards, svc9002 panel 30. A card can open a detail screen. See [Briefing-panel](Briefing-panel). |
| detail screen | The full screen a Briefing card opens, fetched on svc43 by its data type and data hash. See [Briefing-panel](Briefing-panel#clicking-into-a-card). |
