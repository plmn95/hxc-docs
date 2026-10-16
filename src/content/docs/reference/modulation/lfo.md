---
title: "LFO"
description: "A repeating or one-shot waveform generator."
---

A repeating or one-shot waveform generator.

| Parameter | Control | Notes |
|---|---|---|
| Wave | Selector | `Sine`, `Square`, `Saw`, `Triangle`, `S+H`, `Custom`, plus 6 noise waves: `Perlin1D`, `Simplex1D`, `Sparse Conv 1D`, `Hermite1D`, `Harm Sum 1D`, `Alligator1D`. |
| Rate | Trough | 0 to 20Hz, used when not BPM-synced. At 0 the wave freezes and `Phase Off` scans through its shape by hand. |
| BPM Sync | Rocker, Selector | Locks Rate to a musical division (`1/16` to `4`) instead of a raw Hz value. |
| Scale / Offset | Trough | Output amplitude multiplier, and a DC offset applied after Scale. |
| Fold | Trough | Wavefolder drive; 0 is an exact bypass. Reflects the signal back into range rather than letting it clip. |
| Phase Off | Wheel | Phase offset, in cycles. |
| Duty | Trough | 1-99%. Square wave only. |
| Custom Wave | shared waveform editor | Only used when Wave is set to `Custom`. |
| Seed | value field, button | 0 to 999, typed directly or rolled with `Randomize`. All 6 noise waves and `S+H`: the same seed always plays the same values. |
| Harmonics (`Count`), Harmonic Spread, Harmonic Gain | Selector, Trough | Octave count (1 to 8), lacunarity, and persistence. The 4 fbm-capable noise waves: `Perlin1D`, `Simplex1D`, `Harm Sum 1D`, `Alligator1D`. |
| Density | Trough | `Sparse Conv 1D` only. |
| Glide / Glide Mode | Trough, Selector | Smooths value changes; the Trough's meaning follows Glide Mode: an RC time under `Exponential`, a slew time under `Linear`, and a `Ramp` percentage of the cycle under `Cycle`. |

`S+H` plays the same sequence every time the patch runs, so an export
matches the live view and every export of the patch matches the last. Two
`S+H` LFOs with the same Seed still play different values.

With [Perfect loop](../../windows/export-video/#perfect-loop) on, every
LFO starts again at each loop start, `S+H` repeats its values every loop
(`Cycle` glide runs from the loop's last value into its first), and noise
waves repeat once per loop. A rate that doesn't fit whole cycles into the
loop jumps at the loop point until `Snap` rounds it. A synced LFO fits
every loop of whole bars; in a loop of beats, `Snap` moves one that doesn't
fit to the longest sync that does.

Related: [Modulation Matrix](../../../concepts/modulation-matrix/).
