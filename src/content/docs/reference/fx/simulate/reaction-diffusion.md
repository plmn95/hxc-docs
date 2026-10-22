---
title: "Reaction-Diffusion"
description: "Grows patterns steered by the image, from moving waves to spots and winding stripes."
---

Grows moving patterns steered by the image. Use the `Calm` / `Fill` Pad to
move between waves, spots, and winding stripes.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Look` | Selector | `Pattern`, `Picture` | `Pattern` shows a black-and-white pattern with the image's transparency. `Picture` shows the image through the pattern. Changing the look restarts it. Cannot be modulated. |
| `Size` | Selector | `Large`, `Small` | `Small` produces finer shapes and costs more to render. Changing size restarts the pattern. Cannot be modulated. |
| `Calm` / `Fill` | Pad | 0 to 1 each | `Calm` runs left to right from restless waves to still shapes. `Fill` runs bottom to top from scattered spots to packed stripes and holes. The name below the Pad follows its current position, including modulation. |
| `Follow` | Trough | 0 to 1 | How strongly the image steers the pattern. Dark areas grow spots; bright areas grow stripes or holes. |
| `Motion` | Trough | 0 to 2 | How strongly movement in the image plants new pattern. |
| `Speed` | Trough | 0 to 2 | 0 freezes the pattern. |
| `Sharpness` | Trough | 0 to 1 | Soft glowing edges at 0; crisp edges at 1. |
| `Reset` | Button and Lamp | | Restarts from bright areas of the current image and scattered seeds. See [Reset with modulation](../#reset-with-modulation). |

## Pad regions

| Region | Position | Pattern |
|---|---|---|
| `Waves` | Left edge | Moving fronts. |
| `Spots` | Bottom, left of center | Separate round dots. |
| `Worms` | Bottom, right side | Short winding lines. |
| `Mazes` | Middle and right | Long winding stripes. |
| `Holes` | Top, left of center | A packed field with round holes. |

The pattern changes gradually across the Pad. Sparse and spotty regions
keep planting new spots rather than settling completely.

To color the pattern, set `Look` to `Pattern` and place a
[Palette Map](../../color/palette-map/) after Reaction-Diffusion.

`Large` runs at a quarter of the output resolution; `Small` runs at half.
`Small` with `Speed` at 2 is the most expensive setting.

[Perfect loop](../../../windows/export-video/#length-and-loops) does not reset
the pattern at the join. Use
[Video crossfade](../../../windows/export-video/#crossfades) to blend the end into
the start.
