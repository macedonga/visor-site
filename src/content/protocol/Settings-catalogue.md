The catalogue lists the 370 setting keys the glasses hold, with their svc31 field, kind, wire type, namespace and parsed flag. It also gives the per-product offer rules and the one key that a phone must never write.

## Key count

There are 370 keys, in lower snake case, as RLDrive stores them. 253 keys have an svc31 field. The other 117 have none, so their only write path is an RLDrive kv object. See [Settings-and-RLDrive](Settings-and-RLDrive).

| Kind | Keys | Wire type |
|---|---|---|
| bool | 188 | varint |
| int | 85 | varint |
| str | 88 | length-delimited |
| float | 4 | fixed64 |
| other | 5 | none defined |

The other kind covers `metadata` and the four `two_stage_eis_*_3k` keys. Their wire encoding is unconfirmed. Some int keys act as toggles and take 1 or 0.

## Namespaces

| Namespace | Scoped by device uuid | Keys |
|---|---|---|
| `individual_device_settings` | yes | 323 |
| `individual_device_sensitive_settings` | yes | 1 |
| `local_device_settings` | no | 8 |
| `shared_settings_namespace_1` | no | 9 |
| none | not applicable | 29 |

A scoped namespace is named `<device-uuid>@<namespace>`. The 29 keys with no namespace have no firmware schema.

## The parsed flag

174 keys carry the parsed flag. It marks the keys that this firmware's settings service has a handler for. The flag is not a complete list of stored keys. `live_notes_user_consented` is not parsed and is stored. `oxide_enabled` is parsed but has no svc31 field. On the two unparsed keys tested, a write was acked and nothing was stored. See [Settings-and-RLDrive](Settings-and-RLDrive) for the write rules.

## Keys

Each row gives the key, its svc31 field, its kind, its wire type, its namespace and its parsed flag. A key with no field has no wire type. Rows are sorted by key.

| Key | svc31 field | Kind | Wire type | Namespace | Parsed |
|---|---|---|---|---|---|
| `accessibility_display_daltonizer` | none | int | none | individual_device_settings | no |
| `accessibility_display_daltonizer_enabled` | none | bool | none | individual_device_settings | no |
| `accessibility_display_magnification_enabled` | none | bool | none | individual_device_settings | no |
| `action_button_assistant_custom_prompt` | 110 | str | length-delimited | individual_device_settings | yes |
| `action_button_assistant_custom_prompt_long_press` | 123 | str | length-delimited | individual_device_settings | no |
| `action_button_spotify_uri` | none | str | none | individual_device_settings | no |
| `active_device` | 31 | bool | varint | individual_device_settings | yes |
| `advanced_video_quality_profile` | 218 | bool | varint | individual_device_settings | yes |
| `ai_agent_mock_business_phone_number` | none | str | none | shared_settings_namespace_1 | no |
| `ai_lens_user_enabled` | 200 | bool | varint | individual_device_settings | yes |
| `airship_on_c50_developer_mode` | 186 | bool | varint | none, no firmware schema | no |
| `amazon_music_explicit_songs_blocked` | 82 | bool | varint | individual_device_settings | no |
| `ancs_enabled` | 54 | bool | varint | individual_device_settings | no |
| `assignable_action_button_long_press_mapping` | 102 | int | varint | individual_device_settings | yes |
| `assignable_action_button_short_press_mapping` | 101 | int | varint | individual_device_settings | yes |
| `assignable_action_led_mapping` | 103 | int | varint | individual_device_settings | yes |
| `assistant_ai_phone_call_enabled` | 131 | bool | varint | individual_device_settings | yes |
| `assistant_ai_phone_call_mvp_enabled` | 143 | bool | varint | individual_device_settings | yes |
| `assistant_audio_mode` | none | int | none | individual_device_settings | no |
| `assistant_auto_trim_video` | 22 | bool | varint | individual_device_settings | no |
| `assistant_comms_provider_settings` | 11 | int | varint | individual_device_settings | yes |
| `assistant_comms_provider_settings_protobuf` | 75 | str | length-delimited | individual_device_settings | yes |
| `assistant_detailed_logging_enabled` | 18 | bool | varint | individual_device_settings | yes |
| `assistant_detailed_logging_mode` | 68 | int | varint | individual_device_settings | no |
| `assistant_display_enabled` | none | bool | none | individual_device_settings | no |
| `assistant_enabled` | 2 | bool | varint | individual_device_settings | yes |
| `assistant_follow_up_enabled` | 52 | bool | varint | individual_device_settings | yes |
| `assistant_llm_enabled` | 30 | bool | varint | individual_device_settings | yes |
| `assistant_multimodal_enabled` | 33 | bool | varint | individual_device_settings | no |
| `assistant_preview_via_file_handle` | 12001 | bool | varint | individual_device_settings | yes |
| `assistant_store_mmai_media` | 87 | bool | varint | individual_device_settings | no |
| `assistant_store_voice_recordings` | 10 | bool | varint | individual_device_settings | yes |
| `assistant_store_voice_transcripts` | 9 | bool | varint | individual_device_settings | yes |
| `assistant_voice_id` | 4 | str | length-delimited | individual_device_settings | yes |
| `assistant_voice_verification_enabled` | 55 | bool | varint | individual_device_settings | yes |
| `assistant_wakeword` | 53 | str | length-delimited | individual_device_settings | no |
| `attention_deferral_user_enabled` | 231 | bool | varint | individual_device_settings | no |
| `audio_balance` | 225 | float | fixed64 | individual_device_settings | yes |
| `audio_noise_reduction_enabled` | 159 | bool | varint | individual_device_settings | no |
| `audio_playback_during_capture_enabled` | 122 | bool | varint | individual_device_settings | yes |
| `auto_play_pause_on_don_doff` | 6 | bool | varint | individual_device_settings | yes |
| `autocapture_action_exp_enabled` | 99 | bool | varint | individual_device_settings | yes |
| `autocapture_capture_earcon` | 256 | bool | varint | none, no firmware schema | no |
| `autocapture_capture_mode` | 26 | int | varint | individual_device_settings | yes |
| `autocapture_enable_imu_stream` | 28 | bool | varint | individual_device_settings | yes |
| `autocapture_enable_mcu_mode` | 41 | bool | varint | individual_device_settings | no |
| `autocapture_imu_capture_mode` | 64 | int | varint | individual_device_settings | yes |
| `autocapture_imu_enabled` | 62 | bool | varint | individual_device_settings | yes |
| `autocapture_imu_video_duration` | 66 | int | varint | individual_device_settings | yes |
| `autocapture_interactive_exp_enabled` | 120 | bool | varint | individual_device_settings | yes |
| `autocapture_interval` | 24 | int | varint | individual_device_settings | yes |
| `autocapture_long_capture_exp_enabled` | 98 | bool | varint | individual_device_settings | no |
| `autocapture_low_power_mode_enabled` | 190 | bool | varint | shared_settings_namespace_1 | yes |
| `autocapture_motion_exp_enabled` | 136 | bool | varint | individual_device_settings | yes |
| `autocapture_phone_low_res_enabled` | 191 | bool | varint | shared_settings_namespace_1 | yes |
| `autocapture_session_length` | 25 | int | varint | individual_device_settings | yes |
| `autocapture_show_viewfinder` | 236 | bool | varint | individual_device_settings | no |
| `autocapture_timed_imu_exp_enabled` | 97 | bool | varint | individual_device_settings | yes |
| `autocapture_timed_interval_capture_mode` | 65 | int | varint | individual_device_settings | yes |
| `autocapture_timed_interval_enabled` | 63 | bool | varint | individual_device_settings | yes |
| `autocapture_timed_interval_video_duration` | 67 | int | varint | individual_device_settings | yes |
| `autocapture_video_length` | 27 | int | varint | individual_device_settings | yes |
| `avc_enabled` | 80 | bool | varint | individual_device_settings | yes |
| `battery_saver_mode_enabled` | 214 | bool | varint | individual_device_settings | no |
| `bluetooth_map_status` | none | int | none | individual_device_settings | no |
| `blv_scene_reader_enabled` | 89 | bool | varint | individual_device_settings | yes |
| `camera_use_enabled` | 150 | bool | varint | individual_device_settings | yes |
| `captouch2d_1finger_2tap_release` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_long_press` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_long_press_release` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_swipe_down` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_swipe_front` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_swipe_rear` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_swipe_up` | none | str | none | individual_device_settings | no |
| `captouch2d_1finger_tap_release` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_2tap_release` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_long_press` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_long_press_release` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_swipe_down` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_swipe_front` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_swipe_rear` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_swipe_up` | none | str | none | individual_device_settings | no |
| `captouch2d_2finger_tap_release` | none | str | none | individual_device_settings | no |
| `captouch_enabled` | 148 | bool | varint | individual_device_settings | yes |
| `capture_aspect_ratio` | 252 | int | varint | none, no firmware schema | no |
| `capture_auto_review` | 118 | bool | varint | individual_device_settings | no |
| `capture_button_assistant_shortcut` | 50 | str | length-delimited | individual_device_settings | no |
| `capture_button_double_press` | 57 | int | varint | individual_device_settings | yes |
| `capture_button_short_long_press` | 7 | int | varint | individual_device_settings | yes |
| `capture_mode` | 105 | int | varint | individual_device_settings | yes |
| `capture_mode_selection_long_press` | 121 | int | varint | individual_device_settings | yes |
| `carrier_config_max_width_height_message_size` | none | str | none | individual_device_settings | no |
| `cellular_updates` | none | bool | none | individual_device_settings | no |
| `cloud_ai_understanding_enabled` | 39 | bool | varint | individual_device_settings | yes |
| `cloud_media_processing_enabled` | 56 | bool | varint | shared_settings_namespace_1 | yes |
| `cloud_ota_enabled` | 19 | bool | varint | shared_settings_namespace_1 | yes |
| `cloud_ota_factory_reset_after_check` | 195 | bool | varint | none, no firmware schema | no |
| `cloud_ota_preferred_bandwidth` | 45 | int | varint | individual_device_settings | yes |
| `comms_in_hatch_enabled` | 202 | bool | varint | none, no firmware schema | no |
| `comms_phone_number` | none | str | none | individual_device_settings | no |
| `companion_app_locale` | none | str | none | individual_device_settings | no |
| `companion_developer_mode_enabled` | 254 | int | varint | none, no firmware schema | no |
| `companion_e2ee_pk_uuid` | none | str | none | individual_device_settings | no |
| `companion_phone_numbers` | none | str | none | individual_device_sensitive_settings | no |
| `companion_untethered_relay_status` | none | str | none | individual_device_settings | no |
| `connections_enabled` | 210 | bool | varint | individual_device_settings | no |
| `constellation_states` | 11001 | str | length-delimited | individual_device_settings | no |
| `continue_maneuvers_reassurance_distance` | 180 | int | varint | none, no firmware schema | no |
| `continuous_ai_camera_calendar_and_profiles` | 194 | str | length-delimited | individual_device_settings | yes |
| `continuous_ai_camera_chunk_size` | 146 | int | varint | individual_device_settings | yes |
| `continuous_ai_camera_device_feedback_mode` | 251 | int | varint | individual_device_settings | yes |
| `continuous_ai_camera_enabled` | 132 | bool | varint | individual_device_settings | yes |
| `continuous_ai_camera_fps` | 135 | float | fixed64 | individual_device_settings | yes |
| `continuous_ai_camera_headband_mode_enabled` | 253 | bool | varint | none, no firmware schema | no |
| `continuous_ai_camera_notification_led_on_pause_enable` | 197 | bool | varint | individual_device_settings | yes |
| `continuous_ai_camera_paused` | none | bool | none | local_device_settings | no |
| `conversation_focus_eap_enabled` | 172 | bool | varint | individual_device_settings | yes |
| `conversation_focus_geogate` | 175 | bool | varint | individual_device_settings | yes |
| `conversation_focus_is_in_eap` | 174 | bool | varint | individual_device_settings | yes |
| `conversation_focus_use_eap_settings` | 173 | bool | varint | individual_device_settings | yes |
| `crowdsourcing_enabled` | 203 | bool | varint | individual_device_settings | yes |
| `crowdsourcing_location_enabled` | 211 | bool | varint | individual_device_settings | yes |
| `crowdsourcing_wifi_enabled` | 212 | bool | varint | individual_device_settings | yes |
| `current_media_provider` | 96 | str | length-delimited | individual_device_settings | yes |
| `custom_wake_word_enabled` | 196 | bool | varint | individual_device_settings | yes |
| `dashcam_duration_ms` | 182 | int | varint | none, no firmware schema | no |
| `dashcam_fall_detection_enabled` | 206 | bool | varint | none, no firmware schema | yes |
| `dashcam_resolution_and_framerate` | 192 | int | varint | none, no firmware schema | no |
| `debug_video_capture_mode` | 94 | int | varint | individual_device_settings | no |
| `default_music_provider` | 72 | int | varint | individual_device_settings | yes |
| `default_providers` | 84 | str | length-delimited | individual_device_settings | yes |
| `default_sms_app_package_name` | none | str | none | individual_device_settings | no |
| `detailed_responses_live_ai_enabled` | 154 | bool | varint | individual_device_settings | yes |
| `developer_charging_leds_enabled` | 201 | bool | varint | individual_device_settings | no |
| `developer_mode` | 86 | bool | varint | individual_device_settings | no |
| `device_custom_name` | 199 | str | length-delimited | none, no firmware schema | yes |
| `device_privacy_identifier` | 40 | str | length-delimited | individual_device_settings | no |
| `device_share_additional_data_enabled` | 79 | bool | varint | individual_device_settings | yes |
| `devkit_developer_mode_enabled` | 88 | bool | varint | individual_device_settings | no |
| `display_mapping_enabled` | none | bool | none | individual_device_settings | no |
| `eap_eligibility_enabled` | 47 | bool | varint | shared_settings_namespace_1 | yes |
| `eap_opt_in_enabled` | 48 | bool | varint | individual_device_settings | yes |
| `education_partner_1_enabled` | 81 | bool | varint | individual_device_settings | yes |
| `eis_mode` | 108 | int | varint | individual_device_settings | yes |
| `emg_instant_action` | 117 | int | varint | individual_device_settings | yes |
| `enable_calendar_event_alert` | 133 | bool | varint | shared_settings_namespace_1 | yes |
| `enable_calendar_event_alert_announce_details` | 167 | bool | varint | individual_device_settings | no |
| `enable_calendar_event_alert_wake_display` | 168 | bool | varint | individual_device_settings | no |
| `enable_calling_with_meta_ai` | 134 | bool | varint | none, no firmware schema | no |
| `enable_google_calendar_event_alert` | 166 | bool | varint | individual_device_settings | no |
| `enable_nova_ica` | 213 | bool | varint | individual_device_settings | no |
| `enable_outlook_calendar_event_alert` | 169 | bool | varint | individual_device_settings | no |
| `enable_outlook_calendar_event_alert_announce_details` | 179 | bool | varint | individual_device_settings | no |
| `enable_outlook_calendar_event_alert_wake_display` | 171 | bool | varint | individual_device_settings | no |
| `enable_phone_to_wearable_call_log_sync` | none | bool | none | individual_device_settings | no |
| `enable_phone_to_wearable_contacts_sync` | none | bool | none | individual_device_settings | no |
| `enable_sms_mms_relay` | none | bool | none | individual_device_settings | no |
| `enable_untethered_relay` | none | bool | none | individual_device_settings | no |
| `enable_warp_in_air` | 188 | bool | varint | individual_device_settings | yes |
| `exposure_bias` | 221 | float | fixed64 | individual_device_settings | yes |
| `fast_auth_enabled` | 92 | bool | varint | individual_device_settings | yes |
| `feature_rollout_thru_settings_example_enabled` | 10001 | bool | varint | individual_device_settings | yes |
| `flicker_reduction_mode` | 223 | int | varint | individual_device_settings | yes |
| `font_weight_adjustment` | none | int | none | individual_device_settings | no |
| `forest_enabled` | 46 | bool | varint | individual_device_settings | yes |
| `gesture_emg_index_finger_double_tap` | none | str | none | individual_device_settings | no |
| `gesture_emg_index_finger_ia` | none | str | none | individual_device_settings | no |
| `gesture_emg_index_finger_press` | none | str | none | individual_device_settings | no |
| `gesture_emg_index_finger_release` | none | str | none | individual_device_settings | no |
| `gesture_emg_index_finger_single_tap` | none | str | none | individual_device_settings | no |
| `gesture_emg_index_finger_tap_hold` | none | str | none | individual_device_settings | no |
| `gesture_emg_index_finger_tap_hold_release` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_double_tap` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_ia` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_press` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_release` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_single_tap` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_tap_hold` | none | str | none | individual_device_settings | no |
| `gesture_emg_middle_finger_tap_hold_release` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_double_tap` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_ia` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_single_tap` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_swipe_down` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_swipe_left` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_swipe_right` | none | str | none | individual_device_settings | no |
| `gesture_emg_thumb_finger_swipe_up` | none | str | none | individual_device_settings | no |
| `gesture_x_assistant_shortcut` | 49 | str | length-delimited | individual_device_settings | no |
| `gesture_x_mapping` | 23 | int | varint | individual_device_settings | yes |
| `hand_tracking_enabled` | 124 | bool | varint | individual_device_settings | yes |
| `hand_tracking_point_at_action` | 127 | str | length-delimited | individual_device_settings | yes |
| `hand_tracking_point_at_custom_prompt` | 137 | str | length-delimited | individual_device_settings | yes |
| `hand_tracking_without_wake_enabled` | 162 | bool | varint | individual_device_settings | yes |
| `handwriting_enabled` | 164 | bool | varint | individual_device_settings | no |
| `has_unmigrated_threads` | none | bool | none | individual_device_settings | no |
| `hatch_enabled` | 193 | bool | varint | individual_device_settings | yes |
| `he_enabled` | 44 | bool | varint | individual_device_settings | yes |
| `head_nod_controls_enabled` | 255 | bool | varint | none, no firmware schema | no |
| `hearing_boost_expiration_time` | 114 | int | varint | individual_device_settings | yes |
| `hearing_boost_nux_completed` | 113 | bool | varint | individual_device_settings | yes |
| `hearing_boost_subscription_status` | 112 | int | varint | individual_device_settings | yes |
| `high_text_contrast_enabled` | none | bool | none | individual_device_settings | no |
| `homer_factory_reset_interval_minutes` | 215 | int | varint | individual_device_settings | yes |
| `homer_reset_enabled` | 204 | bool | varint | individual_device_settings | yes |
| `is_c50_enabled` | 104 | bool | varint | individual_device_settings | yes |
| `is_c50_with_in_app_meta_ai_enabled` | 116 | bool | varint | individual_device_settings | yes |
| `landscape_mode_enabled` | 189 | bool | varint | individual_device_settings | yes |
| `language_pack_build_number` | 34 | str | length-delimited | individual_device_settings | no |
| `leak_crusher_enabled` | 160 | bool | varint | individual_device_settings | yes |
| `leak_crusher_intensity` | 161 | int | varint | individual_device_settings | yes |
| `lens_brightness` | 224 | int | varint | individual_device_settings | no |
| `lens_tint` | 230 | int | varint | individual_device_settings | yes |
| `lens_tint_toggle_mode` | 237 | int | varint | none, no firmware schema | no |
| `live_ai_enabled` | 93 | bool | varint | individual_device_settings | yes |
| `live_ai_mss_start_async_enabled` | 147 | bool | varint | individual_device_settings | yes |
| `live_ai_voice_only` | 107 | bool | varint | individual_device_settings | yes |
| `live_caption_voice_id` | 78 | str | length-delimited | individual_device_settings | yes |
| `live_notes_user_consented` | 216 | bool | varint | none, no firmware schema | yes |
| `live_speech_translation_eap_enabled` | 95 | bool | varint | individual_device_settings | yes |
| `live_speech_translation_server_enabled` | 155 | bool | varint | individual_device_settings | yes |
| `live_translation_voice_id` | 77 | str | length-delimited | individual_device_settings | yes |
| `location_camera_geotagging_enabled` | 16 | bool | varint | individual_device_settings | no |
| `location_chatbot_enabled` | 35 | bool | varint | individual_device_settings | no |
| `location_global_enabled` | 15 | bool | varint | individual_device_settings | no |
| `mdm_enabled` | 111 | bool | varint | individual_device_settings | no |
| `media_auto_leveling_enabled` | 151 | bool | varint | individual_device_settings | no |
| `media_cloud_enabled` | 32 | bool | varint | individual_device_settings | no |
| `media_gesture_emg_index_finger_single_tap` | none | str | none | individual_device_settings | no |
| `media_gesture_emg_middle_finger_single_tap` | none | str | none | individual_device_settings | no |
| `media_gesture_emg_thumb_finger_swipe_down` | none | str | none | individual_device_settings | no |
| `media_gesture_emg_thumb_finger_swipe_left` | none | str | none | individual_device_settings | no |
| `media_gesture_emg_thumb_finger_swipe_right` | none | str | none | individual_device_settings | no |
| `media_gesture_emg_thumb_finger_swipe_up` | none | str | none | individual_device_settings | no |
| `media_occlusion_removal_enabled` | 152 | bool | varint | individual_device_settings | no |
| `messenger_contacts_syncing` | 60 | int | varint | individual_device_settings | no |
| `meta_ai_handwriting_enabled` | 205 | bool | varint | individual_device_settings | no |
| `meta_ai_in_call_concurrency_enabled` | 163 | bool | varint | individual_device_settings | yes |
| `metadata` | 250 | other | none | none, no firmware schema | no |
| `miranda_dc_service_enabled` | none | bool | none | individual_device_settings | no |
| `mirrored_notification_app_settings` | none | str | none | individual_device_settings | no |
| `mmai_double_press_enabled` | 58 | bool | varint | individual_device_settings | yes |
| `mmai_user_consent_enabled` | 149 | bool | varint | individual_device_settings | no |
| `mobileconfig_apex_rollout_target_state` | 10002 | int | varint | none, no firmware schema | no |
| `mono_audio_enabled` | 228 | bool | varint | individual_device_settings | yes |
| `motion_blur_reduction_enabled` | 220 | bool | varint | individual_device_settings | yes |
| `mps_transfer_unprocessed_image_assets` | 126 | int | varint | individual_device_settings | no |
| `mps_transfer_unprocessed_video_assets` | 125 | int | varint | individual_device_settings | no |
| `music_concurrency_enabled` | 183 | bool | varint | individual_device_settings | yes |
| `music_partner_3_enabled` | 71 | bool | varint | individual_device_settings | yes |
| `mute_announcements_default_duration` | 90 | int | varint | individual_device_settings | yes |
| `mute_announcements_end_time` | 70 | str | length-delimited | individual_device_settings | yes |
| `mute_announcements_mode` | 119 | int | varint | individual_device_settings | yes |
| `natural_invocation_enabled` | 74 | bool | varint | individual_device_settings | yes |
| `nose_occlusion_tuning_enabled` | 42 | bool | varint | individual_device_settings | yes |
| `notification_led_brightness` | 14 | int | varint | individual_device_settings | yes |
| `notification_volume` | 5 | int | varint | individual_device_settings | yes |
| `occlusion_detection_enabled` | 12 | bool | varint | individual_device_settings | yes |
| `oobe_session_id` | none | str | none | individual_device_settings | no |
| `oxide_enabled` | none | bool | none | individual_device_settings | yes |
| `paired_phone_os_type` | none | int | none | individual_device_settings | no |
| `palm_auth_eap_enabled` | 177 | bool | varint | none, no firmware schema | no |
| `palm_auth_enabled` | 115 | bool | varint | individual_device_settings | yes |
| `partner_app_settings` | 83 | str | length-delimited | individual_device_settings | yes |
| `passive_audio_capture_enabled` | 185 | bool | varint | individual_device_settings | yes |
| `passive_audio_self_speech_only_enabled` | 243 | bool | varint | none, no firmware schema | no |
| `passive_meal_capture_enabled` | 184 | bool | varint | individual_device_settings | yes |
| `passive_phone_unlock_enabled` | 51 | bool | varint | individual_device_settings | yes |
| `passive_visual_capture_enabled` | 187 | bool | varint | individual_device_settings | yes |
| `phone_contacts_syncing` | 59 | int | varint | individual_device_settings | no |
| `posture_detection_enabled` | 999 | bool | varint | none, no firmware schema | no |
| `qr_payments_india_mc_enabled` | 142 | bool | varint | individual_device_settings | no |
| `qr_payments_india_setup_completed` | 145 | bool | varint | individual_device_settings | yes |
| `qr_payments_india_toggle_enabled` | 139 | bool | varint | individual_device_settings | yes |
| `qr_payments_india_upi_eligible` | 141 | bool | varint | individual_device_settings | yes |
| `qr_payments_india_whatsapp_enabled` | 140 | bool | varint | individual_device_settings | yes |
| `quick_actions` | 106 | str | length-delimited | individual_device_settings | yes |
| `quick_clips_photo_capture_enabled` | 100 | bool | varint | individual_device_settings | yes |
| `qva_enabled` | 129 | bool | varint | individual_device_settings | yes |
| `qva_wellness_sync_enabled` | 138 | bool | varint | individual_device_settings | no |
| `reminders_eap_toggle_enabled` | 91 | bool | varint | individual_device_settings | yes |
| `resolution_and_framerate` | 109 | int | varint | individual_device_settings | yes |
| `sample_app_1_enabled` | 85 | bool | varint | individual_device_settings | yes |
| `screen_brightness` | none | int | none | local_device_settings | no |
| `screen_brightness_mode` | none | bool | none | individual_device_settings | no |
| `sdr_enabled` | 219 | bool | varint | individual_device_settings | yes |
| `sg_accounts_sync_metadata` | none | str | none | individual_device_settings | no |
| `sg_action_button_long_press` | none | bool | none | individual_device_settings | no |
| `sg_action_button_short_press` | none | bool | none | individual_device_settings | no |
| `sg_allow_mirrored_notifications` | none | bool | none | individual_device_settings | no |
| `sg_captouch_interaction_model` | none | int | none | individual_device_settings | no |
| `sg_captouch_interaction_model_coherence` | none | int | none | individual_device_settings | no |
| `sg_captouch_invert_swipe_direction_horizontal` | none | bool | none | individual_device_settings | no |
| `sg_captouch_invert_swipe_direction_vertical` | none | bool | none | individual_device_settings | no |
| `sg_caterpillar_invert_swipe_direction_horizontal` | none | bool | none | individual_device_settings | no |
| `sg_caterpillar_invert_swipe_direction_vertical` | none | bool | none | individual_device_settings | no |
| `sg_disable_thermal_shutdown` | none | bool | none | local_device_settings | no |
| `sg_display_thermal_mitigation_enabled` | none | bool | none | local_device_settings | no |
| `sg_display_timeout_event` | none | bool | none | individual_device_settings | no |
| `sg_do_not_disturb` | none | bool | none | local_device_settings | no |
| `sg_emg_display_off` | 198 | bool | varint | individual_device_settings | yes |
| `sg_emg_instant_action` | none | int | none | individual_device_settings | no |
| `sg_glass_onboarding_status` | none | int | none | local_device_settings | no |
| `sg_headphone_mode_enabled` | none | bool | none | individual_device_settings | no |
| `sg_instant_action` | none | int | none | individual_device_settings | no |
| `sg_invert_wrist_roll_direction` | none | bool | none | individual_device_settings | no |
| `sg_meta_ai_live_transcription_enabled` | none | bool | none | individual_device_settings | no |
| `sg_mwa_onboarding_status` | none | int | none | individual_device_settings | no |
| `sg_sample` | none | bool | none | local_device_settings | no |
| `sg_screen_reader_disabled` | none | int | none | individual_device_settings | no |
| `sg_screen_reader_speech_pitch` | none | int | none | individual_device_settings | no |
| `sg_screen_reader_speech_rate` | none | int | none | individual_device_settings | no |
| `sg_show_display_temperature_warning` | none | bool | none | local_device_settings | no |
| `sg_simplified_captouch_calling` | none | bool | none | individual_device_settings | no |
| `sg_sync_accessibility_display_magnification_scale` | none | int | none | individual_device_settings | no |
| `sg_sync_enabled_accessibility_services` | none | bool | none | individual_device_settings | no |
| `sg_sync_font_scale` | none | int | none | individual_device_settings | no |
| `sg_user_comms_setup_status` | 130 | str | length-delimited | individual_device_settings | no |
| `sg_user_setup_input_enable` | none | int | none | individual_device_settings | no |
| `smart_reply_enabled` | 165 | bool | varint | individual_device_settings | no |
| `spatial_media_enabled` | 158 | int | varint | individual_device_settings | yes |
| `spotify_tap_enabled` | 3 | bool | varint | individual_device_settings | yes |
| `standby_gesture_emg_index_finger_ia` | none | str | none | individual_device_settings | no |
| `standby_gesture_emg_middle_finger_ia` | none | str | none | individual_device_settings | no |
| `tap_and_hold_assistant_custom_prompt` | 178 | str | length-delimited | none, no firmware schema | yes |
| `tap_and_hold_mapping` | 29 | int | varint | individual_device_settings | yes |
| `telecom_enable_untethered_relay` | none | bool | none | individual_device_settings | no |
| `telecom_wearable_e2ee_pk_uuid` | none | str | none | individual_device_settings | no |
| `telecom_wearable_untethered_relay_status` | none | str | none | individual_device_settings | no |
| `test_setting_bool` | 207 | bool | varint | individual_device_settings | yes |
| `test_setting_float` | 208 | float | fixed64 | individual_device_settings | yes |
| `test_setting_int` | none | int | none | individual_device_settings | no |
| `test_setting_int32` | 1 | int | varint | individual_device_settings | yes |
| `test_setting_string` | 209 | str | length-delimited | individual_device_settings | yes |
| `test_shared_setting_int` | none | int | none | shared_settings_namespace_1 | no |
| `test_shared_setting_string` | none | str | none | shared_settings_namespace_1 | no |
| `tts_speak_speed` | 43 | int | varint | individual_device_settings | yes |
| `two_stage_eis` | 226 | bool | varint | individual_device_settings | yes |
| `two_stage_eis_buffer_size` | 232 | int | varint | individual_device_settings | yes |
| `two_stage_eis_buffer_size_3k` | 239 | other | none | none, no firmware schema | no |
| `two_stage_eis_num_neighbor_frames` | 235 | int | varint | individual_device_settings | yes |
| `two_stage_eis_num_neighbor_frames_3k` | 242 | other | none | none, no firmware schema | no |
| `two_stage_eis_output_height` | 234 | int | varint | individual_device_settings | yes |
| `two_stage_eis_output_height_3k` | 241 | other | none | none, no firmware schema | no |
| `two_stage_eis_output_width` | 233 | int | varint | individual_device_settings | yes |
| `two_stage_eis_output_width_3k` | 240 | other | none | none, no firmware schema | no |
| `user_setup_ica_toggle_enabled` | 176 | bool | varint | individual_device_settings | yes |
| `verified_session_enabled` | 8 | bool | varint | individual_device_settings | yes |
| `video_duration_ms` | 17 | int | varint | individual_device_settings | yes |
| `video_fps` | 217 | int | varint | individual_device_settings | yes |
| `video_hdr_mode` | 238 | int | varint | none, no firmware schema | no |
| `video_stabilization_mode` | 73 | int | varint | individual_device_settings | no |
| `video_white_balance` | 222 | int | varint | individual_device_settings | yes |
| `voice_memo_eligibility_verified` | 227 | bool | varint | none, no firmware schema | yes |
| `voice_notes_eap_enabled` | 181 | bool | varint | none, no firmware schema | yes |
| `voice_notification_enabled` | 13 | bool | varint | individual_device_settings | no |
| `wake_duration` | 144 | int | varint | individual_device_settings | yes |
| `wake_handedness` | 153 | int | varint | individual_device_settings | yes |
| `wake_only_mode_enabled` | 156 | bool | varint | individual_device_settings | yes |
| `wake_thumb_middle_distance_threshold` | 157 | int | varint | individual_device_settings | yes |
| `wakeword_enabled` | 36 | bool | varint | individual_device_settings | yes |
| `wakeword_sound_enabled` | 37 | bool | varint | individual_device_settings | yes |
| `water_eject_enabled` | 128 | bool | varint | individual_device_settings | no |
| `wear_detection_enabled` | 38 | bool | varint | individual_device_settings | yes |
| `wearable_e2ee_pk_uuid` | none | str | none | individual_device_settings | no |
| `wearable_untethered_relay_status` | none | str | none | individual_device_settings | no |
| `web_ai_link_preview_for_comms_enabled` | none | bool | none | individual_device_settings | no |
| `wellness_partner_1_enabled` | 69 | bool | varint | individual_device_settings | yes |
| `wellness_partner_5_enabled` | 76 | bool | varint | individual_device_settings | yes |
| `whatsapp_contacts_syncing` | 61 | int | varint | individual_device_settings | no |
| `wifi_password` | 21 | str | length-delimited | individual_device_settings | no |
| `wifi_ssid` | 20 | str | length-delimited | individual_device_settings | no |

## The thermal shutdown key

`sg_disable_thermal_shutdown` is a bool in `local_device_settings`. It has no svc31 field and is not parsed. It controls whether the glasses shut down when a skin sensor reads too hot.

> [!CAUTION]
> A phone must never write it. Turning it off removes the protection against the glasses burning the wearer's skin. With no svc31 field, the only way a phone could write it is an RLDrive kv object.

## Rows by device type

The Meta AI app first filters its rows by device type: each row lists the device types it applies to. See [Glasses-hardware](Glasses-hardware#device-types). 109 rows list type 5, Meta Ray-Ban Display. The Display's own rows include accessibility (color correction, magnification, screen reader rate and pitch, font scale and weight), `screen_brightness_mode`, wake display, invert swipe and `sg_emg_display_off`.

Rows only for type 3: `two_stage_eis*`, `homer_reset*`, `nose_occlusion`, `hearing_boost`, `conversation_focus*` and `capture_aspect_ratio`. No row lists type 4: the band's settings live on the band.

## Per-product offer rules

On top of the device type, the Meta AI app offers a row or option on some glasses models and not others. A row or option carries an allow list (`products`), a block list (`not_products`), or neither. A row or option is offered on a product when that product is not on the block list. If there is an allow list, the product must be on it too. Rows with no lists apply to every model.

| Product id | Model | Device name in build fingerprint |
|---|---|---|
| 258 | Ray-Ban Meta (2023) | hammerhead |
| 259 | Meta Ray-Ban Display | greatwhite |
| 262 | Ray-Ban Meta Optics | zebra |
| 263 | Meta glasses | lager |
| 264 | Oakley Meta Vanguard | mako |
| 265 | Oakley Meta HSTN | pylades |
| 266 | Ray-Ban Meta Gen 2 | greathammerhead |

The phone reads the connected product from the build fingerprint. The fingerprint has the form `Meta/<product>/<device>:<release>/...`. The device name is the third field, before the colon.

| Row or option | Level | Allow list | Block list |
|---|---|---|---|
| `resolution_and_framerate` | row | any | 259 |
| `resolution_and_framerate`, value 2 | option | 258, 262 to 266 | none |
| `resolution_and_framerate`, value 1 | option | 262 to 266 | none |
| `video_duration_ms` | row | any | 259 |
| `video_duration_ms`, value 300000 | option | 262 to 266 | none |
| `eis_mode` | row | 262 to 266 | none |
| `captouch_enabled` | row | 262 to 264 | none |
| `audio_playback_during_capture_enabled` | row | 262 to 264 | none |
| `music_concurrency_enabled` | row | 262 to 266 | none |
| `capture_auto_review` | row | 259 | none |
| `capture_aspect_ratio` | row | any | 258 |
| `landscape_mode_enabled` | row | any | 258 |

"Any" means the row has no allow list.

Reference code: [settings.tsv](https://github.com/macedonga/visor/blob/main/core/settings/src/main/resources/com/macedonga/visor/core/settings/settings.tsv), [settings_ui.json](https://github.com/macedonga/visor/blob/main/core/settings/src/main/resources/com/macedonga/visor/core/settings/settings_ui.json), [SettingSpec.kt](https://github.com/macedonga/visor/blob/main/core/settings/src/main/kotlin/com/macedonga/visor/core/settings/SettingSpec.kt)

## Open questions

- Unconfirmed: the wire encoding of kind `other`. Five keys use it.
- Unconfirmed: whether the glasses enforce the per-product lists, or whether they only drive the Meta AI app.
- Unconfirmed: how the glasses apply `oxide_enabled`, which is parsed but has no svc31 field.
