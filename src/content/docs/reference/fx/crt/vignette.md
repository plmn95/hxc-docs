---
title: "Vignette"
description: "Darkens the image toward its edges as an oval or a rectangle, from a soft falloff to a sharp border."
---

Darkens the image toward its edges, as an oval that follows the frame or as a rectangle. Soft, it is a classic vignette; sharp, it draws a border.

| Parameter | Control | Range | Notes |
| --- | --- | --- | --- |
| `Shape` | Selector | Oval, Rectangle | Oval follows the frame's shape. Rectangle keeps the same distance from every edge. Can be modulated; it switches halfway. |
| `Amount` | Trough | 0 to 1 | How dark it gets at the shape's edge. Past the edge it keeps darkening to black. |
| `Size` | Trough | 0 to 1.5 | Where the shape's edge sits. At 1 it touches the frame (an Oval touches the middle of each side). Lower values pull it in. |
| `Softness` | Trough | 0 to 1 | How gradually it darkens. At 1 the fade starts at the center; at 0 the edge is sharp. |
| `Roundness` | Trough | 0 to 1 | Rectangle only, grayed out for Oval. Rounds the corners; at 1 the short sides are half circles. |

A new Vignette starts as the classic oval: Oval, Amount 0.42, Size 1, Softness 1. Patches made before Shape existed look exactly as before.

Transparency is unchanged.

## Borders

1. Set `Shape` to Rectangle and `Softness` to 0.
2. Set `Size` just below 1, for example 0.97. The border is the same width in pixels on every side, and stays in proportion at any output size.
3. Turn up `Roundness` for rounded corners.

With `Softness` at 0 the border is black for any `Amount` above 0.

### Border around a shrunk picture

When [Transform](../../distort/transform/) shrinks a picture, its default Edges setting stretches the outermost pixels out to the frame as bands. Place this border Vignette before Transform in the same Insert FX chain: the border shrinks with the picture, and the bands stretched from it are black. Placed after Transform, the border sits on the frame's edge instead. To get rid of the bands without a border, set Transform's `Edges` to Empty.

Related: [Insert FX Chains](../../../../concepts/insert-fx-chains/).
