---
title: "ISF"
description: "Load an Interactive Shader Format shader and control the parameters declared by its inputs."
---

ISF runs an Interactive Shader Format shader. Open `Parameters` and choose
`Load .fs...` to load one; its declared inputs determine the available controls.

| Parameter | Control | Notes |
|---|---|---|
| `Mix` / `Blend` | Trough, Selector | Strength and [blend mode](../../../concepts/signal-chain/#blend-modes) of the shader's result against the chain. |
| Shader inputs | Varies | Names, ranges, and control types come from the shader. |

The module's Insert FX run after the shader. See
[Insert FX Chains](../../../concepts/insert-fx-chains/).

## Filters and generators

A shader whose header declares an input with `"TYPE": "image"` (usually
named `inputImage`; transitions declare two) is a filter and reads the chain.
A shader with no image input is a generator.

A filter receives the chain over black. After the module's Insert FX, its
result preserves the chain's transparency: where the chain has picture,
the result is kept as drawn. Where the chain is empty, lit areas are kept
and dark areas stay empty. A generator's result uses the shader's own alpha.
See [Signal Chain](../../../concepts/signal-chain/).

A filter with `Blend` set to `XOR` or `Phoenix` also leaves dark results over
empty areas transparent.

## Looping shaders

Besides the standard ISF values, Hex Composer gives every shader two
uniforms for the [Perfect loop](../../windows/export-video/#length-and-loops):

| Uniform | Value |
|---|---|
| `LOOPPHASE` | Position in the loop, rising from 0 to 1, then starting again. Over 4 bars at the current BPM while `Perfect loop` is off. |
| `LOOPLENGTH` | The loop's length in seconds (4 bars while it's off). |

`TIME` and `FRAMEINDEX` do not follow the loop clock. The export's
[Crossfade](../../windows/export-video/#crossfades) fades the end into the
start. Use a whole number of cycles of `LOOPPHASE` to
repeat exactly, for example `sin(LOOPPHASE * 6.2831853 * 3.0)` for three
cycles. Hex Composer defines `HEXCOMPOSER_LOOP`, so a shader can fall back to `TIME` in other
ISF hosts:

```glsl
#ifdef HEXCOMPOSER_LOOP
    float t = LOOPPHASE * LOOPLENGTH;   // loops with Perfect loop
#else
    float t = TIME;
#endif
```

An input of the shader's own named `LOOPPHASE` or `LOOPLENGTH` keeps its
own value. Persistent buffers warm up for one loop before an export. The
export's loop check names a shader that reads `TIME` or `FRAMEINDEX` and
not `LOOPPHASE`.

Related: [AUX Sends and Buses](../../../concepts/aux-sends-and-buses/).
