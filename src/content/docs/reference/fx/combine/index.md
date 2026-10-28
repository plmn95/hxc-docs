---
title: "COMBINE"
description: "Effects that bring a second picture in from an AUX bus."
---

Combine effects work with two pictures: the module's own image and a second
picture read from an [AUX bus](../../../concepts/aux-sends-and-buses/).

- [Morph](morph/) turns the image into the picture on an AUX bus.

[Datamosh](../glitch/datamosh/) can also take its movement from a picture on
an AUX bus.

The bus is read as it stands where the module sits in `Chain`, so the module
that sends to it must sit to its left. Until something has been sent to the
bus, the effect passes its image through unchanged and its panel says so.
