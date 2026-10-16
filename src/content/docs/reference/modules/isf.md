---
title: "ISF"
description: "Load an Interactive Shader Format shader and control the parameters declared by its inputs."
---

Runs an ISF (Interactive Shader Format) shader loaded with `Load .fs...`.
The shader's inputs determine the available parameters.

| Parameter | Control | Notes |
|---|---|---|
| Shader | file picker (`Load .fs...`) | |
| Blend | Selector | How the shader's result lands on the chain; see [Blend modes](../../../concepts/signal-chain/#blend-modes). |
| Mix | Trough | Wet/dry of the shader's result. |
| Shader Inputs | varies | Generated from the loaded shader's own metadata; shape and count vary shader to shader. |

The module's Insert FX run after the shader. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

## Filters and generators

A shader whose header declares an input with `"TYPE": "image"` (usually
named `inputImage`; transitions declare two) is a filter and reads the chain.
A shader with no image input is a generator.

A filter receives the chain over black. Its
result, after the module's own Insert FX, keeps the chain's see-through
areas: wherever the chain above has anything, the result is kept as drawn;
where the chain is empty, only the parts the shader lights are kept and dark
parts stay empty. A generator's result is used as drawn, with its own alpha.
See [Signal Chain](../../../concepts/signal-chain/).

**NOTE:** a filter set to `Blend` XOR or Phoenix treats a dark result over
an empty area as empty.

## Looping shaders

Besides the standard ISF values, Hex Composer gives every shader two
uniforms for the [Perfect loop](../../windows/export-video/#perfect-loop):

| Uniform | Value |
|---|---|
| `LOOPPHASE` | Position in the loop, rising from 0 to 1, then starting again. Over 4 bars at the current BPM while `Perfect loop` is off. |
| `LOOPLENGTH` | The loop's length in seconds (4 bars while it's off). |

A shader that animates from `TIME` doesn't repeat with the loop; one that
animates from `LOOPPHASE` does. Turn whole cycles per loop, for example
`sin(LOOPPHASE * 6.2831853 * 3.0)` for three cycles. Hex Composer also
defines `HEXCOMPOSER_LOOP`, so a shader can fall back to `TIME` in other
ISF hosts:

```glsl
#ifdef HEXCOMPOSER_LOOP
    float t = LOOPPHASE * LOOPLENGTH;   // loops with Perfect loop
#else
    float t = TIME;
#endif
```

An input of the shader's own named `LOOPPHASE` or `LOOPLENGTH` keeps its
own value. Persistent buffers warm up for one loop before an export.

Related: [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
