---
title: "Sync Visuals with Ableton Link"
description: "Share live tempo and beat phase with Link-enabled apps, calibrate the picture, and diagnose missing peers."
---

Enable Ableton Link to make beat-synced motion follow the same tempo and
four-beat bar phase as another Link-enabled app. Link works between apps on
one computer or devices on the same local network.

> Development feature: these instructions describe the Link implementation
> under development. The complete procedure and platform permission prompts
> have not yet been verified in a released app.

## Join a session

1. Enable Link in the other app. For another computer or device, connect both
   to the same local network.
2. In the `Modulation` window's BPM strip, set `Ableton Link` to `Enabled`.
   The same control is available in Mixer Mode. Allow local-network access
   if the operating system asks.
3. In `Modulation > LFO`, engage `BPM SYNC` and choose a length of `1` beat.
   Assign it to a visible parameter, such as a shape's size.
4. Check the peer count beside `Ableton Link`. A count above zero means
   another participant has been discovered. Change the other app's tempo and check
   that Hex Composer's displayed `BPM` and the motion follow it.

A zero peer count is normal when Hex Composer is alone. Link keeps running
at its current tempo and phase if the last peer leaves. It does not return
to the local tempo until you set `Ableton Link` to `Disabled`.

Each running Hex Composer app joins once. The Editor, both Mixer decks and
the Mixer's own modulation share its clock. Changing modes or loading a
patch does not join again. Running the full app and demo together creates
two participants.

## Change tempo

While Link is enabled, editing `BPM` or using `TAP` shares your tempo with
the session. The linked range is 20 to 999 BPM. Joining an existing session
adopts its tempo; loading a patch or receiving another participant's tempo
does not send a tempo change back.

Received tempo is temporary. It does not replace the local BPM preference
or become part of a patch, bank or performance. Setting `Ableton Link` to
`Disabled` restores the local tempo. Link starts disabled on every app launch.

## Choose motion that lines up

Link shares beat phase within a four-beat bar. An LFO length that divides
four beats, such as `1/2`, `1`, `2` or `4`, can line up across apps. Other
apps must use the same phase offset and waveform for the motion to match.

Longer and irregular lengths remain available, but Link does not establish
a common start for every cycle across different apps. Two eight-beat LFOs
can agree on the beat and bar while running different halves of their
cycle. Hex Composer's own live banks share the same musical timeline.

`Loop Phase` runs over four bars while linked. Its ramp is shared within
Hex Composer, but its four-bar start need not match another app's.
Beat-synced Mixer strobe follows Link's beat phase. Feedback `Delay` and
`Hold` follow its tempo as durations; Link does not trigger a feedback
capture on each downbeat.

Free-running LFOs and `TIME` keep their own clocks. Pausing or resetting
`TIME`, or restarting local modulation, does not reset the Link session.

## Perfect loops, songs and export

Link takes priority over live `Perfect loop` and song-fit visual timing.
Their live wrapping and rate snapping are suspended while linked. Saved
loop settings stay intact and still apply to offline exports. Enabling or
disabling Link can move a patch to a different phase, particularly when it
contains feedback, simulations or loop-aware effects.

A song's sound and playback position remain independent. Link does not
play, pause, seek, stretch or synchronize the audio, and a remote tempo
change does not resize the song's playback region. Use a separate audio
route when you need sound from another app.

`Export Video` captures the effective BPM once when export begins, then
renders with its own fixed clock and the saved loop settings. Peer tempo
changes during export do not change the file. Bar and beat loops can still
receive the frame-rounding tempo adjustment reported by the export dialog.
When export finishes or is cancelled, the live picture catches up to the
current Link phase.

## Calibrate the picture

A shared beat clock does not remove a display's delay. Compare a visible
beat flash with a click from the other app through the actual screen and
audio outputs you will use.

Open `Settings` beside `Ableton Link` and adjust `Visual offset` between
-250 and +250 milliseconds. A positive value advances Hex Composer's
visuals; a negative value delays them.
The offset is a preference for this machine, saved separately from patches.
It does not move another participant's clock or compensate its audio.
Recheck it after changing screens, projectors or output routes.

## If no peers appear

- Confirm Link is enabled in both apps and that they use the same local
  network. A guest network or wireless client isolation can separate devices
  even when their network names match.
- Check the system's local-network permission and firewall access for each
  app. If access was denied, allow it in the system settings and try again.
- Check VPNs and network filters that can block local discovery. Try a direct
  connection on a network where the devices can communicate with each other.

If the peer count is above zero but the picture is off-beat, use a one-beat
LFO first. Check `BPM SYNC`, `Phase Off` and the visual offset before
comparing longer cycles. Link does not share song position, arrangement
position or start/stop commands.

Related: [LFO](../../reference/modulation/lfo/),
[TIME and Loop Phase](../../reference/modulation/time/),
[Mixer Controls](../../reference/windows/mixer-controls/),
[Export Video](../../concepts/export-video/).
