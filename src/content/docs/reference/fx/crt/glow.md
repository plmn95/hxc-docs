---
title: "Glow"
description: "Spreads light around the picture or its brightest parts."
---

`Bloom` spreads the brightest parts of the picture into a soft halo. Increase
`Threshold` to keep darker areas from contributing; `Softness` makes that
boundary gradual. `Classic` spreads the whole picture, including dark areas.

| Parameter | Control | Range | Notes |
| --- | --- | --- | --- |
| `Mode` | Selector | Classic, Bloom | New slots start in Bloom. |
| `Intensity` | Trough | 0 to 4 | Strength of the added light. 0 leaves the picture unchanged. |
| `Radius` | Trough | 1 to 16 | Classic only. |
| `Size` | Trough | 0 to 10% | Bloom only. Relative to the picture's shorter side. |
| `Threshold` | Trough | 0 to 1 | Bloom only. Brightness at which light begins to spread. |
| `Softness` | Trough | 0 to 1 | Bloom only. 0 gives a hard threshold. |

Bloom extends the visible area around transparent pictures, including sprites
and text. Fully transparent colors do not contribute to the halo.
