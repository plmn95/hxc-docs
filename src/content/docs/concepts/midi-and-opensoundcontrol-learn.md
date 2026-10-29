---
title: "MIDI and OpenSoundControl Learn"
description: "Assign incoming MIDI and OpenSoundControl messages to parameters with Learn mode."
---

Use Learn to connect a hardware control or an incoming OpenSoundControl
message without entering its MIDI CC number or address by hand. Arm it
from:

- A parameter's right-click menu: `MIDI Learn` or `OpenSoundControl Learn`.
- `M` for MIDI or `O` for OpenSoundControl, followed by a click on the target
  parameter. Press the same key again to cancel.
- `LEARN` in the source picker's `MIDI` or `OpenSoundControl` tab, which fills
  the CC number and channel, or address, from the next message.

Clicking another parameter while Learn is armed changes the target. The
next message adds an assignment and disarms Learn. Existing assignments are
preserved; duplicate sources are not added.

A pulsing `MIDI LEARN` label appears in the toolbar while MIDI Learn is
armed. OpenSoundControl Learn has no toolbar indicator.

## Clear a patch's MIDI bindings

MIDI bindings are saved with the patch, so a patch made on another
controller can react to the wrong knobs or faders on yours.
`Edit > Clear MIDI Bindings...`, also in `Settings > MIDI`, removes the
active patch's MIDI CC and NRPN connections and unbinds every macro's CC.
The macros themselves stay, ready to learn your own controls.
Connections that modulate a removed connection are removed with it.

Velocity, aftertouch, pitch bend and note-triggered envelopes stay, since
every keyboard sends them the same way. A confirmation shows what will be
removed, and one Undo brings it all back. Clearing also disarms MIDI Learn.

Related: [Modulation](../modulation/).
