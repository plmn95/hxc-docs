---
title: "Edge Detect"
description: "Draws white edges on black from differences in brightness."
---

Draws white edges on black, using differences in brightness between
neighboring pixels. For outlines that retain the original colors and make
the background transparent, use [Edge Key](../../key/edge-key/).

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Sensitivity` | Trough | 0 to 5 | Amplifies edge contrast before the threshold is applied. |
| `Threshold` | Trough | 0 to 1 | Raise it to reject weaker edges. |
