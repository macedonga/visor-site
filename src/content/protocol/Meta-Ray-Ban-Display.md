Meta Ray-Ban Display speaks the same link as the other glasses: the same radios, AirShield, DataX, svc36 trust and change of owner. What differs is how much the phone has to serve. The Display's apps ask the phone for texts, calls, music, maps, places and the internet, each on a service of its own. This page covers what is specific to the Display and points to the pages for each group of services.

| | Meta Ray-Ban Display |
|---|---|
| Product id | 259 |
| Device type | 5 |
| Build device | `greatwhite` |
| Update device type | `ota.greatwhite.user` |
| Companion input | The [Neural Band](Neural-Band), paired to the Display |

> [!IMPORTANT]
> Most Display apps wait for an answer and show a spinner until one comes. A service the phone does not serve looks like an app that "loads forever". An empty answer of the right type is better than none.

## Services by area

| Area | Services | Page |
|---|---|---|
| Device state | svc28, wrapped in `HNDeviceState`. The case comes only as 2008 pushes | [Device-state-and-build-info](Device-state-and-build-info) |
| Link checks | svc4, svc76, svc101 | [Link checks](#link-checks) |
| App info | svc100 types 1 and 2, asked by each app | [App info](#app-info-for-each-app) |
| Texts and calls | svc70, svc46, svc11006 | [Display-phone-services](Display-phone-services) |
| Sharing | svc26 | [Display-phone-services](Display-phone-services#sharing-photos) |
| Music | svc9012 | [Display-phone-services](Display-phone-services#music) |
| Maps, navigation, places and location | svc11004, svc42, svc55072, svc41102, svc11020, svc87 | [Display-maps-and-location](Display-maps-and-location) |
| Internet for the Display's apps | svc41108, svc41111, svc9000, svc41107 | [Display-internet](Display-internet) |
| Meta content | svc43, svc9002, svc89 | [Display-internet](Display-internet#meta-content-through-the-phone) |
| The Briefing's cards and their details | svc9002, svc43 | [Briefing-panel](Briefing-panel) |
| Web apps, their sensors, location and Bluetooth scans | svc55074, svc41120, svc41102, svc51 | [Display-web-apps](Display-web-apps) |
| Captions and translation | svc28 start app, svc29 pack install, svc72 | [Captions and translation](#captions-and-translation) |
| Notifications | svc46 | [Notifications-and-contacts](Notifications-and-contacts) |
| Neural Band | svc150, svc41109, svc102 | [Neural-Band](Neural-Band) |
| Apps from other phones | svc79, svc7009, svc6500 | [Device-Access-Toolkit](Device-Access-Toolkit) |
| Motion sensors | svc28 intents, svc1027 | [Motion-sensors](Motion-sensors) |

## Link checks

The Display checks the link on three services. Each wants a short answer.

| Service | What the Display sends | Answer |
|---|---|---|
| svc4 `connection_monitor` | Type 0 with a 4-byte counter, on a channel it opens | A bare DataX status 0 (OK). Answered, the counter counts up on one channel every 1 to 4 s. Unanswered, it stops at 1 |
| svc76 `wearables_ping` | Type 1 | Type 2 PingResult `{1 hasInternet}` |
| svc101 `motion_activity_service` | Type 0, start subscription, when the screen goes off | Type 3 `{1 SETTINGS_NOT_ENABLED = 2}`, which the Display reads as "not driving" |

## App info for each app

Each Display app asks who the phone is. It opens its own svc100 channel, sends type 1 GET_INFO with an empty body and waits 5 s for type 2 AppInfo. Without an answer, the app takes the phone for neither Android nor iOS.

| AppInfo field | Content |
|---|---|
| 1 | Platform: 1 Android, 2 iOS |
| 2 | Companion app version |
| 3 | OS version, for Android the SDK level |
| 4 | Phone manufacturer |
| 5 | Phone id |
| 6 | Phone model |

The apps ask while the link comes up. The phone sends its own svc100 announce at the same time, so a phone that answers only after the build is known has to wait for its own answer first.

## Captions and translation

Live captions and translation run on the Display, from a feature pack. The phone installs the pack and starts the app.

1. The phone gets the pack from `FetchConstellationFeatureUpdates`. The feature is `com.meta.constellation.feature.air.live_captions_<lang>`, or `translation_<source>_<target>` for translation.
2. The phone installs it over service 29 and enables the feature with FEATURE_CHANGE. See [Firmware](Firmware#resource-packs-on-service-29).
3. The phone starts app 31 with svc28 StartApp. The data carries `action.lst_lc.action` = `action.speech_caption.start` (or `action.speech_translation.start`), `self_lang`, `other_lang` and `request_id`. StopApp with the matching `.stop` action ends it.
4. The Display sends each turn back on svc72 type 1, a TwoWayTranslation, on a new channel per message.

> [!WARNING]
> The same pack sent on airship namespace `language_resource` arrives and turns nothing on. Without the installed feature the Display logs `AIR Feature Not Found` and stays on "Face the person who is talking".

| TwoWayTranslation field | Content |
|---|---|
| 1 | Speech id, the same for every update of one turn |
| 4 and 5, 10 and 9 | What the Display shows: two pairs of final and partial text. The partial text holds "..." while formatting catches up |
| 12 and 11 | What was heard, final and partial |
| 13 | The turn is finished |
| 3 | Set on speech from a video too, so it does not mean "the wearer" |

## Assistant cards

The assistant draws a card with ev60. Fulfillment result field 27, onDeviceUxMessage, is `{1 list of cards, 2 interaction id}`, and each card is an AssistantTemplate in compact thrift, sent as base64 text. VARM field 24, expectedUxTemplate, tells the glasses a card is coming. See [Ending a turn](Assistant-protocol#ending-a-turn).

| AssistantTemplate field | Value |
|---|---|
| 1 | Type: 0 for a simple card, 28 for an A2UI card |
| 2 | The template: a SimpleTemplate `{1 title}`, or the A2UI JSON |
| 9 | The text |
| 10 | hideAfterMs, required |

A simple card shows its title in a scrolling block, under the question.

An A2UI card is a JSON array of messages: `createSurface`, `updateComponents`, `updateDataModel` and `deleteSurface`. One bad message drops the whole card. A component needs an `id` and a `component`, and drawing starts at the component whose id is `root`. The components include Text, Image, Icon, Column, Row, Divider, List, Card, Svg, Spacer and Table. A2UI cards have not been tried from a phone.

A card's actions do not reach the phone. The Display logs a tapped action and drops it; only `go_back` does anything. A card can show content, not take input. For layouts that answer taps, see [Device-Access-Toolkit](Device-Access-Toolkit#display).

## Services the Display lacks

The health and workout relays answer `0xC001` (service not found) on Display firmware `69951180085500080`: svc23471, svc23472 and svc23478. The image has no app that reads them.

Reference code: [GlassesSession.kt](https://github.com/macedonga/visor/blob/main/core/session/src/main/kotlin/com/macedonga/visor/core/session/GlassesSession.kt), [PeerAppInfo.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/connection/PeerAppInfo.kt), [InternetSwitch.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/connection/InternetSwitch.kt), [MotionActivity.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/connection/MotionActivity.kt), [CaptionPacks.kt](https://github.com/macedonga/visor/blob/main/app/src/main/kotlin/com/macedonga/visor/display/CaptionPacks.kt)

## Open questions

- Whether the Display ever uses the svc76 ping answer. It has been seen once in a day.
- What the Display does with the motion activity answer beyond "not driving".
- Why a svc72 turn carries two pairs of shown text, fields 4 and 5 and fields 10 and 9.
- When the health and workout relays get a reader on the Display.
- Whether A2UI cards (AssistantTemplate type 28) draw when the phone sends them in ev60.
