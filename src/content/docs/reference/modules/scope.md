---
title: "SCOPE"
description: "Draw XY traces from audio, internal generators, or manual values, with persistence."
---

SCOPE draws an XY trace: one signal controls the horizontal beam position
and another controls the vertical position. Use audio for a waveform trace,
internal generators for curves, or manual values for a point.

| Parameter | Control | Notes |
|---|---|---|
| `X Source` / `Y Source` | Selector | `Manual`, `Audio L`, `Audio R`, `Generator A`, or `Generator B`, independently per axis. |
| `X` / `Y` | Trough | Position, -1 to 1, for an axis set to `Manual`. |
| `X Scale` / `Y Scale` | Trough | Axis gain, 0 to 2. Available for audio and generator sources. Corrects trace proportions on a non-square canvas. |
| `Mix` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the trace and backdrop together. |
| `Persistence` | Trough | How long the phosphor glow lingers, without smoothing the signal itself. |
| `Brightness` | Trough | Strength of the trace's glow, 0 to 4. |
| `Width` | Trough | Thickness of lines, or point size with `Points Only`. |
| `Points Only` | Rocker | Draws a dot at each sample instead of the beam's path between samples. Where dots overlap they don't add up. |
| `Reset Generators` | Button | Realigns the generators, restarts the `S+H` sequence, and clears the trace. Available when a generator drives either axis. |

`Generator A` and `Generator B` each have waveform, frequency, phase, and
amplitude controls. Waveforms include `Sine`, `Square`, `Sawtooth`, `Triangle`,
`S+H`, and the noise waves listed under [LFO](../../modulation/lfo/).
`Square` adds `Duty`, the portion of a cycle spent high (1 to 99%).
`S+H` picks a new random level once per cycle. `Glide` (0 to 100%, default 0)
slides to it over that share of the cycle instead of jumping, and at 100% the
level never holds still.

`Seed` chooses the sequence for `S+H` and noise. Noise controls for detail
layers and density appear only for the waveforms that use them.

SCOPE draws every sample, and between samples the beam follows the
waveform the way an analog scope fed by a sound card does, so fast audio
keeps its curves and peaks instead of turning into straight lines. A
generator's square edges, and `S+H`'s at `Glide` 0, stay sharp.

With an Audio source, the trace runs about one frame behind the sound.
An audio axis draws nothing while no audio arrives. Open an input in
`Settings > Audio` before choosing `Audio L` or `Audio R`.

Insert FX process the backdrop and phosphor trace together. The effects
receive the image over black; dark areas remain transparent unless the
input already had picture there. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

With [Perfect loop](../../windows/export-video/#length-and-loops) on, the generators start again at each loop
start, and `Snap` sets their frequency to whole cycles per loop. Right-click a
frequency control and choose `Show as Time` to display the cycle duration. The phosphor
glow warms up for one loop before an export.

Related: [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
