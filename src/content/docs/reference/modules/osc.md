---
title: "OSC"
description: "The oscillator generator."
---

The oscillator generator. Produces a per-channel waveform, independently
phased, amplitude-scaled, and time-scaled across R, G, and B.

| Parameter | Control | Notes |
|---|---|---|
| Waveform | Selector | Sine, Square, Sawtooth, Triangle, Noise, Custom. |
| Blend | Selector | How the oscillator lands on the chain; see [Blend modes](../../../concepts/signal-chain/#blend-modes). |
| Freq X / Freq Y | Pad | X and Y frequency read as one gesture; a Link ties Y to X's position. |
| Phase R/G/B | Wheel | Ganged, one ring per channel. |
| Amp R/G/B | Trough | Ganged. |
| DC R/G/B | Trough | Ganged; per-channel DC offset. |
| Duty | Trough | 1-99%. Square wave only; ignored for every other waveform. |
| Time R/G/B | Trough | Ganged; per-channel time multiplier. |
| Custom Wave | shared waveform editor | Only used when Waveform is set to Custom. |

With [Perfect loop](../../windows/export-video/#perfect-loop) on, OSC's slow built-in color drift turns a whole
number of times per loop, or holds still when the loop is too short for one
turn (the loop check list says so). `Snap` sets `Rate R/G/B` to whole turns
per loop.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
