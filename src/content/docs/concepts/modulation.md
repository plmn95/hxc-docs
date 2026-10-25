---
title: "Modulation"
description: "Assign modulation sources, adjust their depth, and inspect active parameter assignments."
---

Modulation lets a source, such as an LFO or an audio signal, change a
parameter’s value for you. The parameter being controlled is called the
modulation target. An LFO can modulate a shape’s size, for example, while
an audio level can modulate its brightness.

Assigning a source to a target creates a modulation assignment. You can
make an assignment by right-clicking a parameter and choosing
`Edit Modulation...`, dragging a modulation source onto a target, or
selecting a source and target in the empty row of the
[Mod Matrix](../../reference/windows/mod-matrix/). The Mod Matrix lists
the assignments so they can be viewed and edited together.

![Connection editor showing Size as the target, LFO 1 selected as the source, and Depth set to 0.18 (18%).](../../images/concepts/modulation/assignment.png)

In this example, `LFO 1` is the source and `Size` is the target.

Each assignment has a `Depth`, which controls how far the source moves the
target’s value. A negative Depth reverses the direction. Several sources
can affect the same target, with each assignment contributing its own
adjustment.

Related: [Modulation Sources](../../reference/modulation/),
[MIDI and OpenSoundControl Learn](../midi-and-opensoundcontrol-learn/).
