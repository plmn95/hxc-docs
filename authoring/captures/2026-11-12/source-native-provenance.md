# CRT / feedback example provenance

Created 2026-11-12. These are actual Hex Composer outputs, generated with native Shape, Feedback and insert effects. FFmpeg only scales, stacks and encodes the captured frames. The patch needs no external files, live inputs or audio.

## Source and validation

- Native export: the frozen v0.22.0 `ExportSession` CLI at `../retrovid/output/afterimage-2026-10-26/tools/hxc-preview/build/afterimage_preview`, using the matching `source/src/renderer/shaders`. Hidden OpenGL 4.1 context; no running app or settings changed.
- Exporter executable SHA-256: `a09a711ce7a153a2ac7f3408ca440b64bac28359d63a9b81fa57cf6a21b7948d`.
- Frozen native `src` tree SHA-256: `5af77ab6da62d5d1e80d615282395adc7ebf21f9e0c2ed919df7a1362378595a` (sorted relative path, NUL, file bytes, NUL). This captures the actual renderer source rather than relying on the copied checkout's Git metadata.
- Download compatibility: compiled the released v1.0.0 production serializer and dependencies from `plmn95/retrovid` revision `ecff26ed8f0b93ef50a50360ae88f16c5c4ef024`. The exact download loaded, saved and reloaded successfully: two modules, six Feedback inserts, two LFOs, two modulation assignments, Transform version 2 retained.
- The clean downloadable patch was rendered again at the same time and compared with the final-stage proof: RGB MAE **0.0**. The portable generator's saved-and-reloaded Shape, Feedback, LFO and modulation settings also equal the download's settings.
- No live desktop UI, packaged application or physical-device check was performed. Image exports use frozen v0.22 engine code; released v1.0 production serialization establishes load compatibility. Shape, Feedback and composite shaders are byte-identical between those snapshots. The FX shader's changed choice quantization does not change this patch's Transform edge mode 0.

## Progressive stages

Every stage is eight seconds at 30fps, rendered at 1200×800 after one eight-second loop of warmup. The first three stages reach steady images; the fourth adds motion. The browser tour controls how long each selected stage stays visible and keeps all stages on one shared video clock.

| Stage | Added settings |
| --- | --- |
| Source | Shape: polygon, six sides, depth 3, outline only; size/scale .72, rotation per level 24°, width .005, opacity .78, RGB (.78,.88,1). |
| Feedback | Screen loop and output blend; input amount .72, decay .958, Dry/Wet .79. Transform **before** the loop: zoom X/Y .009, rotation 1.15°, edges 0. |
| CRT | Inserts **after** the loop: Convergence Error R (+2.5,+.35px), G (0,0), B (−2.5,−.35px); Scan Lines density 126/sharpness .85; Glow radius 3.6/intensity 1.15; Barrel .14; Vignette .3. |
| Modulation | Two sine LFOs at .125Hz, second offset .25 cycles; Shape X amount .15, Y amount .10. |

## Reproduction

The portable `author_patch.py` creates four stage patches in a new directory using only Python's standard library. Its settings were checked through the released serializer. It refuses to replace existing files.

```sh
python3 author_patch.py NEW_OUTPUT_DIRECTORY
# Run each stage through the existing native exporter, from the app checkout:
output/afterimage-2026-10-26/tools/hxc-preview/build/afterimage_preview \
  NEW_OUTPUT_DIRECTORY/stage-1.hxc NEW_OUTPUT_DIRECTORY/stage-1.mp4 \
  1200 800 8 output/afterimage-2026-10-26/tools/hxc-preview/source/src/renderer/shaders
# Repeat for stages 2–4.
ffmpeg -i stage-1.mp4 -i stage-2.mp4 -i stage-3.mp4 -i stage-4.mp4 \
  -filter_complex '[0:v][1:v][2:v][3:v]vstack=inputs=4[v]' -map '[v]' \
  -an -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -r 30 \
  -movflags +faststart crt-feedback-v1-desktop.mp4
```

For mobile, scale each input to 720×480 with Lanczos before stacking, and use CRF 26. Extract frame 0 as JPEG (`-q:v 3`) for the stacked poster; crop its fourth pane (`crop=1200:800:0:2400`) for the finished-patch poster. `render_final.py` in the local authoring folder records the exact commands.

Both MP4s decode completely, contain only one H.264/YUV420p video stream, have exactly 240 frames and last 8.000 seconds. Finished-stage seam RGB MAE is 1.49/255, compared with 1.12–1.15/255 for adjacent frames (300×200 analysis). Desktop stack is 1200×3200; mobile is 720×1920. Pane order is Source, Feedback, CRT, Modulation, top to bottom.

| Asset | Bytes | SHA-256 |
| --- | ---: | --- |
| `crt-feedback-study.hxc` | 5,468 | `d2a7deb4bcf4501e6d57853cccc6e2b6d1c63442a83307c0f864e53763538274` |
| `crt-feedback-v1-desktop.mp4` | 722,805 | `a089ba2c5f5bcced8515dd76fe22734d1d384e61f8b1b1c54d463aca50dafb6c` |
| `crt-feedback-v1-mobile.mp4` | 265,353 | `fb9962d512c5611cdbf0dfb709c42180d7adb974c7e6cd170f4e7c7d8b98024a` |
| `crt-feedback-v1-poster.jpg` | 227,379 | `afc9262fb39ee8576c619fda6cca0e4e273d0e7354b39dbd21e8e845b8e9b242` |
| `crt-feedback-v1-final.jpg` | 75,724 | `b4e38a891ca26e9d745286d17cd6781428f3fce7d8f302c907581de6840adbd4` |
