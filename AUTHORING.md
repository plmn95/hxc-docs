# Authoring guides and capturing the app

Use this workflow for illustrated walkthroughs, task guides, visual
comparisons, and their example patches. A small wording correction needs
the relevant style and accuracy checks, not a new capture session.

[STYLE_GUIDE.md](STYLE_GUIDE.md) owns writing and image presentation rules.
[CONTRIBUTING.md](CONTRIBUTING.md) owns contribution routes. Keep shared
standards in this repository so they apply on every machine.

## Define the reader's task

Before writing, identify the starting state, intended result, and existing
behavior the guide depends on. Check the current page and relevant app
interactions instead of replacing a useful guide with a generic template.

- Getting Started teaches the first successful sequence. Choose one path
  and defer optional choices until it works.
- A task guide leads to one recognizable visual result. Introduce only the
  new concepts needed to reach it, and link to reference material for other
  controls. For example, "Make an audio spectrum" teaches one response to
  a song rather than touring the whole audio system.
- Concepts explain the model. Reference supports lookup.

Choose the simplest reliable sequence. Supply a checked starting patch
when explaining its construction would make a short task into a feature
tour. The guide can then teach the change that produces its result.

Use an output preview when appearance is part of the task. Include a
checkpoint where a reader could otherwise continue from a wrong state.
Write only the recovery advice and variations the task needs. Give exact
values for the working recipe; let optional exploration describe a useful
change without requiring the reader to enter and undo a series of values.
Do not require identical headings or a fixed number of steps or images in
every guide.

## Verify the app identity and procedure

Prefer the current released app for published instructions and captures.
Record the exact version, executable SHA-256, platform, and whether it is a
release or development build. A version string alone does not identify an
uncommitted development build.

Run the whole procedure from its stated starting point, including the menu
paths, numeric entry, modifier keys, and final result. Check save and reopen
when a patch is supplied. For a recording or export, wait for completion,
open the saved file, and check its content. Opening a file dialog or queuing
a write does not establish a successful save.

If only a development build is available, record that fact and identify it
precisely. Mark the affected instructions or figures as unverified in the
released app and report the remaining live check. Do not remove an existing
verification warning based only on source inspection or a renderer test.
Keep unreleased behavior on a development branch until it is suitable for
the published manual.

For platform-specific steps, verify the actual binding or availability.
Do not infer that substituting `Cmd` for `Ctrl` is sufficient. A capture on
one platform does not establish the others' behavior.

## Capture and preserve evidence

Use real screen captures for UI and real app output for result images.
Diagrams can explain routing or signal flow, but must be identifiable as
diagrams. Image generation is not a way to manufacture a screenshot or
evidence of a successful procedure.

1. Restore a known layout and set a consistent UI scale. Load the guide's
   saved starting patch. Keep private paths, recent files, notifications,
   and other personal information out of the capture.
2. Capture the states the reader needs to recognize. For a comparison,
   change only the stated setting and keep the input, framing, output size,
   and timing consistent. Record resets and warm-up for feedback or
   simulations.
3. Preserve the untouched original outside `public/`. Create a crop or
   annotated derivative only where it improves the explanation. Do not
   change UI labels, values, states, or the rendered result. Retake a capture
   containing personal information when possible; otherwise use an opaque
   redaction and record it.
4. Record each published derivative and its original in
   `authoring/captures/YYYY-MM-DD/manifest.json`. Existing sessions can
   retain originals in that directory or another preserved location named
   by the manifest. Keep large originals out of the public manual.

Each capture record must identify:

- Original and published paths, capture date, and source kind: UI capture,
  output capture, or diagram.
- For app captures, app version, executable hash, release/development status,
  and platform. For diagrams, identify the app behavior represented.
- Starting patch and relevant settings when applicable; include its hash
  when available.
- Original/published dimensions, crop rectangle, and annotations or
  redactions. State when the file is an unchanged capture.
- Page usage and the control, state, or comparison it explains.
- Checks performed and any remaining released-app or platform verification.

Generate derivatives from a manifest with:

```sh
node scripts/prepare-doc-images.mjs authoring/captures/YYYY-MM-DD/manifest.json
node scripts/prepare-doc-images.mjs authoring/captures/YYYY-MM-DD/manifest.json --check
```

The check regenerates each crop in memory and compares dimensions and
hashes without writing files. Preserve changed originals as new captures.

### Guide the eye with annotations

For a screenshot used to locate a control, add a target outline or numbered
marker in `authoring/image-annotations.json`. Use coordinates from the
published crop, not the full original. Record the image path, dimensions,
numbered target rectangles, control names, and short review descriptions
using the existing entries as examples. The renderer positions the markers
beside the image and supplies a compact numbered legend. The Markdown and
preserved capture stay unchanged.

See the [annotated feedback example](authoring/reviews/2026-10-22/feedback-annotations.png)
for the shared visual treatment.

Match the site's graphite surfaces, sodium-orange target color, and mono
type. The registry supports one or two targets per image. Use a closer crop
or an additional figure if more targets need explaining. Place the number
outside the control label and value. Outline the relevant control rather
than a whole panel. The number must match the real control name in the visible legend.
Keep captions brief and avoid repeating the written steps. Result previews
and before/after output images usually need no markers.

Inspect each annotated figure at desktop and narrow widths. Confirm every
target against the real screenshot, keep the text readable, and open its
full-size screenshot link. Review annotation coordinates after any crop,
resize, or app layout change. Do not use generated imagery to redraw UI,
invent a pointer target, or repair a missing capture.

`npm run check` validates annotation bounds, published dimensions, and page
usage. Those checks catch stale metadata; visual review establishes whether
an outline actually identifies the intended control.

Follow the existing manifest's field names when extending a session. Keep
provenance separate from published instructional prose. Do not copy private
absolute paths or music references into the public site.

## Store images and example patches

Published still images live under `public/images/`, grouped by task:
`getting-started/` or `guides/feedback-trails/`, for example. Use descriptive
filenames. Put downloadable patches under `public/examples/`. Keep written
steps complete for readers who cannot see the image.

Use route-relative links that work beneath both the current site and the
versioned manual. A child Getting Started page or `guides/feedback-trails/`
can use `../../images/...` and `../../examples/...`. Check the rendered URL
for the actual page depth rather than copying this path into every page.
Avoid remote image dependencies and site-root URLs that lose the release
manual's base path.

Supply PNG or another supported still format at a size that keeps UI labels
readable. Link a wide screenshot to its local full-size image when its
labels need enlargement, and verify keyboard access and editor preservation.
Compare the rendered result after optimization. Do not bundle a
large full-resolution original when a smaller crop serves the lesson.

Open a downloadable `.hxc` in the intended app and check the settings and
output against the guide. Use a copy, preserve the original project, and
check whether external media is embedded or missing. Include only assets
that can be redistributed. A patch or render from a marketing folder is a
candidate to inspect, not proof that the guide works.

## Check the site, editor, and offline manual

Scale verification to the change and report the checks actually performed.

- Run `npm run check` for page metadata, links, and the production site.
  Confirm image and download targets exist and use valid paths; review any
  limits of the current checker.
- Run `npm run test:editor` after adding formatting or images to a page.
  Existing images, alt text, URLs, and surrounding content must survive a
  no-op and a prose edit. If media needs new editor support, implement and
  test preservation before treating the illustrated page as complete. Do
  not add arbitrary HTML or uploads to bypass the editor's supported format.
- When contribution code changes, run `npm run test:suggestions` and the
  affected browser tests. A screenshot addition alone does not require a
  service redesign.
- Inspect rendered pages at desktop and narrow widths. Check label
  readability, cropping, overflow, alt text, keyboard access to any image
  controls, and downloads. Exercise the affected interaction and check for
  relevant console errors when presentation code changes.
- Build a release-path preview when adding a new asset convention or media
  type. Check nested page reloads, image/download URLs, and search with the
  network unavailable. Record manual size and identify the app/manual used.
  A local site build does not prove the app's Help-menu behavior.

Use the app repository's `vizard-build` skill and
`../retrovid/docs/build-and-release.md` when making or checking a distributable
preview. That workflow keeps one captured manual for all platforms and
retries. Ordinary docs edits do not require packaging. Do not rebuild or
replace frozen manuals. Publication requires an explicit request.

Stills are the starting point. Before introducing video, verify contribution
editor preservation, app-server MIME handling, offline playback, accessible
controls, a still fallback, and the effect on bundle size and memory. Do not
assume an online video embed works in an installed manual.

## Review the result

Use a reader or independent reviewer who did not write the page to check
the sequence from its stated start. Look for a missing action, ambiguous
control, unexpected result, or unnecessary explanation. Record whether this
was a source review or a live app check; a source review does not establish
that the procedure works in the app.

Report changed pages and assets, tested app identity, relevant automated
checks, live procedure results, and untested platforms or steps. Separate
compiler checks, automated behavior tests, live UI checks, and packaged
verification. Include capture provenance. Do not present a proposed step or
an expected result as a completed test.

## Sources behind this workflow

These sources informed the standards; Hex Composer's UI vocabulary and
verification requirements remain local to this repository.

- [Google's voice and tone guidance](https://developers.google.com/style/tone)
  supports direct, natural writing and a read-aloud or colleague review.
- [Google's image guidance](https://developers.google.com/style/images)
  supports purposeful screenshots, useful crops, and distinct alt text and
  captions.
- [Microsoft's procedure guidance](https://learn.microsoft.com/en-us/style-guide/procedures-instructions/writing-step-by-step-instructions)
  supports ordered actions, clear UI locations, and completion steps.
- [Diataxis tutorials](https://diataxis.fr/tutorials/) and
  [how-to guides](https://diataxis.fr/how-to-guides/) distinguish a first
  learning sequence from a guide for an existing practical goal.

- [AUTO/PILOT's user guide](https://autopilot.audio/user-guide/index.html)
  provides a first-session checklist, illustrated interface tours, and grouped
  reference sections. Use its connection between UI images and concrete
  controls as a reference; keep Hex Composer task guides focused on one result.

Review other products' documentation as examples, not templates to copy.
Keep any borrowed idea only when it helps a Hex Composer reader complete or
understand the task.
