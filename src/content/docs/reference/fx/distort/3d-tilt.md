---
title: "3D Tilt"
description: "Turns the whole image in 3D with Point Cloud's camera, without breaking it into points."
---

Turns the whole image in 3D, like a card held in front of a camera. The
controls are the same as [POINTCLOUD](../../../modules/pointcloud/)'s camera,
so a picture and a point cloud with the same settings turn the same way.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| `Orbit` / `Tilt` / `Roll` | Wheel | -180 to 180 degrees | `Orbit` turns around the vertical axis; `Tilt` tips the top toward or away from you. `Roll` spins the image in its own plane before the other rotations. The outer, middle, and inner beads control `Orbit`, `Tilt`, and `Roll`, respectively. |
| `Back` | Selector | Show, Hide | What shows while the image faces away. Show draws its back, mirrored like the back of a card. Hide leaves the frame see-through until it turns to face you again. Default Show. Can be modulated: it switches half way. |
| `Perspective` | Trough | 0 to 2 | 0 gives the strongest perspective; 2 is close to flat. No effect until `Orbit` or `Tilt` turns the image. |
| `Zoom` | Trough | 0.1 to 4 | Magnifies or shrinks the turned image around the middle of the frame. Lower it if a turn pushes corners outside the frame. |
| `Edges` | Selector | Extend, Empty, Mirror, Tile | What fills the frame around the turned image, as in [Transform](../transform/#edges). Default Empty. Can be modulated. |
| `Fade` | Trough | 0 to 1 | Fades the far parts of the image until they are see-through. 0 is off; higher values start the fade closer. Default 0.5. |

With every angle at 0 and `Zoom` at 1, 3D Tilt leaves the image unchanged,
whatever the other settings.

## Edges and the horizon

Empty leaves the frame around the turned image see-through. Like
Transform's Empty, that only shows a layer underneath when 3D Tilt sits in a
generator's own Insert FX; in an `INSERT`, `SCOPE` or `FEEDBACK` Insert FX
the `Output` window shows it as black. See
[Empty areas](../../../../concepts/signal-chain/#empty-areas).

Mirror and Tile repeat the image across the whole plane, out to the
horizon. Far away the copies get too small to show cleanly, so `Fade` melts
them away before they shimmer. The image itself, unturned, is never faded,
and at the default `Fade` a single turned image keeps its full strength.

Extend stretches the outermost pixels outward. In perspective that draws
streaks running to the horizon.

When the image turns edge-on, it fades out over the last degree or so
instead of jumping, so a Tile plane sweeping through 90 degrees stays smooth.

## Recipes

- **Endless floor.** Set `Tilt` to about -80, `Edges` to Tile and `Fade` to
  0.5. The image becomes a floor stretching to a horizon across the frame.
  Modulate `Roll` to spin the floor under you.
- **Card flip.** Route an LFO to `Orbit` with a full -180 to 180 sweep.
  Set `Back` to Hide for a card with a blank back.
- **Turning tunnel.** Put 3D Tilt in a `FEEDBACK` `Pre` Insert FX with
  `Zoom` around 0.95 and a few degrees of `Orbit` and `Tilt`. Each lap turns
  the picture a little further away.

Related: [Insert FX Chains](../../../../concepts/insert-fx-chains/).
