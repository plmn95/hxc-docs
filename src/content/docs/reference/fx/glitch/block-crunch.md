---
title: "Block Crunch"
description: "Breaks the image into codec-style blocks that slide, repeat, flatten into a few colors and lose their color."
---

Breaks the image into blocks like damaged digital video. A share of the
blocks break: they slide or copy the block beside them, flatten into a few
colors, and let their color slip out in larger blocks. The pattern changes
`Rate` times a second. Blocks that don't break are left exactly as they
are.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Amount` | Trough | 0 to 1 | How many of the blocks break. 0 leaves the image unchanged. Default 0.3. |
| `Blocks` | Selector | 8 px, 16 px, 32 px | Size of the blocks. Can be modulated. Default 16 px. |
| `Shift` | Trough | 0 to 8 | How far broken blocks slide, in blocks. Default 1. |
| `Repeat` | Trough | 0 to 1 | How many broken blocks copy the block to their left or above instead of sliding. Default 0.25. |
| `Crush` | Trough | 0 to 1 | Flattens broken blocks toward their own average color and down to a few shades. 0 leaves their colors alone. Default 0.5. |
| `Chroma` | Trough | 0 to 1 | Color slips out of broken blocks in larger blocks of its own. Default 0.3. |
| `Rate` | Trough | 0 to 30 Hz | How many times per second the broken blocks change. 0 keeps them still. Can be shown as the time one change takes. Default 4 Hz. |

Two Block Crunch effects break different blocks, even with the same
settings. See-through parts of the image move with their blocks.

## Perfect loops

With [Perfect loop](../../../windows/export-video/#length-and-loops) on, the
pattern follows the loop clock, so it repeats every loop when `Rate` fits a
whole number of changes into it. The loop check offers Snap when it does
not.

## Recipes

- **Broken stream.** `Amount` around 0.15, `Shift` 2, `Crush` 0.7 and
  `Rate` around 8 Hz for a feed that keeps glitching.
- **Hits on the beat.** Route an Envelope triggered by the kick to `Amount`,
  so blocks break on each hit and the picture clears in between.
- **Smeared crunch.** Put Block Crunch before [Datamosh](../datamosh/) in the
  same chain: the broken blocks get dragged along with the movement.

Related: [Insert FX Chains](../../../../concepts/insert-fx-chains/),
[Datamosh](../datamosh/).
