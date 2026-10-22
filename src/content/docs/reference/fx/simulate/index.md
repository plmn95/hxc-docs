---
title: "SIMULATE"
description: "Effects that carry motion or patterns from one frame into the next."
---

Simulations carry motion or patterns from one frame into the next.

- [Fluid](fluid/) smears or bends the image with a flow.
- [Ripple](ripple/) bends the image through moving water.
- [Reaction-Diffusion](reaction-diffusion/) grows patterns steered by the image.

Loading a patch or changing output resolution restarts simulations.
Moving or removing any Insert FX slot restarts simulations in that module.
Simulations run below the output resolution and share a GPU memory limit
within each deck. If a simulation cannot start, its panel
reports the problem and its input passes through unchanged. For a memory
limit warning, reduce output resolution or remove another simulation.

## Reset with modulation

Each simulation has a `Reset` button and Lamp. The Lamp flashes for both
manual and modulated resets.

To reset with modulation, let the assigned value fall below 0.25, then rise
to 0.5 or higher. It must fall below 0.25 again before another reset can
fire. A synced square LFO resets once per cycle; an Envelope triggered by a
MIDI note or audio threshold resets on each hit.

MIDI Velocity holds its last value between notes. Repeated notes with the
same velocity do not cross the threshold again; use an Envelope with a
MIDI Note trigger instead.
