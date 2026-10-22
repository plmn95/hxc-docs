# Hex Composer Documentation: Style Guide

This guide covers Getting Started, task guides, concepts, and reference pages.
See [AUTHORING.md](AUTHORING.md) for capture, verification, and review procedures.

## Editing standard

Explain what the reader needs beyond what a control or action already says.
A factual sentence is not automatically a useful sentence.

- Cut outcomes that repeat the action: loading a patch runs it, choosing a
  value applies it, clicking a slot selects it. Keep checkpoints that help
  readers catch a mistake, such as a visible pattern or a moving meter.
- Keep concrete actions, unfamiliar terms, operating limits, and behavior
  that could surprise the reader, such as a first save requiring a path or
  closing a picker preserving an assignment.
- Cut reassurance, design justifications, implementation details, and
  narration about how the documentation should be read.
- Do not explain a familiar action with its own name (`Reset` resets,
  `Remove` removes), or repeat a range in an obvious example (180 degrees
  is a half turn).
- Keep limits that affect use. Avoid incidental totals such as the number
  of module types or catalog entries in explanatory prose.
- Delete redundant wording rather than replacing it with shorter filler.
- Start with an action that advances the task. Include routine preparation
  only when it prevents a specific problem, such as losing edits before
  resetting a patch.
- Use exact values to reproduce the example. Once it works, name a useful
  control and the change to explore; do not turn experimentation into a
  sequence of values to enter and undo.

Apply this standard to descriptions, tables, callouts, and shared site text
as well as paragraphs. The section guidance below does not require padding
or a fixed template where there is nothing useful to add.

## Write from the task

Name the action, the control, and any condition that changes the result.
Use ordinary sentences with enough context to follow them. Vary sentence
length when the material calls for it; do not turn every explanation into
fragments or force every paragraph into the same pattern.

Avoid stock openings, praise, invented personal experience, and summaries
that repeat the page. Read an awkward passage aloud, then check whether it
says something the reader needs. Removing a particular word or punctuation
mark does not establish that the writing is useful or accurate.

| Instead of | Write |
|---|---|
| "Simply adjust the settings to create stunning visuals." | Name the control and the change it makes. For example: "Increase `Segments` to repeat the wedge more times around the center." |
| "Click `Save` to save your patch." | Document a useful distinction: "The first save asks for a path." |
| "You should now see the result." | State a checkable result when it helps: "The pattern turns back and forth." |
| "In this guide, we'll explore the powerful feedback system." | Begin with the task or the first action. |

---

## 1. Section Voice

The section determines what a reader is there to do.

### `reference/**`: lookup (modules, effects, modulation, windows)

Write concise descriptions and parameter tables for lookup. Include
instructions when a gesture or interaction needs explaining, and callouts
for limitations that do not fit in the table. Do not add an introduction,
table, or related link solely to fill a template.

> **Example (FX page: Barrel):**
> Barrel bows the image outward from its center, simulating CRT curvature.
> `Amount`: 0 to 0.6.

### `concepts/**`: Hex Composer's product register

Explain the feature's purpose and behavior. Include a short instruction
when it helps the reader find or use the feature; put extended walkthroughs
in Getting Started or a task guide.

Start with a situation where the feature is useful, then explain how it
works. Keep numeric limits when they affect the reader's choices. Counts
of module types, buses, or blend modes rarely explain why to use a feature.

> **Example (Concepts page: Signal Chain):**
> A patch is the chain you build: modules run left to right, each reading the
> output of the one before it, until the last module in chain order is what the
> Output window shows.

### `getting-started/**`: sustained second-person imperative

Give concrete actions in the order a first-time user performs them.
Choose one reliable path through the exercise. Include a visible checkpoint
when the reader needs to confirm progress before continuing. Keep optional
variations after the working result.

> **Example (Getting Started page: load a factory patch):**
> Open `File > Factory Patches` and choose a patch.

### `guides/**`: a specific result

Aim for one recognizable visual result and introduce only the new concepts
needed to make it. For example, an audio guide can be titled "Make
an audio spectrum". State the starting patch, required inputs, and result.
Supply a checked starting patch when building the prerequisites would turn
a short task into a tour of features.

Use numbered steps for an ordered procedure, combining short actions in
the same part of the UI when that is easier to follow. Keep the sequence
as short as the task allows; there is no required step count.

Include a preview or comparison when appearance is part of the goal. Give
values for a reproducible starting point, then explain a useful variation
or tradeoff where needed. Link to parameter reference and concepts instead
of copying them into the guide. Add recovery advice for a likely failure
in the procedure; do not append a generic troubleshooting checklist.

---

## 2. Hard Bans

These apply to all published reader pages. Punctuation and wording rules
are house style choices, not tests of whether a person or a model wrote a
passage.

| Banned | Why |
|---|---|
| Em-dashes | Use a period, comma, colon, or parentheses for this manual's punctuation style. |
| Echo-fragment and comma-stacked triplet sentences: a fragment (no subject and verb of its own) that repeats a number or word for rhythm ("Three sections, three jobs."), or strings three short parallel phrases together for cadence instead of writing a real sentence ("Evergreen, readable in any order, referenced anytime.") | Reads as tagline copy, not documentation. Write a full sentence that states the fact plainly, or cut the line. Use complete sentences when parallel fragments add rhythm without information. |
| Decorative glyphs as structure: arrows (→), emoji, or other symbols used to dress up a link or heading instead of plain markdown | Adds visual flourish with no information. A plain `[link text](path)` or heading says the same thing without the costume. |
| Retro-kitsch / nostalgia language ("groovy," "old-school vibes," "throwback") | The CRT vocabulary exists because the engine is a real phosphor/scanline simulator, not because old things look cool. Costume language contradicts the product's own claim about itself. |
| Marketing adjectives (powerful, seamless, intuitive, simply, just, easily) | These assert a value judgment in place of a fact, and go stale the moment a reader hits the rough edge the adjective quietly denied existed. |
| Vague hedging that hides a missing condition or check | Name the condition that changes the behavior. Mark an unverified claim explicitly and preserve real uncertainty rather than turning it into a confident guess. |
| Generic UI vocabulary standing in for a Hex Composer control-vocabulary term | Hex Composer assigns each control word in the table below one exact meaning. Calling a Trough a "slider" or a Rocker a "toggle" reintroduces ambiguity. |
| Paraphrased module/state names | Write `LIVE`, `BYP`, `MUTE`, not "on," "bypassed," "disabled" standing in for them. A paraphrase describes a different, generic concept and breaks the reader's ability to match the page to what's on screen. |
| Fabricated screenshots or altered app behavior | Capture the real app. Cropping and explanatory annotations are allowed; replacing labels, controls, states, or output with invented content is not. |
| Code internals: function/class/struct names, source-file paths and citations (`OscModule::adsr`, `CrtRenderer::osc[]`, `Patch::addModule()`, `src/app.cpp`) | State the on-screen behavior or limitation directly instead of pointing at its implementation. User-accessible file locations and configuration names are allowed when needed to complete a task or diagnose a problem. Maintainers keep source evidence in review records. |
| App-history framing: explaining what used to exist, was retired, or changed over time | A wiki documents the app as it is. History belongs in release notes or a changelog, not here, and a reader who never knew the old behavior existed has no use for why it is gone. |
| A line break landing right after a hyphen or slash (`single-` / `module`, `ACTIVE`/ / `BYPASSED`) | Markdown joins wrapped lines with a single space, so the break renders as a stray space glued to the punctuation: "single- module," "ACTIVE/ BYPASSED." Reword or move the wrap point so no line ends in `-` or `/`. |

---

## 3. Terminology

Spell out platform-specific shortcuts wherever they appear. In prose, use
`Ctrl+S` (`Cmd+S` on macOS), for example; shortcut tables have separate
Windows/Linux and macOS columns. Match the app's bindings and labels,
including mouse gestures, Option, Delete/Backspace, and function keys.
Do not assume a modifier substitution without checking the binding.

Use these control names exactly:

| Term | Meaning |
|---|---|
| Knob | A primary parameter performed with directly. |
| Trough | A bounded numeric parameter with a minimum and maximum. |
| Wheel | A numeric parameter that wraps, such as phase or angle. |
| Pad | Two continuous parameters controlled as one gesture. |
| Rocker | A binary state. |
| Selector | A choice from a fixed set of values. |
| Lamp | A reported boolean or continuous state. |
| Meter | A level shown over time. |
| Screen | A live signal display, preview, or output. |

The one collision worth naming explicitly, as a worked example of the
discipline expected everywhere else: **OpenSoundControl vs. the OSC module.**
Hex Composer has two unrelated things a writer might reach for the string "OSC" to
name: the OSC generator module (an oscillator: Sine/Sawtooth/Square/etc.) and
the OpenSoundControl protocol (a modulation input source, UDP-based, distinct
from MIDI). The app resolves this collision in user-facing strings by spelling
the protocol out in full. The wiki follows the same rule:

- Write **"OpenSoundControl"** in full, every time, for the protocol. Never
  abbreviate it to "OSC" in prose.
- Reserve the bare word **"OSC"** exclusively for the oscillator generator
  module.
- If a single page has to mention both (rare, but `reference/modules/osc.md`
  and `reference/modulation/opensoundcontrol.md` cross-link each other), the
  first use of each term on that page must disambiguate in the same sentence.
  Don't rely on the reader inferring which one from context.

This is the pattern for any future naming collision the app turns up: find
how the app itself resolved it in its own UI text, and match that resolution
in the wiki rather than inventing a separate one.

**Backtick literal UI text in Markdown prose and tables; reserve plain quotes
for citing an example value.** Figure legends use the shared annotation label
style. A menu item, button label, section header, key, or window name is
a fixed string the reader can find on screen: write it in backticks
(`` `Reset to Default` ``, `` `+ Add` ``, `` `INSERT FX` ``), matching how
the control-vocabulary terms above are treated. Plain quotes are for
citing an example of something that varies, like a factory patch's name
("Big Brother") or a window title template ("Modulate:
&lt;parameter&gt;"), not for a control a reader could click.

---

## 4. Images and comparisons

Use an image to locate an unfamiliar control, show a relevant state, or
explain an appearance that prose cannot convey efficiently. A screenshot
does not replace the written steps or exact UI labels. Do not add an image
merely to fill space.

- Show the full workspace when orientation is the lesson. Otherwise crop
  around the relevant controls and keep enough context to find them.
- Capture a consistent layout and UI scale for a sequence. Keep labels
  readable at the rendered size and check the page on a narrow screen.
- Highlight the target when a screenshot helps the reader find where to
  click or adjust a control. Keep result previews and visual comparisons
  clean unless a specific detail needs explaining.
- Use the shared annotation style: thin sodium-orange outlines, numbered
  markers, graphite backgrounds, and the docs' mono type. Orange identifies
  the target; green retains its meaning for links and affirmative actions.
  Avoid decorative arrows, glow, and large colored overlays.
- Keep annotations sparse, with one or two targets per image. Put markers beside
  controls, leaving labels, values, and pointer targets visible. Identify
  each numbered control beneath the image; do not rely on color alone.
  Add a caption explanation only when it contributes beyond the steps.
  Keep the written procedure complete without the image.
- Preserve the screenshot pixels and add annotations as a separate layer.
  Include access to the clean full-size screenshot. Check placement and
  readable marker sizes on narrow screens.
- Write alt text for the information the image contributes. Put a complex
  comparison's conclusion in nearby prose as well. Avoid repeating the same
  description in the alt text, caption, and paragraph.
- Keep source, framing, and settings consistent in before/after comparisons.
  Identify what changed. For time-dependent effects, record the capture time
  and reset or warm-up procedure in the capture manifest.
- Use repository-local assets that work in the versioned offline manual.
  Preserve the original capture and record its provenance using
  [AUTHORING.md](AUTHORING.md). Review affected images when the depicted
  controls or behavior change.

Use still images for the initial illustrated guides. Add motion examples
only when motion explains something the still cannot, and after validating
editor preservation, playback, a still fallback, and offline delivery.

---

## 5. Self-Check Before Calling a Page Done

Run this checklist against the page. It's written to be usable by a writer
with no memory of why each rule exists. Apply it literally.

- [ ] **Zero em-dashes anywhere on the page.** Use a period, comma, colon, or
      parentheses instead.
- [ ] **No standalone echo-fragment or comma-stacked triplet sentences.** A
      line that repeats a number/word purely for rhythm, or strings three
      parallel fragments together for cadence, is cut or rewritten as an
      actual sentence.
- [ ] **No decorative glyphs (arrows, emoji) standing in for plain markdown**
      on links or headings.
- [ ] **No code internals.** No function/class/struct names, no file paths,
      no `Namespace::identifier()` citations. User-accessible file locations
      and configuration names are allowed when needed to complete a task
      or diagnose a problem. State behavior rather than implementation.
- [ ] **No app-history framing.** Nothing about what used to exist, was
      retired, or changed over a past session. Document current behavior
      only.
- [ ] **No line ends in `-` or `/`.** Grep the page for both; either one
      renders as a stray space glued to the punctuation on the next line.
- [ ] **The page serves its section's purpose:** lookup, explanation, or
      walkthrough. Instructions are included where they help.
- [ ] **Every control is named by the vocabulary in this guide**, not a generic word.
      Grep the page for `slider`, `toggle`, `dropdown`, `switch`, `button`
      (unless "button" is genuinely correct and none of the nine parts apply).
      Each hit is either fixed or deliberately justified.
- [ ] **Every module/parameter/state name matches the app's on-screen text
      exactly**, including case: `LIVE`/`BYP`/`MUTE`, not a prose paraphrase
      presented as if it were the label.
- [ ] **No promotional or stock wording.** Remove words such as powerful,
      seamless, intuitive, simply, easily, and vibes when they replace a fact.
      A literal UI label or a necessary technical term is not a violation.
- [ ] **Every menu item, button, section header, and window name is in
      backticks, not plain quotes.** Plain quotes are only for an example
      value (a patch name, a title template), never a clickable control.
- [ ] **"OSC" never appears alone meaning the protocol.** "OpenSoundControl"
      is spelled out every time. If both meanings appear on the page, the
      first use of each is disambiguated inline.
- [ ] **Every image has a purpose, useful alt text, and capture provenance.**
      Written steps remain complete. Relevant labels are readable on desktop
      and narrow screens, and local image/download links work offline.
- [ ] **Control-locating figures guide the eye.** Shared target markers leave
      app labels and values visible, match the explanations beneath the
      image, and remain readable on narrow screens. Output previews stay
      clean when annotations add no information.
- [ ] **No template padding.** Tables, summaries, and callouts contain
      useful information rather than repeating control labels or paragraphs.
- [ ] **Concepts pages only:** opens with a situation where the feature is
      useful. Counts and limits are included when they help the reader
      choose or operate it.
- [ ] **Getting Started and task guides:** every instruction names a concrete,
      checkable action: a specific menu path, key, or control, not a vague
      suggestion ("adjust the settings as needed" is not an instruction).
- [ ] **Every cross-link and asset reference resolves.** Check the existing
      documentation tree rather than guessing a page or filename.
- [ ] **Every factual claim about current app behavior is checked in the
      current Hex Composer release.** Include the tested version in the pull request.
      A claim that cannot be verified is marked inline as unverified and
      flagged for maintainer review, not stated as fact.
