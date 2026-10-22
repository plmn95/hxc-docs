---
title: "MIDI Note"
description: "Use MIDI note and channel-voice messages as modulation sources, with source and channel selection."
---

Open a MIDI input in `Settings > MIDI`, then choose a `Source` in the
source picker's `MIDI Note` tab. `Ch (0=any)` selects a channel; 0 accepts
all channels. For continuous-controller input, use [MIDI](../midi/).

| Source | Notes |
|---|---|
| `Velocity` | Updates on note-on and holds the value after release until the next note. |
| `Aftertouch` | Channel or polyphonic key pressure. Holds the last received value after release. |
| `Pitch Bend` | -1 to 1 across the pitch wheel's travel, with 0 at the center. |
| `NRPN` | Set `Param # (0-16383)` to a 14-bit parameter number. Reads its most recent value while it is the last NRPN updated on that channel. Updating a different NRPN makes this source return 0. |

Related: [Modulation Matrix](../../../concepts/modulation-matrix/).
