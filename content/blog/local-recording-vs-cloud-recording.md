---
title: "Local recording vs cloud recording: why your podcast audio sounds bad on Zoom"
description: "The technical reason remote interviews sound choppy on video calls, and why local recording fixes it — plain-language explanation."
date: "2026-07-29"
author: "Bloom Meeting"
---

If you've ever recorded a podcast interview over Zoom, Google Meet, or a plain phone call and listened back afterward, you already know the problem: your guest sounds fine live, but the recording is full of tiny glitches, robotic artifacts, or moments where a word just disappears. This isn't a bad microphone. It's how live video calls actually work.

## Why live calls compress your audio

A video call has to send your voice across the internet in near-real-time, to someone else's speakers, fast enough that a conversation still feels natural. To do that, every call platform aggressively compresses and sometimes drops audio data — especially under a shaky connection — trading fidelity for speed. That tradeoff is invisible while you're talking (your brain fills in tiny gaps automatically), but it's very audible in a recording, especially once you start editing and the flaws get amplified.

This is true no matter how good your microphone is. A $400 studio mic feeding into a live Zoom call still gets compressed to protect the call's real-time performance. The bottleneck isn't your hardware — it's the fact that the audio has to travel across a network *while you're speaking*.

## What local recording actually means

"Local recording" (sometimes called "double-ender" recording, going back to the days when you'd literally record on two separate devices) solves this by separating two jobs that used to be the same thing:

1. **The live call** — carrying your voice to your guest and back, in real time, so you can have a normal conversation.
2. **The recording** — capturing high-quality audio and video *on the device it originated from*, with no compression tradeoff, because it never has to travel anywhere in real time.

With local recording, your guest's microphone feeds two things simultaneously: the compressed live call (so you can hear them), and an uncompressed local recording saved right there on their machine. When the session ends, that clean local file is what actually gets used for the episode — the live call was just for the conversation.

## How Bloom Meeting implements this

Bloom Meeting's meeting flow is built around exactly this separation. When a guest joins from their browser link:

- Their voice goes out over WebRTC for the live conversation, same as any video call.
- Simultaneously, their browser is recording locally in studio quality — 8Mbps VP9 video and a separate Opus audio track — using the browser's own `MediaRecorder` API.
- That local recording is chunk-uploaded to a thin relay server *as the meeting happens*, so even a mid-call disconnect doesn't lose the footage already captured.
- When the meeting ends, every participant's track lands in a synced take folder, with per-recorder clock offsets baked in so everything lines up automatically.

The live call quality and the recording quality are decoupled entirely. Your guest could be on a mediocre hotel wifi connection that makes the *conversation* choppy, and the *recording* would still come out clean, because the recording was never routed through that same real-time pipe.

## The tradeoff: it takes a browser tab, not zero setup

The one thing local recording requires is that the guest's device does a small amount of local work — running the recorder in their browser tab for the duration of the call. This is why Bloom Meeting guests join from a link instead of, say, a phone call: a browser can record locally in a way a phone call fundamentally can't.

It's a trivial ask compared to installing dedicated recording software, which is the other common approach (and the one Bloom Meeting's host side uses, since the host needs the full editing toolkit anyway). For a guest, it's just: click the link, allow camera/mic access, talk.

## The takeaway

If your interviews sound compressed, glitchy, or thin compared to solo episodes you record yourself, it's very likely not your gear — it's that the guest's audio never left the live call pipe. Any tool built around local recording (Bloom Meeting included) fixes this by design, not by asking anyone to buy better equipment.

Curious what it sounds like in practice? [Download Bloom Meeting](/download) and record a test call with a friend — free to try, $49 once if you keep it.
