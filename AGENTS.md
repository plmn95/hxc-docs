# Hex Composer documentation

This repository owns the authored manual in `src/content/docs/`.
Read [STYLE_GUIDE.md](STYLE_GUIDE.md) for voice and terminology, and
[CONTRIBUTING.md](CONTRIBUTING.md) for contribution routes.

For guides, captures, comparisons, downloadable patches, or a documentation
workflow change, follow [AUTHORING.md](AUTHORING.md). The repository-owned
[hex-docs skill](.agents/skills/hex-docs/SKILL.md) is its entry point.

Preserve unrelated changes. Keep product claims tied to a tested app
identity and distinguish source checks, automated tests, live app checks,
and packaged offline verification in reports. Do not modify archived
manuals. Publishing, releases, and a session-log update require the user's
corresponding request.

## Pull requests and CI

Every pull request must be created and kept as draft until maintainer review.
Do not mark it ready without the human user's explicit authorization for that
specific PR after review. Draft status and passing local checks do not authorize CI.
Run verification locally; GitHub CI requires explicit human authorization for
that specific PR. PR validation workflows are manual-only. Do not rerun or
manually dispatch them without that authorization. If instructed to stop CI,
cancel queued/running runs and do not trigger new ones until explicitly resumed.
Leave `SESSION_LOG.md` unchanged unless the user explicitly requests an update.
