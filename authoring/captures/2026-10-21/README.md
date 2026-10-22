# First illustrated guides: verification record

This batch illustrates the beginner kaleidoscope walkthrough and the feedback
trail guide. The app was the published macOS **v0.21.1** release on macOS
26.7.1, not the development checkout. [manifest.json](manifest.json) records
the release URL, executable and archive hashes, image transforms, example
hashes, and checks for each capture.

The 13 untouched screenshots in `originals/` produce 12 published PNGs.
The unused feedback capture is retained with its reason in the manifest.
No generated UI, substituted labels, or annotations were used. Only the
published derivatives and three example patches are bundled in the manual.

This describes the original PNG processing. The subsequent whole-manual pass
adds separate branded annotation layers from
[the shared registry](../../image-annotations.json), preserving those pixels.
See the [22 October review](../../reviews/2026-10-22/README.md) for the final
integrated checks.

## Live app checks

- Restored the default layout and checked the shared panel tabs.
- Loaded Big Brother, set SPRITE Opacity to 0.90, saved a copy, explicitly
  reopened it, and checked the saved value in the UI.
- Built the kaleidoscope from the default OSC: frequencies 3/2, six segments,
  and a sine LFO at 0.1 Hz assigned to Rotation with Depth 45 and Offset 0.
  Saved and explicitly reopened the completed patch; animation persisted.
- Opened the supplied ring patch, added FEEDBACK through Chain, set the four
  documented controls, and compared Dry/Wet 0/1 and Decay 0.90/0.975.
  Saved and explicitly reopened the finished patch; the trail resumed.
- Recorded and finalized a clip. The app reported a completed save. ffprobe
  found H.264, 1920×1080, 30 fps, 323 frames, and duration 10.9 seconds.
  ffmpeg decoded the entire file successfully. Frames extracted at one and
  seven seconds were visually inspected to confirm changing output. This
  was file decoding and frame inspection, not a separate video-player UI check.

The temporary app session was closed after verification. Windows and Linux
were not operated. Existing platform shortcut and folder descriptions were
retained; a macOS capture does not establish those platforms' live behavior.

## Reproduce the image checks

From the documentation repository:

```sh
node scripts/prepare-doc-images.mjs authoring/captures/2026-10-21/manifest.json --check
npm run check
npm run test:suggestions
PLAYWRIGHT_PORT=47931 npm run test:editor
```

The capture processor verifies hashes and dimensions without writing.
The editor suite checks the complete Markdown corpus, including exact no-op
source retention and semantic preservation after a prose edit. It also tests
image attributes, drafts, review, submission, unsafe URLs, and narrow layouts.
Browser QA uses Playwright because no browser plugin was available.

Follow [AUTHORING.md](../../../AUTHORING.md) and the repository's
[hex-docs skill](../../../.agents/skills/hex-docs/SKILL.md) for future work.

## Build and browser results

- `npm run check`: eight checker/Markdown-render tests, 110 source pages,
  production build, and branding checks passed.
- `npm run test:suggestions`: 30 tests passed. Wrangler's deployment dry run
  bundled successfully; no deployment was performed.
- Full `test:editor`: nine tests passed. After linking the recording screenshot,
  its linked-image fixture and the complete 110-page corpus passed again.
- `npm run test:archives`: passed; frozen manuals were not modified.
- Capture regeneration/hash checks and `git diff --check` passed.

The manual-only preview uses version `v0.21.1-docs-preview`, base path
`/hxc-docs/releases/v0.21.1-docs-preview/`, and `localPreview: true`. It was
built from the uncommitted documentation working tree; its `docsCommit`
identifies base HEAD `4f9e41f6abf4475c0f01eb90c9370b6d1a2df24a`, not a
published revision of these edits. The built manifest hashes the actual files.

Final manual size: **14,885,859 bytes and 346 files**, including the manifest.
The manifest lists 345 payload files. Its SHA-256 is
`e71f64ff44a0a7417e002975251fe9439d597febb2ed7bdabafe46fce9ee6cc5`.

Browser QA allowed only the local static preview and blocked all external
requests. Seven illustrated pages passed at 1440, 390, and 320 pixels
(21 states). All 12 PNGs and three example patches returned successfully
and matched their recorded hashes. Actual patch downloading, keyboard access
to the full-size recording screenshot, desktop/mobile local search,
keyboard result navigation, and nested-page reload passed. There were no
external request attempts, failed responses, console errors, or page errors.

The local static host omitted a MIME type for `.hxc`; render-only download
attributes now make local patch links download without relying on host
sniffing. Their Markdown source stays unchanged.

These checks establish the static manual's behavior. No native Help-menu
check, new app package, Windows/Linux live test, publication, commit, or push
was performed for this milestone.
