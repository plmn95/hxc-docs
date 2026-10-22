---
title: "SPRITE"
description: "Load images, sprite sheets, video, or GIFs, or draw pixel artwork and arrange repeated sprite instances."
---

SPRITE places an image, sprite sheet, video, GIF, or pixel artwork in the
chain. Display it once or repeat it as a tile grid, fractal, or scatter.

| Parameter | Control | Notes |
|---|---|---|
| `Source` | Selector | `File` or `Pixel Art`, drawn in the built-in editor. |
| `Display Mode` | Selector | `Sprite`, `Tile`, `Fractal`, or `Scatter`. |
| `Opacity` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the sprite against the chain. |
| `Size` | Trough | Size of each tile or instance. Separate from `Scale X` / `Scale Y`, which resize the entire rendered pattern. |
| `Scale X` / `Scale Y` | Pad | Overall horizontal and vertical scale. |
| `Mode` under `Alpha` | Selector | `Per-Pixel` uses the file's alpha. `Threshold` and `Blend` use `Alpha Amount` to cut or scale visibility. |
| `Tint R` / `Tint G` / `Tint B` / `Tint Amount` | Trough | At amount 0 the source keeps its color; at 1 it uses the tint color. |
| `Grid N` / `Count` | Trough | Grid size in `Tile`, or number of instances in `Scatter`. |
| `Depth` / `Scale Falloff` | Trough | Repetition depth and scale reduction in `Fractal`. |
| `Sheet Animation` | Selector | `Off`, `Forward`, `Ping-Pong`, or `Random`. Plays cells from a sprite sheet independently of `Display Mode`. |
| `Cols` / `Rows` / `Frames` / `FPS` | Trough | Sheet layout and animation speed. `Frames` 0 uses all cells. |
| `Loop` / `Speed` | Rocker, Trough | Video or GIF file playback. `Speed` runs 0 to 4.0x, forward only. |

With nothing loaded, SPRITE leaves the chain unchanged in every `Blend` mode.

With [Perfect loop](../../windows/export-video/#length-and-loops) on, sheet animation and pixel art play on the
loop's own clock and start again with each loop, and so does a clip in an
export. Right-click the sheet's FPS to show how long each frame lasts
instead. `Snap` sets the sheet's `FPS`, or file `Speed`, so they run whole passes per
loop. Speed is saved with the patch.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
