This page covers the glasses' firmware as the protocol shows it: the build string, the Android base, the firmware versions seen, the update query and the resource packs on service 29. Installing firmware images is not covered.

## Build fingerprint

The glasses report their build as one string on svc100 field 1. The string follows Android's fingerprint format.

```
Meta/hammerhead/greathammerhead:14/UKQ1.250303.001/70523680060800100:user/release-keys
```

| Part | Value | Meaning |
|---|---|---|
| 1, brand | `Meta` | The maker of the build |
| 2, product | `hammerhead` | The product codename. On Ray-Ban Meta Gen 2 it differs from the device codename |
| 3, device and release | `greathammerhead` and `14`, split by a colon | `greathammerhead` is the device codename. It selects the product id. `14` is the Android release |
| 4, build id | `UKQ1.250303.001` | An Android-style build identifier. Its meaning is unknown |
| 5, incremental and type | `70523680060800100` and `user` | The firmware version, then the build type |
| 6, tags | `release-keys` | The build is signed with release keys |

The device codename is the one the product table in [Glasses-hardware](Glasses-hardware) maps to a product id.

## Android base

Part 3 ends in `14`. In Android's fingerprint format this is the Android release, so the firmware is built on Android 14. Unconfirmed: nothing asks the glasses for their Android version directly.

## Firmware versions

| Version | Where it appears | What is known |
|---|---|---|
| `70523680060800100` | The build string on svc100 on Ray-Ban Meta Gen 2 | An earlier build |
| `72387580077200100` | The build string on Ray-Ban Meta Gen 2 after an update | Installed by an automatic update that started from `70523680060800100` |
| `72387580112400100` | The update query for Ray-Ban Meta Gen 2, build name `129.2` | Adds Meta's Muse assistant. Custom wake words need the setting `hatch_enabled`. See [Assistant-protocol](Assistant-protocol) |
| `13440460044101290` | The build string on Ray-Ban Meta Optics (`zebra`) | A separate line for that model |
| `69951180085500080` | The build string on Meta Ray-Ban Display, build name `129` | Device type `ota.greatwhite.user` |
| `1054928927` | The Neural Band | Device type `ota.ceres.user` |
| `12.14.7` | The case state on svc28 field 2 | The case's firmware, not the glasses' |
| `128.0.0.0.0` | svc100 field 9 | Unknown |

Ray-Ban Meta Gen 2 reported `70523680060800100` before it updated to `72387580077200100`.

## How an update offer is queried

The phone can ask Meta whether a newer image exists for a pair. This is the protocol level only.

1. The phone sends a form-encoded GraphQL request to Meta's AR endpoint, `ar-genai.graph.meta.com`. The request carries the AR token from the Meta login in an OAuth authorization header. See [Meta-login-and-ownership](Meta-login-and-ownership).
2. The operation is `FetchConstellationUpdates`. Its variables hold one request per device.
3. Each device request carries the glasses' serial, a device type, a firmware version and a flag that asks for the full image only. The device type has the form `ota.<codename>.user`. For Ray-Ban Meta Gen 2 it is `ota.greathammerhead.user`.
4. A firmware version of `0` asks for the full image. The reply then carries a signed download URL and a checksum for the image.
5. The reply's `firmware_update_info` names `base_version`, `target_version`, `build_number_display_name`, `file_size`, `file_checksum` (SHA-256) and the release notes. When the glasses already run the newest image, it is null.

The offer follows Meta's rollout for the serial. On Ray-Ban Meta Gen 2 the query first offered only `70523680060800100`, and later `72387580112400100` as a full image. Delta images have not been seen.

The language packs use a sibling query, `FetchConstellationFeatureUpdates`, from the same endpoint. See [Assistant-voice-and-languages](Assistant-voice-and-languages).

## Resource packs on service 29

Service 29 is the firmware update service. It also installs resource packs: the language packs and the feature packs such as live captions. A pack is a Meta-signed zip that the phone gets from `FetchConstellationFeatureUpdates`. The offer carries an `app_id`, a resource type and a version.

1. The phone sends type 2000 to start an update session for app 1 with `ota_type=resource`. An answer of 12 (already started) is fine.
2. The phone sends type 1 OtaUpdateInstall: an additional package for app 1 with the feature name, the version, `artifactId` set to the pack's `app_id`, and the resource-only flag.
3. The glasses answer type 4 when they are ready for the file.
4. The phone sends the zip on airship namespace `ota` under the uuid of the request. See [Airship-file-transfer](Airship-file-transfer).
5. The glasses answer type 7 when the file is installed.
6. The phone sends type 8 FEATURE_CHANGE: app 1, the feature name, ENABLE.
7. The glasses answer type 9. The feature now runs.

A type 8 without the install gets no answer. A pack sent on airship namespace `language_resource` arrives but turns nothing on for the feature packs. A language pack still works that way. See [Assistant-voice-and-languages](Assistant-voice-and-languages).

Feature flags that the firmware holds are covered in [MobileConfig](MobileConfig). The svc100 fields that carry the build string and the serial are in [Device-state-and-build-info](Device-state-and-build-info).

## Reference code

Reference code: [Constants.kt](https://github.com/macedonga/visor/blob/main/core/protocol/src/main/kotlin/com/macedonga/visor/core/protocol/Constants.kt), [SettingSpec.kt](https://github.com/macedonga/visor/blob/main/core/settings/src/main/kotlin/com/macedonga/visor/core/settings/SettingSpec.kt)

## Open questions

- Whether the glasses take delta updates at all. The query has shown none.
- What the build id `UKQ1.250303.001` means.
- Whether the release field `14` is the real Android version.
- What `128.0.0.0.0` in svc100 field 9 means.
- Which other service 29 types exist beyond the pack install.
