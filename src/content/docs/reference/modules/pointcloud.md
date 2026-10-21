---
title: "POINTCLOUD"
description: "Renders the chain, or an AUX bus, as a 3D field of points or lines, displaced by brightness."
---

POINTCLOUD turns the chain or an AUX bus into a 3D field of points, lines,
or cubes. Brightness controls depth; `Shape` determines their arrangement.

In the volume shapes, `Galaxy Spiral`, `Noise Blob`, and `Strange Attractor`,
each point keeps the color sampled before rotation. Turning the shape
turns the picture and its depth with it; the back shows the picture mirrored.
`Spectrum` wraps the image into a ring that expands with the audio input.

On any output shape, Sphere, the volume shapes, Galaxy Spiral, Noise Blob,
Strange Attractor and Spectrum stay round and fit the shorter side of the
frame, while Flat and Flow fill it. Zoom makes them bigger.

| Parameter | Control | Notes |
|---|---|---|
| `Color Source` | Selector | `Chain composite (default)` or `AUX 1` to `AUX 8`. |
| `Depth Source` | Selector | `Generated (default)` uses `Color Source` brightness. `AUX 1` to `AUX 8` use a separate depth map. |
| `Mix` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the point cloud against the chain. |
| `Shape` | Selector | Surfaces: `Flat`, `Sphere`. Volumes: `Sphere Volume`, `Box Volume`, `Torus`. Organic: `Flow`, `Galaxy Spiral`, `Noise Blob`. Math: `Strange Attractor`. Audio: `Spectrum`. Fixed to `Flat` while `Style` is `Voxels`. |
| `Density` | Trough | Point and line resolution, 0 to 1. In `Voxels`, maps to 8 to 256 cubes across the longest side. |
| `Depth Amount` | Trough | Brightness displacement, 0 to 1. Controls cube column height in `Voxels`; pushes points radially in volumes, `Noise Blob`, and `Strange Attractor`; pushes toward or away from the camera in `Flat` and `Galaxy Spiral`. |
| `Perspective` | Trough | 0 gives the strongest perspective; 2 is close to flat. |
| `Zoom` | Trough | Magnification of the whole field, 0.1 to 4. Lower it if rotation pushes corners outside the frame. |
| `Orbit` / `Tilt` / `Roll` | Wheel | -180 to 180 degrees. `Orbit` turns around the vertical axis; `Tilt` tips forward or back. `Roll` spins in the shape's plane before the other rotations. The outer, middle, and inner beads control `Orbit`, `Tilt`, and `Roll`, respectively. |
| `Point Size` | Trough | 0.5 to 8 px. Unavailable for `Solid Mesh` and `Voxels`. |
| `Style` | Selector | `Points`, `Horiz Scanlines`, `Vert Scanlines`, `Depth Circles`, `Wireframe`, `Radial Scan`, `Trail/Comet`, `Solid Mesh`, `Voxels`. Free-point shapes offer only `Points`, `Depth Circles`, and `Trail/Comet`. |
| `Point` | Selector | `Auto`, `Square`, `Round`, `Soft`, or `Ring`. Applies to `Points`, `Depth Circles`, and `Trail/Comet`. `Auto` uses `Square` for `Flat` and `Sphere`, and `Soft` for `Flow`. |
| `Backdrop` | Rocker | With `Blend` set to `Replace`, removes the chain behind the points. Gaps stay transparent, appearing black in Output. |
| `Trail` | Trough | Previous-frame persistence, 0 to 1. `Trail/Comet` only. |
| `Cutoff` | Trough | Hides dark or distant cubes, 0 to 1. `Voxels` only. |
| `Shading` | Trough | Contrast between cube faces, 0 to 1. At 0, faces have flat color. `Voxels` only. |
| `Edges` | Trough | Lines between cubes, 0 to 1. At 0, cubes form a solid surface. `Voxels` only. |

## Shape-specific controls

These Troughs run from 0 to 1. Controls for other shapes are hidden.

| Shape | Controls |
|---|---|
| `Sphere Volume` | `Thickness`: 0 gives a hollow shell; 1 fills the ball. |
| `Box Volume` | `Shell`: 0 fills the block; 1 keeps only its outside faces. |
| `Torus` | `Fill`: 0 gives a thin skin; 1 fills the tube. `Tube Size` sets the tube's thickness. |
| `Galaxy Spiral` | `Arms` maps to 2 to 6 spiral arms. `Twist` tightens their winding. |
| `Noise Blob` | `Turbulence` distorts the ball. `Thickness` fills it. |
| `Strange Attractor` | `Detail` resolves the curve, with greater rendering cost at high values. `Speed` controls how quickly it changes shape; 0 holds still. Right-click `Speed` and choose `Show as Time` for the cycle duration. The `Curve` Selector offers `Lorenz`, `Aizawa`, or `Thomas`. |
| `Spectrum` | `Height` sets the audio-driven expansion. `Smoothing` slows the fall after a beat; 0 falls immediately. |

With [Perfect loop](../../windows/export-video/#length-and-loops) on, `Flow`, `Galaxy Spiral`, and `Noise Blob` turn a
whole number of times per loop. Their motion is slow, so in loops shorter
than about a minute they hold still. `Snap` sets `Strange Attractor`'s
`Speed` to whole turns per loop, or to 0 when one turn doesn't fit its range.
`Trail/Comet` warms up for one loop before an export.

Related: [Insert FX Chains](../../../concepts/insert-fx-chains/),
[AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
