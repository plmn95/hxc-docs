# Signal Chain "Empty areas" edit, 27 November 2026

Commit `da12c9e` added one paragraph to the "Empty areas" section of
`src/content/docs/concepts/signal-chain.md`, and changed "behave exactly as
on a black background" to "draw exactly as on a black background". The new
paragraph names the Insert FX that carry a see-through picture's empty areas
when they move or blur it, and the places that keep them where they were.

The change is one diff hunk inside "Empty areas". The CHAIN send locations,
SENDING/MUTED/removed states, MUTE and the routed-FEEDBACK exception that
the `module.chain-send` source review checked are unchanged, so that review
still applies to them.

## Verification

- Source review against Hex Composer `72fa72b0` (the coverage-lane fix
  landed in `55f2ab04` and `02d925f8`): the list of moving effects matches
  the renderer's classification of insert effects that move coverage; the
  hosts are INSERT (chain and bus), SCOPE Insert FX and FEEDBACK Post; FEEDBACK
  Pre and ISF filters keep coverage in place; effects that depend on the
  picture, a second picture or earlier frames are excluded. Alpha after
  recombine is the larger of the lit colour and the stage's alpha times the
  moved coverage, which is why dark parts cover at the new place.
- Links and anchors in the new paragraph were resolved by hand against the
  page files.
- Not checked: `npm run check` was not run on the editing machine (Node is
  not installed); the release-manual build runs the same validator. No
  native observation or rendered-page review of this edit.
