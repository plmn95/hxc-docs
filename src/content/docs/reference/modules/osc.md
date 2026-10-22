---
title: "OSC"
description: "The oscillator generator."
---

OSC generates a waveform across the image, with separate phase, amplitude,
and animation rate for red, green, and blue. For the network control
protocol, see [OpenSoundControl](../../modulation/opensoundcontrol/).

| Parameter | Control | Notes |
|---|---|---|
| `Waveform` | Selector | `Sine`, `Square`, `Sawtooth`, `Triangle`, `Noise`, `Custom`. |
| `Mix` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the generated image against the chain. |
| `Freq X` / `Freq Y` | Pad | Spatial frequency across each axis. `Link X/Y` keeps their values equal. |
| `Phase R` / `Phase G` / `Phase B` | Wheel | Shifts each channel's waveform independently. |
| `Amp R` / `Amp G` / `Amp B` | Trough | Strength of each channel's waveform. |
| `DC R` / `DC G` / `DC B` | Trough | Adds a constant brightness offset to each channel, -1 to 1. |
| `Duty` | Trough | Portion of the cycle spent high, 1 to 99%. `Square` only. |
| `Rate R` / `Rate G` / `Rate B` | Trough | Under `Cycle Rate`. Motion in cycles per second (Hz); negative runs backwards. Right-click a lane to show the time one cycle takes, or the `Cycle Rate` header to change all three. See [Speeds](../../../concepts/reading-the-panel/#speeds). |

With `Waveform` set to `Custom`, `Edit Wavetable...` opens the waveform editor.

With [Perfect loop](../../windows/export-video/#length-and-loops) on, `Rate R/G/B`
run on the loop's clock and start again at each loop start. `Snap` sets them
to whole cycles per loop. Typing a cycle time that divides the loop, such as
`4s` in a 4-second loop, also makes it repeat. Set all three rates to 0 for a
still pattern.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
