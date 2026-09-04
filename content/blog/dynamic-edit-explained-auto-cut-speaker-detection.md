---
title: "Dynamic Edit explained: how auto-cut speaker detection actually works"
description: "A behind-the-scenes look at how Bloom Meeting's Dynamic Edit turns a raw multi-guest recording into a full-screen/split-screen rough cut automatically — and why per-person tracks make it reliable."
date: "2026-09-04"
author: "Bloom Meeting"
---

If you've ever manually edited a multi-guest video call, you know the tedious part isn't trimming or color — it's the cutting. Deciding when to punch in on whoever's talking, when to go split-screen because two people are talking over each other, when to hold on a reaction shot. It's the single most time-consuming part of turning a raw recording into something watchable, and it's exactly what Dynamic Edit is built to automate. Here's how it actually works, and why it's more reliable than it sounds.

## The problem it's solving

A typical remote interview or panel produces one continuous recording per person — thirty, sixty, ninety minutes of footage where most of the value is compressed into who's talking when. A human editor watching that footage is doing a fairly mechanical job most of the time: watch the waveforms, watch the faces, decide "cut to them now," and only slow down for the genuinely interesting editorial calls (does this pause need trimming, does this tangent belong in the episode). Dynamic Edit exists to handle the mechanical part — the speaker-driven cutting — so a human only has to make the judgment calls.

## Why per-person tracks make this possible

This is the part that's easy to gloss over but is actually the whole reason the feature works reliably: Dynamic Edit isn't analyzing one mixed-down video of a call. It's working from Bloom Meeting's separate, per-person take folders — each guest's own local recording, synced to a common timeline via the server-stamped start times and clock offsets baked into the session's `.take.json` file.

That distinction matters more than it sounds like it should. A tool trying to detect "who's speaking" from a single composited stream of a video call has to fight crosstalk, echo, and whatever bleed came through everyone's speakers into everyone else's mic. A tool working from clean, isolated per-person tracks doesn't have that problem — it can tell with much higher confidence whether track A or track B has an actual voice in it at a given timestamp, because it isn't trying to separate two people's audio after the fact. The editing decision gets easier because the input data is already clean.

## The actual pipeline

Dynamic Edit runs in a few distinct passes once a take is done recording:

1. **Local transcription, per track.** A quantized Whisper model — the same one that powers Bloom Meeting's captions — transcribes each participant's audio track independently, entirely on your machine. This produces word-level timing per speaker, not just a rough "someone talked here" signal.
2. **Active-speaker detection.** Using the per-track transcripts and audio levels together, Dynamic Edit builds a timeline of who's actually talking at every moment, including the overlaps — the specific stretches where two tracks have simultaneous speech, which is what triggers split-screen logic downstream.
3. **Cut-decision logic.** With that speaker timeline built, the auto-cut logic applies straightforward rules: hold full-screen on whoever's speaking, cut to a new full-screen shot when the active speaker changes, switch to split-screen automatically the moment two tracks overlap for more than a beat, and return to full-screen once the crosstalk resolves. It's the same logic a competent live-switcher operator would apply, just running against the finished per-track timeline instead of in real time.
4. **Preview and override.** The output isn't a rendered final file — it's an edit decision list you can scrub through inside Bloom Meeting before committing to anything. If Dynamic Edit calls a cut wrong (it will happen occasionally, especially on fast back-and-forth banter), you can override individual cuts by hand before rendering.
5. **Render.** Once you're happy with the cut, it renders out via bundled ffmpeg at 1080p, locally, with no upload step and no per-minute processing charge.

## What it's good at, and what it isn't

Dynamic Edit is genuinely good at the mechanical cutting job: tracking who's speaking, catching overlaps, producing a rough cut that's already close to something publishable for a straightforward two-to-four-person conversation. What it isn't trying to do is editorial judgment — deciding a tangent should be cut for pacing, choosing a cutaway for creative effect, or picking which of two simultaneous good reactions to favor. Think of it the way you'd think of a competent assistant editor: it gets you from raw footage to a strong first pass fast, and you do the pass that requires taste.

It's also worth being honest about where it can misfire. Very fast, overlapping banter (think comedy podcasts where guests talk over each other constantly by design) can produce more split-screen switching than you'd want stylistically — that's a case where reviewing and manually holding on full-screen shots produces a better result than accepting every automated cut. Long silences or a guest who trails off mid-sentence can occasionally confuse the active-speaker call for a beat. None of this requires starting over — it's why the preview-and-override step exists rather than a one-click render with no review.

## How this compares to editing a mixed-down recording

If you've edited footage from a tool that only gives you one composited video of the call, you already know the alternative: watching the whole recording, manually marking in/out points, and cutting based on what you can see and hear in a single track where everyone's audio is already blended together. It's slower because you're doing the speaker-detection work yourself, by eye and ear, instead of the software doing it from clean per-person data. This is the same reason local recording matters for audio quality — see [our piece on local vs. cloud recording](/blog/local-recording-vs-cloud-recording) — the separated tracks that make studio-quality audio possible are the same separated tracks that make automatic speaker-aware editing possible. It's one architectural decision paying off twice.

## Where it fits in the full workflow

Dynamic Edit is one step in a longer pipeline, not a standalone tool. A typical Bloom Meeting session goes: record the take (locally, per person, automatically synced), run Dynamic Edit for the rough cut, use Remove Silences to trim dead air the auto-cut left in, and optionally drop into Edit Transcript to fine-tune specific moments by editing text instead of scrubbing a timeline. Because all of it runs on the same local per-track data — no re-uploading, no waiting on a cloud job queue — that whole sequence for a 45-minute interview typically takes minutes of actual editing time, not hours.

If you're currently paying for a subscription editing tool to get auto-cut functionality, it's worth checking what tier it's actually gated behind — several competitors reserve auto-editing for a mid or top plan rather than including it by default; we cover the specifics on the [comparison pages](/vs/riverside).

## Try it on a real recording

The best way to understand what Dynamic Edit actually produces is to run it on a real conversation rather than take a description of it at face value. [Download Bloom Meeting](/download), record a short test call with a friend or co-host, and run Dynamic Edit on the take — it's free to try end-to-end, and $49 once if you decide to keep using it. See the [pricing page](/#pricing) for how that compares to what a subscription editing tool would cost over the same few months.
