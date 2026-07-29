---
title: "Introducing Bloom Meeting: record remote podcast guests without renting a studio"
description: "Why we built a $49 one-time desktop app for remote podcast recording instead of another monthly subscription."
date: "2026-07-29"
author: "Bloom Meeting"
---

Every remote podcast recording tool on the market today runs the same way: you record locally so the audio doesn't sound like a phone call, you get per-person tracks, and you pay for it every single month, forever, whether you record two episodes that week or none.

Bloom Meeting is the same core idea — local recording, per-person sync, AI-assisted editing — sold as a desktop app you buy once for $49. No seats, no metered transcription minutes, no tier where the feature you actually need is one plan up.

## The problem with subscription recording tools

If you've hosted a remote interview show for more than a few months, you already know the pattern. You sign up for a recording tool because the free tier caps out too fast. You start on the entry plan. Then you need 4K, or more transcription minutes, or the auto-editing feature, and that's the next tier up. A year later you're paying $30-45/mo for a tool you use for a few hours a week, and cancelling means losing access to the app entirely — not just new features, all of it.

That's not a criticism of any one company. It's just how SaaS pricing works: the incentive is to meter usage and gate features, because recurring revenue is the business model. Nothing wrong with that if you're building a venture-backed company. But it means the actual cost of "recording a podcast" creeps well past what the tool is worth to a single host.

## What Bloom Meeting does differently

Bloom Meeting is a desktop app, not a cloud platform. The host installs it. Guests join a meeting from an ordinary browser link — nothing to install on their end, no account required. That part isn't new; most competitors do this too.

What's different is what happens next:

- **Everyone records locally.** The live call is only for hearing each other talk. Your guest's video and audio are captured on their own machine in studio quality (8Mbps VP9 video, separate Opus audio) and chunk-uploaded to a relay server as the meeting happens, so a mid-call disconnect doesn't cost you the recording.
- **Tracks sync automatically.** Every recorder stamps a server-synced start time and its own clock offset into a `.take.json` file, so when the meeting ends, every participant's track lines up in the take folder without you touching a waveform.
- **AI runs on your machine.** Captions, transcription, silence detection, and reel generation all run through a local Whisper model and bundled ffmpeg. Nothing is billed per minute because nothing leaves your computer to be processed.
- **Editing is included, not upsold.** Dynamic Edit auto-cuts a full episode — full-screen on whoever's talking, split-screen on crosstalk — right in the same app you recorded in. So is Go Live RTMP streaming, silence removal, transcript editing, and vertical reel export.

## Why the pricing is $49, once

We priced Bloom Meeting the way you'd price a piece of software you actually own: pay for it, keep it. $49 is roughly two months of the cheapest competitor's paid plan. After that, everything you record is recorded for free, forever, on that license.

This only works because the architecture supports it. The relay server that makes the live call and uploads possible is genuinely thin — it doesn't process your recordings, it doesn't store them long-term, and it doesn't need to scale with every minute you record the way a cloud-editing pipeline would. The expensive part (transcription, editing, rendering) runs on your machine, which is also why it's free to use as much as you want.

## Who this is for

If you host a podcast with remote guests — weekly interviews, a co-hosted show, a multi-guest roundtable — and you're currently paying $20-45/mo for a recording tool you use a few hours a week, Bloom Meeting probably pays for itself in the first month you'd otherwise have paid for a subscription.

If you need a large team of seats, enterprise webinar hosting for hundreds of attendees, or a huge template/branding library, one of the subscription platforms may genuinely serve you better — we cover those tradeoffs honestly on the [comparison pages](/vs/riverside).

For everyone else: [download it](/download), record a real session, and see if it's the last recording subscription you ever pay for.
