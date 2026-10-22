---
title: "Transform"
description: "Offsets, scales, and rotates the whole image."
---

Offsets, scales, and rotates the whole image around its center.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Offset X` / `Offset Y` | Pad | -1 to 1 | 0 centers the image. |
| `Scale X` / `Scale Y` | Pad | -0.9 to 3 | 0 preserves the original size. Positive values enlarge it; negative values shrink it. The Pad covers this range; typed values can exceed it. |
| `Link X/Y` | Rocker | | Makes the Y scale follow X. Cannot be modulated. |
| `Flip X` / `Flip Y` | Rockers | | Mirrors the image on the selected axis. Cannot be modulated. |
| `Rotate` | Wheel | -180 to 180 degrees | |

When a transform exposes space outside the image, edge pixels extend into
that space.
