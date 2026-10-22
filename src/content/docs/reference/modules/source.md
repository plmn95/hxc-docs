---
title: "SOURCE"
description: "Brings external video into the chain, from a file, a live capture device, or another program's NDI/Spout/Syphon output."
---

SOURCE brings a video file, camera, capture device, or another program's
NDI, Spout, or Syphon output into the chain.

| Parameter | Control | Notes |
|---|---|---|
| Source kind | Selector | `Video File`, `Camera / Capture`, `NDI In`, `Spout In` (Windows), or `Syphon In` (macOS). |
| Fit mode | Selector | `Fit` preserves the aspect ratio with borders. `Crop` fills the canvas and crops the overflow. `Stretch` fills the canvas by changing the aspect ratio. `Native` centers the frame at its original pixel size. Applies to every source kind. |
| `Open Video..` | File picker | Available for `Video File`. Other source kinds show device or sender connection controls instead. |
| `Loop` | Rocker | Repeats video file playback. |
| `Speed` | Trough | 0 to 4.0x, forward only. At 0 the value field reads `Pause`. |
| `Opacity` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the source against the chain. |

With nothing loaded, SOURCE leaves the chain unchanged in every `Blend` mode.

`NDI In` needs the free NDI Runtime, the same one NDI output uses. See
[Output and Recording](../../../concepts/output-and-recording/) for installation
instructions.

With [Perfect loop](../../windows/export-video/#length-and-loops) on, an exported clip plays on the loop's own
clock and starts again with each loop; `Snap` sets `Speed` so the clip runs
whole passes per loop. A camera or NDI, Spout or Syphon input shows a still
picture in an export. `Speed` is saved with the patch.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
