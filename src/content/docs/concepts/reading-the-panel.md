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

Green marks signal choices and actions, such as a waveform or `Add`.
Orange marks state and selection, such as an armed Learn mode, the active
tab, or a modulated value.

## Speeds

A speed, such as an LFO's Rate, OSC's Rate R/G/B or Text's scroll Speed,
reads as a rate: how many cycles happen each second, in Hz (a sprite
sheet's FPS reads in frames per second). Right-click it and choose
`Show as Time` to read it as the time one cycle takes instead, such as
`8.00 s` or `125 ms`. `Still` means the speed is 0, and a negative time
runs backwards. Each speed keeps its own choice, saved with the patch.
Dragging works the same either way: right, or up, is faster.

Speed controls give slow values most of their travel, so a cycle of several
seconds sits well inside the control rather than at its very start.

Type a speed in any unit, whichever way it is shown: `500ms`, `8s`, `2min`
or `0.5Hz`. A plain number is read in the unit the field shows, and `0` is
Still. Hover a speed to see its other reading, for example `One cycle every
6.28 s.`

