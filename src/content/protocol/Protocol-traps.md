Most of the protocol fails silently. A wrong byte does not get an error back: the glasses drop the message, close the link, or answer every later request with "service not found". This page collects those traps in one place. Each one links to the page that explains it.

## The link

> [!CAUTION]
> **EndLinkSetup UUIDs must be RFC 4122 version 4.** `(b[6] & 0xf0) == 0x40` and `(b[8] & 0xc0) == 0x80`. Otherwise the glasses tear the channel down silently, or every service answers `service_not_found`. See [Link-setup-and-AirShield](Link-setup-and-AirShield#endlinksetup-and-the-uuid-rule).

> [!WARNING]
> **EndLinkSetup follows trust.** Sent before the svc36 exchange, it gets a stream-0 LOST and silence. See [Link-setup-and-AirShield](Link-setup-and-AirShield#why-endlinksetup-follows-trust).

> [!WARNING]
> **Follow the peer's parameters and quirks.** Against a peer that offers 27, a phone with two keys fails at the first frame. Against a QCS7 peer, both the HKDF info and the MAC word change. See [Link-setup-and-AirShield](Link-setup-and-AirShield#parameters).

> [!WARNING]
> **Framing is `4 + length`, not `header_len + length`.** The DataX length already counts the extension tags. See [Transport-and-framing](Transport-and-framing#datax-sdu).

> [!WARNING]
> **Strip each frame's pad before cutting messages.** The frames on a link are one stream once their pads are off. A walker that measures against the padded frame misreads a message that ends one byte short of the frame end. See [DataX-channels](DataX-channels#fragments-and-reassembly-across-frames).

> [!WARNING]
> **One writer per link.** The IV and the sequence advance per frame. Two writers at once corrupt every later frame in both directions, with no error. See [AirShield-frames-and-ciphers](AirShield-frames-and-ciphers#the-cipher).

> [!WARNING]
> **One session at a time.** A new AirShield session on any radio closes the old one. Pause the Bluetooth session while Wi-Fi runs. See [Radios-and-links](Radios-and-links#one-session-at-a-time).

> [!CAUTION]
> **A switched session keeps the first link's cipher.** On the new link both sides seal and open with it; the new link's own keys end with its setup. See [Wi-Fi-Direct](Wi-Fi-Direct#switching-links-without-a-reset).

> [!WARNING]
> **Send a link switch on a new svc10 channel, and send nothing until the glasses' switch comes.** Without the service tag they wait 2 s and move half way. A frame between the two switches reaches a path they are clearing. See [Wi-Fi-Direct](Wi-Fi-Direct#switching-links-without-a-reset).

> [!WARNING]
> **Do not acknowledge the EndLinkSetup of a link set up as READY.** The acknowledgement fails under the session's cipher once the session moves there, and the glasses close the link. See [Wi-Fi-Direct](Wi-Fi-Direct#switching-links-without-a-reset).

## DataX

> [!WARNING]
> **OK is status 0.** `0x1000` is svc36's own result. Sent as the OK for other services, it reads as a failure. See [DataX-channels](DataX-channels#status-frames).

> [!WARNING]
> **The originator bit belongs to the side that opened the channel.** Replies on a channel the glasses opened go on its mirror. Replies on a channel the phone opened keep bit 15. See [DataX-channels](DataX-channels#channel-ids-and-the-originator-bit).

> [!NOTE]
> **Only the opening frame names the service and type.** Later messages read service 0, and continuations read type 0 too. The channel registry keys on the originator bit. See [DataX-channels](DataX-channels#channel-registry-rules).

> [!WARNING]
> **A channel answered `0xC001` or `0xC002` is dead.** A service that starts later or restarts is reached only on a new channel. See [DataX-channels](DataX-channels#error-codes-on-a-channel).

## Identity

> [!WARNING]
> **Trust signatures are exact.** `NONEwithECDSA` over the prehashed digest, coordinates fixed at 32 bytes, `s` in the low half. Any mistake gets `0x1043 INVALID_APP_IDENTITY`. See [Identity-and-trust](Identity-and-trust).

> [!WARNING]
> **One Meta token per run.** Each AR login ends the older sessions. A request with an older token gets OAuth error 190. See [Meta-login-and-ownership](Meta-login-and-ownership#token-kinds).

> [!CAUTION]
> **Wrap the manifest's content key with the authority key.** The glasses open their wrap with ECDH of their own key and the authority key. Any other wrap makes svc79 refuse every app with status 1. See [Identity-and-trust](Identity-and-trust#the-constellation-manifest).

## Media and files

> [!CAUTION]
> **Every airship offer ends with a drop on type 7.** Accepted or refused. Without it the glasses' send queue stalls behind that file. See [Airship-file-transfer](Airship-file-transfer#accept-and-refuse).

> [!WARNING]
> **The MobileConfig archive name is exactly 88 characters, with a newer time stamp each time.** A wrong length is dropped at the offer. An old stamp is skipped without an error. See [MobileConfig](MobileConfig#the-zip).

> [!WARNING]
> **A MobileConfig bool is bit 7.** True is 0x80. A plain 0x01 reads as false. See [MobileConfig](MobileConfig#the-table-format).

> [!NOTE]
> **The phone sets the glasses' clock.** Without svc22 type 1 on connect, a pair whose clock fell behind files new captures in the past. See [Device-state-and-build-info](Device-state-and-build-info#svc22-clock-and-device-info).

## Assistant

> [!WARNING]
> **Every turn ends with ev60.** Without it the glasses stay in RESPONDING with the microphone on. See [Assistant-protocol](Assistant-protocol#ending-a-turn).

> [!WARNING]
> **The answer order follows ev57 field 30.** With simplified forwarding off, the usual order is silent. See [Assistant-protocol](Assistant-protocol#the-answer-order).

> [!WARNING]
> **Audio continuations carry no tags.** A tagged type 0 makes only the first 40 ms play. See [Assistant-protocol](Assistant-protocol#silent-faults).

> [!NOTE]
> **Events over 1 KB go in pieces.** svc15 types 1002 and 1003, both ways. See [Assistant-protocol](Assistant-protocol#long-messages).

## Meta Ray-Ban Display

> [!WARNING]
> **svc28 device state is wrapped** in `HNDeviceState {1: DeviceState}`. Read as a plain DeviceState, the battery reads 0 percent. See [Device-state-and-build-info](Device-state-and-build-info#svc28-message-types).

> [!CAUTION]
> **Open svc26 with an empty type 3 on every connection.** Otherwise every share fails with "No remote channel at identifier: MWA". See [Display-phone-services](Display-phone-services#sharing-photos).

> [!WARNING]
> **The internet state counts only on a channel the phone opens.** On the mirror of the Display's channel it does nothing, and the Display's apps stay off the phone's internet. See [Display-internet](Display-internet#the-gate).

> [!WARNING]
> **An assistant card needs hideAfterMs,** AssistantTemplate field 10. Without it the Display throws and draws nothing. See [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display#assistant-cards).

> [!NOTE]
> **svc70 folder names are lowercase.** With `SENT`, a sent text reloads as still sending. See [Display-phone-services](Display-phone-services#texts).

> [!NOTE]
> **A text notification needs app id `com.android.sms`, provider 3 and the SMS thread id,** or the Messages app drops it. See [Notifications-and-contacts](Notifications-and-contacts#texts-on-meta-ray-ban-display).

> [!NOTE]
> **Captions turn on only through a svc29 pack install and FEATURE_CHANGE.** The same pack on airship `language_resource` turns nothing on. See [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display#captions-and-translation).

> [!NOTE]
> **The music cover comes only over svc9012** with an Android phone. The music screen ignores AVRCP cover art. See [Display-phone-services](Display-phone-services#music).

> [!NOTE]
> **The Phone app's recent calls wait on svc70 type 11,** once per provider. svc11006 does not fill them. See [Display-phone-services](Display-phone-services#recent-calls).

> [!WARNING]
> **A medium link lease is Bluetooth Classic, not Wi-Fi.** The Display asks for one on every connection. Moving the session to Wi-Fi for it resets every channel. See [Display-internet](Display-internet#svc41107-leases).

> [!WARNING]
> **A Briefing card's hash must cover all its payload.** The Display keeps a card, click scripts and all, while its hash stays the same, and keeps a detail for an hour by its params. See [Briefing-panel](Briefing-panel#svc9002-the-panels).

> [!WARNING]
> **A pager's pages must be focusable containers, and one must hold the focus.** The wearer's swipes move the focus; plain flexboxes leave the pager on its first page. See [Briefing-panel](Briefing-panel#pages).

> [!NOTE]
> **An absolute position counts from the box's outer edge,** not from inside its padding. See [Briefing-panel](Briefing-panel#components-and-keys).

> [!WARNING]
> **Install a new manifest authority on the band first.** The band refuses the Display's manifest from an authority it does not know, with `0xC004`. See [Neural-Band](Neural-Band#the-bands-manifest).

## Apps

> [!WARNING]
> **svc1027 needs `session_info` at the JSON root, and the stop intent before the start intent.** Otherwise the recording fails with code 205, or the daemon does not start. See [Motion-sensors](Motion-sensors).

> [!NOTE]
> **A session with `uses_dam` always shows the DWA.** For gestures alone, start the session without it. See [Device-Access-Toolkit](Device-Access-Toolkit#forwarded-gestures).
