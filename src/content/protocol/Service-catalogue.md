This page lists every DataX service id in the firmware table. Each row gives the id, its hex value, its name, what these pages document about it and the page that covers it. It also says how the two firmware tables differ.

Names come from the firmware tables.

## How the two firmware tables differ

The newer table, for build 70523680060800100, has all 284 entries of the older table, for build 65465780095200100. None were removed. It adds 40 ids, marked "(new)" in the table. It also renames id 7001 from `constelattion_bugreport` to `constellation_bugreport`, which fixes a typo.

Meta Ray-Ban Display's table, for build 69951180085500080, has 332 ids. It adds ids such as 42006 (calling tool), 11026 (audio control) and 4004 (`helix_content`).

## Status

Each row has one status:

- **documented**: a page here covers the service's messages.
- **seen**: the glasses are known to open or use the service, but its messages are not documented.
- **absent on the Display**: Meta Ray-Ban Display answers `0xC001` (service not found).
- **name only**: the firmware table gives the name and nothing more is known.

## Services with known messages

52 services have a page, or are known to be in use.

| Id | Hex | Name | Status | Page |
|---|---|---|---|---|
| 4 | `0x0004` | `connection_monitor` | documented | [DataX-channels](DataX-channels) |
| 5 | `0x0005` | `link_setup` | documented | [Link-setup-and-AirShield](Link-setup-and-AirShield) |
| 10 | `0x000a` | `atc_linkmgr` | documented | [Wi-Fi-Direct](Wi-Fi-Direct), [Identity-and-trust](Identity-and-trust#the-constellation-manifest) |
| 15 | `0x000f` | `assistant` | documented | [Assistant-protocol](Assistant-protocol) |
| 18 | `0x0012` | `smartglasses_media_management` | documented | [Capture-list](Capture-list) |
| 19 | `0x0013` | `smartglasses_mobileconfig` | documented | [MobileConfig](MobileConfig) |
| 20 | `0x0014` | `airship` | documented | [Airship-file-transfer](Airship-file-transfer) |
| 22 | `0x0016` | `smartglasses_device_info` | documented | [Device-state-and-build-info](Device-state-and-build-info#svc22-clock-and-device-info) |
| 26 | `0x001a` | `smartglasses_sharing` | documented | [Display-phone-services](Display-phone-services) |
| 28 | `0x001c` | `smartglasses_appmanager` | documented | [Device-state-and-build-info](Device-state-and-build-info) |
| 29 | `0x001d` | `smartglasses_firmware_ota` | documented | [Firmware](Firmware#resource-packs-on-service-29) |
| 30 | `0x001e` | `app_links` | seen | [DataX-channels](DataX-channels) |
| 31 | `0x001f` | `smartglasses_settings` | documented | [Settings-and-RLDrive](Settings-and-RLDrive) |
| 33 | `0x0021` | `rl_drive` | documented | [Settings-and-RLDrive](Settings-and-RLDrive) |
| 36 | `0x0024` | `identity` | documented | [Identity-and-trust](Identity-and-trust) |
| 42 | `0x002a` | `smartglasses_navigation` | documented | [Display-maps-and-location](Display-maps-and-location) |
| 43 | `0x002b` | `smartglasses_graphql_query` | documented | [Display-internet](Display-internet) |
| 46 | `0x002e` | `sg_wearable_notification` | documented | [Notifications-and-contacts](Notifications-and-contacts) |
| 53 | `0x0035` | `media_file_streaming` | documented | [Assistant-follow-ups-and-photos](Assistant-follow-ups-and-photos) |
| 70 | `0x0046` | `smartglasses_messaging` | documented | [Display-phone-services](Display-phone-services) |
| 72 | `0x0048` | `smartglasses_translation` | documented | [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display) |
| 76 | `0x004c` | `wearables_ping` | documented | [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display) |
| 79 | `0x004f` | `constellationauth` | documented | [Device-Access-Toolkit](Device-Access-Toolkit#the-apps-link) |
| 87 | `0x0057` | `smartglasses_maps_persistent_store` | documented | [Display-maps-and-location](Display-maps-and-location) |
| 89 | `0x0059` | `wearables_whatsapp_linking` | documented | [Display-internet](Display-internet) |
| 100 | `0x0064` | `peer_build_info` | documented | [Device-state-and-build-info](Device-state-and-build-info) |
| 101 | `0x0065` | `motion_activity_service` | documented | [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display) |
| 102 | `0x0066` | `embconn_link_mgr_manifest` | documented | [Neural-Band](Neural-Band#the-bands-manifest) |
| 150 | `0x0096` | `conn_device_lease` | documented | [Neural-Band](Neural-Band) |
| 1023 | `0x03ff` | `nabu` | seen | [Notifications-and-contacts](Notifications-and-contacts#service-1023) |
| 1027 | `0x0403` | `miranda` | documented | [Motion-sensors](Motion-sensors): motion and speech |
| 2000 | `0x07d0` | `media_capture_state` | documented | [Device-state-and-build-info](Device-state-and-build-info) |
| 6500 | `0x1964` | `dwa` | documented | [Device-Access-Toolkit](Device-Access-Toolkit) |
| 7006 | `0x1b5e` | `wearables_bug_reporter` | seen | [Airship-file-transfer](Airship-file-transfer) |
| 7009 | `0x1b61` | `remote_session_service` | documented | [Device-Access-Toolkit](Device-Access-Toolkit) |
| 9000 | `0x2328` | `datafetcher` | documented | [Display-internet](Display-internet) |
| 9002 | `0x232a` | `panels` | documented | [Briefing-panel](Briefing-panel) |
| 9012 | `0x2334` | `partner_ecosystem` | documented | [Display-phone-services](Display-phone-services) |
| 11004 | `0x2afc` | `maps_constellation` | documented | [Display-maps-and-location](Display-maps-and-location) |
| 11006 | `0x2afe` | `phone_book_sync` | documented | [Display-phone-services](Display-phone-services) |
| 11014 | `0x2b06` | `warp_in_air` | seen | [DataX-channels](DataX-channels) |
| 11020 | `0x2b0c` | `maps_support` | documented | [Display-maps-and-location](Display-maps-and-location) |
| 23471 | `0x5baf` | `metalift_playground` (new) | absent on the Display | [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display) |
| 23472 | `0x5bb0` | `workout_metrics_relay` (new) | absent on the Display | [Meta-Ray-Ban-Display](Meta-Ray-Ban-Display) |
| 41102 | `0xa08e` | `locationservice` | documented | [Display-maps-and-location](Display-maps-and-location) |
| 41107 | `0xa093` | `lease_service` | documented | [Display-internet](Display-internet) |
| 41108 | `0xa094` | `internet_switch` | documented | [Display-internet](Display-internet) |
| 41109 | `0xa095` | `bt_peer_connection` | documented | [Neural-Band](Neural-Band) |
| 41111 | `0xa097` | `internet_proxy_remote` | documented | [Display-internet](Display-internet) |
| 51350 | `0xc896` | `media_streaming_control` | documented | [Live-stream](Live-stream) |
| 52822 | `0xce56` | `wireless_input_service` | documented | [Neural-Band](Neural-Band) |
| 55072 | `0xd720` | `smartglasses_place_search` | documented | [Display-maps-and-location](Display-maps-and-location) |

## Every other id

The firmware tables name 272 more services. Nothing more is known about them.

<details>
<summary>Show the 272 names</summary>

| Id | Hex | Name |
|---|---|---|
| 2 | `0x0002` | `test_service_a` |
| 3 | `0x0003` | `test_service_b` |
| 8 | `0x0008` | `manifest` |
| 9 | `0x0009` | `relay` |
| 11 | `0x000b` | `atc_loopback` |
| 14 | `0x000e` | `atc_pairing` |
| 16 | `0x0010` | `smartglasses_telemetry` |
| 17 | `0x0011` | `smartglasses_bugreporter` |
| 21 | `0x0015` | `smartglasses_iris` |
| 23 | `0x0017` | `atc_remote_traffic_attribution` |
| 24 | `0x0018` | `smartglasses_crash_reporter` |
| 25 | `0x0019` | `constellation` |
| 27 | `0x001b` | `linkperf` |
| 32 | `0x0020` | `constellation_notification` |
| 34 | `0x0022` | `third_party_reminders` |
| 35 | `0x0023` | `constellation_video_capture_alert` |
| 37 | `0x0025` | `smartglasses_retail_demo_playback` |
| 38 | `0x0026` | `smartglasses_verified_sessions` |
| 39 | `0x0027` | `atc_traffic` |
| 40 | `0x0028` | `atc_telemetry` |
| 41 | `0x0029` | `smartglasses_autocapture` |
| 44 | `0x002c` | `smartglasses_mmgen` |
| 45 | `0x002d` | `smartglasses_map` |
| 47 | `0x002f` | `smartglasses_cloud_configuration` |
| 48 | `0x0030` | `smartglasses_battery_insight` |
| 49 | `0x0031` | `smartglasses_retail_demo` |
| 50 | `0x0032` | `smartglasses_img_request` |
| 51 | `0x0033` | `smartglasses_userlocation`: the browser's location check, see [Display-web-apps](Display-web-apps#location) |
| 52 | `0x0034` | `telemetry_validation_ods` |
| 54 | `0x0036` | `airshield_auth` |
| 55 | `0x0037` | `pairing_manager` |
| 56 | `0x0038` | `remote_service_manager` |
| 57 | `0x0039` | `conn_device_state` |
| 58 | `0x003a` | `sg_capture_client_connection` |
| 59 | `0x003b` | `atc_ctrl` |
| 60 | `0x003c` | `smartcomms_smartreplies` |
| 61 | `0x003d` | `wearables_device_state` |
| 62 | `0x003e` | `video_stream_warp_connection` |
| 63 | `0x003f` | `wearables_buffer_transfer` |
| 64 | `0x0040` | `discoverer` |
| 65 | `0x0041` | `cv_video_stream_warp_connection` |
| 66 | `0x0042` | `smartglasses_app_install` |
| 69 | `0x0045` | `smartglasses_battery_home` (new) |
| 71 | `0x0047` | `smartglasses_calling` |
| 73 | `0x0049` | `airtap` |
| 75 | `0x004b` | `smartglass_passive_phone_unlock` |
| 77 | `0x004d` | `prototype_identity` |
| 78 | `0x004e` | `nexus` |
| 80 | `0x0050` | `events_debug` |
| 81 | `0x0051` | `btc_profiles_activation` |
| 82 | `0x0052` | `smartglasses_auth` |
| 83 | `0x0053` | `mwa_speech_conversation` |
| 84 | `0x0054` | `partner_app_bridge` |
| 85 | `0x0055` | `smartglasses_to_mwa_shazam` |
| 88 | `0x0058` | `wearables_lock_control` |
| 90 | `0x005a` | `smartglasses_remote_io` |
| 91 | `0x005b` | `smartglasses_captouch_offload` |
| 92 | `0x005c` | `intralink_control` |
| 93 | `0x005d` | `protostar` |
| 94 | `0x005e` | `intralink_hid` |
| 95 | `0x005f` | `airuntime_feature_management` |
| 96 | `0x0060` | `intralink_linkmgr` |
| 97 | `0x0061` | `ar_time_sync` |
| 98 | `0x0062` | `smartglasses_voice_memo` |
| 99 | `0x0063` | `insights_telemetry` |
| 103 | `0x0067` | `experience_state` |
| 104 | `0x0068` | `wearables_whatsapp_file_transfer` (new) |
| 151 | `0x0097` | `cam_control` |
| 200 | `0x00c8` | `runtime_ipc_transport` |
| 201 | `0x00c9` | `smartglasses_voicenotes` |
| 202 | `0x00ca` | `waffle_slam` (new) |
| 416 | `0x01a0` | `mmai_visual_context` (new) |
| 437 | `0x01b5` | `sg_telemetry_logger` |
| 438 | `0x01b6` | `xqpl` |
| 439 | `0x01b7` | `el` |
| 499 | `0x01f3` | `slate_emg_service` |
| 500 | `0x01f4` | `mcu_system` |
| 501 | `0x01f5` | `mcu_led` |
| 502 | `0x01f6` | `mcu_imu` |
| 503 | `0x01f7` | `mcu_als` |
| 504 | `0x01f8` | `mcu_audio` |
| 505 | `0x01f9` | `mcu_hwclksync` |
| 506 | `0x01fa` | `mcu_hyperoff` |
| 507 | `0x01fb` | `mcu_location_service` |
| 508 | `0x01fc` | `mcu_hearing` |
| 509 | `0x01fd` | `study_slate_service` |
| 510 | `0x01fe` | `mcu_motion_service` |
| 511 | `0x01ff` | `mcu_powerstats` |
| 512 | `0x0200` | `slate_provisioning_service` |
| 513 | `0x0201` | `graphics_service` |
| 514 | `0x0202` | `mcu_powerstats2` |
| 515 | `0x0203` | `mcu_audio_blob` |
| 516 | `0x0204` | `ar_i2p_frame_correlation_tags` (new) |
| 1024 | `0x0400` | `greatwhite_test` |
| 1025 | `0x0401` | `mcu_greatwhite_user_input` |
| 1026 | `0x0402` | `nabu_trigger_events` |
| 1028 | `0x0404` | `tiny_debug_bridge` |
| 1100 | `0x044c` | `contextual_ai_event` |
| 1998 | `0x07ce` | `smartglasses_action_autocapture` |
| 1999 | `0x07cf` | `media_backsync` |
| 2001 | `0x07d1` | `wrist_passive_phone_unlock` |
| 2002 | `0x07d2` | `cloud_browser_control` (new) |
| 2048 | `0x0800` | `mcu_offload_ping_server` |
| 2049 | `0x0801` | `mcu_ble_offload` |
| 2050 | `0x0802` | `mcu_camera` |
| 2051 | `0x0803` | `mcu_dinj` |
| 2052 | `0x0804` | `mcu_identity` |
| 2053 | `0x0805` | `mcu_offload_datax_server_sample` |
| 2054 | `0x0806` | `ble_connectivity_test_service` |
| 2282 | `0x08ea` | `farcaster` |
| 2552 | `0x09f8` | `ecosystem_permissions` |
| 2553 | `0x09f9` | `ecosystem_permissions_session` |
| 3001 | `0x0bb9` | `wearables_fwhealth_puck` |
| 3002 | `0x0bba` | `wearables_fwhealth_glasses` |
| 3003 | `0x0bbb` | `wearables_fwhealth_wrist` |
| 3012 | `0x0bc4` | `biometric_auth_constellation` |
| 3050 | `0x0bea` | `audio_arbitration` |
| 3060 | `0x0bf4` | `topology_management` |
| 4000 | `0x0fa0` | `helix` |
| 4001 | `0x0fa1` | `helix_orbit` |
| 4002 | `0x0fa2` | `helix_orbit_proxy` (new) |
| 4003 | `0x0fa3` | `helix_holodeck_content_render` (new) |
| 5000 | `0x1388` | `spatial_data_synchronizer` |
| 6501 | `0x1965` | `dat_app_tools` (new): see [Device-Access-Toolkit](Device-Access-Toolkit) |
| 6848 | `0x1ac0` | `media_control` |
| 6849 | `0x1ac1` | `gallery_sync` |
| 6850 | `0x1ac2` | `feather` |
| 6851 | `0x1ac3` | `media_control_v2` |
| 7000 | `0x1b58` | `wrist_onboarding` |
| 7001 | `0x1b59` | `constellation_bugreport` (renamed from `constelattion_bugreport`) |
| 7002 | `0x1b5a` | `ai_prototyping_environment` |
| 7003 | `0x1b5b` | `smartglasses_onboarding_tour` |
| 7004 | `0x1b5c` | `wrist_oobe_control` |
| 7005 | `0x1b5d` | `hypernova_retail_demo` |
| 7007 | `0x1b5f` | `kwaltz_constellation_connector` |
| 7008 | `0x1b60` | `on_device_capture` |
| 7010 | `0x1b62` | `pro_camera` |
| 7011 | `0x1b63` | `active_glasses_demo` |
| 7020 | `0x1b6c` | `onboarding` |
| 7021 | `0x1b6d` | `onboarding_status` |
| 8001 | `0x1f41` | `smartglasses_user_auth` |
| 8887 | `0x22b7` | `constellation_remote_widget` |
| 8888 | `0x22b8` | `constellation_playground` |
| 8889 | `0x22b9` | `constellation_handoff` |
| 8890 | `0x22ba` | `constellation_state_sync` |
| 8891 | `0x22bb` | `constellation_remote_dictation` (new) |
| 8892 | `0x22bc` | `constellation_wrist_audio` (new) |
| 9003 | `0x232b` | `my_people` |
| 9011 | `0x2333` | `language` |
| 9090 | `0x2382` | `wearables_mdm` |
| 9091 | `0x2383` | `wearables_proactive_ai_signals` |
| 9092 | `0x2384` | `wearables_ai_display_context` |
| 9100 | `0x238c` | `smartglasses_bloks_versioning` (new) |
| 10000 | `0x2710` | `third_party_accessory` |
| 10313 | `0x2849` | `short_form_audio` |
| 10314 | `0x284a` | `ig_stories` |
| 10315 | `0x284b` | `social_ar_playground` |
| 10316 | `0x284c` | `pulsar` |
| 10413 | `0x28ad` | `service_versioning` |
| 10414 | `0x28ae` | `smartglasses_llm` |
| 11000 | `0x2af8` | `companion_notification` |
| 11001 | `0x2af9` | `partner_fulfillment_engine` |
| 11002 | `0x2afa` | `continuous_ai_camera` |
| 11003 | `0x2afb` | `sdb` |
| 11005 | `0x2afd` | `partner_fulfillment_proxy` |
| 11007 | `0x2aff` | `constellation_sharing` |
| 11008 | `0x2b00` | `teleprompter` |
| 11010 | `0x2b02` | `ai_runtime` |
| 11011 | `0x2b03` | `telecom_messaging_tethered` |
| 11012 | `0x2b04` | `constellation_assistant_service` |
| 11013 | `0x2b05` | `wearables_wallet` |
| 11015 | `0x2b07` | `telecom_remote_hfp_client` |
| 11016 | `0x2b08` | `constellation_telemetry_step_ack_service` |
| 11017 | `0x2b09` | `telecom_esim` |
| 11018 | `0x2b0a` | `wearables_system_health_trace` |
| 11019 | `0x2b0b` | `telecom_native_linking` |
| 11021 | `0x2b0d` | `wearables_connectivity_insights` |
| 11022 | `0x2b0e` | `mmai_direct_preview` |
| 11023 | `0x2b0f` | `telecom_messaging_native` (new) |
| 11024 | `0x2b10` | `vowifi` (new) |
| 11025 | `0x2b11` | `wearables_blackbox_trigger` (new) |
| 11067 | `0x2b3b` | `oxide` (new) |
| 12000 | `0x2ee0` | `focus_pocus_connectivity` |
| 12002 | `0x2ee2` | `hyperselfie_service` |
| 14000 | `0x36b0` | `bighorn` |
| 14100 | `0x3714` | `ssg_eye_tracking_calibration` |
| 15000 | `0x3a98` | `wearables_time_sync` |
| 15002 | `0x3a9a` | `wearables_audio_inject` (new) |
| 15010 | `0x3aa2` | `wearables_backup` |
| 16000 | `0x3e80` | `wearables_sharing_notification` |
| 17007 | `0x426f` | `watch_faces` |
| 20000 | `0x4e20` | `colada_coredump` |
| 20010 | `0x4e2a` | `storage_manager_service` |
| 23456 | `0x5ba0` | `custom_gestures` |
| 23457 | `0x5ba1` | `ar_audio_streaming` |
| 23458 | `0x5ba2` | `wearables_feature_manager` |
| 23459 | `0x5ba3` | `datax_direct` |
| 23460 | `0x5ba4` | `palmexp` |
| 23461 | `0x5ba5` | `ar_audio_streaming_direct` |
| 23462 | `0x5ba6` | `direct_connection_demo_data` |
| 23463 | `0x5ba7` | `hn_screencast` |
| 23464 | `0x5ba8` | `hn_screencast_manager` |
| 23465 | `0x5ba9` | `palmexp_event_notification` |
| 23466 | `0x5baa` | `emg_relay_receiver`: band gestures the phone hands the Display, see [Neural-Band](Neural-Band#the-emg-relay-receiver) |
| 23469 | `0x5bad` | `fall_detection` (new) |
| 23470 | `0x5bae` | `posture_detection` |
| 23475 | `0x5bb3` | `wearables_device_package_info` |
| 24738 | `0x60a2` | `workout_status` |
| 24739 | `0x60a3` | `csf_mode` |
| 25565 | `0x63dd` | `axion` |
| 27313 | `0x6ab1` | `mcu_telemetry` |
| 31337 | `0x7a69` | `hearing` |
| 32766 | `0x7ffe` | `mwa_sim_photo_capture` |
| 32767 | `0x7fff` | `mwa_sim_ping` |
| 32768 | `0x8000` | `mwa_sim_echo` |
| 32769 | `0x8001` | `mwa_sim_media_client` |
| 32770 | `0x8002` | `mwa_emg_forwarder` |
| 32780 | `0x800c` | `emg_connectivity_health` |
| 32781 | `0x800d` | `emgsdk_health_service_stream` (new) |
| 32789 | `0x8015` | `milan_hrm` |
| 32800 | `0x8020` | `health_algo_metadata` |
| 32801 | `0x8021` | `mwa_external_device_connection` |
| 32900 | `0x8084` | `wrist_notifications` |
| 33000 | `0x80e8` | `selfcare_metrics` |
| 33001 | `0x80e9` | `alldaymetrics` |
| 41100 | `0xa08c` | `mwa_bt_proxy_traffic` |
| 41101 | `0xa08d` | `data_transfer` |
| 41103 | `0xa08f` | `hammerhead_mwa_sensor_reporter` |
| 41104 | `0xa090` | `messenger_video_call_proxy` |
| 41105 | `0xa091` | `instagram_video_call_proxy` |
| 41106 | `0xa092` | `captive_network` |
| 41110 | `0xa096` | `internet_proxy_local` |
| 41112 | `0xa098` | `bt_audio_source` |
| 41113 | `0xa099` | `aurachat` |
| 41114 | `0xa09a` | `gc` |
| 41115 | `0xa09b` | `constellation_location` (new) |
| 41116 | `0xa09c` | `gc_test` (new) |
| 41117 | `0xa09d` | `constellation_ambient_sensing` (new) |
| 41120 | `0xa0a0` | `webapp_phone_imu`: the phone's sensors for web apps, see [Display-web-apps](Display-web-apps#phone-sensors) |
| 42001 | `0xa411` | `warp_calling` |
| 42002 | `0xa412` | `warp_sdk` |
| 42003 | `0xa413` | `warp_hfp` |
| 42004 | `0xa414` | `warp_retaildemo_audio` |
| 42005 | `0xa415` | `warp_ar_render` |
| 42201 | `0xa4d9` | `warp_airshield_auth` |
| 51349 | `0xc895` | `media_streaming` |
| 51729 | `0xca11` | `cai_camera` |
| 51730 | `0xca12` | `cai_microphone` |
| 51731 | `0xca13` | `context_buffer` |
| 52000 | `0xcb20` | `cloud_offload_ca_control` (new) |
| 52001 | `0xcb21` | `cloud_offload_ca_streaming` (new) |
| 52002 | `0xcb22` | `cloud_browser_viz_streaming` (new) |
| 52003 | `0xcb23` | `cloud_browser_audio_streaming` (new) |
| 52753 | `0xce11` | `ctms` (new) |
| 52823 | `0xce57` | `uniband` (new) |
| 53210 | `0xcfda` | `tar` |
| 55071 | `0xd71f` | `smartglasses_ai_agent` |
| 55073 | `0xd721` | `smartglasses_capture` |
| 55074 | `0xd722` | `smartglass_browser`: web apps, cookies and Bluetooth scans, see [Display-web-apps](Display-web-apps) |
| 55075 | `0xd723` | `ace_assistant` |
| 55076 | `0xd724` | `hatch_fetch` |
| 55077 | `0xd725` | `comms_hatch_relay` (new) |
| 55078 | `0xd726` | `smartglasses_worldnotes` (new) |
| 55200 | `0xd7a0` | `crossword` (new) |
| 55201 | `0xd7a1` | `smartglasses_smart_home_widget` (new) |
| 55555 | `0xd903` | `orchestrator` (new) |
| 55556 | `0xd904` | `orbit_c50` (new) |
| 60000 | `0xea60` | `wearsys_drive` |
| 65070 | `0xfe2e` | `sgc_spatial_audio_tests` |
| 65080 | `0xfe38` | `chunking_test` (new) |
| 65081 | `0xfe39` | `ha_credential_sync` (new) |
| 65500 | `0xffdc` | `autooracle_control` (new) |

</details>

Reference code: [Constants.kt](https://github.com/macedonga/visor/blob/main/core/protocol/src/main/kotlin/com/macedonga/visor/core/protocol/Constants.kt)

## Open questions

- Which services do the glasses open on their own? The known list is 30, 79, 2000, 20, 4 and 41102, and many more on Meta Ray-Ban Display. Whether the list is complete is unknown.
- Whether any of the 40 new ids appear on the wire is unknown.
- The role of id 2 is unknown.
- The role of id 25 is unknown.
