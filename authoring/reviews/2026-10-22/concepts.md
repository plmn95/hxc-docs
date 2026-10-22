# Concepts standards pass

Reviewed every page in `src/content/docs/concepts/` (13 pages). All 13 changed; no paths moved or removed. No app source, guides, screenshots, commits, packages, or publication changed by this agent.

## Baseline and evidence

Product checks used the exact released v0.21.1 source snapshot, peeled commit `c2427521416e4800277a59c2b869c41de2d193bc`, identified by root. Root established v0.21.2 is the latest release and has no app UI/shader changes relative to that source. The dirty app working checkout is older than the releases and was not used to infer new UI labels. The similarly named unversioned temporary source directory was not treated as identified evidence.

This was a prose and source review, not a new live UI check. Preserved root's earlier v0.21.1 live-verified modulation picker sequence and default dock layout. No claim that source inspection establishes full live operation on all platforms.

## Complete page inventory

| Page | Changed | Useful material retained / evidence |
|---|---|---|
| `index.md` | Replaced catalog/internal descriptions with what each concept helps a reader understand. | All existing routes and order retained; names checked against owned page titles. |
| `aux-sends-and-buses.md` | Split the dense paragraph; explained branching, combined sends, reader order, and monitor access. Corrected `FEEDBACK` control to `Input source`. Added the important fact that a send contains the chain image after its host, including earlier visible content. | Multiple writers/readers retained. `src/renderer/crt_renderer.cpp` after each host blend calls sends with the resulting chain image (OSC around 2506–2538, SHAPE 2579–2603). Bus frame/order rules in `src/renderer/aux_bus.h`. FEEDBACK selector `src/app.cpp:8059`, INSERT selector `:8126`; monitor `:14500` onward. |
| `chain-groups.md` | Started from the reason to group. Corrected the false promise that grouping never changes render order: nonadjacent selections move together at the earliest selected chain position and can change output. Removed a menu catalog. | Modifier selection, collapse selection/expand behavior, and Ungroup preserving modules retained. `src/patch/patch.cpp:99–144` sorts selection by chain position and gathers it at the earliest position; `src/ui/chain_strip.cpp:409` onward handles collapsed member and menus. |
| `docking-and-layout.md` | Explained dragging/docking and the frequent hidden-behind-a-tab case, instead of listing the View menu. | Named layout save/restore kept. Default tab arrangement was already live verified by root; menu source `src/app.cpp:1050` onward and docking setup. |
| `export-video.md` | Made export's reason clear; removed deterministic-file guarantees that ignored input differences. Separated formats/inputs, loop behavior, and song export. Corrected obsolete `Audio` to `Song`/`Choose Song...`/`Use song`, split crossfade names to `Video crossfade` and `Audio crossfade`, and corrected song/start persistence to patch storage. Reduced detailed audio timing math in favor of the full reference. | Format/length limits, held live inputs, CV/Gate silence, warm-up, snapping, loop rate adjustment, GIF silence, mux codec choices, and app-versus-patch settings retained. `src/app.cpp:1026`, `:1170–1390` export setup, `:1640–1840` song rows/audio fit, `:1887–2090` separate fades; `src/engine/export_plan.h` format timing and limits; `src/engine/export_audio.h` audio plan; song snapshot serialization. Root owns matching reference corrections. |
| `insert-fx-chains.md` | Replaced a slot-count opening with processing one generator before its image blends into the chain. | Eight-slot operating limit, ordered processing, bypass, copy/paste replacement versus insertion, no copied modulation, Mix, Region merge, and FEEDBACK Pre/Post retained. `src/engine_limits.h:41` cap; `src/app.cpp:5438–5850` controls; `src/patch/clipboard.h` payload has slot values, no modulation assignments; `src/renderer/crt_renderer.cpp` generator processing and insert region handling. |
| `midi-and-opensoundcontrol-learn.md` | Opened with avoiding manual CC/address entry. Added same-key cancellation. Matched picker `LEARN` casing. | Retargeting, next-message behavior, duplicate prevention, assignment preservation, and MIDI-only toolbar indicator retained. `src/app.cpp:12730–12810` picker Rockers, `:21413–21480` consumption, `:21645–21659` bare-key arm/cancel; `:11483` duplicate prevention. |
| `mixer-mode.md` | Explained performing with two patches; shortened bank/internal accounting; grouped source ownership and performance controls. | Deck patches' own sources remain distinct from mixer sources; four Macros per deck and labels retained because they identify controls, as are matrix and undo isolation, hide/exit and recording behavior. `src/app.cpp:12101` popup store separation; `:15444` mixer matrix; `:18193` mixer modulation source handling; `:21611–21635` entry/exit; mixer toolbar and recording code. |
| `modulation-matrix.md` | Added the base-value/contribution mental model, removed duplicate matrix sentence, corrected obsolete `Clear All Modulation` to `Clear All` and made its per-parameter scope explicit. | Earlier live-verified `Edit Modulation...` / `+ Add Source` / `Pick a source` / LFO card / Depth / Offset / Done sequence retained. Signed target-unit depth, offset, meta-modulation, multiple sources, separate mixer matrix, Loop Phase, and undo retained. `src/app.cpp:12000–13304` release popup implementation, especially `:12481` clear target; `src/modulation/mod_matrix.cpp:298` additive contribution and route-target pass; `src/modulation/target_catalog.cpp:764–780` route Depth/Offset. |
| `output-and-recording.md` | Focused on live capture and sending output. Removed a large duplicate export section and its incorrect "no audio" claim, linking to dedicated export concept. Removed stale NDI installer prose and Steam/reprobe narration; the app gives platform instructions under unavailable controls. | Recording codec/audio/fps setup, overload/skipped frames, asynchronous final write/Saving state, output alpha differences, sender platform limits, Dual Monitor and Display Fit retained. `src/app.cpp:2634` skipped-frame message, `:3550` Saving state, `:14070–14200` settings, `:21057` actual NDI platform instructions; `src/io/video_recorder.cpp` write/finalize lifecycle and renderer/output routing. |
| `patches-slots-and-banks.md` | Explained patch/slot/bank relationship; grouped saving, version compatibility, and startup choice. Cut app-history framing and risk boilerplate. | Save path distinctions, bank replacement, compatibility extensions, factory exclusion from recents, newer-file confirmation, unattended skip and startup precedence retained. `src/app.cpp:20366–20452` factory/startup identity; `:20535–20605` bank load/save wrapper; `:13381` newer-version dialog. `src/io/file_types.h` current/compatible extensions. |
| `reading-the-panel.md` | Tightened speed explanation, matched `+ Add`, clarified literal UI values. Corrected bare time entry from "displayed unit" to seconds. | Whole control vocabulary table and meaningful interface colors retained. Explicit time/rate unit examples, zero/negative behavior, individual display persistence, slow-value travel and alternate tooltip retained. `src/modulation/rate_units.h` formatting and `parseSpeed` (bare time input always seconds), `src/ui/widgets/param_row.cpp:938` direct parsing call, `src/app.cpp:10851` Show as Time action. Root should consider the targeted live check below. |
| `signal-chain.md` | Corrected chain order from top-to-bottom to left-to-right. Distinguished generator contributions from input processing; removed duplicate Blend menu narration; backticked menu entries; replaced vague Soft/Hard Light explanations. Corrected the claim that every reveal mode reproduces the source unchanged over empty space (XOR thresholds it). | Full blend table, LIVE/BYP/MUTE distinctions, Divide persistence edge case, empty-area behavior, receiver transparency, and whole-image versus generator effects retained. Horizontal strip `src/ui/chain_strip.cpp` uses SameLine and horizontal scrolling. Render order/state handling in `src/renderer/crt_renderer.cpp`; UI names/tooltips in `src/renderer/blend_modes.h`; actual reveal/alpha rules in `src/renderer/shaders/composite.frag` and formulas in `blend_modes.glsl`. |

## Checks performed

- `npm run check:docs` passed, validating all 110 pages present at check time, metadata/routes/local image and patch assets.
- `git diff --check -- src/content/docs/concepts` passed.
- Body-only style scan found no em dash, decorative arrow, banned stock words, generic slider/toggle/dropdown terms, or line ending in a slash/hyphen. YAML delimiter false positives excluded.
- Searched the whole authored tree for incoming fragment links affected by rewritten concept headings: none found.
- All changed links resolve to existing concept/reference routes. No new assets or special Markdown features introduced.
- Did not run the site build, editor corpus, or live apps; root coordinates final integrated checks.

## Unresolved / targeted live check

The released parser treats a bare number in `Show as Time` as **seconds**, even when the display reads ms/min. This contradicts the original page and some comments in source. Actual direct parse call supports the new wording. Existing tests cover `8` as 8 seconds but do not cover bare input after an ms/min display. A quick live check in the identified capture app would confirm the awkward edge and may warrant a separate app bug; no app change is part of this pass. Explicit units (`500ms`, `2min`) are unambiguous.

Other new/changed concept claims were source-reviewed, with no new live verification beyond root's recorded milestone checks. Do not report a complete live manual run or Windows/Linux UI validation.

## Task-guide candidates

Do not turn these concept pages into long tutorials. Future short guides could use checked starting patches:

- Make an audio spectrum (user-requested example; root coordinates).
- Map a MIDI fader to one visible parameter (requires a real controller/input capture).
- Process two copies of a pattern differently with an AUX branch (the send is the chain at that point, not an isolated generator).
- Export a repeating loop from a supplied patch, with one rate to Snap and a visible comparison; optional exploration should name a useful control/change, without mandatory enter-and-undo sequences.

These are candidates only; no guides added by this agent.
