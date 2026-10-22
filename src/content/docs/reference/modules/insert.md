---
title: "INSERT"
description: "Apply Insert FX to the chain composite or an AUX bus."
---

Use INSERT to apply effects to the accumulated chain, or bring an AUX bus
back into it.

| Parameter | Control | Notes |
|---|---|---|
| `Source` | Selector | `Chain composite (default)`, or `AUX 1` through `AUX 8`. |
| `Blend` | Selector | How the bus combines with the chain; see [Blend modes](../../../concepts/signal-chain/#blend-modes). Available when `Source` is a bus. |
| `Mix` | Trough | How much of the bus reaches the chain, 0 to 1. Available when `Source` is a bus. |

See [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/) for how
buses and sends work together.

INSERT can send to one bus while reading another. A chain holds up to 16
INSERT modules. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

Insert FX process the chain or bus over black. Dark areas remain transparent
unless the input already had picture there.
