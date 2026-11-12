---
title: "Time"
description: "Use a steadily rising or falling Time value as a modulation source, without the cycling of an LFO."
---

TIME supplies a continuously rising or falling value. Configure it in
`Modulation > TIME`; use it for a steady rotation or an offset that keeps
scrolling.

| Parameter | Control | Notes |
|---|---|---|
| `Scale` | Trough | Units added per second. Negative values count down. |
| `RUNNING` / `PAUSED` | Rocker | Pausing holds the current value without returning to zero. |

`Reset` returns the value to zero, including while paused.
[Ableton Link](../../../guides/ableton-link/) does not change TIME's speed,
pause state or value.

With Link disabled, TIME keeps rising through a
[Perfect loop](../../windows/export-video/#length-and-loops), so a connection
from it doesn't repeat. A connection to a rotation is the
exception: `Snap` sets its `Depth` so the target makes whole turns per loop.
Elsewhere, the export's [Crossfade](../../windows/export-video/#crossfades)
fades the loop's end into its start.

## Loop Phase

Choose `Loop Phase` in the source picker's `TIME` tab for a ramp that rises
from 0 to 1 over the loop, then starts again. While `Perfect loop` is off,
and in Mixer Mode, it runs over four bars at the current BPM.

With Link enabled, `Loop Phase` uses the shared musical clock over four
bars, regardless of the saved `Perfect loop` setting. All live Hex Composer
banks share that ramp. Link guarantees four-beat bar phase between apps,
so another app may use a different four-bar cycle start.

Unlike TIME, `Loop Phase` repeats with each loop. A target with different
values at the ramp's start and end still jumps at the loop point.

Related: [Modulation](../../../concepts/modulation/).
