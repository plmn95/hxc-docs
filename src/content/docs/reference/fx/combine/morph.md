---
title: "Morph"
description: "Turns the image into the picture on an AUX bus, by flowing like liquid or by dissolving."
---

Turns the module's image into a second picture as `Amount` goes from 0 to 1.
The second picture comes from an [AUX bus](../../../../concepts/aux-sends-and-buses/):
send another module to a bus, then choose that bus in `Into`.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Into` | Selector | AUX 1 to AUX 8 | The bus whose picture this image turns into. A thumbnail shows the bus. When no module to the left sends to it, the panel warns and the image passes through. Default AUX 1. Not a modulation target: it is routing, like `FEEDBACK`'s `Input source`. |
| `Style` | Selector | Warp, Noise, Light, Dark, Radial, Wipe | How one picture becomes the other. Can be modulated: it switches half way between styles. Default Warp. |
| `Amount` | Trough | 0 to 1 | 0 is the module's own image, 1 is the AUX picture. Default 0.5. |
| `Strength` | Trough | 0 to 0.5 | Warp only. How far the pictures flow while they change, in frame heights. |
| `Follow` | Trough | 0 to 1 | Warp only. 0 swirls freely; 1 moves the shapes of this image toward the matching shapes in the AUX picture. |
| `Size` | Trough | 0.02 to 2 | Warp and Noise. The size of the swirls and of the noise pattern, in frame heights. |
| `Speed` | Trough | 0 to 4 Hz | Warp and Noise. How fast the swirls and the pattern move. 0 keeps them still. Can be shown as the time one cycle takes. |
| `Softness` | Trough | 0 to 1 | Dissolve styles. How soft the edge between the two pictures is. 0 is a hard edge. |
| `Angle` | Dial | -180 to 180 degrees | Wipe only. The direction the wipe travels; 0 runs from left to right. |

At `Amount` 0 the image is unchanged, and at 1 it is exactly the AUX picture,
whatever the style. Only the rows the chosen style uses are shown.

## Styles

- **Warp** makes both pictures flow along the same currents while one fades
  into the other. The flow is strongest half way and settles at both ends.
  With `Follow` up, the flow pushes the light and dark areas of this image
  toward where the AUX picture has them, which works best when both pictures
  show the same subject, such as two takes of one scene.
- **Noise** lets the AUX picture show through a cloudy pattern that fills in
  as `Amount` rises.
- **Light** and **Dark** change the light or the dark parts of this image
  first.
- **Radial** grows the AUX picture from the middle of the frame outward.
- **Wipe** sweeps the AUX picture in along `Angle`.

## Perfect loops

Morph follows the [Perfect loop](../../../windows/export-video/#length-and-loops)
clock. The swirls and noise repeat once per `Speed` cycle, and the loop
check offers Snap when `Speed` does not fit a whole number of cycles into
the loop.

## Recipes

- **Morph between two videos.** Add two `SOURCE` modules. In the first,
  load video B and add a send to AUX 1 in its `SENDS` section. In the second,
  load video A, set `Blend` to Replace, and add Morph to its Insert FX with
  `Into` on AUX 1. Drag `Amount`, or route an LFO or a macro to it. Keep the
  B module to the left of the A module: a send carries everything composited
  up to that point, so the bus must be fed before Morph reads it.
- **Beat dissolve.** Choose Noise, route a square LFO synced to the beat to
  `Amount`, and set `Softness` around 0.3 for a cloudy cut on every bar.
- **Liquid crossfade.** Choose Warp with `Follow` at 0, `Strength` around 0.2
  and `Size` around 0.3, then sweep `Amount` slowly.

Related: [Insert FX Chains](../../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../../concepts/aux-sends-and-buses/).
