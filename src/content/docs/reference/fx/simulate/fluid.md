---
title: "Fluid"
description: "Smears or bends the image with a flow driven by movement and edges."
---

Smears or bends the image with a flow. Movement pushes the fluid, while
edges stir it even in a still image.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Look` | Selector | `Smear`, `Warp` | `Smear` carries and mixes the image's colors. `Warp` bends the live image. Changing the look restarts the fluid. Cannot be modulated. |
| `Motion` | Trough | 0 to 4 | How strongly movement in the image pushes the fluid. A still image gives no push. |
| `Swirl` | Trough | 0 to 2 | How strongly edges stir the fluid. A flat image with no edges gives no swirl. |
| `Eddies` | Trough | 0 to 4 | Keeps small whirls spinning. 0 gives broader flow. |
| `Speed` | Trough | 0 to 3 | 0 freezes the fluid. |
| `Settle` | Trough | 0 to 1 | How quickly the flow comes to rest. |
| `Recover` | Trough | 0 to 1 | How quickly the live image returns. Low values leave long smears in `Smear` and longer distortion in `Warp`. |
| `Reset` | Button and Lamp | | Clears the flow and restarts from the current image. See [Reset with modulation](../#reset-with-modulation). |

Fluid runs at a quarter of the output resolution. Below 20 frames per
second, the flow slows down.

[Perfect loop](../../../windows/export-video/#length-and-loops) does not reset
the fluid at the join. Use
[Video crossfade](../../../windows/export-video/#crossfades) to blend the end into
the start.
