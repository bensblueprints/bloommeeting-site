---
title: "Editing a podcast by editing the transcript: a walkthrough of Edit Transcript"
description: "How text-based editing actually works in Bloom Meeting — deleting words to cut audio and video, why it depends on accurate per-speaker transcription, and where it fits next to Dynamic Edit and Remove Silences."
date: "2026-11-13"
author: "Bloom Meeting"
---

Most people's first experience with text-based editing is a small shock: you select a filler word in a transcript, hit delete, and the audio and video actually cut at that exact point — no scrubbing a timeline, no hunting for the waveform dip that marks where the word starts and ends. It feels like a trick the first time. It isn't one. It's just what happens when a recording has an accurate, word-level-timed transcript sitting underneath it, and an editor that treats text as the primary way to point at a moment in the recording. Here's how Edit Transcript actually works, what it's good at, and where it runs into the same limits any transcript-based tool does.

## The idea behind editing by text

A conventional video editor makes you work in time: you scrub a playhead, mark an in point, mark an out point, and trim. That's fine when you're making a creative cut — choosing a shot, timing a reaction — but it's a slow, fiddly way to do the most common kind of podcast edit, which is removing things people said that shouldn't have made the cut: a false start, a stumbled word, a long aside that goes nowhere, a repeated sentence where someone re-answered the same question twice.

Edit Transcript inverts the interface. Instead of finding a moment by ear and eye, you find it by reading. The transcript is the editing surface — select a word, a sentence, or a whole paragraph of text, delete it, and the underlying audio and video for that exact span gets cut. Multiple non-contiguous cuts chain correctly, so deleting three separate filler words from three different sentences produces one continuous recording with all three gaps closed, not three separate edits you have to stitch together.

## What makes this possible: word-level timing

None of this works without a transcript that knows, for every word, exactly when it starts and ends — not just "this sentence happened somewhere in this ten-second range," but the actual start and end timestamp of each individual word. That's what a local Whisper transcription pass produces when it runs on Bloom Meeting's per-person audio tracks, and it's the same transcription layer that generates captions and feeds [Dynamic Edit's speaker detection](/blog/dynamic-edit-explained-auto-cut-speaker-detection). One accurate, timestamped transcript ends up doing triple duty: captions, auto-cut speaker tracking, and manual text-based editing, all reading from the same underlying data instead of three separate passes that could disagree with each other.

Because transcription runs per person on isolated tracks rather than on one mixed-down recording of the whole call, word timing stays accurate even when two guests talk over each other — a problem that would otherwise confuse both the transcript and the cut points it produces. A transcript built from a single blended track has to guess who said what and exactly when; a transcript built from each speaker's own clean track doesn't have to guess.

## The actual walkthrough

Here's what editing a take by transcript looks like end to end:

1. **Finish recording and let transcription run.** Like Dynamic Edit and Remove Silences, Edit Transcript works on a completed take with a finished transcript, not live during the call.
2. **Open the take in Edit Transcript.** You see the full transcript for the take, broken out by speaker, with each word individually clickable and tied to its timestamp in the recording.
3. **Select text to cut.** Click-and-drag across a word, a sentence, or a run of several sentences, the same way you'd select text in a word processor. A preview lets you hear the exact audio under the selection before you commit, so you're not deleting on faith.
4. **Delete.** The selected span is marked as cut. The transcript collapses to show what the edited recording will actually say, with the removed text struck through or hidden depending on your view — so you can keep reading the transcript as a coherent edited script rather than losing track of what's already been cut.
5. **Keep going across the whole take.** Repeat for every stumble, false start, or tangent worth removing. Because cuts are tracked as a list of spans rather than applied destructively one at a time, you can undo any individual cut later without undoing everything after it.
6. **Preview the cut sequence.** Scrub through the edited version before rendering, the same review step Dynamic Edit and Remove Silences both use — nothing commits to a final file until you've actually watched or listened to the result.
7. **Render.** Once you're happy with it, the edit renders locally via bundled ffmpeg, at the same quality as the source take — no upload, no per-minute render charge.

For a typical 45-minute interview, a thorough pass removing filler words, false starts, and a couple of tangents usually runs ten to twenty minutes of actual editing time — mostly reading, since the mechanical part of making the cut is instant.

## What it's good at, and what still needs your ear

Edit Transcript is excellent for anything you can identify by reading: filler words, repeated sentences, a guest restarting an answer, a tangent that's obviously off-topic and self-contained enough to lift out cleanly. If you can spot it on the page, you can cut it in seconds.

It's less suited to edits that depend on something the transcript doesn't capture — tone, pacing, the exact feel of a pause, or a laugh that reads as nothing in text but matters in the final cut. A line that looks redundant on the page sometimes isn't redundant when you hear the delivery; the preview step exists precisely so you catch that before committing rather than after. And because accuracy depends on the same transcription model discussed in [our piece on local Whisper transcription](/blog/local-ai-transcription-whisper-for-podcasters), the same limits apply here: heavy accents, overlapping crosstalk, and unfamiliar proper nouns can produce a transcript that's slightly off, which occasionally means a cut point lands a beat earlier or later than you'd expect. It's rarely enough to notice in the rendered audio, but it's part of why the preview-before-render step isn't optional.

## Same cut engine as Remove Silences

Edit Transcript and [Remove Silences](/blog/remove-dead-air-podcast-remove-silences-walkthrough) aren't two different systems that happen to live in the same app — they share one underlying cut engine. Remove Silences generates its candidate cuts automatically, from a silence-detection pass over the audio; Edit Transcript lets you point at the exact same kind of cut manually, by selecting text instead of accepting a flagged silence. Because both tools operate on the same timeline and the same edit-decision model, you can run a Remove Silences pass to clear out dead air and then drop into Edit Transcript to tighten specific sentences by hand, without the two steps conflicting or requiring you to re-render in between.

## Where this fits in a full edit

On a typical multi-guest interview, text-based editing is usually the last manual pass, not the first. A common order: record the take, run [Dynamic Edit](/blog/dynamic-edit-explained-auto-cut-speaker-detection) for the speaker-driven rough cut, run Remove Silences to tighten pacing, then open Edit Transcript for anything that still needs a human read-through — a rephrased question, a line that didn't land, a sentence a guest asked you to cut after the fact. Doing it last means you're reading and trimming a recording that's already close to its final shape, rather than editing raw, untrimmed footage by eye before the automated passes have done the mechanical work.

Because transcription, silence detection, auto-cutting, and text-based editing all read from the same local per-person tracks, moving between these tools doesn't mean re-uploading anything or waiting on a new cloud job for each step. The whole sequence on a 45-minute conversation is typically an hour or less of actual hands-on editing, most of which is Edit Transcript's read-and-delete pass.

## How this compares to a subscription editor's transcript-editing feature

Text-based editing isn't a Bloom Meeting invention — Descript popularized the idea, and several subscription recording and editing tools now offer some version of it. The difference worth checking before you commit to a monthly plan is what it's gated behind and what it costs beyond the subscription itself: whether transcript-based editing is included on the entry tier or reserved for a higher one, and whether transcription itself is billed per minute on top of the plan price. Bloom Meeting includes Edit Transcript, the transcription it depends on, and unlimited use of both for the one-time $49 price — see the [pricing page](/#pricing) and the [comparison pages](/vs/riverside) for the specifics on what competitors meter separately.

## Try it on a real recording

Text-based editing is one of those features that's more convincing in practice than in description — the first time you delete a sentence from a transcript and hear the recording actually cut there, it clicks in a way a written explanation can't quite capture. [Download Bloom Meeting](/download), record a short test conversation, and run an Edit Transcript pass on it. It's free to try end-to-end, and $49 once if you decide to keep using it.
