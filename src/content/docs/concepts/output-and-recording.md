---
title: "Output and Recording"
description: "Record or export video and send output through NDI, Spout, Syphon, or a second window."
---

`Output` shows the last module's result, or the mix of both decks in Mixer
Mode. Recordings, NDI, Spout, Syphon, and `Dual Monitor Output` use this image.

## Record a live session

Recording captures the output as it plays, including changes you make
during the take. `Settings > Recording` sets its output folder, filename,
quality, frame rate, codec, and whether to include audio. Files are MP4,
using H.264 or H.265. The recording contains the output image without the
app's panels or window borders.

Start and stop it from the toolbar's `REC` pill, also available in Mixer
Mode, or with `Ctrl+Alt+R` (`Cmd+Option+R` on macOS).

If encoding falls behind, frames are skipped without changing the
recording's duration or audio sync. The save message reports skipped frames.
Choosing H.264 or a lower frame rate can reduce the load. If the selected
codec is unavailable, recording cannot start.

Stopping a recording doesn't hold up the app. The file finishes writing in
the background, and a message then names the saved file. When finishing
takes more than a moment, the timer shows `Saving...` and `REC` is dimmed
until the file is complete. Quitting while a file is still being written
waits for it to finish.

For a fixed-length clip with exact frame timing, use
[Export Video](../export-video/). It renders frame by frame even when the
patch is too heavy to play smoothly, and can make a repeating loop or
follow an audio file. Export is unavailable in Mixer Mode or while a
recording is running.

## Send to another app or display

NDI, Spout (Windows), and Syphon (macOS) each send the same output live to
another program instead of, or alongside, a file. Each is enabled
separately in `Settings > Output`, under its own sender name.

NDI needs its separately installed runtime. Until it is found, the NDI
controls stay grey, with platform-specific installation instructions
beneath them. Hex Composer checks again automatically, so installing the
runtime does not require restarting the app.

Parts of the picture that no module has drawn on are empty. The `Output`
window, `Dual Monitor Output`, recordings and snapshots show them as black.
NDI, Spout and Syphon send them as transparency. A receiving program that
ignores alpha shows partly see-through areas at full strength, for example
FEEDBACK echoes that are fading out.

`Dual Monitor Output`, also in `Settings > Output`, opens a second window
carrying nothing but the output image, sized independently of the main
window.

`Display Fit` controls how the output image sits inside whatever window or
monitor shows it, when the two don't share an aspect ratio: `Fit Best`,
`Fill`, or `Shrink`.

Related: [Settings](../../reference/windows/settings/),
[Signal Chain](../signal-chain/).

## PNG snapshots

Click the camera control beside `REC` to save the output as a PNG in the
recording folder. The shortcut is `PrintScreen` or `Ctrl+Alt+S` on
Windows/Linux, or `Cmd+Option+S` on macOS.
