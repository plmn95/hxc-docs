---
title: "LFO"
description: "Repeating waveforms and random values for parameter modulation."
---

An LFO moves parameters repeatedly or supplies changing random values.
Configure it in `Modulation > LFO`, then assign it to a parameter.

| Parameter | Control | Notes |
|---|---|---|
| `Wave` | Selector | `Sine`, `Square`, `Saw`, `Triangle`, `S+H`, `Custom`, `Perlin1D`, `Simplex1D`, `Sparse Conv 1D`, `Hermite1D`, `Harm Sum 1D`, `Alligator1D`. |
| `RATE` | Knob | 0 to 20 Hz, unavailable while `BPM SYNC` is engaged. At 0, `Phase Off` scans a frozen waveform. Right-click and choose `Show as Time` to display the cycle duration. See [Speeds](../../../concepts/reading-the-panel/#speeds). |
| `LEVEL` | Knob | Shared output gain, -1 to 1, applied after `Fold`. Negative inverts the wave. Affects every parameter using this LFO; set each parameter's travel with its assignment's `Depth`. |
| `BPM SYNC` | Rocker, Value field | Uses a musical length instead of `RATE`. Type a fraction or a length from `1/64` to `256` beats. |
| `Fold` | Trough | Reflects peaks back into range rather than clipping them. At 0, the waveform is unchanged. |
| `Phase Off` | Wheel | Starting position within the waveform, 0 to 1 cycle. |
| `Duty` | Trough | Portion of a cycle spent high, 1 to 99%. `Square` only. |
| `Seed` | Value field | 0 to 999, or choose another with `Randomize`. Used by noise waves and `S+H`. |
| `Count` | Selector | Detail layers, 1 to 8, under `Harmonics`. Available for `Perlin1D`, `Simplex1D`, `Harm Sum 1D`, and `Alligator1D`. |
| `Harmonic Spread` / `Harmonic Gain` | Trough | Frequency multiplier and strength of successive detail layers. |
| `Density` | Trough | Impulses per unit area for `Sparse Conv 1D`. |
| `Glide Mode` / `Glide` | Selector, Trough | `S+H` smoothing. `Exponential` uses a response time; `Linear` uses a slew time; `Cycle` uses a `Ramp` percentage of the cycle. |

Choose `Custom`, then `Edit Wavetable...` to draw a waveform.
`Restart All` realigns the phases of all LFOs in the bank.

`S+H` produces a repeatable random sequence. Two `S+H` LFOs with the same
`Seed` still produce different values.

While [Ableton Link](../../../guides/ableton-link/) is enabled, synced
LFOs follow its tempo and beat phase. Lengths that divide four beats can
line up across apps; longer or irregular lengths do not have a guaranteed
common cycle start. Free-running LFOs keep their own clocks.

With Link disabled and [Perfect loop](../../windows/export-video/#length-and-loops)
on, every LFO starts again at each loop start, `S+H` repeats its values every loop
(`Cycle` glide runs from the loop's last value into its first), and noise
waves repeat once per loop. A rate that doesn't fit whole cycles into the
loop jumps at the loop point until `Snap` rounds it. A synced LFO repeats
cleanly when a whole number of its cycles fits the loop. Otherwise, `Snap`
shortens its length to a division that fits.

Related: [Modulation](../../../concepts/modulation/).
