---
title: "Export Video"
description: "Render the patch frame by frame to an MP4, WebM or GIF file."
---

`File > Export Video` opens this dialog. `Export` starts rendering, the
dialog shows a preview of the latest frame with the progress, and `Cancel`
(or `Esc`) stops the export and deletes the unfinished file. When the file
is written, the dialog shows its name and size, and `Show in Folder` opens
the folder.

| Control | Covers |
|---|---|
| For | A preset that fills the rows below: `Instagram & TikTok` (MP4, 1080, 30 fps, High), `X & YouTube` (MP4, 1920, 30 fps, High), `Discord GIF` (GIF, 480, 25 fps, 128 colors) or `Web (WebM)` (WebM, Output size, 30 fps, Medium). Changing any row switches it to `Custom`. |
| Format | `MP4` (H.264), `WebM` (VP9) or `GIF`. A format this computer's build can't write is unavailable. |
| Size | The long edge in pixels: `Output size`, `1920`, `1080`, `720` or `480`. Each entry shows the resulting width and height. The shape always follows the Output; change it in `Settings > Output`. The dialog notes when the preset's platform expects another shape, for example 9:16 for Instagram and TikTok. |
| Length | Seconds to render, up to 60 for a GIF and 600 for MP4 and WebM. |
| FPS | `24`, `25`, `30` or `60`. A GIF offers `10`, `20`, `25` or `50`, the rates a GIF plays back exactly. |
| Quality | `Low`, `Medium` or `High` (MP4 and WebM). |
| Colors | `256`, `128` or `64` colors for the whole GIF. Fewer colors make a smaller file. |
| Smooth gradients | GIF only. Blends neighboring colors in a fixed fine pattern so gradients don't band. |
| Transparent background | WebM only. Keeps the picture's transparency, as NDI, Spout and Syphon send it. Off, empty parts of the picture are black. |

A GIF renders twice: once to choose its colors, then again to write the
file, so it takes about twice as long as a video of the same length. After
a `Discord GIF` export larger than Discord's 10 MB upload limit, the dialog
suggests a smaller Size, fewer Colors or a shorter Length.

**NOTE:** the demo edition adds a small Hex Composer mark to exported files,
as it does to recordings and stills.

Related: [Output and Recording](../../../concepts/output-and-recording/).
