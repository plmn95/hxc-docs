---
title: "Signal Chain"
description: "Understand module order, blending, and how the running chain composite becomes the final output."
---

Build a patch by combining images in `Chain`. Modules run from left to
right: generators draw new images, while `INSERT` and `FEEDBACK` process
what came before them. Each module's result becomes the input available to
the next one. `Output` shows the result at the end of the chain.

Module states are `LIVE`, `BYP`, and `MUTE`. `BYP` skips a module's
contribution. `MUTE` clears the chain at that module: subsequent modules
receive an empty image, and its Sends are empty.

The `Blend` Selector sets how a module's image combines with what came
before it. `FEEDBACK` also has `Loop Blend`, which sets how incoming frames
combine with its stored image; see
[FEEDBACK](../../reference/modules/feedback/).

## Blend modes

The `Blend` menu groups modes by how they change the image. `Common`
provides shortcuts to `Replace`, `Add`, `Screen`, `Multiply`, `Overlay`, and
`Difference`. Hover a mode for its description. The same modes appear on AUX
sends, in `FEEDBACK`'s `Loop Blend`, and in Mixer Mode, where Replace is
called `Crossfade`.

In the table, "the module" is the layer being blended in and "underneath"
is what it lands on: the chain so far, the loop's own history for `Loop
Blend`, or Deck A in Mixer Mode.

| Group | Mode | What it does |
|---|---|---|
| `Normal` | `Replace` | Shows the module instead of what is underneath, wherever the module draws. |
| `Lighten` | `Add` | Adds the module's light, brightening. |
| | `Screen` | Lightens; black in the module changes nothing. |
| | `Lighten` | Keeps whichever is brighter, color by color. |
| | `Color Dodge` | Brightens underneath into a glow wherever the module is bright. |
| `Darken` | `Multiply` | Darkens; white in the module changes nothing. |
| | `Darken` | Keeps whichever is darker, color by color. |
| | `Color Burn` | Darkens and deepens color wherever the module is dark. |
| `Contrast` | `Overlay` | Raises the contrast underneath, tinted by the module. |
| | `Soft Light` | Changes contrast more gradually than `Overlay`. |
| | `Hard Light` | Bright areas of the module lighten what is underneath; dark areas darken it. |
| | `Hard Mix` | Pushes every color to full or nothing, leaving eight flat colors. |
| `Difference` | `Difference` | Shows how far apart the two are; matching areas go black. |
| | `Exclusion` | A softer, lower-contrast Difference. |
| | `Subtract` | Takes the module's light away. |
| | `Divide` | Divides underneath by the module, a harsh brightening where the module is dark. |
| | `Phoenix` | An inverted Difference; matching areas go white. |
| `Glitch` | `XOR` | Lights up where exactly one of the two is brighter than half. |
| | `Wrap` | Adds the two and wraps light past white back around to black. |
| `Color` | `Hue` | Gives underneath the module's hues. |
| | `Saturation` | Gives underneath the module's color intensity. |
| | `Color` | Colors underneath with the module's colors, keeping its brightness. |
| | `Luminosity` | Gives underneath the module's brightness, keeping its colors. |

In a `FEEDBACK` loop, `Loop Blend` set to `Divide` turns whatever is still
circulating white while the incoming frame is dark, so the trail holds
instead of fading. `Decay` 0 or a brighter input clears it.

## Empty areas

The chain starts empty. A module that draws only part of the frame, such as
`SCOPE`, `SHAPE`, `TEXT` or `SPRITE`, leaves the rest see-through, and it
stays see-through for every module below until something draws there. The
`Output` window, recordings and snapshots show empty areas as black; NDI,
Spout and Syphon send them as transparency.

`Add`, `Screen`, `Lighten`, `Difference`, `Exclusion`, `XOR`, `Wrap`, and
`Replace` can draw into empty areas. Most remaining modes leave empty areas
empty. `Hard Light`, `Hard Mix`, and `Luminosity` are exceptions: where the
module is bright, they can still light an empty area.

Effects built for a whole picture see the chain over black: an `INSERT`'s
Insert FX, `SCOPE`'s Insert FX, `FEEDBACK`'s `Pre` and `Post` Insert FX, and
ISF filters. They behave exactly as on a black background, and wherever they
draw nothing the area stays empty. An effect that lights an empty area, such
as a `Glow` halo or `Invert` turning black to white, makes that area visible. A
generator's own Insert FX run on that module's picture before it enters the
chain, so they see its see-through areas.

Related: [Insert FX Chains](../insert-fx-chains/),
[AUX Sends and Buses](../aux-sends-and-buses/).
