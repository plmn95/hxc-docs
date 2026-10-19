---
title: "Palette Map"
description: "Repaints the picture using only the colors in an editable palette: each pixel takes the nearest palette color, or the palette runs from dark to light as a gradient map."
---

Repaints the picture using only the colors in an editable palette. In Nearest Color mode each pixel takes the palette color nearest to its own. In Brightness mode the palette runs from dark to light, so it works as a gradient map or a duotone.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| Map by | Selector | Nearest Color, Brightness | Nearest Color snaps each pixel to the closest palette color. Brightness lays the palette from black to white in swatch order: the first color replaces black and the last replaces white. Can be modulated; it switches halfway. |
| Preset | Selector | 8 presets | Game Boy, 1-Bit B/W, CGA, EGA 16, C64 16, Pico-8 16, Amber Phosphor and Green Phosphor. Choosing one replaces the palette. The selector reads Custom once a color has been edited, added or removed. |
| Palette | color swatches | 2 to 32 colors | Click a swatch to select it, then edit it with the color row beneath. `+ Color` adds a copy of the selected color after it, and `- Color` removes the selected color. Cannot be modulated. |
| Smoothness | Trough | 0 to 1 | Brightness mode only, grayed out in Nearest Color. At 0 each color gets an equal hard band; at 1 neighboring colors blend into a smooth gradient. Values between soften the band edges. |
| Cycle | Trough | 0 to 31 | Shifts which palette color each pixel uses, wrapping around the end of the palette. Sweeping it gives color cycling. In Nearest Color it moves in whole colors; in Brightness it slides the gradient smoothly. |

A new Palette Map starts with the Game Boy palette, in Nearest Color mode.

Transparency is unchanged.

## Gradient maps and duotones

1. Set `Map by` to Brightness.
2. Use `- Color` until two colors remain. Set the first to the color for the shadows (cyan, say) and the second to the color for the highlights (magenta).
3. With Smoothness at 1, every shade falls on the blend between the two: darker parts are more cyan, lighter parts more magenta.

Turn Smoothness down to 0 for a hard two-tone split at mid-gray. To move the split, or to stretch the gradient, place [Contrast](../../grade/contrast/) or [Channel Curves](../../grade/channel-curves/) before Palette Map. Setting Cycle to 1 swaps the two ends. More colors make a gradient with more stops.

For dithering in the palette's colors, place [Dither](../dither/) before Palette Map and set `Quantize To` to Spread Only. Dither's `Add Palette Map after` button inserts the second effect.

Related: [Posterize](../posterize/), [Insert FX Chains](../../../../concepts/insert-fx-chains/).
