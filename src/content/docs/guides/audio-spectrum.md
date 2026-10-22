---
title: "Make an Audio Spectrum"
description: "Use POINTCLOUD's Spectrum shape to make a ring respond to a song."
---

Make a ring of points expand with the frequencies in a song. Use an audio
file of your choice and the supplied starting patch.

![A cyan spectrum ring expanding into peaks while a song plays.](../../images/guides/audio-spectrum/result.png)

## 1. Open the patch

Download the [spectrum patch](../../examples/audio-spectrum.hxc) and open
it with `File > Open...`. It contains a cyan `OSC` feeding `POINTCLOUD`
with `Shape` set to `Spectrum`.

## 2. Play a song

Choose `File > Open Song...` and select an audio file. Click `PLAY` on the
song strip beneath the toolbar, or press `Space`.

The ring expands with the music. `Space` pauses and resumes playback.

[![The song strip playing an audio file, with elapsed time and a waveform.](../../images/guides/audio-spectrum/song-strip.png)](../../images/guides/audio-spectrum/song-strip.png)

If the ring stays still, check that the song is playing and that
`Settings > Audio` has `Source` set to `File`.

## 3. Shape the response

Select `POINTCLOUD` in `Chain`. Increase `Height` for a stronger response;
adjust `Smoothing` to change how quickly the peaks fall.

![POINTCLOUD set to Spectrum, with Height and Smoothing controls.](../../images/guides/audio-spectrum/controls.png)

To include the song when sharing your patch, enable `Embed assets in save
files` in `Settings > Patches` before saving. Choose `File > Save As...`
to keep your version.

For live input, choose a device or application in
[Settings > Audio](../../reference/windows/settings/#audio-sources).
See [POINTCLOUD](../../reference/modules/pointcloud/) for the other shapes
and rendering controls.
