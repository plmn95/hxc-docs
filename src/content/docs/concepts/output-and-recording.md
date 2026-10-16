---
title: "Output and Recording"
description: "Record or export video and send output through NDI, Spout, Syphon, or a second window."
---

`Output` shows the last module's result, or the mix of both decks in Mixer
Mode. Recordings, NDI, Spout, Syphon, and `Dual Monitor Output` use this image.

Recording writes an MP4 straight to disk with no save dialog, at whatever
quality, frame rate, codec, and audio-inclusion setting
`Settings > Recording` holds at the time. The codec is H.264 or H.265. It captures the aspect-locked
output image itself, not the window or its docked panels. Start and stop it
from the `REC` pill in the toolbar, which Mixer Mode also shows, or with
`Ctrl+Alt+R` (`Cmd+Option+R` on macOS).

If encoding falls behind, frames are skipped without changing the
recording's duration or audio sync. The save message reports skipped frames.
Choosing H.264 or a lower frame rate can reduce the load. If the selected codec is unavailable, recording cannot start.

Stopping a recording doesn't hold up the app. The file finishes writing in
the background, and a message then names the saved file. When finishing
takes more than a moment, the timer shows `Saving...` and `REC` is dimmed
until the file is complete. Quitting while a file is still being written
waits for it to finish.

## Export Video

Recording captures the session as it plays, including its timing. When a
clip has to be exact, for a social post, a loop or a GIF,
`File > Export Video` renders the patch frame by frame instead, so every
frame lands at its exact time even when the patch is too heavy to play
smoothly. The export always starts the patch from its beginning, so the
same patch gives the same file every time.

The export runs on a copy of the patch. The live view pauses while it runs
and continues from the same point afterwards. MIDI, OpenSoundControl and
macro values are held at what they were when the export started, and audio
input is silent. Video clips play from their first frame at their own
speed. Cameras and NDI, Spout or Syphon sources show the picture they had
when the export started, without moving.

An export saves to the folder and filename set in `Settings > Recording`,
with the extension of its format. It carries no audio. Export is not
available in Mixer Mode or while a recording is running.

For a clip that repeats without a jump, turn on
[Perfect loop](../../reference/windows/export-video/#perfect-loop): the
file is then exactly one loop in bars, beats or seconds, and its last frame flows
into its first. While the loop is on, the toolbar shows a `LOOP` plate after
`TAP`, and the live view snaps its built-in motion to the loop too.

The settings are in [Export Video](../../reference/windows/export-video/).

NDI, Spout (Windows), and Syphon (macOS) each send the same output live to
another program instead of, or alongside, a file. Each is enabled
separately in `Settings > Output`, under its own sender name.

NDI needs the free NDI Runtime from NDI itself. On Windows and macOS,
install it from [ndi.video](https://ndi.video). On Linux, NDI publishes no
separate runtime installer: install `libndi` from the NDI SDK for Linux
into `/usr/local/lib`, or use your distribution's NDI package. Until the
runtime is found, the NDI controls stay grey with a note saying so. They
turn on by themselves within a couple of seconds of installing it, with no
restart, including when Hex Composer was started from Steam.

Parts of the picture that no module has drawn on are empty. The `Output`
window, `Dual Monitor Output`, recordings and snapshots show them as black.
NDI, Spout and Syphon send them as transparency. A receiving program that
ignores alpha shows partly see-through areas at full strength, for example
FEEDBACK echoes that are fading out.

`Dual Monitor Output`, also in `Settings > Output`, opens a second window
carrying nothing but the output image, sized independently of the main
window.

Display Fit controls how the output image sits inside whatever window or
monitor shows it, when the two don't share an aspect ratio: `Fit Best`,
`Fill`, or `Shrink`.

To render a patch to a file frame by frame instead of capturing it live,
with an exact frame rate, a Perfect loop or an audio file driving it, see
[Export Video](../export-video/).

Related: [Signal Chain](../signal-chain/), [Export Video](../export-video/).
