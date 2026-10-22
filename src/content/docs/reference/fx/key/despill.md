---
title: "Despill"
description: "Reduces green or blue spill on a subject without changing transparency."
---

Reduces green or blue spill on a subject without changing transparency.
Place it after [Chroma Key](../chroma-key/).

| Parameter | Control | Options / Range | Notes |
|---|---|---|---|
| `Spill Channel` | Selector | `Green Screen`, `Blue Screen` | Cannot be modulated. |
| `Follow Chroma Key` | Selector | `Manual`, `Follow` | `Follow` uses the nearest earlier Chroma Key in the same chain. If none is found, it uses `Spill Channel`. Cannot be modulated. |
| `Strength` | Trough | 0 to 1 | 0 preserves the original color; 1 applies full spill reduction. |
