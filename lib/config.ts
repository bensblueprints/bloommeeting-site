// Single source of truth for Bloom Meeting site content.
// Programmatic SEO pages (/vs/*, /for/*) are generated from the arrays below.

export const SITE = {
  name: "Bloom Meeting",
  tagline: "The Riverside.fm replacement you buy once.",
  description:
    "Bloom Meeting is a desktop app for recording remote podcast guests in studio quality. Guests join from a browser link, everyone records locally, and you own the app forever for $49 — no monthly bill.",
  url: "https://bloommeeting.advancedmarketing.co",
  ogImage: "/images/bloommeeting-home.png",
  price: 49,
  priceDisplay: "$49",
  githubOwner: "bensblueprints",
  githubRepo: "bloommeeting",
  githubReleasesApi:
    "https://api.github.com/repos/bensblueprints/bloommeeting/releases",
  githubRepoUrl: "https://github.com/bensblueprints/bloommeeting",
} as const;

// Defined ONCE. Every buy button on the site points here.
export const WHOP_URL = "https://whop.com/benjisaiempire/bloom-meeting";

export const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/blog", label: "Blog" },
];

export type Feature = {
  title: string;
  description: string;
  image?: string;
};

export const FEATURES: Feature[] = [
  {
    title: "Guests join from a browser link",
    description:
      "No install, no account, nothing to download. Send a link, they click it, the meeting starts. Up to 4 guests plus the host over mesh WebRTC with TURN fallback so it works behind hotel wifi and corporate firewalls.",
    image: "/images/bloommeeting-home.png",
  },
  {
    title: "Everyone records locally, in studio quality",
    description:
      "The live call carries conversation only — it is never the recording. Guests dual-record video (8Mbps VP9) and audio (separate Opus track) on their own machine and chunk-upload to your relay as they go. The host records locally in-app. No more choppy Zoom audio ruining an episode.",
  },
  {
    title: "Per-person tracks, automatically synced",
    description:
      "Every participant gets their own take folder with server-stamped start times and per-recorder clock offsets baked into a .take.json file, so every track lines up in post without you touching a waveform.",
  },
  {
    title: "Local AI captions, per speaker",
    description:
      "A quantized Whisper model runs fully offline on your machine to transcribe every speaker. Nothing is uploaded to a captioning API and there's no per-minute bill — captions are just part of the app.",
  },
  {
    title: "Dynamic Edit — auto-cut episodes",
    description:
      "Bloom Meeting transcribes every participant locally and auto-cuts the take into an edited episode: full-screen on whoever's talking, split-screen the moment two people talk over each other. Preview and override any cut before it renders 1080p via bundled ffmpeg.",
    image: "/images/screenshot-both.png",
  },
  {
    title: "Go Live while you record",
    description:
      "Broadcast the composited meeting grid — speaker labels, 1-up or split layouts — straight to Twitch or any RTMP server while the local, uncompressed recording keeps saving in the background. Stream quality and archive quality are two different things; Bloom Meeting doesn't make you choose.",
  },
  {
    title: "Remove silences, edit the transcript",
    description:
      "Cut dead air with one pass of ffmpeg silence detection you can review before committing, or edit the video by editing the transcript text Descript-style — click a word, mark it, apply. Same cut engine under both.",
  },
  {
    title: "Vertical reels for clips",
    description:
      "Make Viral Reels scores the transcript for hook words, emphasis, and pacing, then cuts and reframes the strongest moments to 9:16 automatically — a starting point for a producer, not a claim about what will go viral.",
    image: "/images/screenshot-camera.png",
  },
];

export type Competitor = {
  slug: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice?: number;
  yearlyPrice: number;
  pricingNote: string;
  category: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
  migrationAngle: string;
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "riverside",
    name: "Riverside.fm",
    tagline: "the category leader for local-recording podcast studios",
    monthlyPrice: 24,
    annualMonthlyPrice: 19,
    yearlyPrice: 288,
    pricingNote:
      "Pro plan $24/mo billed monthly ($19/mo on the annual plan = $228/yr), Grow $34/mo, Webinar $79/mo. Free plan caps out at 2 hours and watermarks exports.",
    category: "Remote podcast/video recording studio",
    strengths: [
      "Polished, well-known brand with a large template/asset library",
      "Built-in webinar tier for larger broadcasts",
      "Browser-based host dashboard — nothing to install for the host either",
    ],
    weaknesses: [
      "Every plan is a recurring subscription that never stops",
      "Local recording + AI editing features are split across pricier tiers",
      "Storage and transcription minutes are metered and capped per plan",
    ],
    bestFor: "teams that want a fully browser-based, no-install workflow and don't mind the recurring bill",
    migrationAngle:
      "Bloom Meeting covers the exact workflow Riverside built its name on — local recording, per-person tracks, AI captions, auto-edit — as a $49 one-time desktop app instead of an indefinite subscription. Cancel Riverside once you've recorded a season and you keep the app.",
  },
  {
    slug: "zencastr",
    name: "Zencastr",
    tagline: "a long-running local-recording tool with a ZenAI editing suite",
    monthlyPrice: 20,
    annualMonthlyPrice: 16,
    yearlyPrice: 240,
    pricingNote:
      "Standard $20/mo (lossless audio, separate tracks, 1080p). Grow $30/mo adds 4K + filler-word removal + social clips. Professional $50/mo adds team seats and dynamic ad insertion.",
    category: "Remote podcast recording + AI post-production",
    strengths: [
      "Mature product with a strong ZenAI content-repurposing suite",
      "Direct publishing integrations to podcast hosts",
      "Free tier exists for casual/occasional recording",
    ],
    weaknesses: [
      "Filler-word removal and social clips are locked behind the $30+/mo Grow tier",
      "Team features and higher download limits require the $50/mo Professional plan",
      "Everything runs through Zencastr's cloud — no fully offline option",
    ],
    bestFor: "creators who want an all-in-one cloud editing suite and are fine paying monthly for it",
    migrationAngle:
      "Zencastr's core pitch — local recording that survives a bad connection — is exactly what Bloom Meeting does, minus the recurring fee. Dynamic Edit, silence removal, and reels are included at every install, not gated behind a $30 or $50/mo tier.",
  },
  {
    slug: "squadcast",
    name: "SquadCast",
    tagline: "a local-recording tool now bundled free with Descript",
    monthlyPrice: 20,
    annualMonthlyPrice: 20,
    yearlyPrice: 240,
    pricingNote:
      "Hobbyist $20/mo for 5 hours of recording. Creator ~$24/mo (annual) unlocks 4K video. SquadCast is included free with any Descript subscription — which starts its own billing at $16-24/user/mo.",
    category: "Remote podcast recording studio",
    strengths: [
      "Now owned by Descript, so it plugs directly into Descript's editor",
      "Straightforward, focused recording tool without much bloat",
    ],
    weaknesses: [
      "Hobbyist plan caps recording time at 5 hours/month",
      "4K and higher limits require the paid Creator tier or a Descript subscription",
      "Editing happens in a separate product (Descript), which is its own subscription",
    ],
    bestFor: "existing Descript subscribers who want recording bundled into a tool they already pay for",
    migrationAngle:
      "If you're not already paying for Descript, SquadCast's $20+/mo is pure additional cost. Bloom Meeting records at the same studio quality and includes the editor — auto-cut, captions, silence removal, transcript editing — in the same $49 app, no Descript seat required.",
  },
  {
    slug: "streamyard",
    name: "StreamYard",
    tagline: "the go-to live-streaming/webinar studio, not a local-recording tool",
    monthlyPrice: 44.99,
    annualMonthlyPrice: 35.99,
    yearlyPrice: 431.88,
    pricingNote:
      "Core $44.99/mo ($35.99/mo annual) removes branding and adds multistreaming. Advanced $88.99/mo adds webinars + transcripts. Business is $299/mo for 2-10 seats.",
    category: "Live streaming / multistreaming studio",
    strengths: [
      "Best-in-class multistreaming to YouTube, Facebook, and LinkedIn simultaneously",
      "Strong on-screen branding and overlay tools for live shows",
      "No download required for guests or host — everything runs in-browser",
    ],
    weaknesses: [
      "It's a streaming tool first — recordings are the compressed stream, not per-person studio-quality tracks",
      "No AI auto-edit, silence removal, or transcript editing built in",
      "Core plan alone runs $432/yr on annual billing before you touch a higher tier",
    ],
    bestFor: "live shows and webinars where the stream itself is the deliverable, not a downstream edit",
    migrationAngle:
      "StreamYard and Bloom Meeting actually solve different problems, and Bloom Meeting does both: it has its own Go Live RTMP broadcast for the live side, plus everyone recording locally in studio quality for the edit — something StreamYard's compressed multistream can't give you. One $49 app instead of a $432+/yr streaming subscription.",
  },
  {
    slug: "descript",
    name: "Descript",
    tagline: "the transcript-driven video/audio editor that popularized edit-by-text",
    monthlyPrice: 24,
    annualMonthlyPrice: 16,
    yearlyPrice: 192,
    pricingNote:
      "Hobbyist $16/mo annual ($24/mo monthly) for ~10 transcription hours. Creator $24/mo annual ($35/mo monthly) for 30 media hours + 4K export. Business $40-50/mo for teams.",
    category: "Transcript-based audio/video editor",
    strengths: [
      "The original and still the most refined transcript-editing experience",
      "Overdub/AI voice tools and a large template library",
      "Genuinely great for solo creators editing talking-head video",
    ],
    weaknesses: [
      "Not a live recording tool by itself — you need SquadCast or another recorder for remote guests",
      "Transcription hours are metered per plan (10-30 hrs/mo) — go over and you pay more or wait",
      "Auto-cut / speaker-aware editing isn't part of the core product the way Dynamic Edit is",
    ],
    bestFor: "solo creators who already have footage and want the best possible transcript-editing UI",
    migrationAngle:
      "Bloom Meeting borrowed the best idea from Descript — edit the video by editing the transcript — and bundled it with the recording step Descript doesn't do itself. No metered transcription hours: the local Whisper model runs as much as your machine can process, for $49 once.",
  },
  {
    slug: "restream",
    name: "Restream",
    tagline: "a multistreaming/webinar platform built around distribution, not recording",
    monthlyPrice: 39,
    annualMonthlyPrice: 31,
    yearlyPrice: 372,
    pricingNote:
      "Standard $16/mo (3 channels). Professional $39/mo (5 channels, 1080p, split recordings). Business $199/mo (8 channels, SRT ingest). Extra seats run $25/mo each on top of any tier.",
    category: "Multistreaming and live distribution",
    strengths: [
      "Widest channel/destination support for simultaneous live broadcast",
      "Split recordings and a web-based studio for live shows",
      "SRT ingest on the Business tier for pro broadcast setups",
    ],
    weaknesses: [
      "Designed around live distribution, not studio-quality per-person recording for editing",
      "Extra seats and channels add cost quickly on top of the base plan",
      "No local AI editing (auto-cut, silence removal, reels) — recording is a side feature",
    ],
    bestFor: "shows that need to hit many live destinations at once and don't need a heavy edit afterward",
    migrationAngle:
      "Restream is built for reach, Bloom Meeting is built for the recording and the edit. Bloom Meeting's own Go Live pushes RTMP to Twitch or any custom server while every participant still records a clean local track — so you're not trading distribution for recording quality, and you're not paying $39-199/mo plus per-seat fees to get it.",
  },
];

export type Industry = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  useCases: string[];
  painPoints: string[];
  workflow: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "podcasters",
    name: "Podcasters",
    headline: "Record every remote guest in studio quality, no install required",
    summary:
      "You already know the drill: a great guest, a shaky Zoom call, and audio that sounds like it was recorded through a tin can. Bloom Meeting fixes the actual problem — everyone records locally on their own machine — while the browser link keeps the barrier to entry at zero for the guest.",
    useCases: [
      "Weekly interview shows with a new remote guest every episode",
      "Co-hosted shows where hosts are in different cities",
      "Multi-guest roundtable episodes with 3-4 participants at once",
    ],
    painPoints: [
      "Guests who won't install an app to be on your show",
      "Editing hours lost syncing separate Zoom recordings by hand",
      "Paying $20-35/mo forever for a tool used a few hours a week",
    ],
    workflow: [
      "Send the guest a link — they click it and join from their browser, camera and mic already working",
      "Record the conversation; each track uploads to your relay and lands in a synced take folder when the call ends",
      "Run Dynamic Edit for a rough cut, then trim in Edit Transcript before publishing",
    ],
  },
  {
    slug: "coaches",
    name: "Coaches",
    headline: "Turn coaching calls into polished testimonials and course content",
    summary:
      "Client sessions are some of the best raw material a coaching business has — if you can capture them cleanly and turn them into short clips without hiring an editor. Bloom Meeting records the call in studio quality and auto-generates vertical clips from it.",
    useCases: [
      "Recording client sessions (with permission) for testimonial clips",
      "Turning a group coaching call into a bank of short-form content",
      "Building an evergreen course library from live call recordings",
    ],
    painPoints: [
      "Client audio that's unusable for anything public because it was captured off a Zoom call",
      "No time to scrub through an hour-long call looking for the 30-second clip worth posting",
      "Subscription tools that charge per seat when it's really a one-person operation",
    ],
    workflow: [
      "Start a Bloom Meeting session with the client joining from a browser link — nothing for them to install",
      "After the call, run Make Reels to surface the highest-energy 15-60 second moments automatically",
      "Add burned-in captions and export straight to social",
    ],
  },
  {
    slug: "real-estate-agents",
    name: "Real Estate Agents",
    headline: "Record client consultations and buyer walkthroughs that sound like they were shot in a studio",
    summary:
      "Video is how listings and agent brands get found now, and remote buyer consultations are increasingly the first touchpoint. Bloom Meeting lets an agent record a clean two-person conversation with a client anywhere, with no app for the client to download.",
    useCases: [
      "Remote buyer/seller consultation calls turned into short educational clips",
      "Co-hosted market update shows with a lending partner or another agent",
      "Client testimonial interviews recorded over a video call",
    ],
    painPoints: [
      "Clients who won't download another app just to talk to their agent",
      "Choppy Zoom audio undermining a brand built on trust and polish",
      "No in-house editor to turn a 20-minute call into shareable clips",
    ],
    workflow: [
      "Share a browser link with the client — no account, no install",
      "Record locally in studio quality on both ends",
      "Use Remove Silences and Make Reels to turn the recording into clean social content same-day",
    ],
  },
  {
    slug: "lawyers",
    name: "Lawyers",
    headline: "Record depositions, client intake calls, and CLE content with zero friction for the other party",
    summary:
      "Attorneys who create client-facing video — intake explainers, case-update calls, CLE presentations — need recordings that are clean enough to reuse and don't require the other party to install anything unfamiliar.",
    useCases: [
      "Client intake or consultation calls recorded for the file",
      "Attorney-hosted CLE or legal-education video content",
      "Co-counsel discussions recorded for later reference",
    ],
    painPoints: [
      "Opposing counsel or clients unwilling to install unfamiliar recording software",
      "Compressed video-call audio that's hard to transcribe accurately for the record",
      "Per-seat subscription tools that don't make sense for occasional use",
    ],
    workflow: [
      "Send a browser link — the other party joins with nothing installed",
      "Record locally in studio quality with automatic local transcription",
      "Use Edit Transcript to produce a clean, accurate written record alongside the video",
    ],
  },
  {
    slug: "doctors",
    name: "Doctors",
    headline: "Record patient-education and CME content without a production crew",
    summary:
      "Physicians building a patient-education library or recording CME sessions with colleagues need studio-quality audio and video without hiring a videographer for every session — and without the recording ever leaving their machine.",
    useCases: [
      "Patient-education video series recorded with a co-host or moderator",
      "CME panel discussions with remote physician guests",
      "Practice-marketing interviews and Q&A content",
    ],
    painPoints: [
      "Compliance-minded practices wary of cloud recording tools that upload everything",
      "Guests (other physicians) who won't install specialty software for a single session",
      "Limited time to spend on video editing between patients",
    ],
    workflow: [
      "Guest joins from a browser link — no install, no account",
      "Recording happens locally on each machine, never routed through a third-party cloud editor",
      "Dynamic Edit produces a rough cut automatically; trim further in Edit Transcript",
    ],
  },
  {
    slug: "financial-advisors",
    name: "Financial Advisors",
    headline: "Record client reviews and market-update shows that sound as credible as they are",
    summary:
      "Trust is the entire product in financial advising, and audio quality signals credibility whether you intend it to or not. Bloom Meeting records advisor-client calls and co-hosted market shows in studio quality with nothing for the client to install.",
    useCases: [
      "Quarterly client review calls recorded for reference or content",
      "Co-hosted market-update shows with a colleague or CPA partner",
      "Educational webinar content streamed live and recorded simultaneously",
    ],
    painPoints: [
      "Choppy audio undermining a brand built on trust and precision",
      "Compliance concerns about where recorded client conversations are stored",
      "Clients unwilling to create an account just to join a video call",
    ],
    workflow: [
      "Client joins via browser link — no account required",
      "Everyone records locally, in studio quality, with data staying on your machine except during the live relay",
      "Go Live to stream a market update to YouTube while it records a full-quality local copy",
    ],
  },
  {
    slug: "churches",
    name: "Churches",
    headline: "Record remote guest speakers and interviews without asking them to install anything",
    summary:
      "Churches record more video than almost any other small organization — sermons, guest speakers, testimonies, small-group interviews — usually on a volunteer budget. Bloom Meeting lets a remote guest speaker join from a link and records everyone in studio quality without a second subscription line item.",
    useCases: [
      "Remote guest speaker segments recorded for a service or podcast",
      "Testimony interviews with congregation members",
      "Multi-campus pastor conversations recorded for the church's media team",
    ],
    painPoints: [
      "Volunteer media teams with no budget for a $20-35/mo recording subscription",
      "Guest speakers unwilling to install software for a single segment",
      "No dedicated editor to sync multiple camera/audio sources by hand",
    ],
    workflow: [
      "Send the guest speaker a browser link — they join from their laptop or phone, nothing installed",
      "Record locally in studio quality on both ends",
      "Dynamic Edit auto-cuts the conversation; the media team trims and exports",
    ],
  },
  {
    slug: "universities",
    name: "Universities",
    headline: "Record remote guest lectures and faculty interviews at studio quality on a department budget",
    summary:
      "Departments running guest-lecture series, faculty podcasts, or alumni interview programs need a tool that a visiting speaker can join with zero setup, and that doesn't require a new procurement request for every semester.",
    useCases: [
      "Guest lecture series with remote speakers",
      "Faculty or research-focused podcast programs",
      "Alumni interview content for development and admissions",
    ],
    painPoints: [
      "Visiting faculty and guest speakers who won't install unfamiliar software minutes before a lecture",
      "Departmental budgets that don't accommodate recurring per-seat software subscriptions",
      "IT policies restricting what can be installed on department machines",
    ],
    workflow: [
      "Guest speaker joins from a browser link on any device",
      "Recording happens locally; captions are generated on-device with no data leaving the machine except the live relay",
      "Edit Transcript produces an accurate written record alongside the video for accessibility requirements",
    ],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    headline: "Run client interviews and branded podcasts without adding another recurring line item per seat",
    summary:
      "Agencies producing podcast or video content for multiple clients need a recorder that scales without turning into a per-seat, per-client subscription problem. One Bloom Meeting license covers every session, every client, every seat on the machine it's installed on.",
    useCases: [
      "White-label podcast production for client accounts",
      "Founder or executive interview series recorded for client brands",
      "Internal thought-leadership content recorded with agency staff",
    ],
    painPoints: [
      "Per-seat subscription tools that don't scale cleanly across multiple client accounts",
      "Clients who won't install unfamiliar software for a single recording session",
      "Editors spending billable hours syncing tracks by hand instead of editing",
    ],
    workflow: [
      "Client or exec guest joins via browser link — no install, no account required on their end",
      "Recording happens locally in studio quality with automatic per-person sync",
      "Dynamic Edit and Make Reels turn the raw session into a rough cut and social clips same-day",
    ],
  },
  {
    slug: "hr-teams",
    name: "HR Teams",
    headline: "Record employee interviews, town halls, and onboarding content that doesn't sound like a bad Zoom call",
    summary:
      "HR and internal-comms teams record more video than they get credit for — town halls, exec interviews, onboarding walkthroughs, exit interviews. Bloom Meeting captures all of it in studio quality without needing the employee to install anything.",
    useCases: [
      "Executive or employee interview series for internal comms",
      "Recorded town halls and all-hands segments",
      "Onboarding and training video content",
    ],
    painPoints: [
      "Employees on locked-down corporate machines who can't install new software",
      "Audio quality that undermines otherwise well-produced internal content",
      "IT and security teams wary of cloud-first recording tools",
    ],
    workflow: [
      "Employee joins the recording session from a browser link — nothing to install on a locked-down machine",
      "Recording happens locally on the host's machine; the relay only carries the live call",
      "Remove Silences and burn in captions before publishing internally",
    ],
  },
  {
    slug: "recruiters",
    name: "Recruiters",
    headline: "Record candidate interviews and hiring-manager conversations in studio quality",
    summary:
      "Recruiters recording candidate spotlights, hiring-manager Q&As, or employer-branding interviews need a frictionless join experience for candidates who are often interviewing on a work laptop with limited install permissions.",
    useCases: [
      "Candidate spotlight interviews for employer branding",
      "Hiring-manager Q&A content for careers pages",
      "Internal recruiter training and onboarding recordings",
    ],
    painPoints: [
      "Candidates on locked-down work devices unable to install recording software",
      "Choppy call audio that makes candidate spotlights look unpolished",
      "No dedicated video team to clean up raw interview footage",
    ],
    workflow: [
      "Send a browser link to the candidate or hiring manager — no install required",
      "Record locally in studio quality on both ends",
      "Auto-generate captions and a rough cut with Dynamic Edit before publishing",
    ],
  },
  {
    slug: "journalists",
    name: "Journalists",
    headline: "Record remote interviews at broadcast-usable quality, with an accurate local transcript",
    summary:
      "A journalist's credibility rides on accurate quotes and usable audio. Bloom Meeting records every remote interview in studio quality and transcribes it locally — nothing sent to a third-party captioning API — with a transcript editor built for pulling exact quotes.",
    useCases: [
      "Remote source interviews for print, podcast, or video stories",
      "Panel or roundtable discussions with multiple remote guests",
      "Investigative interviews where source privacy matters",
    ],
    painPoints: [
      "Sources unwilling to install unfamiliar software before an interview",
      "Cloud transcription services that raise source-confidentiality concerns",
      "Editing audio for broadcast when the original call quality was poor",
    ],
    workflow: [
      "Source joins via browser link — no install, no account",
      "Both sides record locally in studio quality; transcription happens on-device, never in the cloud",
      "Use Edit Transcript to pull exact, accurately-timed quotes for the piece",
    ],
  },
  {
    slug: "authors",
    name: "Authors",
    headline: "Record book-tour interviews and reader Q&As without a subscription tool you'll use twice a year",
    summary:
      "Authors doing podcast tours, virtual book clubs, or reader Q&As need studio-quality recording for the handful of weeks a book launches — not a $20-35/mo subscription running year-round for occasional use.",
    useCases: [
      "Podcast interview tours around a book launch",
      "Virtual book club Q&A sessions recorded for later distribution",
      "Co-authored or ghostwriter interview content",
    ],
    painPoints: [
      "Paying for a recording subscription that sits unused between launches",
      "Guests (other authors, hosts) who won't install software for a single interview",
      "No editor on staff to clean up raw interview audio",
    ],
    workflow: [
      "Interviewer or guest joins via browser link — no install",
      "Recording happens locally in studio quality on both ends",
      "Remove Silences and export clips for social promotion around the launch",
    ],
  },
  {
    slug: "fitness-coaches",
    name: "Fitness Coaches",
    headline: "Record coaching calls and expert interviews that convert into short-form content",
    summary:
      "Fitness coaches building an audience live and die by short-form clips, and the best clips usually come from real conversations — client check-ins, expert interviews, Q&A calls — not scripted content. Bloom Meeting records those calls in studio quality and auto-cuts vertical clips from them.",
    useCases: [
      "Client check-in calls recorded (with permission) for transformation content",
      "Expert or guest-coach interview series",
      "Live Q&A sessions streamed and recorded simultaneously",
    ],
    painPoints: [
      "Clients who won't install an app just for a coaching call",
      "No time between sessions to manually clip an hour-long call",
      "Subscription tools charging monthly for what's really occasional use",
    ],
    workflow: [
      "Client or guest joins via browser link on their phone or laptop",
      "Record locally in studio quality on both ends",
      "Run Make Reels to auto-surface the highest-energy 15-60 second moments for social",
    ],
  },
  {
    slug: "consultants",
    name: "Consultants",
    headline: "Record client workshops and thought-leadership interviews without another monthly bill",
    summary:
      "Independent consultants recording client workshops, expert-interview series, or thought-leadership content need a tool that scales with an irregular schedule — some months heavy, some months nothing — without a subscription running the whole time regardless.",
    useCases: [
      "Client workshop and strategy-session recordings",
      "Thought-leadership interview series for a personal brand",
      "Recorded proposal walkthroughs and case-study conversations",
    ],
    painPoints: [
      "Recurring subscription cost that doesn't track with genuinely irregular usage",
      "Clients who won't install unfamiliar recording software for a single session",
      "No time to manually sync and edit multi-track recordings between client work",
    ],
    workflow: [
      "Client or guest joins via browser link — no install, no account",
      "Recording happens locally in studio quality with automatic per-person sync",
      "Dynamic Edit produces a usable rough cut without a manual editing pass",
    ],
  },
];

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do my guests need to install anything?",
    answer:
      "No. Guests join a meeting from an ordinary browser link — nothing to download, no account to create. Only the host runs the Bloom Meeting desktop app.",
  },
  {
    question: "Is it really a one-time purchase?",
    answer:
      "Yes. Bloom Meeting is $49 once, not a subscription. You get the current version and can keep using it indefinitely. Compare that to Riverside at $24/mo ($288/yr) — Bloom Meeting pays for itself before month two.",
  },
  {
    question: "Where does the recording actually happen?",
    answer:
      "Locally, on each participant's machine. The live call is only for hearing each other talk — every participant records their own studio-quality video and audio locally, and guest tracks upload to a relay server during the call so they're available when the meeting ends. Nothing about the editing, captioning, or transcription happens in the cloud.",
  },
  {
    question: "What does the relay server actually do?",
    answer:
      "It's a thin server that handles the live call (so guests can hear the host and each other) and receives the chunked uploads of guest recordings during the meeting. It doesn't process, edit, or store your final recordings long-term — that all happens on your machine.",
  },
  {
    question: "Does it work on Mac and Windows?",
    answer:
      "Bloom Meeting ships signed installers for Windows and macOS. See the Download page for the current release, file sizes, and first-launch notes for each platform.",
  },
  {
    question: "How many guests can join a meeting?",
    answer:
      "Up to 4 guests plus the host in a single meeting, each recording their own studio-quality track.",
  },
  {
    question: "Can I stream live while recording?",
    answer:
      "Yes — Go Live composites the meeting into a grid (speaker labels, 1-up or split layouts) and streams it via RTMP to Twitch or any custom RTMP server, while the full-quality local recording keeps saving at the same time.",
  },
  {
    question: "How is this different from just using Riverside or Zencastr?",
    answer:
      "Same core workflow — local recording, per-person tracks, AI editing tools — but Bloom Meeting is a $49 desktop app you own, not a $20-35/mo subscription. See the /vs pages for a full breakdown against each competitor.",
  },
  {
    question: "Is the app unsigned? Will Windows or macOS warn me?",
    answer:
      "Early releases may not yet carry a paid code-signing certificate, so Windows SmartScreen or macOS Gatekeeper may show a first-launch warning. This is normal for indie desktop software — the Download page walks through exactly how to proceed on each platform.",
  },
  {
    question: "Do I need an internet connection to edit recordings?",
    answer:
      "No. Transcription, captions, silence removal, transcript editing, and reel generation all run locally via a bundled Whisper model and ffmpeg. The only feature that needs a network connection is the live call itself and Go Live streaming.",
  },
];
