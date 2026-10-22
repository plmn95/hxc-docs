---
title: "Channel Attenuverter"
description: "Dims or inverts red, green, and blue independently."
---

Adjusts red, green, and blue independently. Positive values dim the
original channel; negative values dim an inverted copy of it.

| Parameter | Control | Range |
|---|---|---|
| `R` / `G` / `B` | Ganged Troughs | -1 to 1 |

For each channel, 1 preserves its value, 0 makes it black, and -1 fully
inverts it.
