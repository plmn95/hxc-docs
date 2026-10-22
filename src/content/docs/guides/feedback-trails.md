---
title: "Leave a Trail with Feedback"
description: "Add FEEDBACK to an animated ring and control how long its trail lasts."
---

Make a pulsing ring leave fading copies behind it. Start with the supplied
animation, then add one `FEEDBACK` module.

![A bright cyan ring with a soft fading trail.](../../images/guides/feedback-trails/result.png)

## 1. Open the starting patch

Download the [animated ring](../../examples/feedback-ring-start.hxc) and open it with
`File > Open...`.

The ring grows and shrinks around its center. This starting patch contains
one `SHAPE` with an `LFO` moving its `Size`. It needs no audio input or
media files.

![One thin cyan ring in the starting patch, before feedback.](../../images/guides/feedback-trails/source-ring.png)

## 2. Add feedback

Click `+` in `Chain` and choose `FEEDBACK`. Keep `SHAPE` before
`FEEDBACK` in the chain so the ring feeds into the loop.

Select `FEEDBACK` to open its controls in `Module`.

## 3. Set the trail

Enter these values:

| Section | Control | Value |
|---|---|---|
| `Output` | `Dry/Wet` | `1` |
| `Loop` | `Amount` | `1` |
| `Loop` | `Decay` | `0.975` |
| `Loop` | `Loop Blend` | `Replace` |

![FEEDBACK controls with Dry/Wet 1, Amount 1, Decay 0.975, and Loop Blend Replace.](../../images/guides/feedback-trails/feedback-controls.png)

`Loop Blend` set to `Replace` paints the current ring over the loop.
The rest of the `SHAPE` frame is transparent, so earlier rings remain
there and fade according to `Decay`.

## 4. Compare the result

Adjust `Dry/Wet` to blend the clean ring with its trail. Lower `Decay`
for a shorter trail.

## 5. Save your patch

Choose `File > Save As...` and save it as `Feedback trails.hxc`.
You can compare it with the
[finished patch](../../examples/feedback-trails.hxc).

To change the ring's pulse speed, adjust `LFO 1`'s `RATE` using
[Animate Your Pattern](../../getting-started/05-animate-your-pattern/).

For other loop blends and delays, see
[FEEDBACK](../../reference/modules/feedback/).
