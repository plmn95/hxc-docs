---
title: "Region"
description: "Limits effects to soft-edged circles that can merge across slots."
---

Limits an Insert FX slot to a soft-edged circle. Outside the circle, the
image continues through the chain without that effect. Nearby circles from
different slots can merge.

Expand `Region` within a slot to find these controls. A slot set to `NONE`
has no Region controls.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Enable Region` | Rocker | | Off by default. |
| `Region Center X` / `Region Center Y` | Pad | -0.5 to 0.5 | |
| `Region Radius` | Trough | 0 to 1.5 | |
| `Region Feather` | Trough | 0 to 0.5 | Softness of the circle's edge. |
| `Region Fusion` | Trough | 0.001 to 0.5 | Higher values merge nearby circles from farther apart. |

All active slots with Region enabled form one group at the position of the
first of those slots. Each effect in the group reads the same incoming
image. Effects without Region run before or after the group, even if their
slots sit between its members in the list. In FEEDBACK, `PRE` and `POST`
form separate groups.

[Mask](../fx/filter/mask/) instead cuts the image to one circle, making
areas outside it transparent. See [Insert FX Chains](../../concepts/insert-fx-chains/)
for slot order and controls.
