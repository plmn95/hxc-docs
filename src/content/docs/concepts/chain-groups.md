---
title: "Chain Groups"
description: "Name and collapse related modules in Chain, and move them together."
---

Group related modules to name, collapse, or move them together in `Chain`.
Groups do not add another processing stage; their members still run in
chain order.

`Ctrl+click` (Windows/Linux) or `Cmd+click` (macOS) selects multiple
pills. Right-click the selection and choose `Group Selected`. If other
modules sit between the selected ones, grouping moves the selection
together at its earliest position in the chain. The selected modules keep
their relative order, but their order against unselected modules changes,
which can change the output.

The group's right-click menu offers naming, color, and collapse controls.
A collapsed group shows its first member; clicking it selects that member
and expands the group. `Ungroup` leaves the modules in place.

Related: [Signal Chain](../signal-chain/).
