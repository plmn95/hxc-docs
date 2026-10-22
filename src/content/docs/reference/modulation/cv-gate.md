---
title: "CV/Gate"
description: "Use audio-interface channels as external control voltage and gate modulation inputs."
---

CV/Gate reads control voltages through a DC-coupled audio interface.
Channels 1 and 2 remain stereo audio inputs; up to 12 further channels can
carry continuous CV or gate signals.

Open a device with more than two input channels in `Settings > Audio` to
show `CV/Gate Channels`. Configure each channel there:

| Control | Notes |
|---|---|
| Mode | `Off`, `CV` (a smoothed 0 to 1 value), or `Gate` (0 or 1). Each channel has its own mode. |
| Range | `0-5V`, `+/-5V`, `+/-10V`, or `+/-2.5V`. Applies to `CV` channels. |

Configured channels then appear as sources named for their physical input
and mode, `Ch 3 (CV)` or `Ch 4 (Gate)`, each with a live meter beside it for
checking the incoming signal. Normalization assumes the interface's digital
full scale represents +/-10V; a different hardware calibration changes the
voltage represented by each value.

CV/Gate sources are unavailable for Mixer modulation.

Related: [Modulation Matrix](../../../concepts/modulation-matrix/).
