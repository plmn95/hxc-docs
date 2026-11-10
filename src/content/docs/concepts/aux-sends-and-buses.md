---
title: "AUX Sends and Buses"
description: "Route, duplicate, and combine module outputs with AUX buses, sends, and returns in Hex Composer."
---

The image at a given point in the chain can be redirected, duplicated, and combined via the `AUX` buses.
Every module has a `SENDS` section from which the module's output can be sent to one or more of the `AUX` buses. All AUX buses can be used as the main input for modules with a `source` parameter and to affect how an image is processed in modules with additional optional inputs (ex. depth/color maps, motion inputs, etc.). A single module can send to multiple buses, and multiple
modules can send to a single bus. Use the `AUX` buses to send the same image to multiple points in the chain, or to merge images from multiple points
in the chain at a single point.

`SENDS` can only be returned at a later point in the chain. An AUX bus used as an input will only return `SENDS` from prior modules in the chain.

Related: [AUX Buses](../../reference/windows/aux-buses-monitor/),
[Insert FX Chains](../insert-fx-chains/), [Signal Chain](../signal-chain/).
