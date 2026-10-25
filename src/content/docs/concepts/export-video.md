---
title: "Export Video"
description: "Render a patch at an exact frame rate, make a repeating loop, or export with a song."
---

Use `File > Export Video...` for a fixed-length clip without the dropped
frames of an overloaded live recording. It renders the patch frame by
frame from its beginning, taking as long as each frame needs. The live view
pauses during export and continues from where it stopped.

Choose a preset with `For`, or set the format, size, frame rate, and quality
individually. The output keeps the aspect ratio set in `Settings > Output`.
Files use the folder and filename in `Settings > Recording`.

## Formats and inputs

`MP4` uses H.264. `WebM` uses VP9 and can preserve transparency with
`Transparent background`. `GIF` repeats forever and uses one palette for
the whole file; `Smooth gradients` reduces banding. Video exports can be
at most 10 minutes long, GIFs at most 60 seconds.

Live inputs do not continue during export. MIDI, OpenSoundControl, and
macro values stay at their starting values. Cameras, NDI, Spout, and
Syphon inputs hold a still image. Video clips advance with the export.
Audio sources follow the patch's song when `Use song` is on; otherwise
they are silent. CV and Gate inputs are silent.

## Repeating loops

`Perfect loop` sets a repeat length in bars, beats, or seconds. Bars and
beats follow the tempo. The export rounds the length to whole frames and,
for bars or beats, adjusts its rendering tempo when needed to fit them.
The dialog reports that adjustment.

The loop checklist identifies rates that do not complete whole cycles,
motion that holds still, and inputs that cannot be reproduced. `Snap`
adjusts the rates it can to fit the loop in one undoable step. A loop
setting alone does not make every patch repeat: simulations and feedback
can keep changing from one loop to the next.

`Video crossfade` blends the end into the start to soften that change.
Content that already repeats passes through unchanged. This crossfade
applies to the file; it does not smooth the live view's loop point.
Feedback and other processes with memory get a warm-up loop before the
frames kept for the file.

The loop settings are saved with the patch and also affect built-in motion
in the live view. See [Perfect loop](../../reference/windows/export-video/#length-and-loops)
for the checklist, crossfade limits, and motion that follows the loop.

## Export with a song

`Choose Song...` selects the patch's audio file. With `Use song` on, the
patch's audio levels, frequency bands, SCOPE, and audio-triggered envelopes
follow that file while rendering. `Start` sets where the song begins.
`Use audio length` fits the clip's length to the remaining audio.

`Include audio track` adds AAC sound to MP4 or Opus sound to WebM. With it
off, the song still drives the picture. GIF has no audio track.

For a repeating loop, `Audio crossfade` controls the sound independently
of `Video crossfade`. The dialog reports audio that ends before the video
or needs fitting to the loop.

The song and its start point are saved with the patch. `Use song` and
`Include audio track` are app settings. See [Export Video controls](../../reference/windows/export-video/)
for supported files and the full settings.

Related: [Output and Recording](../output-and-recording/),
[Modulation](../modulation/).
