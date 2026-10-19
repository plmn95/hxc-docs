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
| Rate R/G/B | Trough | Ganged, under Cycle Rate. How fast each channel's wave moves, in cycles per second (Hz); negative runs it backwards. Right-click a lane to show it as the time one cycle takes, or the Cycle Rate header to switch all three. See [Speeds](../../../concepts/reading-the-panel/#speeds). |
| Custom Wave | shared waveform editor | Only used when Waveform is set to Custom. |

With [Perfect loop](../../windows/export-video/#perfect-loop) on, `Rate R/G/B`
run on the loop's clock and start again at each loop start. `Snap` sets them
to whole cycles per loop, so the OSC repeats exactly. Typing a time that
divides the loop, such as `4s` in a 4-second loop, fits it exactly too. With all three at 0 it
holds still.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
