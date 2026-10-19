---
title: "Deflection Error"
description: "Simulates an unstable CRT deflection coil: image roll, line bend, sync jitter, and flicker, layered independently."
---

Simulates an unstable CRT deflection coil: image roll, line bend, sync
jitter, and flicker, layered independently.

| Parameter | Control | Range | Notes |
|---|---|---|---|
| Amount | Trough | 0 to 1 | |
| Roll Speed | Trough | 0 to 3 Hz | Rolls per second. Right-click to show the time one roll takes. |
| Line Bend | Trough | 0 to 1 | |
| Sync Jitter | Trough | 0 to 1 | |
| Flicker Amount | Trough | 0 to 1 | |
| Flicker Rate | Trough | 0.5 to 60Hz | Field swaps per second. Right-click to show the time between swaps. |
| Roll Mode | Selector | Seamless, Tear Band | Cannot be modulated. |
| Video Standard | Selector | NTSC, PAL | Cannot be modulated. |

**NOTE:** setting Roll Speed to 0 stops the roll at its current position.
Use `Reset Roll` to restore the image's position.

With [Perfect loop](../../../windows/export-video/#perfect-loop) on, the roll and flicker start again at each
loop start, and the hum, jitter and line bend repeat every loop. `Snap`
sets Roll Speed and Flicker Rate to whole cycles per loop.

Related: [Insert FX Chains](../../../../concepts/insert-fx-chains/).
