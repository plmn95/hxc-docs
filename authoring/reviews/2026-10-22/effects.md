# FX documentation content audit

Reviewed 57 owned pages: 54 changed and 3 retained. No page routes were removed,
so no redirects are needed. No app source, frozen manual, capture asset, commit,
push, or publication was changed by this pass.

## Standard and structure

Read the repository AGENTS.md, STYLE_GUIDE.md, AUTHORING.md, and hex-docs skill.
Retained small effect pages for direct parameter lookup. The shared FX index
already explains Insert FX and Mix, so removed repeated generic chain footers
from individual effects. Kept links where the distinction changes a task, such
as Edge Detect/Edge Key, Mask/Region, Dither/Palette Map, and curves/attenuation.
Category lists remain complete. No repeated tutorial template or optional
set/restore exercise was added. The Palette Map example is a short use of its
core controls, followed by open-ended control relationships.

Backticked actual UI labels and normalized units. Color pickers, the curve
graph, and eye controls are named directly because none of the nine ordinary
numeric control terms describes them. They are deliberate exceptions to a
mechanical vocabulary grep, not invented product labels. Seamless is a real
Roll Mode option and deliberately remains backticked despite the banned prose
word list.

## Exact source identity and factual evidence

Reference baseline: released macOS v0.21.1. Source commit
c2427521416e4800277a59c2b869c41de2d193bc, extracted with git archive. The released Resources/shaders/fx.frag
SHA-256 is 7d7b1f52f7b4330df95d23e54848c2d866aeb4467b380e855d53b55712e298dc;
the commit's shader matches it. Root separately confirmed the release ref by
GitHub API. The current dirty app branch and later main were not used as UI
authority. In particular, newer main's Transform Edges and Vignette border
controls were not added to these release pages.

All following paths/lines refer to that source extraction, not the app working
tree. This is source verification, not a new live app check.

- All parameter ranges and labels: src/modulation/target_catalog.cpp:381-621
  and src/modulation/crt_fx_param_specs.cpp, including Dither/Palette/Simulate.
- Luma Key direction and unchanged RGB: src/renderer/shaders/fx.frag:682.
  The old page reversed the direction. New wording keeps bright areas.
- Chroma label Key and tolerance/softness controls: src/app.cpp:19383;
  color-distance alpha behavior: src/renderer/shaders/fx.frag:691.
- Channel Select modes and Alpha/Isolate behavior:
  src/renderer/shaders/fx.frag:701. Motion Key threshold direction: line 717.
  Dominant Channel ties: line 767.
- Kaleidoscope Mirror X/Y: src/app.cpp:19297. Transform Link/Flip and
  uncapped field entry: src/app.cpp:19318 and 11325;
  labels: src/ui/widgets/xy_pad.cpp:472-495. Additive scale/edge clamp:
  src/renderer/shaders/fx.frag:261. Radial zoom-only sampling: line 297.
- Mask alpha outside the circle: src/renderer/shaders/fx.frag:661.
  Region labels: src/modulation/target_catalog.cpp:615-621; UI section:
  src/app.cpp:19851. Shared-input merge: src/renderer/crt_renderer.cpp:1160;
  first-member group order: src/renderer/region_group_plan.h:11-38 and
  src/renderer/crt_renderer.cpp:1243-1268. FEEDBACK partitions PRE/POST
  before separate calls: src/renderer/crt_renderer.cpp:1925-1953,2053.
- Channel Curves eye and S controls: src/app.cpp:19718-19812.
  Focused curve remains drawn alongside soloed curves:
  src/ui/widgets/curve_editor.cpp:148-151. Add points by clicking the curve:
  lines 243-259. Shift fine adjustment and handle flattening: lines 400-412.
  Delete/Backspace/Remove point: lines 484-524. RGB then Luma order:
  src/renderer/shaders/fx.frag:239-248.
- Palette Brightness gradients can create colors between swatches:
  src/renderer/shaders/fx.frag:923-963 and src/renderer/palette_map.h:99-133.
  Custom depends on exact palette match: src/app.cpp:19464-19478.
- Dither group is Diffusion (not Diffusion Look): src/app.cpp:19226;
  choices, Spread Only pairing/fallback: src/app.cpp:19623-19673.
  Algorithm patterns and limits: src/renderer/dither_math.h;
  screen-fixed coordinates and sampling: src/renderer/shaders/fx.frag:773 onward.
- Shared simulation Reset starts disarmed, rearms below 0.25, fires at
  >=0.5: src/renderer/sim_field_math.h:113-135. Allocation budget:167-170;
  displayed warnings: src/app.cpp:10692. Structural edits reset all slots in
  that module: src/renderer/crt_renderer.cpp:121-143.
- Simulation resolutions and time limits: src/renderer/sim_fluid.h:26;
  sim_field_math.h:17-36; sim_ripple.h:26-38; sim_rd.h:34-47.
  Panel controls: src/app.cpp:19566-19620. Released loop behavior retained
  from the existing reference and checked against loop-clock branches in
  src/renderer/crt_renderer_sim*.cpp.
- Rutt-Etra brightness displacement and transparent gaps:
  src/renderer/shaders/fx.frag:350-368.

## Checks and remaining verification

- npm run check:docs initially passed all 110 pages after the owned edits.
- A later corpus run encountered an in-flight external link from
  reference/windows/settings.md to the not-yet-written guides/audio-spectrum/.
  No owned-page link/asset errors were reported. Root will run final corpus
  checks after parallel work finishes.
- All 47 Markdown tables parsed as actual GFM tables across all 57 owned
  pages using remark-parse and remark-gfm. Final owned git diff --check passed.
- Prose scan found no banned words, decorative glyphs, generic slider/toggle/
  dropdown terms, em dashes, or bad line wraps, apart from the intentional
  real UI option Seamless. Frontmatter separators were excluded from wrap
  checks. Root owns final build, editor corpus and rendered QA.
- No new live UI checks, compiler checks, app behavior tests, or packaged
  Help check were performed by this audit. Existing beginner live evidence
  remains in the capture batch. No unverified warning was removed based on
  source inspection.
- No unresolved source discrepancy remains in the owned content. Actual
  macOS/Windows/Linux gestures on these reference pages were not re-operated.
  Latest v0.21.2 was reported by root as UI/shader-equivalent; this audit's
  precise source baseline remains v0.21.1.

## Concrete future visual opportunities

No fabricated figures were added. References remain usable as text. Two
useful future captures would be a Channel Curves menu/graph showing eye, S,
focus, and handles; and a matched Palette Map Nearest Color/Brightness
comparison with the same input. A Region before/after capture could show
Mask's transparent exterior versus Region preserving the exterior. These
need real app capture provenance and are optional follow-up assets, not
placeholders in published pages. Kaleidoscope now links to the existing
illustrated beginner walkthrough.

## Complete page inventory

| Page relative to src/content/docs/reference | Status | Reason |
|---|---|---|
| `fx/blur/box-blur.md` | Changed | Explained equal-weight averaging; preserved Radius and range. |
| `fx/blur/gaussian-blur.md` | Changed | Explained center-weighted blending instead of repeating the effect name. |
| `fx/blur/index.md` | Kept | Kept the accurate short category description and complete lookup list. |
| `fx/blur/motion-blur.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/blur/radial-blur.md` | Changed | Removed unsupported spin blur claim; kept zoom blur and controls. |
| `fx/color/black-white.md` | Changed | Distinguished effect-specific controls from shared slot Mix; stated transparency behavior. |
| `fx/color/dither.md` | Changed | Tightened the lookup, corrected Diffusion group label, removed incidental count/history comparison; preserved algorithm choices, limits, cost and loop behavior. |
| `fx/color/hue-rotate.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/color/index.md` | Changed | Removed overbroad claim about no pixel movement/resampling because Dither cells resample. |
| `fx/color/invert.md` | Changed | Specified RGB and preserved transparency rather than implying alpha inversion. |
| `fx/color/palette-map.md` | Changed | Corrected palette-only color claim for smooth Brightness gradients and Custom preset condition; concise two-color use and Dither pairing retained. |
| `fx/color/posterize.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/color/threshold.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/crt/barrel.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/crt/convergence-error.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/crt/deflection-error.md` | Changed | Normalized exact labels and units; preserved frozen roll/Reset Roll and loop distinctions. |
| `fx/crt/glow.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/crt/index.md` | Kept | Kept the physical-effects description and complete lookup list. |
| `fx/crt/persistence.md` | Changed | Avoided describing Amount 0 as a BYP state; retained unchanged-output behavior. |
| `fx/crt/phosphor-mask.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/crt/scan-lines.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/crt/vignette.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/distort/index.md` | Changed | Shortened category purpose without contrastive padding. |
| `fx/distort/kaleidoscope.md` | Changed | Added missing Mirror X/Y controls and linked the checked beginner example. |
| `fx/distort/transform.md` | Changed | Added Link X/Y and Flip X/Y, clarified additive scale, typed entry and edge extension. |
| `fx/distort/wave-warp.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/filter/edge-detect.md` | Changed | Explained sensitivity/threshold and white-edge output; distinguished Edge Key. |
| `fx/filter/edge-enhance.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/filter/index.md` | Changed | Replaced generic stylization label with the category purpose. |
| `fx/filter/mask.md` | Changed | Explained transparent outside boundary and difference from Region. |
| `fx/filter/pixelate.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/grade/channel-attenuverter.md` | Changed | Combined identical RGB rows and explained positive/negative behavior once. |
| `fx/grade/channel-curves.md` | Changed | Matched released eye and S controls; explained curve axes, preserved gestures and processing order; corrected display Solo distinction. |
| `fx/grade/contrast.md` | Changed | Replaced hard linear punch with clipping behavior. |
| `fx/grade/index.md` | Changed | Removed abstract comparison with COLOR; named the actual adjustment purpose. |
| `fx/grade/saturation-adjust.md` | Changed | Removed padded metadata; retained useful endpoints. |
| `fx/grade/white-balance.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/index.md` | Kept | Kept the concise category lookup and one shared chain link; no effect counts or filler to remove. |
| `fx/key/channel-select.md` | Changed | Documented mode distinctions including Alpha plus Isolate Channel black output. |
| `fx/key/chroma-key.md` | Changed | Matched visible Key label, clarified tolerance and Despill placement. |
| `fx/key/despill.md` | Changed | Added Follow fallback and non-modulatable selectors; preserved strength range. |
| `fx/key/dominant-channel.md` | Changed | Added tied-channel behavior; avoided implying grayscale pixels lose channels. |
| `fx/key/edge-key.md` | Changed | Explained alpha behavior and difference from Edge Detect; sensitivity/threshold notes. |
| `fx/key/index.md` | Changed | Explained transparency and channel/color effects without a tally. |
| `fx/key/luma-key.md` | Changed | Corrected reversed key direction: bright areas remain, dark areas become transparent. |
| `fx/key/luma-range.md` | Changed | Replaced ambiguous keys in/out with visible transparency behavior. |
| `fx/key/motion-key.md` | Changed | Clarified higher Sensitivity rejects smaller changes and preserves kept colors. |
| `fx/key/sat-isolate.md` | Changed | Replaced ambiguous keys in/out with visible transparency behavior. |
| `fx/retro/grain.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/retro/index.md` | Changed | Removed analog imperfection framing; retained the exact RETRO UI category. |
| `fx/retro/rutt-etra.md` | Changed | Explained brightness-driven raster displacement and transparent gaps; removed classic framing. |
| `fx/retro/vhs.md` | Changed | Preserved concise lookup content and verified range; normalized UI labels/units and removed the repeated generic chain footer. |
| `fx/simulate/fluid.md` | Changed | Kept useful controls/performance/loop limits; removed duplicate reset recipes and unrelated footer links. |
| `fx/simulate/index.md` | Changed | Centralized shared Reset/rearm behavior, structural restart and allocation limits; kept effect lookup. |
| `fx/simulate/reaction-diffusion.md` | Changed | Kept useful Pad map and controls; removed implementation model explanation and repeated Reset text. |
| `fx/simulate/ripple.md` | Changed | Kept appearance, values, timing and loop limits; linked shared Reset and removed repeated notes. |
| `insert-fx-region.md` | Changed | Matched actual Region-prefixed labels; explained shared-input group order, separate PRE/POST groups, and Mask difference. |
