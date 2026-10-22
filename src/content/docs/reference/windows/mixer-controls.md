---
title: "Mixer Controls"
description: "Deck selection, crossfade, keying, strobe, and Dirty Mix controls."
---

Open Mixer Mode with `F3` (`Fn+F3` if required on macOS). These controls
combine Deck A and Deck B before the final output.

| Control | Notes |
|---|---|
| `SOLO` | Shows a single deck. |
| Crossfader | Hidden while `SOLO` is on. |
| Mode | Crossfade / Blend, Luma Key, Chroma Key, Strobe, or Dirty Mix. |
| `INVERT B` | Inverts Deck B, independent of Mode. |
| Quality | `Half-res decks` or `Full-res decks`. |
| BPM | The shared transport tempo, with a `TAP` button beside it. A Lamp reads `strobe-sync` while Strobe is locked to a division. |
| `Hide Controls` | Hides the on-screen controls, same as `H`. |

| `Mode` | Additional controls |
|---|---|
| `Crossfade / Blend` | Chooses how Deck B blends with Deck A. Uses the shared [blend modes](../../../concepts/signal-chain/#blend-modes), with Crossfade in place of Replace. |
| `Luma Key` | `Threshold` and `Softness`. |
| `Chroma Key` | Key-color swatch, `Tolerance`, and `Softness`. |
| `Strobe` | Rate, either `Free` or `Beat-synced`. Right-click a free rate to show the time per flash. |
| `Dirty Mix` | `Sum` (Add/Difference), `Overflow` (Clip/Wrap), `Center` (Clean/Hot), `INVERT A`, `INVERT B`, and `HARD-CUT` Rockers, plus `H-TEAR`, `V-ROLL`, `RGB BLEED`, and `DROPOUT` amounts. |

Modulatable mixer controls behave like patch parameters. A modulated
Trough's handle moves with its source, with an amber marker and a tick at
the base setting, and hovering lists the sources. Double-click resets a
Trough to a fresh mixer's value. The Chroma Key colour swatch shows the
modulated colour, with each channel handled like a Trough.

The inversion and `HARD-CUT` Rockers are on/off gates. The Rocker shows the base setting; while a source drives it, its
lamp shows the live gated state.

Right-click a modulatable control and choose `Edit Modulation...` to add
or edit its sources. The menu also provides `MIDI Learn`, `Reset to
Default`, `Copy Value`, `Paste Value`, and `Open Mod Matrix`. Dragging a
Mixer LFO, Envelope, or Time header onto a control also assigns it.
Multiple sources can drive one control.

Related: [Mixer Mode](../../../concepts/mixer-mode/),
[Mod Matrix](../mod-matrix/).
