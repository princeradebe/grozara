# Grozara 30-second promo

A 1080 × 1920 spot in the site's Lime pop style (Direction 5), hosted by Zara. Built with
[Remotion](https://www.remotion.dev), which renders React to video, so it reuses the site's own
phones, stickers, cards and store badges from `../src`.

Its own project: `pnpm install` here never touches the website's dependencies.

## Pipeline

```sh
pnpm install
cp .env.example .env        # add your ElevenLabs key and voice
pnpm voices                 # shortlist South African voices (read-only)
pnpm voice                  # Zara's lines → public/vo + src/voice.json (re-times the whole cut)
pnpm sound                  # music bed + sound effects → public/music, public/sfx + src/sound.json
pnpm studio                 # preview and scrub
pnpm render                 # out/grozara-30s.mp4
pnpm master                 # loudness to -14 LUFS → out/grozara-30s-master.mp4
```

Without an ElevenLabs key, `pnpm voice` falls back to the macOS "Tessa" voice as a scratch track,
and the video renders without music or effects.

## Where things live

- `src/script.ts`: Zara's lines. Only claim what `../src/content/site.ts` claims.
- `src/timeline.ts`: scene timings (built from the voice lengths) and the cue points pictures and
  sounds share.
- `src/scenes.tsx`: the six bands. `src/Host.tsx`: Zara hopping between them and lip-syncing.
- `src/Zara.tsx`: the 2D sticker Zara and her pose controls. The `Check` composition is her pose sheet.
- `src/Sound.tsx`: the mix (voice, ducked music, effects on cues).

Remotion is free for individuals and companies of up to three people; larger companies need a
[company licence](https://www.remotion.dev/license).
