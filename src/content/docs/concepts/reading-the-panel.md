---
title: "Reading the Panel"
description: "Control names and interface colors in Hex Composer."
---

| Control | Meaning |
|---|---|
| Knob | A prominent numeric control for performance. |
| Trough | A numeric value with a minimum and maximum. |
| Wheel | A numeric value that wraps, such as phase or angle. |
| Pad | Two values controlled together, such as X and Y. |
| Rocker | A binary state. |
| Selector | A choice from a fixed set of values. |
| Lamp | A status indicator. |
| Meter | A level display. |
| Screen | A signal preview or output. |

Green marks signal choices and actions, such as a waveform or `+ Add`.
Orange marks state and selection, such as an armed Learn mode, the active
tab, or a modulated value.

## Speeds

A speed normally shows cycles per second in Hz, such as an LFO's `Rate`,
OSC's `Rate R/G/B`, or TEXT's scroll `Speed`. Sprite-sheet `FPS` shows
frames per second. Right-click a speed and choose
`Show as Time` to read it as the time one cycle takes instead, such as
`8.00 s` or `125 ms`. `Still` means the speed is 0; negative values run
backwards. Each speed keeps its own display choice, saved with the patch.
Dragging right or up increases the rate in either display mode.

Speed controls give slow values more travel, making cycles of several
seconds easier to adjust by dragging.

Type a speed with a unit, whichever way it is shown: `500ms`, `8s`, `2min`,
or `0.5Hz`. In `Show as Time`, a number without a unit is read as seconds;
`0` means `Still`. Hover a speed to see its other reading, for example
`One cycle every 6.28 s.`

