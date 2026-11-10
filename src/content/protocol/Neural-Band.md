The Meta Neural Band is the wrist band that comes with Meta Ray-Ban Display. It reads hand gestures (EMG) and sends them to the Display. It has its own link to the phone, with the same AirShield and DataX as the glasses, a few differences in link setup, and one RPC service. This page covers the band's link, its ownership, its RPC service, and how it is shared with the Display.

| | Meta Neural Band |
|---|---|
| Product id | 1537 |
| Device type | 4 |
| Codename | `ceres` |
| Update device type | `ota.ceres.user` |
| L2CAP PSM | 129 |

## The link

The band is a bonded LE peer, like the glasses. The phone reads the PSM over GATT (129) and opens an L2CAP channel. Then it runs the same AirShield handshake and svc36 trust as with glasses. See [Link-setup-and-AirShield](Link-setup-and-AirShield). The differences:

| | Glasses | Neural Band |
|---|---|---|
| AirShield version, RequestEncryption field 7 | 17 | 17 (0x11) |
| Parameters | 31 | 27, without Multikey: one HKDF key is both the AES and the HMAC key |
| Key hint | One | One |
| Its EndLinkSetup | On 0x8001 | On a channel of its own, 0x9001, with no service tag |
| Its channel numbers | From 0x0002 | From 0x1001 |

The band also sends svc79 constellation auth trust. The phone answers it with `0xC001`, as it does for glasses.

## Ownership

Change of owner runs over svc36 as for glasses. See [Meta-login-and-ownership](Meta-login-and-ownership). The one difference is in `pair_request`: its `additional_data` must carry `secondary_cert`, the base64 of field 5 of the band's identity response. Glasses leave field 5 empty. Without `secondary_cert`, Meta's `pair` answers HTTP 500.

## svc52822: wireless input

Service 52822 (`wireless_input_service`) is the band's RPC service. Every request is message type 788, wrapped in an RpcRequest. The field of the RpcRequest names the call:

| Field | Call |
|---|---|
| 2 | Battery |
| 3 | Device info |
| 4 | Stream control |
| 5 | Configuration, such as handedness (bit 512 and `isLeftHanded`) |
| 7 | Firmware update |
| 9 | Bulk transfer |
| 11 | Gesture acknowledgement |
| 12 | Bug report |
| 14 | Uniband |

The band also sends EMG, IMU and gesture events to the phone on this service.

A firmware update runs as follows: the phone gets the image from `FetchSystemUpdates` (device type `ota.ceres.user`) and its key-encryption key from `FetchEncryptedKEKInfoByKEKId`. It installs the key (type 6), sends the file over bulk transfer, then starts, verifies and commits the update.

## Sharing the band with the Display

The Display is the band's central, and the band its peripheral. The phone holds its own band link only while the Display does not need it. The Display asks for the band on service 150 (`conn_device_lease`):

| NotifyLease field | Content |
|---|---|
| `peerKeyHint` | Which peer the lease is for |
| `leaseType` | 1 RELAY, 2 LOW, 3 MED, 4 HIGH |

The phone matches the key hint against the band's key, the `device_ec_public_key` in `additional_data` of Meta's final ownership receipt for the band. It is not the key in the band's certificate. When it matches, the phone answers OK and pauses its own band link while the Display holds any lease other than RELAY.

### Pairing the band to a Display

Service 41109 (`bt_peer_connection`) on the Display pairs a band to it. The sequence:

1. The phone owns the band and has a link to it.
2. The phone sends GET_BLE_PAIRING_INFO to both the band and the Display.
3. The phone sends ENABLE_PAIRING_MODE to the band and waits for PAIRING_MODE_READY.
4. The phone lets go of the band.
5. The phone sends PAIR to the Display with the band's identity, its advertising address and its key hint. When the band and the Display already list each other, it sends CONNECT instead.
6. The Display answers PAIRING_EVENT 0 when the band is paired.

The key hint is a 4-byte salt and the first 8 bytes of `SHA-256(SHA-256(public key) || salt)`, where the public key is the 64-byte raw key. The high nibble of the salt's first byte is the salt's length minus one, so 3 for four bytes. The Display reads the length from that nibble, as AirShield's HintMatcher does: a hint with a random first byte matches no key.

> [!CAUTION]
> PAIR clears the Display's old bond with a band. A run that fails partway can leave the band paired to nothing.

> [!NOTE]
> Meta's app skips svc41109 on pairs where its connection manager owns the band, and uses svc150 leases and the constellation manifest instead. The Display still serves svc41109 in full.

### Pairing at AirShield 0x11

When the band and the Display both run AirShield 0x11, the Display links the band itself:

1. The phone owns the band and has a link to it.
2. The phone installs a manifest that lists both devices, on the band first and then on the Display. See [the band's manifest](#the-bands-manifest).
3. The Display's context awareness manager matches the band against its rules. While the glasses are worn, it sends NotifyLease on svc150 and connects to the band. No BLE bond is needed beforehand.

Its built-in rule `SmartGlasses -> Input (Low)` does this. The rule is on when MobileConfig `wearable_connectivity_device_features.cam_sg_to_input` or the setting `sg_emg_display_off` is true. Meta's MobileConfig sync turns `cam_sg_to_input` on, so a Display that never had it links a band only by a rule from the phone. The Display's dumpstate lists its rules, peers and leases under `ContextAwarenessManager`.

On firmware 72025890058000080, the Display connects a band in its manifest by itself within a second of a svc41109 DISCONNECT.

svc151 (`cam_control`) adds rules. Message type 1 is a CamOverrideRule, sent on a channel the phone opens:

| Field | Content |
|---|---|
| 1 currentDevice | DeviceMatch for the glasses |
| 2 peerDevice | DeviceMatch for the band |
| 3 lease | Scope state: 1 disconnected, 2 low, 3 medium, 4 high, 5 relay |
| 4 ruleType | 0 temporary, 1 permanent |

DeviceMatch is `{1 family (packed: 1 smart glasses, 6 input), 2 product id, 3 inUse, 4 activePower, 5 connectedToPhone, 6 onBody, 7 charging, 8 uniquePeer}`. The family list must not be empty. uniquePeer is the peer's 12-byte key hint. The Display counts itself as smart glasses. The Meta app sends the glasses with onBody true, the band by its key hint, a low lease and a temporary rule, when a band is moved to other glasses.

The Display answers with type 2, CamOverrideRuleAck `{1 the rule's 16-byte id}`, and the rule lasts until the Display restarts. A newer rule for the same peer replaces the older one, and the Display drops the band and links it again. It refuses a rule with error 2 when:

- the rule is not temporary;
- no peer matches the key hint ("Peer from OverrideRule not found");
- the glasses part does not match the Display;
- the lease is disconnected or lower.

A rule does not switch off the built-in rule. With a relay rule in place, the Display keeps its direct link. After a DISCONNECT it waits about 20 s for a path through the phone, then links the band directly again.

### The band's manifest

The band holds a [constellation manifest](Identity-and-trust#the-constellation-manifest) too, with the same messages as the glasses. They go on svc102 (`embconn_link_mgr_manifest`) when the band's AirShield version is 0x11 or higher, and on svc10 before that. The band and the Display hand a newer manifest to each other when both trust its authority.

> [!WARNING]
> Install a manifest under a new authority on the band first. The band refuses the Display's manifest when it does not know the authority, with `0xC004`, and does not connect to the Display until it has it.

### The band's streams

A StreamControlReq (RpcRequest field 4) turns the band's streams on and off. From protocol 2 it carries a map in field 36 `{1 message type, 2 on}`, with priority 35 (90, GENERIC_C50) and the use case 37 (`GenericC50`). Before protocol 2 it has one bool a stream, and a bool left out reads false, so one request must name every stream that stays on. The band then sends each stream's samples as svc52822 messages of that type. Names from Meta AI 297 (`EnumC31314GFt`), fields from the Display's `EmgImu` and `StreamControl` protos.

| Type | Stream | Bool before protocol 2 |
|---|---|---|
| 13, 60 to 200 | Gestures | 3 `enableGestures` |
| 15 | `IMU_GYRO` | 6 `enableGyro` |
| 16 | `IMU_ACCEL` | 5 `enableAcc` |
| 17 | `IMU_MAG` | 7 `enableMag` |
| 18 | `IMU_QUAT` | 8 `enableQuat` |
| 32 | `TOUCH` | 24 |
| 35, 38 | Steps and activity detection (health data collection) | |
| 46 | `BAND_ORIENTATION_RESULT` | 29 |
| 53, 54 | `WRIST_TILT_EVENT`, `WRIST_DOWN_EVENT` | 39, 40 |
| 55 | `TRACKPAD` | 45 |
| 56 | `HR` | 47 |
| 58 | `GRIP_STRENGTH` | 49 |
| 201 | `THERMAL` | 41 |

The IMU samples are `RawImu*Sample {1 seq, 2 timestamp, 3 channels}`. For the gyroscope, accelerometer and magnetometer, the channels are three little-endian int16. The Meta app scales the gyroscope by 0.0012217305 rad/s and the accelerometer by 0.0023928226 m/s² a step, and leaves the magnetometer unscaled. For the orientation, the channels are four little-endian floats, x, y, z and w. The unit of the timestamp is not checked.

Visor turns the IMU on for the VDK's `band.motion` while the band is shared. Not measured yet.

### Gestures and the buzz

A svc7009 session on an app's link forwards the band's gestures while the band stays with the Display. See [Device-Access-Toolkit](Device-Access-Toolkit#forwarded-gestures).

The Display does not relay svc52822 from the phone: a buzz sent on the phone's link to the Display answers `0xC001`. The Display's own haptics services are internal to it. To buzz the band, the phone needs its own band link. The band takes one central at a time. To take it, the phone sends a relay rule, then svc41109 DISCONNECT, and connects within the 20 s the Display waits. The band advertises service `fd5f` and Meta data `80 01 06 …` (product 1537) at a rotating private address, and the phone reaches it only at that address. To give it back, the phone sends a low rule and CONNECT. Meanwhile the Display has no band. Without the relay rule, firmware 72025890058000080 takes the band back within a second, before the phone reaches it.

### The relay: the Display reaches the band through the phone

The band takes one central. While the phone holds it, the Display can still reach it through the phone, as the Meta app does on a RELAY lease (Meta AI 297 `RelayStreamManager`, `EndpointCoordinator`, `RelayedConnection`):

1. The phone opens a relay sub-stream on its link to the Display and one on its link to the band. See [AirShield-frames-and-ciphers](AirShield-frames-and-ciphers#relay-sub-streams).
2. It sends each side `OPEN_TO_ADVERTISE` when both peers announced AirShield 0x11 or later in their RequestEncryption (field 7), and plain `OPEN` otherwise.
3. From then on it passes every frame and command of one sub-stream to the other. The Display and the band run their own link setup and session inside, end to end. The phone reads none of it.
4. When one side sends `LOST`, `REJECTED` or `NO_ROUTE`, the phone sends `LOST` to the other and opens both again, up to five times.

The Meta app joins the band's endpoint to the Display's when it sets the pair up ("establishing direct connection between central and peripheral"). The Display has `persist.vendor.meta.atc.enable_relay=1` and an ATC `RelayManager` that takes such sub-streams, matches the advertised peer with its manifest, and starts its link to the band on them. Its leases then say RELAY, and the phone keeps its own band link: it reads the band's gestures and buzzes it while the Display uses the band too.

Visor does this when the person turns on **Share with the phone** in the band settings, and sends svc41109 SET_PREFERRED_LINK `{1 link: 1 relay, 2 direct; 2 the band's identity; 3 its key hint}` with RELAY while shared and DIRECT after. On firmware 72025890058000080 the Display's dumpsys then shows `Active link [RELAY]`. The band closes the phone's link every 2 min 54 s while shared, and the relay opens again within 3 s; why is not known.

### The EMG relay receiver

The Display has a second, simpler path: `/system_ext/bin/emgrelay_receiver`. It starts once at boot (`class main`, `oneshot`) and exits unless MobileConfig `hn_demos.enable_emg_receiver` is true. `hn_demos.emg_relay_receiver_always_on` picks its mode:

- Off: it serves svc23466 (`EMG_RELAY_RECEIVER`) on each link. When the phone opens a channel, it answers with an empty message (the connection ack).
- On: it opens svc23466 on the phone itself, on request from the virtual-EMG service or `debug.emgrelay.stream_request=1`, and sends an empty message (the handshake init).

Either way the phone then sends message type 1, an `OpaqueMessage`, or type 2, an `EmgInferenceEvent`, and the receiver injects them into the Display's virtual-EMG service (`vemg_aidl`, `com.meta.wearable.emg.sim`) as if the band had sent them:

| Message | Fields |
|---|---|
| `OpaqueMessage` | 1 `OpaqueData`, 2 stream id (1 custom gestures, 2 trackpad, 3 gestures), 3 timestamp in microseconds |
| `OpaqueData` | 1 encoding, 2 bytes |
| `GestureEvent`, in the bytes of stream 3 | 1 seq, 2 timestamp, 3 finger, 4 action, 5 derived action, as the band sends it |

Stream 3 goes to the service's gesture call with finger, action and derived action. Other streams go in whole with their stream id and encoding. Both flags are demo flags, off by default, so Visor uses the relay above.

Reference code: [Band.kt](https://github.com/macedonga/visor/blob/main/core/protocol/src/main/kotlin/com/macedonga/visor/core/protocol/Band.kt), [GlassesSession.kt](https://github.com/macedonga/visor/blob/main/core/session/src/main/kotlin/com/macedonga/visor/core/session/GlassesSession.kt)

## Open questions

- Most svc52822 bodies beyond the call list.
- Whether the band's own firmware update flow works end to end from a phone other than Meta's.
- The full svc41109 message table and its error codes.
- When the Display asks for each lease type.
- Whether the band and the Display bring up their link through a phone that is not Meta's relay, and whether the band then sends gestures on both sessions.
