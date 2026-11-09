This page lists the svc15 events (NetEvent ids) and message types that the phone sends, reads or ignores. It gives each id's firmware name, its direction, its contents and what the phone does with it. The order in which they are used is on [Assistant-protocol](Assistant-protocol).

## NetEvent ids

The direction is from the glasses' point of view. "To glasses" means the phone sends it. Field numbers in "Carries" are the event body's fields.

| id | Firmware name | Direction | Carries | Phone use |
|---|---|---|---|---|
| 52 | FinalTranscription | to glasses | 1 transcript, 2 i32 0, 4 empty string, 7 false, 8 interaction id. Sent at tagged type 0 | Sent before every answer |
| 53 | VoiceActionResponseMessage (VARM) | to glasses | The answer struct. Field layout in [Assistant-protocol](Assistant-protocol#the-answer) | Sent at type 1010. When depends on ev57 field 30, see [The answer order](Assistant-protocol#the-answer-order) |
| 55 | ActionFulfillmentRequest | from glasses | The VARM's display action | Answered with ev67 |
| 57 | MwaVoiceInteractionFulfillmentRequest | from glasses | The question: interaction id (1), invocation method (11), transcript (2.1.1), visual context (2.4), intent (23), slots (26), stream id (7, 8), forwarding flag (30), Display tools (54) | Read. The answer starts here |
| 59 | MwaVoiceInteractionCloseRequest | from glasses | Unknown. Field layout not known | Not read. Name and direction only |
| 60 | MwaVoiceInteractionComplete | to glasses | 1 interaction id, 2 status (1000 is success), 3 empty string, 4 fulfillment result: 1 text, 2 fulfillment type 1, 3 requiresAnswer, 7 and 8 already streamed, 11 shouldSmartFollowUp, 27 a Display card | Sent at the end of every turn. See [Ending a turn](Assistant-protocol#ending-a-turn) |
| 61 | PartialVoiceInteractionFulfillmentResponse | to glasses | 1 ttsMessage, 2 interaction id, 3 isFinal, 4 sequence id, 5 requiresAnswer | Not used. The glasses log it and never speak it |
| 63 | KeepMwaAliveEvent | from glasses | 1 extendTimeout, false | Sent every second while the glasses wait. Answering it does not extend the wait |
| 65 | MmaiInteractionRequest | from glasses | 1 interaction id, 2 OCR result, 3 OCR patch uuids | The glasses' own OCR of the question photo. See [Assistant-follow-ups-and-photos](Assistant-follow-ups-and-photos#text-in-the-photo) |
| 67 | ActionFulfillmentResponse | to glasses | 1 id, 2 true | Answers ev55 |
| 71 | StartOfUserSpeech | to glasses | 1 interaction id | Sent after ev289 once per interaction, and as the first event of every answer |
| 73 | RemoteImageCaptureRequest | to glasses | 1 false, 2 true, 3 false, 4 interaction id | Sent when a visual question has no photo yet. Unconfirmed: whether every request gets a photo back |
| 74 | RemoteImageCaptureResponse | from glasses | Body not read. The photo itself comes on airship or svc53 | Marks the pending photo as taken. Body contents unknown |
| 107 | TtsControl | unknown | Unknown | Not sent or read by the phone |
| 258 | LiveaiSessionDiagnosticSample | from glasses | Diagnostics. Not read | Ignored. Contents unknown |
| 262 | LiveAiClientReceivedFirstFrame | to glasses | 1 session id, 2 i32 1, 3 i32 0 | Sent last in the bring-up session announcement |
| 263 | ServerConnectionStatus | to glasses | 1 session id, 2 bool, 3 bool, 4 i32 1 then i32 2, 7 bool | Sent twice in the bring-up session announcement |
| 265 | MwaInteractionCreationSuccess | to glasses | 1 session id, 2 true, 3 false, 4 uppercase uuid, 5 host name, 6 "ble", 10 session string, 11 false, 13 true, 14 false | Sent first in the bring-up session announcement |
| 289 | SessionModeUpdateResponse | from glasses | 1 id, 2 mode. Mode 2 is Live AI. Carries isWarpEnabled | Read. A confirmation for a turn is sent back as ev71 |
| 302 | FrameKeepAliveEvent | to glasses | 1 i64 time, 2 i32 counter | Sent during Live AI |
| 304 | FrameKeepAliveResponse | from glasses | Not read | Ignored |
| 307 | DeviceVoiceStateUpdate | from glasses | An interaction id, a state number, and sometimes the partial transcript or the glasses' own spoken line | Not acted on |
| 333 | ConstellationSessionStateBroadcast | to glasses | The integer fields of the 339 it echoes, sorted by field number | Sent as the mirror of every 339 |
| 339 | ConstellationSessionStateUpdate | from glasses | 1 state, 2 flag. States seen: 1, 2, 3 and 4 | Mirrored as 333 at once, during the audio burst |
| 340 | ProactiveAiNotification | from glasses | Unknown | Not read |
| 342 | OnPhoneUnderstandingResult | to glasses | 1 interaction id, 2 false, 3 intent string, 4 false. Sent at tagged type 0 | Sent before every answer, with the fixed intent IN:GET_WEATHER |
| 343 | TtsRetailDemo | to glasses | Text to speak, on the session path | Not used by the phone. The glasses speak the text and close the session |
| 311 | MCPRequestMessage | to glasses | 1 a JSON-RPC `tools/call` | Meta Ray-Ban Display: calls one of the tools named in ev57 field 54 |
| 312 | MCPResponseMessage | from glasses | 1 the JSON-RPC answer, with the same id | The tool's result |
| 360 | RemoteInteractionComplete | from glasses | 1 interaction id, and a result: 12 for a normal end, 95 after a timeout | Marks the turn closed, so a late answer is not spoken. Ends Live AI |
| 380 | RemoteIntentHandlingRequest | to glasses | 1 request id, 2 interaction id, 3 the intent from ev57 field 55 | Meta Ray-Ban Display: hands a device intent back |
| 381 | RemoteIntentHandlingResponse | from glasses | 1 request id, 2 success, 3 message | Answers ev380 |
| 387 | MCPRequestReceivedAck | from glasses | | Acknowledges ev311 |
| 388 | TtsStartInfo | to glasses | 1 epoch ms (i64), 2 monotonic ms (i64), 3 interaction id | Sent after the preamble, at the start of a streamed answer |
| 389 | TtsEndInfo | to glasses | 1 epoch ms, 2 monotonic ms, 3 i64 7000, 4 interaction id | Sent after the stream end. Field 3 (7000) has no known meaning |
| 392 | KeepWearableAirSessionAlive | to glasses | While waiting: 1 "AwaitingResponse", 2 i32 20000, 3 i32 counter. After an answer: 1 "VoiceActionResponseMessage", 2 i32 monotonic ms low 16 bits, 3 i32 1 | Sent periodically while the answer is being made, and last in every answer |

## Message types on svc15

The DataX message types below ride on the svc15 channels. The full enum has 102 values. The table lists the types that the phone or the glasses use on this service.

| Type | Name | Direction | Use |
|---|---|---|---|
| 0 | UNSPECIFIED | both | As a tag, on m0, for ev52 and ev342. Bare, with no tag at all, for every continuation audio message on s0. A tag of 0 on a continuation breaks it |
| 11 | PAIRED_DEVICE_ANDROID | to glasses | First bring-up resource, field 1 "<epoch ms>-<uuid>" |
| 1000 | INIT_MESSAGE_REQUEST | to glasses | Registers m0 |
| 1001 | INIT_MESSAGE_RESPONSE | from glasses | Answers 1000. Sets m0 registered. Carries the svc15 protocol version |
| 1002 | SEGMENTED_MESSAGE_HEADER | both | `{1 inner type, 2 total size, 3 message id}`. See [Long messages](Assistant-protocol#long-messages) |
| 1003 | SEGMENTED_MESSAGE_BUFFER | both | `{1 bytes, 2 message id, 3 end of message}` |
| 1010 | MESSAGE_INTER_DEVICE_MESSAGE | both | Carries a NetEvent |
| 1016 | MESSAGE_DEVICE_ACTIVE | to glasses | Bring-up resource, empty |
| 1023 | START_INTERACTION | from glasses, inside a 9000 envelope or bare | Field 5 is the use case: 3 for Live AI, 7 for a session turn. Field 3 is how the turn started |
| 1026 | MESSAGE_ASSISTANT_RUNNING_LOCALE | from glasses | The glasses' language, as a string or as {1 locale}. The phone takes its answer language from it |
| 1028 | MESSAGE_ASSISTANT_TIME_STRETCH_ENABLED | from glasses | Sent after bring-up. Ignored |
| 1029 | MESSAGE_NUM_OF_DEVICES_PAIRED | to glasses | Bring-up resource, the string "1" |
| 1031, 1032 | MESSAGE_MWA_AIR_RESOURCES_UNAVAILABLE and _AVAILABLE | to glasses | Bring-up resources, each with a uuid in field 1 |
| 1033 | MESSAGE_ASSISTANT_TTS_BUFFER_CONFIG | from glasses | Sent after bring-up. Ignored |
| 1036 | MESSAGE_DEVICE_MMAI_ENABLED | from glasses | Ignored. Body unknown |
| 1037 | MESSAGE_DEVICE_ASSISTANT_READY | from glasses | Ignored. Body unknown |
| 1038, 1039 | MESSAGE_MWA_LIVE_MODE_AIR_RESOURCES_UNAVAILABLE and _AVAILABLE | to glasses | Bring-up resources, each with a uuid in field 1 |
| 5000, 5001 | INIT_STREAM_REQUEST and RESPONSE | both | Register s0 |
| 5002 | STREAM_HEADER | both | From glasses: the microphone stream, with the stream id in field 1 and the interaction id in field 2. To glasses: the answer's header, with the same stream id, field 4 = 1 (audio encoding), field 7 = 1 and field 19 = 1 |
| 5003 | STREAM_AUDIO | both | The first audio message, two packets with u32 LE lengths |
| 5005 | STREAM_STATUS_INFO | from glasses | "<stream id>_<interaction id>_<pcm bytes>_<milliseconds>". See [The 5005 diagnostic](Assistant-protocol#the-5005-diagnostic) |
| 6000 | STREAM_END | both | Ends a stream, empty payload |
| 6001 | STREAM_CONSUMED | from glasses | Follows a stream. Ignored |
| 9000 | MESSAGE_ENVELOPE | from glasses | Fields 1 seq, 2 inner type, 3 payload. How most firmware wraps what it sends |
| 9001 | MESSAGE_ACK | to glasses | Field 1 seq. Acks every envelope. Unacked envelopes repeat for minutes |

Reference code: [events.tsv](https://github.com/macedonga/visor/blob/main/core/assistant/src/main/resources/com/macedonga/visor/core/assistant/events.tsv), [Assistant.kt](https://github.com/macedonga/visor/blob/main/core/assistant/src/main/kotlin/com/macedonga/visor/core/assistant/Assistant.kt)

## Open questions

- Ids 59, 107 and 340 have no known contents. The phone never sends or reads id 107.
- Id 389 field 3 (7000) has no known meaning.
- Id 392 has two bodies. The meaning of the second body is not settled.
- Ids 73 and 74: whether every visual question gets a photo back through these ids, and what the body of 74 holds.
- Types 1036 and 1037: no body is known for either.
