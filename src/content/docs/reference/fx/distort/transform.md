---
title: "Transform"
description: "Offsets, scales, flips and rotates the whole image, and sets what fills the frame around it."
---

Offsets, scales, flips and rotates the whole image around its center.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Offset X` / `Offset Y` | Pad | -1 to 1 | 0 centers the image. |
| `Scale X` / `Scale Y` | Pad | -0.9 to 3 | 0 preserves the original size. Positive values enlarge it; negative values shrink it. The Pad covers this range; typed values can exceed it. |
| `Link X/Y` | Rocker | | Makes the Y scale follow X. Cannot be modulated. |
| `Flip X` / `Flip Y` | Rockers | | Mirrors the image on the selected axis. Cannot be modulated. |
| `Rotate` | Wheel | -180 to 180 degrees | |
| `Edges` | Selector | Extend, Empty, Mirror, Tile | What fills the frame where the moved, shrunk or turned image doesn't reach. Extend stretches the outermost pixels outward into bands. Empty leaves it see-through. Mirror fills it with reflected copies and Tile with repeated copies. Default Extend. Can be modulated. |

## Edges

Empty only shows a layer underneath when Transform sits in a generator's own Insert FX, such as a `SOURCE`'s: the shrunk picture then enters the chain with see-through surroundings. In an `INSERT`, `SCOPE` or `FEEDBACK` Insert FX the area becomes empty for the rest of the chain, which the `Output` window shows as black. See [Empty areas](../../../../concepts/signal-chain/#empty-areas).

As a `FEEDBACK` `Pre` insert, Transform runs on every lap. Extend keeps stretching the edge outward, so streaks build up. Empty clears the surround every lap, which turns a slow zoom out into a tunnel with a clean border. Mirror and Tile repeat the shrinking loop inside itself and fill the whole frame.

To frame a shrunk picture with a border instead, place a [Vignette](../../crt/vignette/#borders) set to a sharp Rectangle before Transform.
