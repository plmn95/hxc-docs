---
title: "Grain"
description: "Adds monochrome or colored grain, with additive and multiplicative modes."
---

`Add` places grain over the picture, including its dark parts. `Multiply`
varies the picture's light, so black stays black. `Color` moves from monochrome
grain to separate red, green and blue patterns. `Classic` uses a monochrome
pattern with Amount as its only grain control.

| Parameter | Control | Range | Notes |
| --- | --- | --- | --- |
| `Mode` | Selector | Classic, Add, Multiply | New slots start in Add. |
| `Amount` | Trough | 0 to 1 | 0 leaves the picture unchanged. |
| `Color` | Trough | 0 to 1 | 0 is monochrome; 1 uses independent RGB patterns. |
| `Size` | Trough | 0.5 to 8 px | Size of the grain pattern. |
| `Rate` | Trough | 0 to 60 Hz | Changes per second. 0 holds a still pattern. |
| `Seed` | Trough | 0 to 65535 | Under `Advanced`. Chooses the pattern. |

`Color`, `Size`, `Rate` and `Seed` apply to Add and Multiply. Grain preserves
the picture's transparency.

A fresh Grain slot receives a different seed from other Grain slots. Copying
a slot preserves its seed, so the copy has the same pattern at the same time.

For a Perfect loop, use the loop check's `Snap` action to fit a whole number
of grain changes into the loop. Modulating Rate or Seed can prevent an exact
repeat unless the modulation also repeats.
