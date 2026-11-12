# Archived HTML regression fixtures

These reduced fixtures preserve the title, canonical/Open Graph/description tags
and archive-notice markup fetched from the public pages on 2026-11-12:

- https://docs.hexcomposer.com/vizard-docs/releases/v0.19.1/reference/modules/isf/
- https://docs.hexcomposer.com/vizard-docs/releases/v0.15.0/

The short `main` and script samples are test sentinels. The frozen release assets
are not stored or changed here. The tests assert that the online transform leaves
article and script bytes unchanged while replacing only metadata and the notice
link's destination.
