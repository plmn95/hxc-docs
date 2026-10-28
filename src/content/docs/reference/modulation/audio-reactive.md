---
title: "Audio-Reactive"
description: "Modulate parameters with audio level or frequency bands from a device, application, or song."
---

Use audio level or frequency-band energy to modulate a parameter. Choose an
input in `Settings > Audio`, or load a song with `File > Open Song...`.
The source picker's `Audio` tab shows the available signals as live meters.

| Source | Notes |
|---|---|
| `L Level` / `R Level` | Left or right channel, with per-assignment shaping controls. |
| `Sub`, `Bass`, `Low Mid`, `Mid`, `High Mid`, `Presence`, `Brilliance`, `Air` | Fixed frequency bands, from low to high. |
| `Custom 1` to `Custom 4` | User-defined bands. Set each band's `Lo Hz` and `Hi Hz` in `Settings > Audio > Custom Frequency Bands`. These ranges are app settings shared by patches. The picker shows them as `Cust` followed by the band number and range. |

For `L Level` and `R Level`, `RECTIFY` converts signed peaks to positive
values. `Attack` and `Release` smooth the response. Set `Gate` above 0 to
turn the input into an on/off signal at that threshold.

Frequency bands are already smoothed and ignore these shaping controls.
Each assignment's signed `Depth` determines how far, and in which direction,
the audio moves its target.

Related: [Modulation](../../../concepts/modulation/).
