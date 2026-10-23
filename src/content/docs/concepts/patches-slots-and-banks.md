---
title: "Patches, Slots, and Banks"
description: "Save signal chains and modulation as .hxc patches, manage patch slots, and organize sessions into banks."
---

A patch keeps a chain, its modulation, and its loop settings together so you can return to it
or use it in another session. Each slot in `Patches` holds a separate
patch. Save one patch as `.hxc`, or save the open slots together as a bank.

## Save a patch or bank

`Ctrl+S` (`Cmd+S` on macOS) saves the active slot; `Ctrl+Shift+S`
(`Cmd+Shift+S` on macOS) saves it to a new file. A
slot loaded from a file, or opened via `File > Open...`, remembers that
file's path, so a later plain save writes back to it. A slot that was reset,
duplicated, newly added, or loaded from a factory patch has no path of its
own yet, so its first save behaves as Save As instead of overwriting
anything.

`File > Save Bank` (`Ctrl+B`, or `Cmd+B` on macOS) writes every open slot, and which one is
active, to a single `.hxcbank` file in one step; `File > Save Bank As...`
writes it to a new one. `File > Load Bank...` replaces the open slots with a
bank's contents.

`File > Open...` also accepts `.viz` patch files and `File > Load Bank...`
accepts `.vizbank` banks. Saving one of them keeps its file name and
extension.

Factory patches do not appear in `File > Recent Patches`.

## Open files from another version

Patches and banks record the version of the app that saved them. Opening
one from a newer version asks first, because an older version may not read
it correctly. `Cancel` leaves the session unchanged; `Open anyway` attempts
to load it, with no guarantee that every setting will survive. A newer
patch set as the startup default, or reopened last, is skipped at launch
with a message instead of a prompt. Files without a saved version open
without this warning.

## Choose what opens at startup

A slot can also be set as the startup default, from its right-click menu's
`Set as Startup Default` or from `File > Set Active Patch as Startup
Default`. It opens the next time Hex Composer launches.

`Reopen Last Patch on Startup`, under `File > Recent Patches`, is the
fallback for when no startup default is set. A startup default always wins
over it.

Related: [Signal Chain](../signal-chain/).
