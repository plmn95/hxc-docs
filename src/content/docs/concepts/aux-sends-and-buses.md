---
title: "AUX Sends and Buses"
description: "Route, duplicate, and combine module outputs with AUX buses, sends, and returns in Hex Composer."
---

Images can be redirected, duplicated, and combined via the `AUX` buses.
Every module has a `SENDS` section from which the chain image after that
module can be sent to one or more of the `AUX` buses. This includes any
earlier images still visible at that point. An `AUX` bus can be read by an
`INSERT` module through its `Source` Selector, or by `FEEDBACK` through
`Input source`. A single module can send to multiple buses, and multiple
modules can send to a single bus. Use the `AUX` buses to split an image and
send it to multiple other modules, or to merge images from several points
in the chain.

Keep senders to the left of their readers in `Chain`: a reader only sees
contributions made before it runs.

Related: [AUX Buses](../../reference/windows/aux-buses-monitor/),
[Insert FX Chains](../insert-fx-chains/), [Signal Chain](../signal-chain/).
