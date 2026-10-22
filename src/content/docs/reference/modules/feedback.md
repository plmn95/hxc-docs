---
title: "FEEDBACK"
description: "Create video feedback loops with delay, decay, blending, routing, and Pre/Post Insert FX."
---

FEEDBACK recirculates earlier frames to make trails, echoes, or a delayed
image. `Dry/Wet` blends the incoming frame with the loop. For a starting
recipe, see [Make feedback trails](../../../guides/feedback-trails/).

## Output

| Parameter | Control | Notes |
|---|---|---|
| `Dry/Wet` | Trough | 0 shows the incoming frame. 0.50 shows input and loop together, combined by `Blend`. 1 shows only the loop, preserving its transparency. Default 0.50. |
| `Blend` | Selector | How input and loop combine in the middle of the `Dry/Wet` range. At 0.50, `Add` shows both at full strength; `Replace` puts the loop on top. At 1, `Blend` has no effect. See [Blend modes](../../../concepts/signal-chain/#blend-modes). |

## Loop

| Parameter | Control | Notes |
|---|---|---|
| `Amount` | Trough | Strength of new input to the loop, 0 to 1. At 0, no new frame enters. |
| `Decay` | Trough | Fraction of the stored loop retained each lap, 0 to 1. At 1, no decay is applied. |
| `Loop Blend` | Selector | How input combines with stored feedback. `Add` accumulates brightness; `Difference` and `XOR` produce changing edges; `Multiply` and `Screen` keep levels bounded. `Replace` covers echoes where the input has picture and lets them fade in transparent areas. Default `Screen`. |

With `Loop Blend` set to `Replace`, `Decay` affects only echoes visible
through transparent areas of the new input. Set `Decay` to 0 for a plain
delay without accumulation.

## Timing and routing

| Parameter | Control | Notes |
|---|---|---|
| `Delay` | Trough, Rocker | 0 to 500 ms; 0 bypasses the delay. `Delay Sync` uses a BPM division (`1/16` to `4` beats) instead, capped at 500 ms. |
| `Hold` | Trough, Rocker | Time between frame updates, 0 to 1000 ms. At 0, updates every frame. `Hold Sync` uses a BPM division, capped at 1000 ms. With [Perfect loop](../../windows/export-video/#length-and-loops), updates follow the loop's clock. |
| `Feed back to` | Selector | `Self (default)`, or an earlier INSERT, FEEDBACK, or ISF that receives this loop's previous frame. Generators ignore chain input and cannot be targets. |
| `Input source` | Selector | `Chain composite (default)`, or `AUX 1` through `AUX 8`. |

A Lamp beside the `Routing` section reports whether the chosen `Feed back to`
target still resolves. If that module is deleted or moved later in the chain,
the Lamp turns red and the loop falls back to `Self`.

Modules after FEEDBACK process its output without accumulating further echoes.

## Insert FX

Each Insert FX slot chooses `Pre` or `Post`. `Pre` runs every lap, so a
small rotation builds into a spiral and a small hue shift accumulates.
Every echo reaching the output has passed through `Pre` at least once.
`Post` runs once on the loop's output and does not compound.

Each slot's `Mix` still applies. `Dry/Wet` scales both stages with the loop.
Effects receive the loop over black; where they draw nothing, the loop
stays transparent. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

## Recipes

| Result | Settings |
|---|---|
| Input plus one repeat at the same level | `Loop Blend` `Replace`, `Amount` 1, `Decay` 0, `Blend` `Add`, `Dry/Wet` 0.50 |
| Loop only, each repeat half as bright | `Loop Blend` `Add`, `Amount` 1, `Decay` 0.5, `Dry/Wet` 1 |
| Afterimage held at half brightness | `Loop Blend` `Add`, `Amount` 1, `Decay` 1, `Blend` `Add`, `Dry/Wet` 0.25 |
| Clean delay line | `Loop Blend` `Replace`, `Amount` 1, `Decay` 0, `Dry/Wet` 1. Set `Delay` to the desired repeat time. Two in series add their delays. |
| Painted trail that never fades | `Loop Blend` `Replace`, `Amount` 1, `Decay` 1, `Dry/Wet` 1, after SCOPE, SHAPE, or TEXT |
| Changing edges | `Loop Blend` `XOR` or `Difference`, `Decay` around 0.9 |

SCOPE, SHAPE, TEXT, and SPRITE can leave transparent areas where older echoes
show through `Loop Blend` `Replace`. OSC, NOISE, and opaque video cover
their image areas even where they are black. Use `Luma Key` or `Chroma Key`
in the source's Insert FX, or on an INSERT before FEEDBACK, to let echoes
show through those dark areas.
`Add` also preserves the input's transparency. The other `Loop Blend` modes
treat transparent parts of the incoming frame as black.

With `Feed back to` set to an earlier module, `Dry/Wet` is applied
where the loop enters that module, so everything shown passes through the
modules in between. At 0 the chain runs as if FEEDBACK were off. Below 0.50
`Dry/Wet` also shortens the trail, and `Amount` and `Loop Blend` only take
effect above 0.50. This routing has a single recursion, so the repeat-once,
held-afterimage and delay-line recipes need `Self`.

In a [Perfect loop](../../windows/export-video/#length-and-loops) export, the
loop warms up for one loop first. `Hold` starts again at each loop start,
so a hold that does not divide the loop leaves a shorter final hold.
Feedback that never settles, for example
with `Edge Detect` as a `Pre` Insert FX, is faded into the loop's start by the
[Crossfade](../../windows/export-video/#crossfades).

Related: [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
