---
title: "Channel Curves"
description: "Shape red, green, blue, and luma tone curves with movable control points and Bezier handles."
---

Reshapes red, green, blue, and brightness with editable curves. The
horizontal axis is input level; the vertical axis is output level. A
straight diagonal preserves the original levels.

| Control | Use |
|---|---|
| `Edit channel` | Choose `Red`, `Green`, `Blue`, or `Luma` to focus its curve. Other active curves remain dimmed and can still be dragged unless hidden with `S`. |
| Eye control beside a channel | Apply or stop applying that curve. Its points are preserved while inactive. |
| `S` beside a channel | Keeps that curve and the focused curve visible in the graph. Other active curves still affect the image. |
| Curve graph | Click the curve to add a point. Drag points or their Bezier handles to reshape the curve. Input and output levels each run from 0 to 1. |
| `Remove point` | Removes the selected point. `Delete` or `Backspace` also works while the graph's window has focus. The first and last points cannot be removed. |

Double-click a point, or use `Alt+click` (`Option+click` on macOS), to
flatten its handles. Hold `Shift` while dragging for finer adjustment.

The red, green, and blue curves run independently first. The `Luma` curve
then adjusts their combined brightness while preserving their proportions.
Curve points and handles cannot be modulated.

Related: [Channel Attenuverter](../channel-attenuverter/).
