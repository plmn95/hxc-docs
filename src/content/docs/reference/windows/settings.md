---
title: "Settings"
description: "Configure video output, audio input, controllers, recording, patch assets, and interface behavior."
---

Open `View > Settings`. Select a category on the left; the version at the
bottom can be copied when reporting a problem.

| Category | Settings |
|---|---|
| `Output` | Graphics card, resolution and aspect ratio, render quality, display fit, second-display output, and NDI, Spout, or Syphon sending. |
| `Audio` | Device, application, or file input; song playback device; CV/Gate channel roles; custom frequency bands. See [Audio sources](#audio-sources). |
| `MIDI` | Controller input ports. |
| `OpenSoundControl` | UDP listen port for incoming messages. |
| `Recording` | Quality, frame rate, codec, audio inclusion, output folder, and filename pattern. |
| `Patches` | `Embed assets in save files` includes referenced images, sprites, video, and the patch's song. It makes patches portable and increases file size. |
| `Appearance` | `UI Scale`: `Auto`, `100%`, `125%`, `150%`, or `200%`. |
| `Interaction` | `Fine Mouse Control` adjusts Shift-drag sensitivity, from `20% (Coarser)` to `1% (Finest)`. `Show tooltips` controls hover help. |

## Audio sources

| `Source` | Input |
|---|---|
| `Device` | Select an input device, then click `Open`. `Refresh` updates the device list. |
| `Application` | Select a running application, then click `Open`. Availability depends on the platform and its capture permissions. |
| `File` | Uses the patch's song. Choose it with `File > Open Song...` or drop an audio file onto the window. `Output` selects where the song is heard. |

Application capture needs macOS 14.4 or later with capture permission,
Windows build 20348 or later, or PipeWire on Linux. Read the status shown
under the application list if capture is unavailable.

`CV/Gate Channels` appears for input channels beyond the stereo pair.
Assign each channel `Off`, `CV`, or `Gate`, with its voltage range.
Application and file sources are stereo and do not provide extra CV/Gate
channels.

`Custom Frequency Bands` sets the low and high frequencies for the four
user bands. These settings apply across patches and audio sources. See
[Audio-Reactive](../../modulation/audio-reactive/) for level and band
assignments, or [Make an Audio Spectrum](../../../guides/audio-spectrum/)
for a song-driven example.

## Recording files

Quality runs from `Low` to `Lossless`; frame rate is `24`, `30`, or `60`,
and codec is `H.264` or `H.265`. `Include Audio` needs an open audio source.

`Output Folder` defaults to Movies on macOS, Videos on Windows, or the home
folder on Linux. `Filename` accepts date/time tokens listed in its `(?)`
help; `.mp4` is appended. The folder and filename pattern also apply to
exports. After an overloaded recording, a note under `Codec` suggests a
faster choice.

See [Output and Recording](../../../concepts/output-and-recording/) for
save completion and output transparency.

## Graphics card selection

| Control | Behavior |
|---|---|
| `Graphics Card` | On machines with two cards, selects `High performance (dedicated graphics)` or `Power saving (built-in graphics)` for the next launch. |
| `Rendering on` | Reports the card this session actually uses, including on single-card machines. |

A changed selection shows `Restart Hex Composer to apply`. Dual-card
laptops default to the dedicated card. If a launch cannot open a window
on it, the next launch falls back to the integrated card and reports this.
Select `High performance` again to retry.

For troubleshooting, `HEXCOMPOSER_GPU` overrides the preference for one
session; `VIZARD_GPU` is also accepted. Values are `discrete`, `integrated`,
`auto`, and `off`. An existing graphics-card environment variable such as
`DRI_PRIME` takes precedence and disables the control, which reads
`Set by the environment this session.` These overrides are not saved.
