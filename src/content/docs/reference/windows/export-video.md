---
title: "Export Video"
description: "Render the patch frame by frame to an MP4, WebM or GIF file."
---

`File > Export Video` opens this dialog. `Export` starts rendering, the
dialog shows a preview of the latest frame with the progress, and `Cancel`
(or `Esc`) stops the export and deletes the unfinished file. When the file
is written, the dialog shows its name and size, and `Show in Folder` opens
the folder.

| Control | Covers |
|---|---|
| For | A preset that fills the rows below: `Instagram & TikTok` (MP4, 1080, 30 fps, High), `X & YouTube` (MP4, 1920, 30 fps, High), `Discord GIF` (GIF, 480, 25 fps, 128 colors) or `Web (WebM)` (WebM, Output size, 30 fps, Medium). Changing any row switches it to `Custom`. |
| Format | `MP4` (H.264), `WebM` (VP9) or `GIF`. A format this computer's build can't write is unavailable. |
| Size | The long edge in pixels: `Output size`, `1920`, `1080`, `720` or `480`. Each entry shows the resulting width and height. The shape always follows the Output; change it in `Settings > Output`. The dialog notes when the preset's platform expects another shape, for example 9:16 for Instagram and TikTok. |
| Perfect loop | Rocker. Renders one loop whose last frame flows into the first, so the file repeats without a jump. Saved with the patch. See [Perfect loop](#perfect-loop). |
| Length | Seconds to render, up to 60 for a GIF and 600 for MP4 and WebM. With `Perfect loop` on: whole bars (1 to 64) at the current BPM, or seconds (0.5 to 600), chosen in the Selector beside it. |
| Crossfade | With `Perfect loop` on: seconds the loop's end fades into its start, 0 to 10, default 0.5, 0 is off. Saved with the patch. See [Crossfade](#crossfade). |
| FPS | `24`, `25`, `30` or `60`. A GIF offers `10`, `20`, `25` or `50`, the rates a GIF plays back exactly. |
| Quality | `Low`, `Medium` or `High` (MP4 and WebM). |
| Colors | `256`, `128` or `64` colors for the whole GIF. Fewer colors make a smaller file. |
| Smooth gradients | GIF only. Blends neighboring colors in a fixed fine pattern so gradients don't band. |
| Transparent background | WebM only. Keeps the picture's transparency, as NDI, Spout and Syphon send it. Off, empty parts of the picture are black. |

A GIF renders twice: once to choose its colors, then again to write the
file, so it takes about twice as long as a video of the same length. After
a `Discord GIF` export larger than Discord's 10 MB upload limit, the dialog
suggests a smaller Size, fewer Colors or a shorter Length.

## Perfect loop

With `Perfect loop` on, the file is exactly one loop. A length in bars is
rounded to whole frames, and the export plays a hair faster or slower so
the bars fill those frames exactly; the dialog names that tempo when it
moves by 0.05 BPM or more (`Renders at 127.7 BPM so the loop is exactly 47
frames.`). A length in seconds is rounded to whole frames and keeps the
tempo. A loop longer than the format allows disables `Export`.

While the loop is on, in the live view as well as in the file:

- Every LFO, the text scroll, Deflection Error's roll and flicker and
  SCOPE's generators start again at each loop start. TIME keeps rising.
- The built-in motion of OSC, Point Cloud's Flow, Galaxy and Noise Blob,
  Wave Warp, VHS and Deflection Error turns a whole number of times per
  loop. Motion too slow to turn once holds still; a longer loop lets it
  move.
- Noise waves on an LFO repeat once per loop.
- Sprite sheets, pixel art and, in the file, video clips play on the loop's
  own clock.

The loop length is not a modulation target: every rate snapped to the loop
is rounded to it.

The toolbar shows a `LOOP` plate after `TAP` while the loop is on; its
Lamp flashes at each loop start, and clicking it opens this dialog.

### Crossfade

Some content doesn't meet itself at the loop point however the rates are
set: a TIME connection that keeps rising, Fluid, Reaction-Diffusion,
Ripple's rain, an ISF shader that reads `TIME`, or feedback that never
settles, for example Feedback with Edge Detect inside its loop. With
`Crossfade` above 0, the export fades the loop's last frames into its
start, blending each one with the same moment one loop earlier. Anything
that already repeats is identical there and passes through unchanged, so
the crossfade is on for every Perfect loop export, whether or not the
check list names something.

The line under the row gives the length in frames. The crossfade is at
most half the loop, and at large sizes it is shortened to what fits in
memory; the line says so. The file keeps its length and still starts at
the loop's start. Only the exported file is crossfaded: the live view
still jumps at the loop point. `Crossfade` is not a modulation target.

The crossfade can't hide a jump that happens the same way at every loop
start, such as a rate that doesn't fit whole cycles, an LFO starting
again or a clip starting over. `Snap` fixes the rates it can.

With `Crossfade` above 0, every Perfect loop export first renders one loop
it doesn't keep (`Warming up (one loop)...`), even if nothing in the patch
needs warming up, so the frames to blend from exist. While it blends, the
progress line adds `crossfading`. When the file is written, the dialog
says whether the loop point matched: `The loop point matched exactly.`,
`The loop point matched.` (within one color level), or `The loop point
didn't match, so the crossfade blended the last 15 frames (0.5s).`

### Loop check list

Below the rows, a list says how the patch will loop:

| Line | Meaning |
|---|---|
| Green Lamp | How many things repeat cleanly. Hover for the list. |
| Orange Lamp, rate | A rate that doesn't fit whole cycles into the loop, for example `LFO 2: Rate 0.37 Hz, 1.48 cycles per loop`. Hover for the value `Snap` sets. |
| Orange Lamp, holds still | Built-in motion too slow to turn once in this loop, and the shortest loop it moves in, for example `OSC 1: its slow color drift holds still in a 16s loop. It moves in loops of 19s or longer.` |
| No Lamp | A note: something that warms up for one loop first (Feedback, the Simulate effects, Persistence, Point Cloud trails, SCOPE's glow, ISF buffers, envelopes, S+H glide), a TIME connection that keeps rising, MIDI or OpenSoundControl held at its value when the export starts, an ISF shader that reads `TIME`, or Fluid, Reaction-Diffusion and Ripple's rain, which never repeat exactly. With `Crossfade` above 0, what it covers ends in `the crossfade blends it` or `if it still changes, the crossfade blends it`. The list can't see every drift; the crossfade covers those too. |
| Red Lamp | Something the file can't show: audio and CV/Gate inputs are silent, and a camera or NDI, Spout or Syphon input shows a still picture. |

`Snap N rates` sets every listed rate to the nearest whole number of
cycles per loop (at least one) in one step that `Undo` reverts. It covers
LFO rates, OSC's `Rate R/G/B`, the Strange Attractor's Speed, Text scroll,
Deflection Error's Roll Speed and Flicker Rate, Dither's Animate, SCOPE's
generator frequencies, sprite-sheet FPS, pixel-art and clip speed, and the
Amount of a TIME connection to a rotation, so it turns whole turns per loop.
Orange and red lines never block `Export`.

When the list has warm-up notes, or `Crossfade` is above 0, the export
first renders one loop it doesn't keep (`Warming up (one loop)...`), so the
file starts in the state it loops back to. A GIF then chooses its colors
from the next loop and writes the one after.

**NOTE:** the demo edition adds a small Hex Composer mark to exported files,
as it does to recordings and stills.

Related: [Output and Recording](../../../concepts/output-and-recording/).
