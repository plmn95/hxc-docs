---
title: "SCOPE"
description: "Draw XY traces from audio, internal generators, or manual values, with persistence."
---

Draws an XY trace from audio, internal generators, or manual values, with
adjustable persistence.

| Parameter | Control | Notes |
|---|---|---|
| X Source / Y Source | Selector | Manual, Audio L, Audio R, Generator A, or Generator B, independently per axis. |
| X / Y | Trough | Manual axis value; only live when its Source is Manual. |
| X Scale / Y Scale | Trough | Axis gain, 0 to 2, default 1. Shown for Audio and Generator sources. Can correct trace proportions on a non-square canvas. |
| Blend / Mix | Selector, Trough | The same [Blend modes](../../../concepts/signal-chain/#blend-modes) every other module uses, plus a 0-1 Mix amount, applied to the composited trace+backdrop result. |
| Persistence | Trough | Per-second exponential decay of the phosphor trace. |
| Brightness / Width | Trough | Line width in line mode; also sizes points when Points Only is on. |
| Points Only | Rocker | Renders each frame's beam position as a discrete point-glow instead of a connected line between positions. |
| Detail | Trough | Beam segments drawn per frame; hidden (and has no effect) when both axes are Manual. |
| Generator A / Generator B | Selector, Trough | Wave (Sine, Square, Sawtooth, Triangle, S+H, and the same 6 noise waves LFO offers), Freq, Phase, Amp. Square adds Duty, the share of each cycle spent high (1-99%, default 50). S+H jumps to a new random level once per cycle, with no glide. Seed picks the random sequence for S+H and the noise waves; the noise waves also add Harmonics/Spread/Gain/Density. |
| Reset Generators | Button | Synchronizes Generator A/B phases, restarts S+H's sequence, and clears the trace. Shown when a generator drives either axis. |

With an Audio source, the trace runs about one frame behind the sound.
SCOPE holds back a few milliseconds of audio so that every frame draws an
even share of it, which keeps the trace as steady as the generators. An
axis set to Audio draws nothing while no audio arrives, for example before
an input is opened.

Insert FX on SCOPE applies to the full composited result, backdrop and
phosphor trace together, not the trace alone. The effects see it over black; areas they leave dark stay empty. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

With [Perfect loop](../../windows/export-video/#perfect-loop) on, the generators start again at each loop
start, and `Snap` sets their Freq to whole cycles per loop. The phosphor
glow warms up for one loop before an export.

Related: [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
