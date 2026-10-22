---
title: "Modulation Matrix"
description: "Assign modulation sources, adjust their amount, and inspect active parameter assignments in the Modulation Matrix."
---

Modulation moves a parameter around its base value. An LFO can turn a
pattern back and forth; an audio level can change its size. Several sources
can contribute to the same parameter.

Right-click the parameter and choose `Edit Modulation...`, then `+ Add
Source` to open `Pick a source`. Sources can also be dragged onto a
parameter from `Modulation`, or assigned through `MIDI Learn` and
`OpenSoundControl Learn`.

Choose the source's tab in the picker. For an LFO, select `LFO` and click
its waveform card.

Each assignment has a signed `Depth` in the parameter's units. Negative
Depth inverts the modulation. `Offset` adds a constant shift.
Set these values in the connection editor, then click `Done`.

A source can modulate another assignment's Depth.

The [Mod Matrix](../../reference/windows/mod-matrix/) window lists the
patch's assignments together, so you can inspect or edit them without
opening each parameter. Mixer Mode keeps its assignments in a separate
matrix.

To make a parameter follow a [Perfect loop](../../reference/windows/export-video/#length-and-loops),
connect it to `Loop Phase` on the source picker's `TIME` tab.

`Clear All` in a parameter's connection list removes its assignments.
Removing a source or clearing the list can be undone.

Related: [Modulation Sources](../../reference/modulation/),
[MIDI and OpenSoundControl Learn](../midi-and-opensoundcontrol-learn/).
