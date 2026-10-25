---
title: "Modulation"
description: "Modulation sources available from Edit Modulation."
---

Right-click a parameter and choose `Edit Modulation...`, then `+ Add Source`
to choose a source. See
[Modulation](../../concepts/modulation/) for assignment controls.

| Source | What it is |
|---|---|
| [LFO](lfo/) | A repeating waveform or changing random value. |
| [Envelope](envelope/) | An ADSR envelope, triggered by a MIDI note, an audio threshold, or another LFO's phase. |
| [Time](time/) | Rises or falls at a steady rate without wrapping. |
| [Loop Phase](time/#loop-phase) | Rises from 0 to 1 over the Perfect loop (4 bars while it's off). |
| [Macro](macro/) | A named, freely assignable value, bindable to a MIDI CC. |
| [Audio-Reactive](audio-reactive/) | Audio level or frequency-band energy from the selected input. |
| [CV/Gate](cv-gate/) | Up to 12 channels of external control voltage / gate input. |
| [MIDI](midi/) | Continuous-controller (CC) values. |
| [MIDI Note](midi-note/) | Velocity, Aftertouch, Pitch Bend, and NRPN. |
| [OpenSoundControl](opensoundcontrol/) | Address-based UDP input. |
