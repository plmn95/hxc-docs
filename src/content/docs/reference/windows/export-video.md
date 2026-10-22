---
title: "Export Video"
description: "Export formats, song input, loop length, crossfades, and progress controls."
---

Open `File > Export Video...` to render a patch frame by frame. For how
exports differ from live recordings and how loops work, see
[Export Video](../../../concepts/export-video/).

## File settings

| Control | Behavior |
|---|---|
| `For` | Presets for `Instagram & TikTok`, `X & YouTube`, `Discord GIF`, or `Web (WebM)`. Changing a preset's file settings selects `Custom`. |
| `Format` | `MP4` (H.264), `WebM` (VP9), or `GIF`. Unavailable formats are dimmed. |
| `Size` | The long edge: `Output size`, `1920`, `1080`, `720`, or `480`. The resulting dimensions follow the Output's aspect ratio. Change its shape in `Settings > Output`. |
| `FPS` | `24`, `25`, `30`, or `60` for video. GIF offers `10`, `20`, `25`, or `50`, which have exact GIF frame delays. |
| `Quality` | `Low`, `Medium`, or `High` for MP4 and WebM. |
| `Colors` | GIF palette size: `256`, `128`, or `64`. Fewer colors reduce file size. |
| `Smooth gradients` | GIF only. Uses a fine dither pattern to reduce banding. |
| `Transparent background` | WebM only. Preserves transparent parts of the picture; otherwise they become black. |

Presets set format, size, frame rate, and quality; they do not change the
Output's shape. The dialog reports a mismatch with a preset's expected
aspect ratio.

A GIF renders once to choose a shared palette and again to write the file.
If the result exceeds the `Discord GIF` preset's size target, the dialog
suggests reducing size, colors, or length.

## Song

The soundtrack is the patch's song, also used by the live song strip.
Supported files include WAV, MP3, FLAC, Ogg, Opus, M4A, AAC, and AIFF.

| Control | Behavior |
|---|---|
| `Song` | `Choose Song...` or `Change...` selects an audio file. `Clear` removes the patch's song. |
| `Use song` | Lets the patch react to the song during export. With it off, the export is silent and audio-driven parameters receive no audio input. |
| `Start` | Where playback begins in the song, shared with the song strip's loop start. |
| `Include audio track` | Adds the soundtrack to MP4 (AAC) or WebM (Opus). GIF has no audio track, but its picture can still react to the song. |
| `Use audio length` | Sets `Length` from the audio remaining after `Start`. |

The song and its start belong to the patch. Enable
`Settings > Patches > Embed assets in save files` to include the audio
when sharing it. The export's `Use song` and `Include audio track` choices
are app settings.

## Length and loops

| Control | Behavior |
|---|---|
| `Length` | Bars, beats, or seconds, whether `Perfect loop` is on or off. One bar is four beats. Each unit retains its own value. |
| `Perfect loop` | Makes the exported file one repeating loop and synchronizes supported motion to that loop in the live patch. |
| `Video crossfade` | With the loop on, blends its final picture into its start. Affects the exported picture only. |
| `Audio crossfade` | With a song and the loop on, blends the end of its sound into the music before `Start`. Affects both live song playback and export. |

Length accepts 1–64 bars, 1–256 beats, or 0.5–600 seconds. GIF is limited
to 60 seconds; MP4 and WebM to 600. With `File` selected as the audio
source, Length is limited to the song remaining after `Start`.

In bars or beats, the export may adjust its tempo slightly to fit a whole
number of frames. The dialog reports the adjusted BPM. Seconds are rounded
to whole frames without changing the tempo.

### Crossfades

Crossfades use beats for a length in bars or beats, or seconds otherwise.
The beat choices are `Off`, `1/2 beat`, `1 beat`, `2 beats`, and `1 bar`.
Seconds range from 0 to 10. Neither fade exceeds half the loop. At large
output sizes, the video fade can also be shortened to fit memory; the
dialog reports the effective length.

### Loop checks

| Indicator | Meaning |
|---|---|
| Green Lamp | Motion that repeats cleanly. Hover for details. |
| Orange Lamp | A rate that does not fit whole cycles, or motion too slow to complete a cycle in this loop. |
| No Lamp | A note about warm-up, external values held still, or content that can keep changing between loops. |
| Red Lamp | An input the export cannot reproduce live: CV/Gate is silent; cameras and network video inputs hold one frame. |

`Snap N rates` fits supported rates to whole cycles per loop as one
undoable edit. Hover a rate warning to see the value it will use.
Warnings do not block export. Crossfades handle continuing drift; they do
not replace fitting an unsuitable rate to the loop.

Feedback, simulations, and other effects with memory can require one
warm-up loop before the exported loop. A video crossfade also requires
warm-up. Progress shows `Warming up (one loop)...` before writing the file.

## Progress and completion

`Export` starts rendering and displays progress with the latest frame.
`Cancel` or `Esc` stops the export and removes its unfinished file.
On completion, the dialog shows the filename and size; `Show in Folder`
locates it. Files use the folder and filename pattern in
`Settings > Recording`.

For a Perfect loop, the completion message reports whether the loop point
matched or was blended by the crossfade. The demo edition adds its mark to
exports, recordings, and stills.
