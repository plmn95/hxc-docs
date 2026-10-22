---
title: "Channel Select"
description: "Displays, isolates, or routes an image channel to transparency."
---

Displays a channel in grayscale, uses it as transparency, or keeps it while
setting the other color channels to zero.

| Parameter | Control | Options | Notes |
|---|---|---|---|
| `Channel` | Selector | `Red`, `Green`, `Blue`, `Alpha` | Cannot be modulated. |
| `Mode` | Selector | `Grayscale View`, `Route To Alpha`, `Isolate Channel` | Cannot be modulated. |

`Grayscale View` preserves the image's existing transparency.
`Route To Alpha` replaces it with the selected channel: black becomes
transparent and white becomes opaque. `Isolate Channel` with `Alpha`
selected produces black while preserving the existing transparency.
