---
title: "Reading the Panel"
description: "Control names and interface colors in Hex Composer."
---

| Control  | Meaning                              |
| -------- | ------------------------------------ |
| Knob     | A bounded rotary control             |
| Fader    | A bounded linear control             |
| Wheel    | A continuous rotary control          |
| Plane    | 2-parameter X/Y control              |
| Toggle   | 2-state switch; on/off, enable, etc. |
| Selector | A list of discrete items             |
| Lamp     | A status indicator                   |
| Meter    | A level display                      |
| Screen   | A signal preview or output           |

Green marks signal choices and actions, such as a waveform or `+ Add`.
Orange marks state and selection, such as an armed Learn mode, the active
tab, or a modulated value.

## Time vs. Rate

Temporal controls can use units of either rate or time. A higher rate is faster, but a greater duration is slower. By default, these controls will use Hz, or cycles per second. Toggle between rate and time for any temporal control via the right-click option, `show as time. Units of seconds (s`) or milliseconds (`ms`) can be used for time by appending s or ms to a manually-entered value. Seconds are used if no time unit is specified.

## Line Coding

Control ranges can be either unipolar or bipolar. In a unipolar range, 0 is the minimum value, and all other values in the range are positive, like a volume knob. In a bipolar signal, 0 is neutral, and the range extends in both positive and negative domains, like a stereo panning fader.

