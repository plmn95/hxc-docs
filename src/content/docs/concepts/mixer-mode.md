---
title: "Mixer Mode"
description: "Mix two patches during a live performance, with shared controls and modulation."
---

Use Mixer Mode to perform with two patches and mix their images. `F3`
(`Fn+F3` on some macOS keyboards) opens the decks. Each deck holds its own
patch; [Mixer Controls](../../reference/windows/mixer-controls/) describes
how they combine.

## Modulation in the mixer

The mixer has its own LFO, Envelope, and Time sources, separate from the
sources inside each deck's patch. Those mixer sources can move mixer
controls and their own settings. Macros belong to each deck: `A1` to `A4`
and `B1` to `B4`.

Right-click a mixer parameter to edit its modulation or use `MIDI Learn`.
A dot marks a parameter with modulation. `X` opens the mixer's
[Mod Matrix](../../reference/windows/mod-matrix/) beside the mixer panel;
it lists mixer assignments, not assignments inside the deck patches.
Mixer edits have a separate undo/redo history from patch edits.

## Perform and record

`H` hides or shows the controls. `Escape` first restores hidden controls;
if they are already visible, it exits Mixer Mode.

The top strip keeps the `REC` pill, snapshot control, recording timer, and
recording settings available. `Ctrl+Alt+R` (`Cmd+Option+R` on macOS) starts
or stops recording the mixed output. When the controls are hidden, a red
Lamp in the corner indicates an active recording.

Related: [Output and Recording](../output-and-recording/).
