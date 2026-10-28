---
title: "SCOPE"
description: "Draw XY traces from audio, internal generators, or manual values, with persistence."
---

SCOPE draws an XY trace: one signal controls the horizontal beam position
and another controls the vertical position. Use audio for a waveform trace,
internal generators for curves, or manual values for a point.

:::note[Next release]
The Size, Exposure, and glow controls below describe merged changes for the
next release. Verification in a released desktop build is pending.
:::

`Mix` and `Blend` sit above the `Trace` and `Beam` sections. They control
the strength and [blend mode](../../../concepts/signal-chain/#blend-modes)
of the trace and backdrop together. `Size` sits below them, above `Trace`.

| Parameter | Control | Notes |
|---|---|---|
| `Size` | Trough | Enlarges both axes together, 0.1 to 8x, while preserving beam brightness and relative stroke weight. Default 1x. Supports modulation. |

Use `Size` to enlarge a finished trace. `X Scale` and `Y Scale` adjust the
signal before it becomes a position. `Glow Size` sets the halo spread
independently of visual magnification.

## Trace

| Parameter | Control | Notes |
|---|---|---|
| `X Source` / `Y Source` | Selector | `Manual`, `Audio L`, `Audio R`, `Generator A`, or `Generator B`, independently per axis. |
| `X` / `Y` | Trough | Position, -1 to 1, for an axis set to `Manual`. |
| `X Scale` / `Y Scale` | Trough | Axis gain, 0 to 2. Available for audio and generator sources. Corrects trace proportions on a non-square canvas. |
| `Points Only` | Rocker | Draws a dot at each sample instead of connecting successive positions. |
| `Reset Generators` | Button | Realigns the generators, restarts the `S+H` sequence, and clears the trace. Available when a generator drives either axis. |

`Generator A` and `Generator B` each have waveform, frequency, phase, and
amplitude controls. Waveforms include `Sine`, `Square`, `Sawtooth`, `Triangle`,
`S+H`, and the noise waves listed under [LFO](../../modulation/lfo/).
`Square` adds `Duty`, the portion of a cycle spent high (1 to 99%).
`S+H` chooses a new random level once per cycle. `Gen A Glide` and
`Gen B Glide` set the share of each cycle spent sliding to that level,
from 0 to 100%, with a default of 0%. At 0%, the level jumps; at 100%, it
slides for the whole cycle without holding still.

`Seed` chooses the sequence for `S+H` and noise. Noise controls for detail
layers and density appear only for the waveforms that use them.

SCOPE draws every sample, and between samples the beam follows the
waveform the way an analog scope fed by a sound card does, so fast audio
keeps its curves and peaks instead of turning into straight lines. A
generator's square edges, and `S+H`'s with its Glide control at 0%, stay sharp.

With an Audio source, the trace runs about one frame behind the sound.
An audio axis draws nothing while no audio arrives. Open an input in
`Settings > Audio` before choosing `Audio L` or `Audio R`.

## Beam

Slow movement and repeated passes over the same area make the trace brighter.
`Brightness` controls the light deposited by the beam, and `Persistence`
controls how quickly it fades. `Glow` adds a halo around the core trace.

| Parameter | Control | Notes |
|---|---|---|
| `Brightness` | Trough | Light deposited by the beam, 0 to 4. |
| `Exposure` | Trough | Display brightness, -4 to +4 EV. +1 EV doubles light before display mapping. Default 0 EV. Supports modulation. |
| `Width` | Trough | Trace thickness, 0.001 to 0.05, or dot size with `Points Only`. |
| `Persistence` | Trough | Afterglow fade time, 0 to 0.99, without smoothing the signal. Lower values clear trails faster. |
| `Glow` | Trough | Halo strength, 0 to 2. At 0, only the core remains. Default 0.45. |
| `Glow Size` | Trough | Halo spread, 0.1 to 1% of frame height. Default 0.6%. Does not change trace width or fade time. |

Set `Glow` to 0 and bypass Insert FX when judging the core trace. Use `Exposure`
to brighten it, then add the halo with `Glow`. Exposure changes the displayed
light without changing beam geometry or stored persistence. Faint edges can
become visible at higher exposure, making the trace appear broader; `Width`
still sets the beam thickness.

Insert FX process the backdrop and phosphor trace together. The effects
receive the image over black; dark areas remain transparent unless the
input already had picture there. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

With [Perfect loop](../../windows/export-video/#length-and-loops) on, the generators start again at each loop
start, and `Snap` sets their frequency to whole cycles per loop. Right-click a
frequency control and choose `Show as Time` to display the cycle duration. The phosphor
glow warms up for one loop before an export.

Related: [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
