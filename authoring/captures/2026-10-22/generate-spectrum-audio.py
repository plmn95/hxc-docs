#!/usr/bin/env python3
"""Recreate the original capture-session audio; never bundled in the manual."""
import argparse
import math
import struct
import wave

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("output", help="Destination WAV path")
args = parser.parse_args()
rate, duration = 48000, 16
voices = [100, 330, 900, 2500, 6200]
with wave.open(args.output, "wb") as output:
    output.setparams((2, 2, rate, 0, "NONE", "not compressed"))
    frames = bytearray()
    for i in range(rate * duration):
        t = i / rate
        envelope = min(t / .1, 1) * min((duration - t) / .2, 1)
        value = envelope * sum(
            (.008 + .025 * (.5 + .5 * math.sin(2 * math.pi * (.35 + j * .11) * t)))
            * math.sin(2 * math.pi * frequency * t)
            for j, frequency in enumerate(voices)
        )
        sample = max(-32768, min(32767, int(value * 32767)))
        frames.extend(struct.pack("<hh", sample, sample))
    output.writeframes(frames)
