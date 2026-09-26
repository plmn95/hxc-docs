---
title: "SOURCE"
description: "Brings external video into the chain, from a file, a live capture device, or another program's NDI/Spout/Syphon output."
---

Brings external video into the chain, from a file, a live capture device, or
another program's NDI/Spout/Syphon output.

| Parameter | Control | Notes |
|---|---|---|
| Input | Selector | Video File, Camera / Capture, NDI In, Spout In (Windows only), Syphon In (macOS only). |
| Fit Mode | Selector | How the incoming frame's aspect ratio maps onto the canvas, for every Input kind. Fit letterboxes or pillarboxes with no crop. Crop fills the canvas and crops the overflow. Stretch distorts aspect to fill exactly. Native centers the frame at its exact original pixel size with no scaling. |
| File / Device | file picker, text field | Meaning depends on Input: a file path for Video File, an OS capture handle for Camera / Capture, or a sender/server name to connect to for NDI/Spout/Syphon In. |
| Loop | Rocker | File input only. |
| Speed | Trough | 0 to 4.0x. At 0 the value field reads `Pause`. Playback is forward only; there is no reverse. |
| Blend | Selector | How the source lands on the chain; see [Blend modes](../../../concepts/signal-chain/#blend-modes). |
| Mix | Trough | Wet/dry of the source against what's beneath it. |

**NOTE:** with nothing loaded, the module adds nothing and the chain passes
through unchanged in every `Blend` mode.

NDI In needs the free NDI Runtime, the same one NDI output uses. See
[Output and Recording](../../../concepts/output-and-recording/) for where to
get it.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
