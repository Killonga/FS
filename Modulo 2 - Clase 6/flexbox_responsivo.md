{
    "AuxAudioDevice1": {
        "deinterlace_field_order": 0,
        "deinterlace_mode": 0,
        "enabled": true,
        "flags": 0,
        "hotkeys": {
            "libobs.mute": [],
            "libobs.push-to-mute": [],
            "libobs.push-to-talk": [],
            "libobs.unmute": []
        },
        "id": "wasapi_input_capture",
        "mixers": 15,
        "muted": false,
        "name": "Mic/Aux",
        "push-to-mute": false,
        "push-to-mute-delay": 0,
        "push-to-talk": false,
        "push-to-talk-delay": 0,
        "settings": {
            "device_id": "default"
        },
        "sync": 0,
        "volume": 1.0
    },
    "DesktopAudioDevice1": {
        "deinterlace_field_order": 0,
        "deinterlace_mode": 0,
        "enabled": true,
        "flags": 0,
        "hotkeys": {
            "libobs.mute": [],
            "libobs.push-to-mute": [],
            "libobs.push-to-talk": [],
            "libobs.unmute": []
        },
        "id": "wasapi_output_capture",
        "mixers": 15,
        "muted": false,
        "name": "Desktop Audio",
        "push-to-mute": false,
        "push-to-mute-delay": 0,
        "push-to-talk": false,
        "push-to-talk-delay": 0,
        "settings": {
            "device_id": "default"
        },
        "sync": 0,
        "volume": 1.0
    },
    "current_program_scene": "Scene",
    "current_scene": "Scene",
    "current_transition": "Fade",
    "modules": {
        "auto-scene-switcher": {
            "active": false,
            "interval": 300,
            "non_matching_scene": "",
            "switch_if_not_matching": false,
            "switches": []
        }
    },
    "name": "Untitled",
    "preview_locked": false,
    "quick_transitions": [
        {
            "duration": 300,
            "hotkeys": [],
            "id": 1,
            "name": "Cut"
        },
        {
            "duration": 300,
            "hotkeys": [],
            "id": 2,
            "name": "Fade"
        }
    ],
    "scene_order": [
        {
            "name": "Scene"
        }
    ],
    "sources": [
        {
            "deinterlace_field_order": 0,
            "deinterlace_mode": 0,
            "enabled": true,
            "flags": 1,
            "hotkeys": {
                "libobs.mute": [],
                "libobs.push-to-mute": [],
                "libobs.push-to-talk": [],
                "libobs.unmute": []
            },
            "id": "dshow_input",
            "mixers": 15,
            "muted": false,
            "name": "Video Capture Device",
            "push-to-mute": false,
            "push-to-mute-delay": 0,
            "push-to-talk": false,
            "push-to-talk-delay": 0,
            "settings": {
                "last_video_device_id": "",
                "video_device_id": "",
                "res_type": 1,
                "resolution": "640x480",
                "last_resolution": "640x480"
            },
            "sync": 0,
            "volume": 1.0
        },
		{
            "deinterlace_field_order": 0,
            "deinterlace_mode": 0,
            "enabled": true,
            "flags": 0,
            "hotkeys": {
                "OBSBasic.SelectScene": [],
                "libobs.hide_scene_item.HiRez Game Capture": [],
                "libobs.show_scene_item.HiRez Game Capture": []
            },
            "id": "scene",
            "mixers": 0,
            "muted": false,
            "name": "Scene",
            "push-to-mute": false,
            "push-to-mute-delay": 0,
            "push-to-talk": false,
            "push-to-talk-delay": 0,
            "settings": {
                "items": [
                    {
                        "align": 5,
                        "bounds": {
                            "x": 1280.0,
                            "y": 720.0
                        },
                        "bounds_align": 0,
                        "bounds_type": 2,
                        "crop_bottom": 0,
                        "crop_left": 0,
                        "crop_right": 0,
                        "crop_top": 0,
                        "name": "HiRez Game Capture",
                        "pos": {
                            "x": 0.0,
                            "y": 0.0
                        },
                        "rot": 0.0,
                        "scale": {
                            "x": 1.0,
                            "y": 1.0
                        },
                        "scale_filter": "disable",
                        "visible": true
                    },
					{
                        "align": 5,
                        "bounds": {
                            "x": 0.0,
                            "y": 0.0
                        },
                        "bounds_align": 0,
                        "bounds_type": 0,
                        "crop_bottom": 0,
                        "crop_left": 0,
                        "crop_right": 0,
                        "crop_top": 0,
                        "name": "Video Capture Device",
                        "pos": {
                            "x": 915.0,
                            "y": 472.0
                        },
                        "rot": 0.0,
                        "scale": {
                            "x": 0.46718749403953552,
                            "y": 0.46666666865348816
                        },
                        "scale_filter": "disable",
                        "visible": true
                    }
                ]
            },
            "sync": 0,
            "volume": 1.0
        },
        {
            "deinterlace_field_order": 0,
            "deinterlace_mode": 0,
            "enabled": true,
            "flags": 0,
            "hotkey