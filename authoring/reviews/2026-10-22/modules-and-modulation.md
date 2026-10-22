# Module and modulation reference pass

Reviewed 22 of 22 owned pages under `src/content/docs/reference/modules/` and `reference/modulation/`. All 22 were revised. No owned page was removed or added. No edits outside these two trees, apart from this temporary review report. No app source changes, UI automation, captures, commits, publishing, or full builds were performed by this agent.

## Evidence identity

Factual corrections were checked against the exact v0.21.1 source snapshot, corresponding to tag commit `c2427521416e4800277a59c2b869c41de2d193bc` supplied by root. Where useful, labels and shader behavior were also checked against the published macOS binary and shaders in the published app bundle’s `Contents/` directory. Binary executable is `MacOS/hexcomposer`; its SHA-256 is already in the capture manifest. Strings were inspected in the released executable string inventory.

Initial source reconnaissance used the app checkout, but this was found older than the release in important places (Roll, Perspective, Song). Final corrections use the exact snapshot. In particular, POINTCLOUD's released Roll and corrected Perspective behavior were preserved. Root confirmed v0.21.2 changes are Windows stability/edit commands/tests, not these UI controls or shaders. This is source/binary inspection, not a new live app test.

## Complete inventory

Paths below are relative to `src/content/docs/reference/`.

| Reviewed page | Final change and useful material retained |
|---|---|
| `modules/index.md` | Kept searchable module table and operating instance caps. Removed incidental noise-family count, corrected SHAPE symmetry description, placed routing links after the table. |
| `modules/feedback.md` | Task-oriented opening links the illustrated guide. Shortened dense parameter text, kept all recipes and routed/Self caveats, corrected actual `Input source` label and sync caps and beat units. Replaced absolute claims about transparent modules/full-frame video with alpha-aware wording. Independent review caught and corrected nondividing Hold: final hold is shorter, not longer. Add and Replace both preserve sparse alpha; only other loop blends flatten it. |
| `modules/insert.md` | Explained use on chain versus AUX. Corrected `Amount` to `Mix`. Preserved source-dependent controls, sends, instance cap, and dark-area transparency. |
| `modules/isf.md` | Actual `Parameters > Load .fs...` path. Removed empty picker row and repetitive metadata wording. Preserved filters/generators, transparency, shader-declared inputs, custom loop uniforms, portable shader example, persistent-buffer warm-up and loop-check behavior. |
| `modules/noise.md` | Explained 3D Z morphing and useful effect of frequency/detail controls. Corrected actual `Count`, `Spread`, `Gain` labels and unlabeled 2D/3D selector. Added verified ranges and `Mix`; kept conditional family availability. |
| `modules/osc.md` | Disambiguated oscillator versus OpenSoundControl protocol. Replaced vague/ganged-only rows with channel behavior and actual parameter labels. Kept negative animation rates, cycle-time display, waveform editing, loop behavior, and still-pattern condition. |
| `modules/pointcloud.md` | Split huge contextual-parameter row into a shape-specific table. Preserved released Roll/Orbit/Tilt and Perspective semantics; corrected point-size availability, described Spectrum Height/Smoothing, removed claim Spectrum becomes flat with no audio. Kept styles, volumes, depth, voxels, loop behavior, and rendering-cost limits. |
| `modules/scope.md` | Explained XY positioning and purpose of each input. Split Brightness from Width (old combined note described only width); clarified Detail's rendering tradeoff and audio-input prerequisite. Qualified dark-area transparency by input coverage. Moved generator details from giant row to prose; kept raw audio, signal persistence, reset, Insert FX coverage, and loop behavior. |
| `modules/shape.md` | Removed nonexistent Symmetry and Sym N controls. Corrected `Edge`, `Exponent`, `Scale/Lvl`, `Rot/Lvl`, `Offset X/Y`, `Spiro R/r/d`, `Fill + Outline`, and Outline Mode labels. Explained repeated levels and actual Outline Style choices. Kept fill/outline independence and primitive-specific controls. |
| `modules/source.md` | Simplified source/fitting descriptions; removed internal OS capture-handle terminology. Corrected `Mix` to `Opacity` and actual `Open Video..` spelling. Kept fit choices, source/platform limits, NDI runtime, forward-only playback, empty-source pass-through, and export behavior. |
| `modules/sprite.md` | Removed empty transform row. Corrected `Grid N`, `Count`, `Scale Falloff`, `Opacity`, and `Mode` under `Alpha`. Explained per-instance Size versus whole-pattern Scale; kept sheet animation, 0 Frames behavior, alpha handling, file playback, and loops. |
| `modules/text.md` | Replaced Dropdown vocabulary, removed empty/self-evident rows and arbitrary text-length claim. Corrected `Mix` to `Opacity`; consolidated repetitive NOTE paragraphs. Kept missing-font fallback, simulated styles, modulation limits, scrolled warp behavior, embedding, and loops. |
| `modulation/index.md` | Actual `Edit Modulation... > + Add Source` entry. Removed unsupported LFO one-shot claim and incidental waveform/band counts; kept source directory and existing Loop Phase anchor. |
| `modulation/audio-reactive.md` | Added actual Device/App/Song input context and source prerequisite. Corrected custom-band scope to global app settings and actual `Cust` picker labels. Explained rectify, response smoothing, threshold, and per-assignment Depth without generic note padding. |
| `modulation/cv-gate.md` | Described DC-coupled interface requirement, channel configuration prerequisite, actual CV/Gate values, hardware normalization assumption, and Mixer limitation. Retained physical channel names/ranges and meters. |
| `modulation/envelope.md` | Explained stages and where to configure them. Split ambiguous time row and documented full-scale Release slope accurately. Kept trigger-specific controls, auto-release/HOLD, looping and sync/reset behavior. |
| `modulation/lfo.md` | Removed unsupported one-shot language. Corrected obsolete Scale/Offset to RATE/LEVEL; Level is signed shared gain after Fold, individual travel is assignment Depth. Actual Knobs, BPM SYNC divisions measured in beats (not bars), Show as Time, Restart All, contextual noise and S+H smoothing. Kept repeatable randomness and all loop caveats. |
| `modulation/macro.md` | Added concrete MACRO bank usage, per-target Depth/Offset and actual LEARN flow. Kept macros as modulation targets and fixed independent Mixer deck macros. |
| `modulation/midi-note.md` | Put MIDI port prerequisite first. Clarified held velocity/aftertouch, bipolar pitch bend, and NRPN last-parameter limitation; actual Param # label. |
| `modulation/midi.md` | Port prerequisite and actual CC (0-127), Ch (0=any), LEARN labels; next message must be CC. Removed redundant missing-port message. |
| `modulation/opensoundcontrol.md` | Disambiguated protocol versus oscillator, added actual Listen/UDP Port route and sender address/port requirement. Documented first numeric argument, 0..1 clamp, unsupported bundles, and held values. Retained Learn cross-link. |
| `modulation/time.md` | Actual TIME bank and RUNNING/PAUSED labels, Reset behavior. Kept steady ramp, negative rate and Snap exception. Existing Loop Phase section now gives picker location, four-bar fallback/Mixer behavior and endpoint-jump caveat. |

## Important factual evidence

All source paths in this section refer to the exact release snapshot, not the dirty checkout.

- Module controls and labels: `src/app.cpp` module panel around 6154–8647; parameter names/ranges in `src/modulation/target_catalog.cpp`. INSERT source-dependent Mix/Blend at 8148–8158; SOURCE `Opacity` catalog and actual file picker; TEXT `Opacity` catalog.
- SHAPE: `src/app.cpp:6478–6660`, `src/modulation/target_catalog.cpp:79–128`, and `src/renderer/shaders/shape.frag:11–40, 167–225`. No symmetry parameter or rendered control exists in this release. Repeated copies have per-level offset/scale/rotation; Outline Style is conditional on non-Off outline, not Depth.
- FEEDBACK: `src/renderer/shaders/feedback.frag:49–112`, `src/renderer/feedback_routing.h:19–64`, app routing controls around 8000–8104. Hold loop clock `src/renderer/crt_renderer.cpp:1857–1861`; shorter nondividing final hold `src/engine/loop_audit.cpp:243–248`. SOURCE fit borders are transparent in `src/renderer/shaders/source.frag`, so a blanket statement that all video fills the entire frame was removed.
- POINTCLOUD: `src/app.cpp:8160–8418`, `src/renderer/crt_renderer.h` shape definitions and param descriptions around 500–540; exact released shader `src/renderer/shaders/pointcloud.vert` Spectrum branch and rotation/projection. Smoothing is a peak hold on falling bins at `src/renderer/crt_renderer.cpp:3236–3258`. Loop freezing and Snap audit at `src/engine/loop_audit.cpp:541–563`.
- LFO BPM divisions are beats: `src/modulation/lfo_engine.h:121–124` and `src/modulation/lfo_engine.cpp:60–62`; at 120 BPM a division of 4 takes 2 seconds.
- LFO: exact labels and controls in `src/app.cpp:8735–9446`, signed Level after Fold in `src/modulation/lfo_engine.h`, catalog at `src/modulation/target_catalog.cpp:715–742`; no one-shot mode exists. Repeating S+H seed behavior in `src/modulation/lfo_engine.cpp`.
- SCOPE: app controls around 8418–8647; target catalog; decimation/pacing in `src/renderer/scope_trail.h`, `src/io/audio_scope_pacer.h`, and `src/io/audio_analysis_types.h`.
- Envelope stages/loop/gating: `src/modulation/env_engine.cpp`, app ENV controls around 9490–9781. Release subtracts level using a full-scale slope, so release from Sustain below 1 is proportionally shorter.
- Audio picker, source selection and shaping: `src/app.cpp:12802–12940, 13264–13295`; `src/modulation/audio_shaper.cpp`. Custom-band settings are stored globally in `src/io/settings.h:169–170` and serialized in `src/io/settings.cpp:351–367`, not a patch-owned band table.
- CV normalization/interface assumptions: `src/io/audio_analysis_types.h:12`, `src/io/audio_analysis_session.cpp:11–28, 148–164`. Mixer removes CV source tab at `src/app.cpp:12099`.
- MIDI labels/port/learn at `src/app.cpp:12727–12764, 12955–12990`; value semantics in `src/io/midi_engine.cpp:133–175, 249–290` and corresponding header. NRPN only retains last-updated parameter per channel.
- OpenSoundControl parsing and held values: `src/io/osc_engine.cpp:65–110`. Listen controls `src/app.cpp:16888–16932`.
- Macro bind/learn and modulation target: `src/app.cpp:10367–10586`; Mixer fixed deck macros in `src/modulation/deck_macros.h`.
- TIME and Loop Phase: `src/app.cpp:9834–10010, 13077–13118`, `src/modulation/time_engine.cpp`, and `src/engine/engine.cpp:175–190`.

## Simple audio spectrum guide recommendation

Use POINTCLOUD Shape Spectrum, not SCOPE. SCOPE is XY tracing, not an FFT display. Supply a checked OSC + POINTCLOUD starting patch: OSC ampR/G/B=0, dcR/G/B=1 gives a bright field; POINTCLOUD shapeMode=9, depthAmount=0, style=Points, blendMode=Replace, blackBackdrop=true. Try Height 0.5, Smoothing 0.5, zero Orbit/Tilt/Roll and Zoom about 0.8, then validate appearance live. These suggested values were not live tested by this agent and must not be described as verified.

`File > Open Song...` plus PLAY on the song strip is the simplest supported input path for a reader with an audio file. It avoids device/app routing and no modulation assignment is needed. Highest-value figures are the finished expanding ring and a readable crop of Shape/Height/Smoothing; an input-configuration screenshot is useful only if it explains an unfamiliar control. Root is handling any guide/capture work.

## Checks and remaining limitations

- `npm run check:docs` passed initially: 110 pages validated. A later rerun during concurrent work reported only the not-yet-created `guides/audio-spectrum/` route referenced by root-owned `reference/windows/settings.md`; root was notified and owns integration of that guide. No owned-page route failures were reported.
- `git diff --check -- src/content/docs/reference/modules src/content/docs/reference/modulation` passed.
- Read all owned pages; reviewed changed control labels against exact released source; performed banned language, empty-table, punctuation and line-wrap checks.
- Independent read-only review by concepts agent completed on all 22 pages. All four findings fixed and verified: shorter last Hold, beat units for BPM divisions, Add alpha preservation, and SCOPE coverage qualification. Optional Link wording and NDI link-purpose suggestions also applied.
- No new live UI or hardware checks by this agent. External MIDI, CV hardware, NDI/Spout/Syphon and shader import behaviors remain source-checked, not newly exercised. Existing capture manifest remains the source of prior live evidence.
- No full site build, responsive/rendered review, editor corpus run or offline package test in this subtask. Root owns final integrated checks.
- No unresolved known false statement intentionally retained. Hardware timing/performance and live IO still require the ordinary platform-specific validation when changing those procedures.
