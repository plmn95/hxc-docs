---
title: "Mixer Controls"
description: "Controls for mixing the two decks."
---

Controls for mixing the two decks.

| Control | Notes |
|---|---|
| Solo | Shows a single deck. |
| Crossfader | Hidden while Solo is on. |
| Mode | Crossfade / Blend, Luma Key, Chroma Key, Strobe, or Dirty Mix. |
| `Negative (invert B)` | Inverts Deck B, independent of Mode. |
| Quality | `Half-res decks` or `Full-res decks`. |
| BPM | The shared transport tempo, with a `TAP` button beside it. A Lamp reads `strobe-sync` while Strobe is locked to a division. |
| `Hide Controls` | Hides the on-screen controls, same as `H`. |

Each Mode adds its own controls: Crossfade / Blend picks how Deck B lands
on Deck A from the shared [Blend modes](../../../concepts/signal-chain/#blend-modes),
with Crossfade in place of Replace; Luma Key and Chroma Key each
add a Threshold and Softness (Chroma Key also adds a key-color swatch);
Strobe adds a rate, free-running (Free) or locked to a BPM division
(Beat-synced); right-click the free Rate to show the time per flash; Dirty
Mix adds its own Sum (Add/Difference) and Overflow (Clip/Wrap) modes, a
Center (Clean/Hot) mode, Invert A, Invert B and Hard-cut Rockers, and an
Artifacts section (H-Tear, V-Roll, RGB Bleed, Dropout), each with its own
Rocker and its own amount.

Modulatable mixer controls behave like patch parameters. A modulated
slider's handle moves with its source, with an amber marker and a tick at
the base setting, and hovering lists the sources. Double-click resets a
slider to a fresh mixer's value. The Chroma Key colour swatch shows the
modulated colour, with each channel handled like a slider.

`Negative (invert B)`, `Invert A`, `Invert B` and `Hard-cut` are on/off
gates. The Rocker shows the base setting; while a source drives it, its
lamp shows the live gated state.

Right-clicking a modulatable control offers `MIDI Learn`, `Reset to
Default`, `Copy Value`, `Paste Value`, an Assign submenu per source type,
`Clear All Modulation` and `Open Mod Matrix`. Assigning replaces any
modulation already on that control, same as a patch parameter. Dragging a
Mixer LFO, Envelope or Time header onto a control assigns it the same way.
Several sources can be stacked on one control in the Mixer Mode matrix;
with more than one, the menu's Amount slider gives way to a count.

Related: [Mixer Mode](../../../concepts/mixer-mode/),
[Mod Matrix](../mod-matrix/).
