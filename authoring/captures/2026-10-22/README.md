# Audio-spectrum captures

This batch adds the short [audio-spectrum guide](../../../src/content/docs/guides/audio-spectrum.md).
The published macOS v0.21.1 release was used for live operation. The
[manifest](manifest.json) records its executable/archive hashes, the source
comparison with v0.21.2, crop rectangles, image hashes, and checks performed.

Four untouched originals are preserved. Three produce the published result,
POINTCLOUD controls, and song-strip crops. The fourth records the final portable
starter reopening with no song attached and is not bundled in the manual.
Annotations are rendered separately from
[the shared registry](../../image-annotations.json); PNG pixels remain intact.

## Live checks and limits

- Opened the starter through `File > Open...`, selected POINTCLOUD, and checked
  Spectrum, Height 0.50, Smoothing 0.50, and the other recorded settings.
- Loaded original test audio through `File > Open Song...`, clicked `PLAY`,
  and observed the ring respond. Captures show playback at 3.42 and 5.03 seconds.
  `Space` and restart after reaching the end were also observed.
- Saved an Audio spectrum copy through `File > Save As...`. Closing the song
  strip preserved its song reference. Removed that reference from the saved
  JSON to make the supplied starter portable and independent of the test audio.
- Reopened the exact final starter through startup restore in the isolated app
  configuration. The cyan ring appeared with no song strip. This final check
  used startup restore, not the native Open dialog; the final song-free fixture
  was not resaved through the app. Every JSON string was inspected for external
  media/font dependencies and private or temporary paths.

The temporary app session was closed. Windows/Linux, v0.21.2 live operation,
external audio devices, and packaged Help were not tested in this batch.

## Reproduce the capture input and image checks

The original 16-second WAV consists of five sine voices authored for this
capture. It is not bundled. Readers use an audio file of their choice.

```sh
python3 authoring/captures/2026-10-22/generate-spectrum-audio.py /tmp/spectrum-demo.wav
node scripts/prepare-doc-images.mjs authoring/captures/2026-10-22/manifest.json --check
```

The generator was run again and produced the same WAV SHA-256 as the capture
input. The manifest records that hash. The image check recreates the PNG crops
in memory and verifies dimensions and hashes without modifying originals.

Integrated manual checks are recorded in the
[full documentation review](../../reviews/2026-10-22/README.md).
