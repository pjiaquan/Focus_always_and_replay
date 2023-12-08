 Always and Replay if Video is Paused UserScript

This script is designed for use with Tampermonkey and is intended to automatically play videos on `https://iedu.foxconn.com/*`. It ensures that the video stays in focus and replays if paused, aiding in learning more efficiently.

## Script Metadata

- **Name**: Focus always and replay if video is paused
- **Namespace**: http://tampermonkey.net/
- **Version**: 0.1
- **Description**: To learn more faster and efficiently
- **Author**: pjiaquan
- **Match**: https://iedu.foxconn.com/*
- **Run At**: document-start
- **Icon**: A base64 encoded GIF image
- **Grant**: none
- **License**: MIT

## Script Functionality

### Preventing Loss of Focus

The script includes functionality to keep the window always in focus. This is achieved by:

- Overriding `window.onblur` to `null` to prevent loss of focus.
- Setting a `window.blurred` flag to `false`.
- Overriding `document.hasFocus` to always return `true`.
- Overriding various properties (`hidden`, `mozHidden`, `msHidden`, `webkitHidden`) to always report the document as visible.
- Overriding `document.visibilityState` and `document.webkitVisibilityState` to return `"visible"`.
- Setting `document.onvisibilitychange` to `undefined`.

### Event Handling

The script prevents specific events from triggering their default behavior, specifically for blur, mouseleave, and mouseout events, except when they are on input, anchor, or span elements.

### Video Playback Functionality

- **`updateVideoProgress` Function**: Checks if the video is playing every 30 seconds. If not, it starts playing the video.
- **`setupVideoCheck` Function**: Sets an interval to check video playback status.
- **`isVideoPlaying` Function**: Checks if the video element (with id 'realvideo_html5_api') is playing.
- **`startPlayingVideo` Function**: Starts playing the video if it is found and is not currently playing.

### Initialization

- The script adds an event listener to the window's load event to start checking the video playback status.

## Usage

To use this script, it needs to be added to Tampermonkey or a similar userscript manager. The script will run automatically on pages matching `https://iedu.foxconn.com/*`.

## Notes

- The script ensures continuous video playback for uninterrupted learning.
- It overrides typical browser behavior regarding window focus and visibility to maintain video focus.
- Error handling is included in the `startPlayingVideo` function to log any issues encountered during video playback.
