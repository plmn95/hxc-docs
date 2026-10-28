---
title: "Macro"
description: "Control multiple parameters from a named macro with an optional MIDI CC binding."
---

A macro groups several parameter changes under one Knob. Set its value in
`Modulation > MACRO`, then assign that macro to each target with its own
`Depth` and `Offset`.

A macro can also receive modulation. Right-click its Knob and choose
`Edit Modulation...` to assign an LFO, another macro, or another source.

To bind a hardware controller, open a MIDI input in `Settings > MIDI`,
engage the macro's `LEARN` Rocker, and move the desired CC control. `Clear`
removes that binding.

Mixer Mode has four separate macro Knobs per deck, each with its own MIDI
CC binding. They belong to their deck, have a fixed count, and cannot
receive modulation.

Related: [Modulation](../../../concepts/modulation/),
[Mixer Mode](../../../concepts/mixer-mode/).
