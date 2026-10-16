---
title: "Time"
description: "Use a steadily rising or falling Time value as a modulation source, without the cycling of an LFO."
---

A value that rises or falls at a constant rate without wrapping.

| Parameter | Control | Notes |
|---|---|---|
| Scale | Trough | Units added per second. Negative makes it count down instead of up. |
| Running | Rocker | Pausing freezes the accumulator in place, without resetting it. |
| Reset | button | |

TIME keeps rising through a [Perfect loop](../../windows/export-video/#perfect-loop),
so a connection from it doesn't repeat. A connection to a rotation is the
exception: `Snap` sets its Depth so the target turns whole turns per loop.
Elsewhere, the export's [Crossfade](../../windows/export-video/#crossfade)
fades the loop's end into its start.

## Loop Phase

The first row of the source picker's `TIME` tab. It rises from 0 to 1 over
the loop, then starts again, and runs over 4 bars at the current BPM while
`Perfect loop` is off. It always repeats exactly with the loop, so any
parameter can follow it. In Mixer Mode it runs over 4 bars.

Related: [Modulation Matrix](../../../concepts/modulation-matrix/).
