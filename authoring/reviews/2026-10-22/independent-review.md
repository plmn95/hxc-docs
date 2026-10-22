# Independent review of root-owned reader pages

Read-only review of 18 pages: all seven `reference/windows/**` pages, `reference/shortcuts.md`, `troubleshooting.md`, six Getting Started pages, and three guide pages.

Product source: exact released v0.21.1 snapshot, commit `c2427521416e4800277a59c2b869c41de2d193bc`, identified by root. No app UI actions, edits, builds, or tests performed for this review. The WIP audio guide's missing example/capture assets are intentionally not treated as final defects. Root is already repairing moved export fragment links and performing the final built anchor crawl, so those known links are not duplicated as findings.

## Actionable findings

1. **AUX monitor omits a supported reader.** `reference/windows/aux-buses-monitor.md` says READERS lists INSERT/FEEDBACK only. The released monitor also appends POINTCLOUD for its Color Source and Depth Source bus inputs (`src/app.cpp:14619–14626`). Add POINTCLOUD; it can appear twice if both inputs use the same bus.

2. **Patches Bar lists a nonexistent menu item.** `reference/windows/patches-bar.md` includes `Save here`. The released slot context menu at `src/app.cpp:17755–17785` has Rename, Duplicate, Add Before/After, Set as Startup Default, Load Factory Patch, Reset to Default, Delete, but no Save here. Remove it. The page's preceding `+` label can optionally match visible `[+]`, but that is a minor notation choice rather than a blocked instruction.

3. **Mixer inversion and chroma labels are stale.** In `reference/windows/mixer-controls.md`, the General inversion Rocker is visibly `INVERT B` (`src/app.cpp:19048`), not `Negative (invert B)`; the latter resembles its catalog description. Chroma Key uses `Tolerance` and `Softness` (`:19118–19121`), not Threshold and Softness. The newly corrected mixer context-menu actions do match the release. The long mode paragraph would scan better as a small mode-specific table while fixing these labels; it currently combines many parallel catalogs into one paragraph. `SOLO`, `INVERT A`, `INVERT B`, `HARD-CUT`, `H-TEAR`, `V-ROLL`, `RGB BLEED`, `DROPOUT` should use their visible Rocker casing when treated as labels.

4. **Shortcuts still names removed SHAPE Symmetry.** `reference/shortcuts.md` uses SHAPE's `Symmetry` as its Section Header example, but no such section is drawn in the released SHAPE panel. Use its `Primitive` or `IFS` section, or another confirmed section. The rest of the shortcut table matched release `src/ui/key_bindings.h`, including Fn+Delete rather than a bare macOS Backspace and the song Space guard. The Global double-click row could optionally specify the Output Screen as its hit area rather than implying a double-click anywhere.

5. **A song does not always cap export Length.** `reference/windows/export-video.md` says any selected song limits Length. `songRemaining_()` returns -1 unless the live source is File AND the song is ready (`src/app.cpp:1584–1587`); `capLoopToSong_()` then does nothing. An existing patch song with Device/Application selected can still supply export audio (`startExport_()` audio request branch) while Length exceeds it. Suggested wording: “With `File` selected as the audio source, `Length` is limited to the song remaining after `Start`.” Retain the shorter-song/silent-tail behavior if documenting the other case.

6. **Audio guide's optional seek instruction is not reliable from its start.** `guides/audio-spectrum.md` currently says to click the waveform to move to another part of the song. Release `songstrip::hitTest` gives region edges/body precedence over the rest of the song (`src/ui/song_strip_math.h:80–92`). `renderSongWaveform_` seeks only for Hit::Song; Hit::Body prepares a region drag (`src/app.cpp:3260–3284`). A newly opened song auto-fits the region to the song, so most/all waveform clicks land on the body and do not seek. Check it during the root live session, or omit this optional action: it is not needed for a simple spectrum task. No claim is made here about the final live guide result.

7. **Getting Started links promise instructions absent from their targets.** `01-first-launch.md` sends readers to Reading the Panel for numeric entry and gestures. That concept contains vocabulary/colors and speed units; the general numeric-entry/reset/fine-drag gestures are in `reference/shortcuts/#any-parameter`. `04-record-and-output.md` sends readers to Output and Recording for PNG snapshots, but that concept describes only their image/alpha, not the camera action or PNG shortcut. Adjust the link promises or supply the small missing action. The released camera control saves a PNG in the recording folder (`src/app.cpp:3010`).

8. **Two small wording remnants fight the accepted editing standard.** `03-build-a-custom-chain.md` starts “Save any changes you want to keep,” despite the preceding page explicitly saving/reopening the patch; this is the same routine opening the user rejected in the feedback guide. `02-load-a-factory-patch.md` says the image becomes more transparent after reducing Opacity, which mostly echoes the control and may not be visibly true over an already opaque earlier chain. The subsequent save/reopen check of 0.90 is the meaningful checkpoint. Consider cutting these lines. In 03, the final warning against a second generator is also optional; the recipe never tells the reader to add one.

9. **Saving indicator may never appear for a fast recording.** `04-record-and-output.md` tells readers to wait for Saving... to finish. Release only shows that state after a grace interval (`src/app.cpp:3543` onward), so a short completed take can skip it. A cleaner completion instruction is to wait for the message naming the saved file; explain Saving... only as an in-progress state if present. The guide already includes that message, so this is a wording refinement, not a missing completion check.

## Full reviewed inventory

| Page | Result |
|---|---|
| `reference/windows/index.md` | Read; no concrete problem found. Existing route list remains useful. |
| `reference/windows/aux-buses-monitor.md` | Finding 1. Checked released reader collection and monitor columns. |
| `reference/windows/export-video.md` | Finding 5. File/song/fade names, crossfade separation, frame/format/length limits, progression and cancellation checked against app export UI, export_session, loop settings. Known fragment repairs left to root. |
| `reference/windows/mixer-controls.md` | Finding 3. Current right-click menu correction matches source; remaining General inversion and chroma labels do not. Mode paragraph is hard to scan. |
| `reference/windows/mod-matrix.md` | Read; no new concrete issue found. Live bar fill and target-unit delta correspond to source; separate mixer matrix, range percentage, shaping eligibility and meta-depth exclusion retained. |
| `reference/windows/patches-bar.md` | Finding 2. Checked released slot menu and add control. |
| `reference/windows/settings.md` | Read; no new concrete issue found. Checked Source choices, app capture backend gates, file source Output, CV/Gate limits, Recording/Filename help, Include Audio condition, Interaction help preference. Graphics/environment prose was retained; no new platform live check established. |
| `reference/shortcuts.md` | Finding 4. Compared release key-binding table and handlers, including song playback, text guards, Fn+Delete, platform modifiers. |
| `troubleshooting.md` | Read; no concrete new issue found. Discord menu exists at `app.cpp:1093`; completed-write message/skipped frames and missing-port conditions match source. Reporting instructions remain actionable. |
| `getting-started/index.md` | Read; no concrete problem found. Goal, sequence and finished-patch comparison are clear. |
| `getting-started/01-first-launch.md` | Finding 7. Existing real workspace capture and root-verified dock layout retained. |
| `getting-started/02-load-a-factory-patch.md` | Finding 8 (optional Opacity outcome cut). Save/reopen value check remains useful. No new live run performed. |
| `getting-started/03-build-a-custom-chain.md` | Finding 8. Exact values and single-pattern sequence preserved. UI effect item is uppercase KALEIDOSCOPE in release picker (`app.cpp:4245`), while prose uses title case; align with house-label convention if enforcing literally. |
| `getting-started/04-record-and-output.md` | Findings 7 and 9. REC remains literally REC during recording, so clicking REC again is correct (`app.cpp:2982` onward); do not replace it with STOP based on an old source comment. Save completion is otherwise covered. |
| `getting-started/05-animate-your-pattern.md` | Read; no procedural defect found in the previously live-verified released picker sequence. `BPM Sync` could use section's exact `BPM SYNC` casing, consistent with new LFO reference, but same control is identifiable. |
| `guides/index.md` | Read; concise selection list, no concrete issue found. |
| `guides/feedback-trails.md` | Read; no new concrete issue found. Recent Dry/Wet/Decay optional exploration follows the user's simplicity preference. No enter-and-undo exercises reintroduced. |
| `guides/audio-spectrum.md` | Finding 6. Reviewed current WIP text and Song/Source paths; example asset and screenshot verification reserved for root's live pass. Three-step shape is appropriately focused. |

No unsupported deletion of important controls/limits found beyond the misleading link promises noted above. Shortening the old export reference removed some detailed loop/source catalogs, but the current concepts, source-specific reference pages and new settings tables preserve the relevant model and controls. Do not present this source review as a live UI procedure test or a packaged offline check.
