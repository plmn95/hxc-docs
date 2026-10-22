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

Related: [Modulation Matrix](../modulation-matrix/).
