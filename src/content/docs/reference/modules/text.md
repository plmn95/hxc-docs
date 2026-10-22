---
title: "TEXT"
description: "Draw, position, size, and scroll text in the video chain using the TEXT module."
---

TEXT draws a text block that can stay still or scroll repeatedly across the
image. It uses bundled, installed, or custom fonts.

| Parameter | Control | Notes |
|---|---|---|
| `Font` / `Style` | Selector | Font family and face. `Load Custom...` accepts `.ttf`, `.otf`, or `.ttc`; `Refresh List` reloads installed fonts. Missing fonts use the bundled default and display `(missing)`. |
| `B` / `I` / `U` / `S` | Rocker | Bold, italic, underline, strikethrough. `B` and `I` select a matching font face when available and simulate it otherwise; hover a lit control to check. Cannot be modulated. |
| `Opacity` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the text against the chain. |
| `Alignment` | Selector, Trough | `L`, `C`, `R` align lines to the block's left, center, or right. The Trough allows positions between them. |
| `Line Spacing` | Trough | Distance between lines, 0.5 to 3 times the font's line height. |
| `Letter Spacing` | Trough | Extra space between letters, -0.1 to 1 em. Applies on release and cannot be modulated. |
| `Scale X` / `Scale Y` | Pad | Text width and height. `Link X/Y` resizes without stretching; `Flip X` / `Flip Y` mirror the text. |
| `Speed X` / `Speed Y` | Pad | Scroll speed in passes per second (Hz), independent of text length. Positive moves right or up; negative moves left or down. Right-click an axis and choose `Show as Time` for the duration of a pass. |
| `Offset X` / `Offset Y` | Pad | Position within the repeating scroll, wrapping past 1. An LFO or Time assignment can drive custom scrolling motion. |
| `Gap` | Trough | Space before the scrolled text repeats, 0 to 2 screens. |
| `Fill` | Trough | Text color and alpha. |
| `Stroke` | Rocker, Trough | Outline width (0 to 24) and color/alpha. |
| `Emboss` | Rocker, Wheel, Trough | Directional shading at glyph edges, with angle, depth, and strength. |
| `Warp` | Selector, Trough | `None`, `Arc`, `Bulge`, `Flag`, `Wave`, or `Fisheye`, adjusted by `Warp Bend`, `Warp Horizontal`, and `Warp Vertical`. |

An axis repeats only while its `Speed` or `Offset` is nonzero. Still text
does not show repeated copies.

Scrolled text moves through the warp while the warp shape stays in place.
Add a `Mask` Insert FX to confine scrolling text to a strip.

Content, font, and `Letter Spacing` changes can take several frames
to appear. The previous text remains visible during the update.

Enable embedded assets in `Settings > Patches` to include custom
font files in saved patches.

With [Perfect loop](../../windows/export-video/#length-and-loops) on, scrolling starts again at each loop start;
`Snap` sets `Speed` to whole passes per loop.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/),
[Modulation Matrix](../../../concepts/modulation-matrix/).
