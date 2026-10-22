---
title: "NOISE"
description: "Procedural noise."
---

NOISE generates random grain or spatial noise patterns. Use 3D noise's
`Position Z` to morph a pattern without moving it across the image.

| Parameter | Control | Notes |
|---|---|---|
| `Type` | Selector | `Random`, `Perlin`, `Simplex`, `Sparse Convolution`, `Hermite`, `Harmonic Summation`, `Alligator`. |
| `2D` / `3D` | Selector | Spatial dimensions. Unavailable for `Random`. |
| `Mix` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the noise against the chain. |
| `Seed` | Value field | 0 to 999. `Randomize` chooses another pattern. |
| `Period` | Trough | Spatial frequency, 0.1 to 32. Higher values make smaller noise features. |
| `Position X` / `Position Y` / `Position Z` | Trough | Position within the noise field, -10 to 10. Z is available for 3D noise. |
| `Count` | Selector | Number of detail layers, 1 to 8. Under `Harmonics`, for `Perlin`, `Simplex`, `Harmonic Summation`, and `Alligator`. |
| `Spread` | Trough | Frequency multiplier between detail layers, 1 to 4. Higher values add finer detail. |
| `Gain` | Trough | Strength of each successive detail layer, 0 to 1. Lower values keep the pattern smoother. |
| `Density` | Trough | Impulses per unit area or volume, 1 to 64. `Sparse Convolution` only. |
| `Exponent` | Trough | Contrast curve, 0.1 to 4. Above 1 increases contrast; below 1 reduces it. |
| `Amplitude` / `Offset` | Trough | Strength and brightness offset of the generated noise. |

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
