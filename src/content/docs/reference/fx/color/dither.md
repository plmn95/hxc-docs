---
title: "Dither"
description: "Breaks reduced-color gradients into a pattern instead of plain bands."
---

Breaks reduced-color gradients into a pattern instead of plain bands.

| Parameter | Control | Range / Options | Notes |
|---|---|---|---|
| `Algorithm` | Selector | See below | Cannot be modulated. |
| `Quantize To` | Selector | `Color Levels`, `Gray Levels`, `Spread Only` | `Color Levels` reduces each RGB channel to `Levels` shades. `Gray Levels` converts to gray first. `Spread Only` adds the pattern without reducing shades. Cannot be modulated. |
| `Levels` | Trough | 2 to 32 | Shades per channel. In `Spread Only`, sets the pattern's spread; match it to the number of tones in the following palette. |
| `Strength` | Trough | 0 to 1 | 0 gives plain banding; 1 gives the full pattern. |
| `Cell Size` | Trough | 1 to 32 px | Samples the image once per cell. Larger cells reduce detail. |
| `Angle` | Wheel | -180 to 180 degrees | `Halftone Dots` starts at 45 degrees; this rotates it from there. |
| `Animate` | Trough | 0 to 30 Hz | Pattern changes per second. 0 keeps it still. Right-click to show the time between changes. |
| `Bias` | Trough | -0.5 to 0.5 | Makes the image darker or lighter before quantization. |

## Algorithms

| Group | Algorithm | Pattern |
|---|---|---|
| `Ordered` | `Bayer 2x2`, `Bayer 4x4`, `Bayer 8x8`, `Bayer 16x16` | Regular grids. Larger grids produce smoother gradients. |
| `Ordered` | `Bayer + Noise` | A Bayer 8x8 grid mixed with blue noise to break up grid lines. |
| `Noise` | `Blue Noise` | Even noise without a visible grid. |
| `Noise` | `Gradient Noise` | Structured diagonal noise. |
| `Noise` | `White Noise` | Random speckle. |
| `Screen` | `Halftone Dots` | Dots that grow with brightness. |
| `Screen` | `Clustered Dot` | A fixed 8 by 8 dot pattern. |
| `Screen` | `Line Screen` | Parallel lines that thicken with brightness. |
| `Screen` | `Cross-Hatch` | Crossing lines that thicken with brightness. |
| `Diffusion` | `Floyd-Steinberg Look`, `Atkinson Look` | Approximate error diffusion. `Atkinson Look` also compresses the brightest and darkest areas. |

The pattern stays fixed to the output frame while moving content slides
underneath it. Transparency is unchanged.

Diffusion algorithms are the most expensive at `Cell Size` 1. Increase the
cell size to reduce their cost. In `Spread Only`, they use `Blue Noise`
instead.

To dither with a specific palette, set `Quantize To` to `Spread Only` and
place [Palette Map](../palette-map/) later in the same chain.

With [Perfect loop](../../../windows/export-video/#length-and-loops) enabled,
`Animate` uses the loop's clock. `Snap` sets a whole number of changes per
loop.

Related: [Posterize](../posterize/).
