---
title: "AUX Sends and Buses"
description: "Route, duplicate, and combine module outputs with AUX buses, sends, and returns in Hex Composer."
---

Use an `AUX` bus to branch the image at one point in the chain, or combine
images from several points before processing them together.

A module's `SENDS` section copies the chain image after that module,
including any earlier images still visible there. Each send has an
`Amount` and `Blend`, so several points in the chain can contribute to the
same bus at different strengths. Sending does not remove the image from
the chain.

Choose the bus in an `INSERT` module's `Source` Selector, or in
`FEEDBACK`'s `Input source`, to read its image. The same bus can supply more
than one reader. Keep senders to the left of their readers in `Chain`: a
reader sees only the contributions made before it runs.

Open `View > AUX Buses` to inspect the bus images and see which modules send
to or read from each bus. Its send controls also let you balance the
contributors without opening each module.

Related: [AUX Buses Monitor](../../reference/windows/aux-buses-monitor/),
[INSERT](../../reference/modules/insert/),
[Signal Chain](../signal-chain/).
