---
title: "SHAPE"
description: "Draw geometric shapes, repeated levels, fills, and outlines."
---

SHAPE draws a filled or outlined geometric shape. `Depth` repeats smaller
copies with their own scale, rotation, and offset.

| Parameter | Control | Notes |
|---|---|---|
| `Primitive` | Selector | `Circle`, `Square`, `Triangle`, `Star`, `Polygon`, `Superellipse`, `Lissajous`, `Spirograph`. |
| `Mix` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the shape against the chain. |
| `Poly N` | Trough | Number of polygon sides. |
| `Depth` | Trough | Number of repeated shape levels, 1 to 8, under `IFS`. |
| `Size` | Trough | Overall scale, 0.01 to 2. |
| `Offset X` / `Offset Y` | Pad | Offset of successive levels. |
| `Scale/Lvl` / `Rot/Lvl` | Trough, Wheel | Scale and rotation applied at each level when `Depth` exceeds 1. |
| `Color R` / `Color G` / `Color B` / `Opacity` | Trough | Fill color and opacity, independent of the outline. |
| `Edge` | Trough | Edge softness. Low values give a crisp edge; high values soften it. |
| `Exponent` | Trough | Curvature of the `Superellipse` primitive. |
| `Freq X` / `Freq Y` / `Phase` / `Damping` | Pad, Wheel, Trough | `Lissajous` curve controls. X and Y set the frequency ratio; `Phase` shifts one axis relative to the other. |
| `Spiro R` / `Spiro r` / `Spiro d` | Trough | `Spirograph` curve controls. |
| `Mode` under `Outline` | Selector | `Off`, `Outline Only`, or `Fill + Outline`. Outline color, `Opacity`, and `Width` are independent of the fill. |
| `Outline Style` | Selector | `Union (merged silhouette)` outlines the combined shape. `Per-Instance (each IFS copy)` outlines each repeated copy. Available when an outline is active. |

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
