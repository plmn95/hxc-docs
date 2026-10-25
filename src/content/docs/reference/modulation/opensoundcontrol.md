---
title: "OpenSoundControl"
description: "Use incoming OpenSoundControl messages as modulation sources by selecting their address."
---

OpenSoundControl receives network control values by address, such as
`/1/fader1`. It is separate from the [OSC oscillator module](../../modules/osc/).

Set `UDP Port` in `Settings > OpenSoundControl` and choose `Listen`.
The sender must use that port and the receiving computer's address.

Hex Composer reads the first argument of each message when it is a float
or integer and clamps it to 0 to 1. Other argument types and bundles are
not supported. Each address holds its last received value.

`OpenSoundControl Learn` arms a parameter and completes the assignment from
the next incoming message at whatever address sent it, instead of typing an
address by hand; see
[MIDI and OpenSoundControl Learn](../../../concepts/midi-and-opensoundcontrol-learn/).

Related: [Modulation](../../../concepts/modulation/).
