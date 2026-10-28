---
title: "Datamosh"
description: "Drags the image along its own movement instead of updating it, like a video with its keyframes cut out."
---

Drags the image along its own movement instead of showing each new frame.
Datamosh finds how each block of the picture moved since the last frame, the
way a video codec does, and moves the picture it is holding by that much. The
new frame itself only comes through at a `Keyframe`, or where `Refresh` lets
it.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Keyframe` | Button and Lamp | | Shows the clean image again and moshes on from there. The Lamp flashes on every keyframe, including one at the start of a Perfect loop. See [Keyframe with modulation](#keyframe-with-modulation). |
| `Motion from` | Selector | This picture, AUX 1 to AUX 8 | Where the movement comes from. `This picture` uses the module's own image; an AUX bus moves this image with the movement of the picture sent there. A thumbnail shows the bus. When no module to the left sends to it, the panel warns and the image passes through. Default This picture. Not a modulation target: it is routing, like Morph's `Into`. |
| `Style` | Selector | Smear, Bloom | How the movement is used. Can be modulated: it switches half way. Default Smear. |
| `Blocks` | Selector | 8 px, 16 px, 32 px | Size of the blocks that move together. Bigger blocks look coarser. Can be modulated. Default 16 px. |
| `Range` | Trough | 4 to 64 px | The longest move per frame it looks for. Raise it for fast movement. Default 16 px. |
| `Refresh` | Trough | 0 to 1 | Lets blocks that changed a lot show the new image. 0 never does; 1 always shows the new image. Default 0. |
| `Pour` | Trough | 0 to 4 | Bloom only. How fast the picture keeps pouring: 1 at the speed things moved, 0 holds still. Default 1. |
| `Freeze` | Selector | Off, On | Bloom only. On keeps pouring the way it does now and ignores new movement. Can be modulated. Default Off. |

At `Mix` 0 the effect is skipped. When `Mix` comes back up, or the slot is
switched back on, Datamosh starts again from the clean image, so it never
returns an old smear.

## Styles

- **Smear** moves the held picture by this frame's movement. Things that
  move drag the old picture with them, and new things appear only as color
  smeared from what was there before.
- **Bloom** remembers the last clear movement of each block and keeps
  moving the picture by it, so the image keeps pouring in those directions
  after the movement stops. `Pour` sets how fast; `Freeze` stops new movement
  from changing the directions.

## Keyframe with modulation

`Keyframe` fires like a simulation's `Reset`: let the assigned value fall
below 0.25, then rise to 0.5 or higher. It must fall below 0.25 again before
another keyframe can fire. A synced square LFO keyframes once per cycle; an
Envelope triggered by a MIDI note or audio threshold keyframes on each hit.
See [Reset with modulation](../../simulate/#reset-with-modulation).

A keyframe only replaces the held picture. The movement Datamosh has learned
stays, so Bloom pours the clean image straight away.

## When it starts clean

Datamosh holds a picture between frames, like a simulation. It starts again
from the clean image when the effect is added or switched on, when `Mix`
comes back from 0, at every Perfect loop start, after a patch load and when
the output resolution changes. Changing `Blocks` clears the learned
movement but keeps the picture. Moving or removing an Insert FX slot
restarts it.

Datamosh shares the simulations' GPU memory limit. If it cannot start, its
panel says so and the image passes through.

## Perfect loops

With [Perfect loop](../../../windows/export-video/#length-and-loops) on,
Datamosh starts from the clean image at every loop start, so every loop
moshes the same way and the loop check lists it as a note. The jump from
the moshed picture back to the clean one at the loop point is the same in
every loop; [Video crossfade](../../../windows/export-video/#crossfades)
softens it.

## Datamosh or Fluid

[Fluid](../../simulate/fluid/) also smears the image with its movement, but
like liquid: soft edges and curling flow. Datamosh is digital: the picture
moves in rigid blocks by whole pixels, keeps old content until a keyframe or
`Refresh`, and Bloom pours in straight, block-shaped streaks.

## Recipes

- **Mosh on the beat.** Add Datamosh to a module showing a video with
  movement. Route a square LFO synced to one bar to `Keyframe`. Every bar
  starts clean and smears until the next.
- **Mosh into another clip.** Add two `SOURCE` modules. In the first, load
  the clip whose movement you want and send it to AUX 1. In the second, load
  the clip whose picture you want, and add Datamosh with `Motion from` on
  AUX 1. Keep the first module to the left of the second.
- **Pouring drift.** Choose Bloom, let something move for a moment, then
  turn `Freeze` on. The picture keeps flowing in those directions until the
  next keyframe.
- **Half-broken video.** Set `Refresh` around 0.7: still areas stay clean,
  while blocks that change a lot come through and the rest smear.

Related: [Insert FX Chains](../../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../../concepts/aux-sends-and-buses/),
[Block Crunch](../block-crunch/).
