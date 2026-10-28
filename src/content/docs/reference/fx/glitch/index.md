---
title: "GLITCH"
description: "Codec-style glitches: pictures dragged along their own movement, and broken blocks."
---

Glitch effects break the picture the way damaged digital video does.

- [Datamosh](datamosh/) drags the picture along its own movement instead of
  updating it, like a video with its keyframes cut out.
- [Block Crunch](block-crunch/) breaks the picture into blocks that slide,
  repeat and flatten into a few colors.

Their order in the Insert FX chain matters: Block Crunch before Datamosh
smears the broken blocks, Datamosh before Block Crunch breaks up the smear.
