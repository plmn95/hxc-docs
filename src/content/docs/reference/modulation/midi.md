---
title: "MIDI"
description: "Continuous controller input."
---

Use a MIDI continuous controller (CC) to modulate a parameter. Open an input
port in `Settings > MIDI`, then choose the source picker's `MIDI` tab.
`CC (0-127)` chooses the controller number. `Ch (0=any)` selects a channel,
with 0 accepting all channels.

`LEARN` fills the CC and channel fields from the next incoming CC message.
For assigning a control directly to a parameter, see
[MIDI and OpenSoundControl Learn](../../../concepts/midi-and-opensoundcontrol-learn/).

The other MIDI message types, Velocity, Aftertouch, Pitch Bend, and NRPN,
are on their own tab. See [MIDI Note](../midi-note/).

Related: [Modulation Matrix](../../../concepts/modulation-matrix/).
