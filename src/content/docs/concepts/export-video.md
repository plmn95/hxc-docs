---
title: "Export Video"
description: "Render a patch to a file frame by frame, as a Perfect loop, and following an audio file."
---

Recording captures what plays live, so a patch too heavy to run at full
frame rate records with dropped frames. `File > Export Video` renders the
patch to a file frame by frame instead: every frame lands at its exact time
however long it takes to draw, and the same patch always gives the same
file. The live view pauses while an export runs and picks up where it left
off.

## Formats

`MP4` is H.264 video. `WebM` is VP9 video and can keep the picture's
transparency with `Transparent background`. `GIF` uses one set of colors
for the whole file, so nothing flickers, and repeats forever; `Smooth
gradients` blends neighboring colors so gradients don't band. A video can
be at most 10 minutes long, a GIF at most 60 seconds.

The `For` Selector fills in the format, size, frame rate and quality for a
platform. Changing any row afterwards makes it `Custom`. `Size` sets the
long edge; the shape always follows the Output. Files go to the folder and
filename set in `Settings > Recording`.

An export renders on its own copy of the patch. MIDI and OpenSoundControl
values stay as they were when the export started. Cameras, NDI, Spout and
Syphon inputs show the picture they had at that moment, holding still.
Video clips play frame by frame in step with the export.

## Perfect loops

With `Perfect loop` on, the file is exactly one loop and its last frame
flows into its first. `Length` is set in bars, beats or seconds; bars and
beats follow the tempo. An export needs a whole number of frames, so in bars
or beats it renders at a tempo a fraction of a BPM away when needed, and the
dialog says so. The loop setting is part of the patch.

The loop check list shows what repeats cleanly and what won't. `Snap`
rounds every rate it can to whole cycles per loop, as one step that can be
undone. Anything with memory (feedback, simulations, envelopes, glide)
plays one loop before the recorded one, so the file starts in the state it
ends in.

`Crossfade` fades the end of the loop into the frames right before its start,
so parts that keep changing from loop to loop don't jump at the loop point.
Parts that already repeat pass through unchanged. With a length in bars or
beats it is set in beats. Only the file is crossfaded; the live view still
jumps.

## Audio

`Audio` takes a sound file (WAV, MP3, FLAC, Ogg, Opus, M4A, AAC or AIFF).
While the export renders, every audio source in the patch follows that file
instead of the live input: the levels and bands in the
[Modulation Matrix](../modulation-matrix/), custom bands, SCOPE, and
envelopes triggered by audio. The same file and patch always give the same
video. CV and Gate inputs stay silent.

`Start` sets where in the file the export begins. The line under it shows
which part of the audio plays. `Include audio track` puts the sound in the
file: AAC in an MP4, Opus in a WebM. The track ends exactly where the video
does. GIFs have no sound, but the picture still follows the audio. When
`Start` is past the beginning of the file, the export first listens to up to
5 seconds of the music before it, so levels and bands are already settled on
the first frame.

When the audio is shorter than the export, the rest is silent and the
dialog says how much. `Use audio length` sets `Length` to the audio from
`Start`, rounded to whole frames.

With a Perfect loop, every loop hears the same stretch of audio, starting at
`Start`. The warm-up loop hears the music right before `Start`, and the
crossfade blends the sound along with the picture, so the loop's end flows
back into the start like the music around it. Audio already cut to the
loop's length fits it: when the audio from `Start` is within half a frame of
the loop, it is stretched by that sliver, so the sound repeats exactly. `Use audio length` sets the loop to the audio; in bars or beats it
picks the nearest whole number of beats, and when those don't hold the
audio at the current tempo, the dialog names the tempo that would.

The audio file, `Start` and `Include audio track` are export settings
remembered by the app, not part of the patch, and they are not modulation
targets: they decide what the file is made from, not what the picture
shows.

Related: [Output and Recording](../output-and-recording/),
[Modulation Matrix](../modulation-matrix/).
