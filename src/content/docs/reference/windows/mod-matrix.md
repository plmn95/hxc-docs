---
title: "Mod Matrix"
description: "Inspect and edit modulation assignments in the current patch."
---

A table of modulation assignments: `SOURCE`, `DEPTH`, `TARGET`, `LIVE`,
`BYP`, and a delete column. There are two, one per mode. `X` toggles the one
belonging to the current mode, and each remembers whether it was open.

| Matrix | Lists | Sources | Undo |
|---|---|---|---|
| Editor | The active patch's assignments. | The patch's own LFO, Envelope, Time and Macro banks, plus MIDI, audio, CV/Gate and OpenSoundControl. | Editor undo stack. |
| Mixer Mode | Mixer control assignments only. Opens as a tab beside the Mixer panel. | Mixer Mode's own LFO, Envelope and Time banks and deck Macros `A1` to `B4`, plus MIDI, audio and OpenSoundControl. No CV/Gate. | Mixer undo stack. |

`LIVE` shows how strongly the assignment is moving its target right now, as
a share of the target's range. At the source's peak the meter reaches the
percentage shown beside `DEPTH`, so a lower LFO Level or a smaller Depth
shrinks it, and a negative Depth fills it the other way. The number beside
the meter shows the same change in the target's own units, including
Offset. `BYP` turns an assignment off without deleting it. The delete column removes
it outright.

`DEPTH` sets how far the assignment moves its target, in the target's own
units, with the matching percentage of the target's range shown beside it.
A negative Depth
inverts the modulation. Beside it sit an Offset control (`±`), which adds a
constant offset on top of the swing, and a shaping control. The shaping
control is live only for assignments driven by the `L Level` or `R Level`
audio sources; on every other source it is greyed out. See [Audio-Reactive](../../modulation/audio-reactive/).

Mixer controls can also be modulated from the controls themselves; see
[Mixer Mode](../../../concepts/mixer-mode/).

In the Mixer Mode matrix, `TARGET` offers `MIXER` (the mixer controls,
grouped under the Mixer panel's section names) and the settings of Mixer
Mode's own LFO, Envelope and Time banks. Mixer assignments are shared
across every patch in the same bank and are saved with the bank rather than
with any individual patch. **NOTE:** the Mixer Mode matrix has no
meta-modulation: an assignment's `AMOUNT` there cannot itself be a target.

Related: [Modulation Matrix](../../../concepts/modulation-matrix/),
[Mixer Controls](../mixer-controls/).
