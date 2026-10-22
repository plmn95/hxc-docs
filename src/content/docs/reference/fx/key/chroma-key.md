---
title: "Chroma Key"
description: "Makes a chosen color transparent, such as a green or blue background."
---

Makes a chosen color transparent, for example a green or blue background.
Other colors remain unchanged.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Key` | Color picker | | The color to remove. Cannot be modulated. |
| `Tolerance` | Trough | 0 to 1 | Raise it to remove a wider range of colors around `Key`. |
| `Softness` | Trough | 0 to 0.5 | Softens the transition from transparent to opaque. |

Place [Despill](../despill/) after Chroma Key to reduce green or blue color
spill on the remaining subject.
