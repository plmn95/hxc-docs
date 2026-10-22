---
title: "Palette Map"
description: "Maps image colors to a palette by nearest color or brightness, with optional gradients."
---

Maps image colors to an editable palette, either by nearest color or by
brightness. Brightness mapping can blend between palette colors to form a
gradient.

| Parameter | Control | Range / Options | Notes |
|---|---|---|---|
| `Map by` | Selector | `Nearest Color`, `Brightness` | `Nearest Color` chooses the closest palette color. `Brightness` maps black to the first swatch and white to the last, with other shades between. Modulation selects `Brightness` at 0.5 or higher. |
| `Preset` | Selector | See below | Replaces the palette. Shows `Custom` when the colors do not match a preset. |
| Palette swatches | Color picker | 2 to 32 colors | Select a swatch and edit it with the color row below. `+ Color` copies the selected color after it; `- Color` removes it. Palette colors cannot be modulated. |
| `Smoothness` | Trough | 0 to 1 | `Brightness` only. 0 gives equal hard bands; 1 blends neighboring colors into a gradient. |
| `Cycle` | Trough | 0 to 31 | Shifts the palette, wrapping around its end. `Nearest Color` moves in whole colors; `Brightness` slides smoothly. |

Presets are `Game Boy`, `1-Bit B/W`, `CGA`, `EGA 16`, `C64 16`, `Pico-8 16`,
`Amber Phosphor`, and `Green Phosphor`. New slots start with `Game Boy` and
`Nearest Color`. Transparency is unchanged.

## Two-color gradient

Set `Map by` to `Brightness` and use `- Color` until two swatches remain.
Set the first to the shadow color and the second to the highlight color,
then set `Smoothness` to 1.

Set `Smoothness` to 0 for a hard split at mid-gray. To move the split or
reshape the gradient, place [Contrast](../../grade/contrast/) or
[Channel Curves](../../grade/channel-curves/) before Palette Map. With two
colors, `Cycle` at 1 swaps their roles.

For palette dithering, place [Dither](../dither/) before Palette Map and set
its `Quantize To` to `Spread Only`. Dither's `Add Palette Map after` button
inserts Palette Map in the next slot.
