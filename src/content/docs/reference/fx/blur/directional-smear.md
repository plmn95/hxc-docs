---
title: "Directional Smear"
description: "Pulls the picture into a soft trail along an angle."
---

Directional Smear pulls the picture into a trail in one direction. It works
on the current picture, so a still image smears too. `Falloff` controls how
quickly the trail fades; `Spread` softens it across its width.

| Parameter | Control | Range | Notes |
| --- | --- | --- | --- |
| `Length` | Trough | 0 to 100% | Relative to the picture's shorter side. 0 leaves it unchanged. |
| `Angle` | Wheel | -180 to 180 degrees | 0 trails right; 90 trails upward. |
| `Spread` | Trough | 0 to 1 | 0 keeps the trail narrow. |
| `Falloff` | Trough | 0 to 1 | Higher values fade the trail more quickly. |
| `Edges` | Selector | Extend, Empty, Mirror, Tile | What the smear reads beyond the picture's edges. |

`Empty` leaves the area beyond the picture transparent. `Extend` holds the
outermost pixels, `Mirror` reflects the picture, and `Tile` repeats it.

Directional Smear can slow live playback at high output resolutions. Lower
the output resolution or set `Spread` to 0 to reduce its cost. Shortening
`Length` while it remains above 0 still has a similar cost.

For an evenly spread streak centered on the original picture, use
[Motion Blur](../motion-blur/).
