---
title: "Mask"
description: "Cuts the image to a soft-edged circle, making areas outside it transparent."
---

Cuts the image to a soft-edged circle, making areas outside it transparent.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Center X` / `Center Y` | Pad | -0.5 to 0.5 | |
| `Radius` | Trough | 0 to 1.5 | |
| `Feather` | Trough | 0 to 0.5 | Softness of the circle's edge. |

To limit an effect to a circle while keeping the image outside it, use
[Region](../../../insert-fx-region/) instead.
