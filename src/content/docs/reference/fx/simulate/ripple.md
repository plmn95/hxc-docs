---
title: "Ripple"
description: "Bends the image through waves driven by motion and random raindrops."
---

Bends the image through moving water. Changes in the image and random
raindrops make waves that travel outward and bounce off the frame's edges.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Motion` | Trough | 0 to 4 | How strongly changes in the image disturb the water. Small changes, such as camera noise, are ignored. |
| `Rain` | Trough | 0 to 20 /s | Random drops per second. Works with a still image. |
| `Drop Size` | Trough | 0 to 1 | Larger drops make broader waves; smaller drops make fine rings. |
| `Speed` | Trough | 0 to 2 | 0 freezes the water and stops new ripples. |
| `Settle` | Trough | 0 to 1 | How quickly the waves die away. |
| `Refract` | Trough | 0 to 1 | How strongly waves bend the image. At 0, only the shine remains. |
| `Shine` | Trough | 0 to 1 | Light on wave crests facing the upper left. |
| `Reset` | Button and Lamp | | Flattens the water. See [Reset with modulation](../#reset-with-modulation). |

Clear lines and edges make the bending easier to see. On a soft, even
image, increase `Shine` to see the waves.

Ripple runs at a third of the output resolution. Below 30 frames per
second, the waves slow down.

In a [Perfect loop](../../../windows/export-video/#length-and-loops) export,
Ripple warms up for one loop. `Rain` repeats its timing each loop. Use
[Video crossfade](../../../windows/export-video/#crossfades) to blend any remaining
difference between the end and start.
