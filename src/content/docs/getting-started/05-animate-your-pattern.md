---
title: "Animate Your Pattern"
description: "Assign an LFO to Kaleidoscope Rotation, set a slow rate, and control the movement with modulation Depth."
---

Keep `OSC` selected and its `INSERT FX` section expanded after
[Make a Kaleidoscope](../03-build-a-custom-chain/).

## Set the LFO rate

Select the `Modulation` tab in the right dock, then the `LFO` tab.
Expand `LFO 1`. If the panel is hidden, show it with `View > Modulation`.

Set the LFO's `RATE` to `0.1 Hz`. Use the numeric field beneath its Knob
to enter the value, then press `Enter`. Leave its waveform at `Sine` and
`LEVEL` at `1`. Keep `BPM SYNC` off so the rate is measured in Hz.

![LFO 1 set to a sine wave, RATE 0.1 Hz, LEVEL 1, and Sync off.](../../images/getting-started/lfo.png)

## Connect rotation

Return to the `Module` tab. Right-click the kaleidoscope's `Rotation`
and choose `Edit Modulation...`. Click `+ Add Source`.

In `Pick a source`, select the `LFO` tab and click the waveform card for
`LFO 1`. Enter `45` in `Depth` and press `Enter`. Leave `Offset` at `0`,
then click `Done`.

![The modulation picker with LFO 1 selected, Depth 45 degrees, Offset 0, and the Done button.](../../images/getting-started/modulation-picker.png)

The pattern now turns back and forth. If it stays still, check that
`LFO 1` has `LEVEL` set to `1` and that its waveform card is selected.

Change the LFO's `RATE` to adjust how fast it turns. `Depth` belongs to
this connection and controls how far the source moves `Rotation`.

Related: [Modulation](../../concepts/modulation/).

Next: [Record and Output](../04-record-and-output/).
