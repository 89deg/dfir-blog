# Handoff: DFIR Portfolio Blog — dfir.89deg.com

## Overview

A personal blog / portfolio for **Nils Hillmann**, an aspiring digital forensics (DFIR) analyst. Its explicit goal is to convince recruiters: "this person has real knowledge and works at it continuously." Content is authored as Markdown files (no admin panel). The site presents:

1. **Articles** — technical deep dives (RSA, Diffie–Hellman, DHCP in Wireshark), including a recurring **"Protocol of the Week"** rubric
2. **Field Notes** — a dated lab-log / diary of what Nils is actually doing and learning
3. **Toolbox** — an inventory of forensic tools with an honest self-assessed proficiency score (rendered as hex bytes) backed by verifiable "receipts" (named TryHackMe / CyberDefenders challenges)
4. **About / Contact** — a recruiter-facing page with CTA, verification links, and CV download

Target deployment: **dfir.89deg.com**. Language: **English**.

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, **not production code to copy directly**. The task is to **recreate these designs in the target codebase's environment**. Since content is managed as Markdown files, a static-site generator is the natural fit — e.g. **Astro, Eleventy, Hugo, or Zola** — with articles, field notes, and tools defined as Markdown/front-matter collections. If the developer prefers another stack, the designs translate to any component framework.

The `.dc.html` files use a proprietary template runtime (`<x-dc>`, `{{ }}` holes, `<sc-for>`/`<sc-if>` loops, `support.js`). **Ignore the runtime mechanics** — read them for markup structure, inline styles (exact values), and the data shapes in the `<script data-dc-script>` blocks (these are the content models to turn into front-matter schemas).

## Fidelity

**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate pixel-perfectly. All content (article titles, log entries, challenge names, scores, dates, profile links) is **plausible placeholder** — the real content comes from Nils's Markdown files.

## Design Tokens

All colors are defined as CSS custom properties on `:root` (light) and overridden on `html[data-theme="dark"]`. Copy this table verbatim.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#FBFBF9` | `#101413` | page background (warm off-white / warm near-black) |
| `--ink` | `#161B18` | `#E4E9E5` | headings, primary text, strong borders |
| `--body` | `#2B322E` | `#C6CEC8` | article body text |
| `--dim` | `#454C48` | `#A9B3AC` | lede/dek text |
| `--muted` | `#6B7370` | `#8D978F` | secondary/meta text |
| `--faint` | `#8A928D` | `#707A73` | faintest labels |
| `--hairline` | `#E4E6E2` | `#262D29` | primary dividers |
| `--hairline2` | `#ECEEE9` | `#212724` | subtle dividers (log rows) |
| `--soft` | `#F5F6F2` | `#161B18` | tinted section/callout background |
| `--hover` | `#F4F6F2` | `#1A201C` | list-row hover background |
| `--card` | `#FFFFFF` | `#141917` | card background |
| `--shadow` | `#DCEEE2` | `#14291E` | hard offset shadow + text selection |
| `--accent` | `#0E7A4A` | `#45A97A` | forensic green — links, active states, filled bytes |
| `--accent-bd` | `#C4DFCE` | `#2C4A3A` | light accent border (tag chips) |
| `--sep` | `#D3D8D2` | `#343C37` | separators, inactive chip borders |
| `--offcell` | `#C5CBC5` | `#3B443E` | unfilled proficiency bytes ("00") |
| `--panel-dark` | `#161B18` | `#0B0F0D` | always-dark surfaces: footer, code blocks, CTA box |

Literals that stay constant in both modes (used only on always-dark surfaces): `#E8EBE8` (footer text), `#9BA59E` (footer muted), `#7FC79F` (footer links / code green), `#D8DED9` (code text), `#D9A54A` (code strings/amber), `#F2F8F4` (text on accent), `#2C332E` / `#3A423C` (borders on dark).

Also set `color-scheme: light` / `dark` with the theme.

### Typography

- **Serif (display + body):** `Newsreader` (Google Fonts, optical sizing, weights 300–600, italics). Fallback: Georgia, serif.
- **Mono (meta/technical):** `IBM Plex Mono` (400/500/600). Everything "system-ish" is mono: nav, dates, tags, labels, bytes, code, footers.
- Scale (desktop → mobile uses `clamp()`):
  - Page H1: 56–62px, weight 500, line-height 1.06–1.08, letter-spacing −0.015em; mobile `clamp(34px, 7.5vw, 56px)` (home: `clamp(36px, 8vw, 62px)`)
  - Article H2: 30px, weight 500
  - List-item titles: 25–26px, weight 500
  - Ledes: 20–22px italic, dim
  - Body prose: 18.5–19px / 1.7
  - Mono meta: 11–13px, letter-spacing 0.04–0.12em, labels UPPERCASE
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

### Other tokens

- **No border radius anywhere** — everything square-cornered.
- Signature shadow: `box-shadow: 5px 5px 0 0 var(--shadow)` (hard offset, no blur) on featured cards.
- Content column: `max-width: 1060px; margin: 0 auto; padding: 0 32px` (20px on mobile).
- Section top/bottom padding: 64–84px.
- Selection color: `::selection { background: var(--shadow) }`.

## Shared Chrome (all pages)

**Header** — 1px `--hairline` bottom border. Left: `NILS HILLMANN` (mono 15px, 600, links home) + `dfir.89deg.com` (mono 12px, faint). Right nav (mono 12px, uppercase, letter-spacing 0.08em, gap 26px): ARTICLES · FIELD NOTES · TOOLBOX · CONTACT. Active page link is `--accent`; others `--ink`, hover `--accent`. After CONTACT: the **theme toggle** — a bordered mono button showing `◐` (border `--sep`, text `--muted`, hover accent).

**Footer** — background `--panel-dark`, mono 11.5px, `#6B7370` text: `© 2026 Nils Hillmann · dfir.89deg.com` left, `built by hand · no trackers` right.

**Section headers** (recurring pattern): mono 15px/600 UPPERCASE title, 1px `--ink` bottom border, right-aligned faint mono annotation or accent link.

**Kicker pattern**: every page opens with a mono 12px accent line like `// FIELD NOTES — FULL LAB LOG`.

## Screens / Views

### 1. Home (`DFIR Blog - Home.dc.html`)

- **Hero**: kicker `// DIGITAL FORENSICS & INCIDENT RESPONSE — LEARNED IN PUBLIC`; H1 "Every byte leaves a trace. I write down where I found it." (max 17ch); 21px dim intro paragraph (max 58ch); status line: 8px accent dot + mono `STATUS: open for junior DFIR / SOC roles · last updated 2026-07-02`.
- **Protocol of the Week** card: 1px `--ink` border, `--card` bg, signature shadow. Two-column grid `200px 1fr`. Left band: `--accent` bg, `#F2F8F4` text, "PROTOCOL OF THE WEEK" label top, `WK 27 / 2026` bottom. Right: H2 "DNS" 32px + mono meta `udp/53 · tcp/53 · RFC 1035`, one paragraph, accent underlined mono link "READ THE WRITE-UP →" (→ Articles page).
- **Articles list** (latest 3): rows are grid `150px 1fr auto` (date | title 25px + italic dek | bordered accent tag chip), 1px hairline separators, row hover bg `--hover`. Header link "all write-ups →".
- **Field Notes teaser** (3 entries): full-bleed `--soft` band. Rows grid `150px 1fr`: accent mono date | 17.5px text. Link `> full log continues in the archive_ →`.
- **Toolbox teaser**: 2-col grid (gap 48px) of 6 tools: name (23px, links to vendor) + score `n/10` mono right; italic one-liner; **proficiency bytes** (see Toolbox); mono evidence line + "get it →". Footnote + "full toolbox with receipts →".
- **Contact footer CTA**: dark panel, grid `1.4fr 1fr`: H2 34px "Hiring for a junior DFIR or SOC role? Let's talk." + paragraph | column of `#7FC79F` mono links (email, GitHub, TryHackMe).

### 2. Articles index (`DFIR Blog - Articles.dc.html`)

Kicker `// ARTICLES — ALL WRITE-UPS`; H1 "Deep dives, from first principles."; italic lede. **Filter bar** above list (see Interactions). Rows: grid `150px 1fr auto` — left column stacks date + reading time (mono 11–12px); center title 25px + italic dek; right tag chip. **Draft state**: newest item is a draft — title in `--faint`, chip reads `DRAFT · NETWORK` with `--sep` border and faint text. End line: `> one deep dive at a time · protocol of the week ships every monday_`.

### 3. Article detail (`DFIR Blog - Article.dc.html`) — "Finding the host: DHCP in Wireshark"

- Breadcrumb row (mono 12px): `← ALL ARTICLES / [NETWORK chip] 2026-05-30 · 9 MIN READ`; H1; 22px italic dek; 1px `--ink` rule.
- Body: grid `220px minmax(0, 660px)`, gap 56px. Left: **sticky TOC** (mono 12px, numbered 01–05 anchor links, "CONTENTS" label). Right: prose article.
- Content patterns to build as reusable article components:
  - **Data table** ("DORA handshake"): bordered container, mono 13px; header row `--panel-dark` bg / light text; 4 columns `44px 110px 1fr 130px`; client rows highlighted with accent letters. Horizontally scrollable on mobile (`overflow-x: auto`, min-width 560px).
  - **Option callouts** (×3): grid `120px 1fr`, `--soft` bg, 3px accent left border, mono accent label ("Option 12") + rich text.
  - **Code block**: `--panel-dark` bg, mono 14px / line-height 2.1, padding 22px 26px; comments `#6B7370`, fields `#7FC79F`, operators `#E8EBE8`, strings/numbers `#D9A54A`.
  - **Takeaway box**: 1px `--ink` border, `--card` bg, signature shadow, 19px text.
  - **Meta footer**: hairline top border, mono 12px: `practiced in: 2× TryHackMe network labs` | `corrections welcome → nils@89deg.com`.
- **Prev/Next**: 1px `--ink` top rule, 2-col grid; mono label (`← PREVIOUS` / `NEXT →`) + 22px serif title; next block right-aligned (left-aligned when stacked on mobile).

### 4. Field Notes archive (`DFIR Blog - Field Notes.dc.html`)

Kicker; H1 "What I'm actually doing, dated and unpolished."; italic lede ("Dead ends included — that's where the learning is."). **Filter bar**: mono `FILTER:` label + chips ALL / MEMORY / DISK / NETWORK / MOBILE / CRYPTO + right-aligned counter `x of 14 entries`. Entries grouped by month: mono month heading (`JULY 2026`) + flex-filler hairline + `n entries` count. Rows: grid `150px 1fr auto` — accent date | text (max 68ch) | small bordered tag chip (mono 10.5px). End line: `> log started 2026-03-14 · end of archive_`.

### 5. Toolbox (`DFIR Blog - Toolbox.dc.html`)

- H1 "Every score comes with a receipt."; **legend bar** (`--soft` bg, hairline border, mono 12px): `FF = solid · 00 = not yet · THM = TryHackMe · CD = CyberDefenders · self-assessed · challenge-backed`.
- Tools grouped in 5 numbered categories: `01 IMAGING & DISK` (FTK Imager 4/10, Autopsy 6/10), `02 MEMORY` (Volatility 3 5/10), `03 NETWORK` (Wireshark 7/10), `04 MOBILE` (ALEAPP 10/10), `05 TRIAGE` (KAPE 3/10).
- Tool row: grid `minmax(0,1.1fr) 220px minmax(0,1fr)`, gap 40px:
  1. Name (26px, links to vendor), description, mono accent source link (`exterro.com · free →`)
  2. Score `n/10` (mono 20px/600) above the **proficiency bytes**: 10 mono 12px/600 tokens, first *n* are `FF` in `--accent`, rest `00` in `--offcell`, gap 7px, wrapping; below, a one-line honest verdict (mono 11px faint), e.g. "core plugins solid; kernel structures still opaque to me"
  3. **RECEIPTS** column: faint mono label, then one row per challenge: accent `✓` + name + right-aligned `PLATFORM · date`, dotted hairline separators
- **On the radar** section: bordered `--card` chips (tool name 18px + mono reason) for tools not yet started — Plaso/log2timeline, Velociraptor, Eric Zimmerman tools, iLEAPP, Zeek. Annotation: "not started — still 00 00 00, and I know it".

### 6. About / Contact (`DFIR Blog - About.dc.html`)

- Hero grid `1fr 300px`: kicker `// ABOUT — FOR THE PERSON DOING THE HIRING`; H1 "I'm Nils. I want to do forensics for a living — so I already do it every day."; 20px intro; buttons: solid accent `EMAIL ME →` (mailto) + outlined `DOWNLOAD CV (PDF)` (mono 13px, square, padding 13px 22px). Right: **portrait photo** in a 300×360 frame (1px `--ink` border + signature shadow) with caption `fig. 1 — the analyst in question` (replace the `<image-slot>` element with a plain `<img>`).
- **At a glance** strip: 4 equal columns with hairline separators — LOOKING FOR / LOCATION / LANGUAGES / AVAILABILITY (faint mono label + 17px serif value). 2×2 on mobile.
- **Why forensics**: 3 paragraphs, 18.5px, with accent-underlined inline links.
- **Currently working on**: rows `110px 1fr` — mono `NOW`/`NEXT` status + text.
- **"DON'T TRUST — VERIFY" sidebar** (sticky, top 32px): bordered `--card` box with signature shadow; accent mono heading; italic intro; mono link list (TryHackMe, CyberDefenders, GitHub, lab log) each with right arrow; hairline-divided footnote offering a live screen-share walkthrough.
- **CTA box**: `--panel-dark` bg, 1px `--ink` border, grid `1.4fr 1fr`: H2 36px "The fastest way to evaluate me is a conversation." + paragraph | stacked buttons: solid accent `nils@89deg.com` (hover: `#7FC79F` bg + `#10241A` text) and outlined `DOWNLOAD CV (PDF)`.

## Interactions & Behavior

- **Theme toggle**: `theme.js` shows the mechanic — on load, use `localStorage['dfir-theme']`, else `prefers-color-scheme`; toggle sets `data-theme="dark"` on `<html>` and persists. No transition animation. Recreate idiomatically (and add a no-flash inline script in `<head>`).
- **Tag filters** (Articles + Field Notes): single-select chips. Inactive: transparent bg, `--sep` border, `--dim` text. Active: `--accent` bg + border, `#F2F8F4` text. Hover: accent border. Filtering updates the list and the `x of N` counter; Field Notes month groups hide when empty. Client-side, instant, no animation.
- **List-row hover**: whole row gets `--hover` bg; titles/links shift to accent on hover.
- **Buttons**: solid accent → `--panel-dark` bg on hover (except the CTA email case above); outlined → fills with ink/inverts.
- **Sticky elements**: article TOC and About sidebar (`top: 32px`); static below 760px.
- **No entrance animations** — the design is deliberately still.

## Responsive (breakpoint: 760px)

- Side padding 32px → 20px; nav wraps with smaller gap.
- All multi-column grids stack to one column (list rows, toolbox rows, About hero, footer CTA, prev/next); at-a-glance becomes 2×2.
- H1s scale via `clamp()` (values above).
- DORA table scrolls horizontally; protocol-of-the-week accent band becomes a horizontal top bar.
- Right-aligned "next" link becomes left-aligned when stacked.

## State Management

Static site + small client-side islands:
- `theme`: 'light' | 'dark' (localStorage, default from media query)
- `activeTag` per filter page: string, default 'ALL' (derived: filtered list, counter, month groups)
No data fetching; everything rendered from Markdown at build time.

## Content Model (from Markdown front matter)

- **Article**: `title`, `dek`, `date`, `tag` (NETWORK | CRYPTO | DISK | MOBILE), `minutes`, `draft`
- **Field note**: `date`, `tag` (MEMORY | DISK | NETWORK | MOBILE | CRYPTO), body text
- **Tool**: `name`, `category`, `level` (0–10), `desc`, `verdict`, `url`, `linkLabel`, `challenges[] {name, platform, date}`
- **Protocol of the week**: `name`, `week`, `meta`, `blurb`, `link`

## Assets

- Google Fonts: Newsreader + IBM Plex Mono (self-host for production).
- Portrait photo on About: user-supplied; 300×360, object-fit cover.
- No icons/images otherwise; `✓`, `◐`, `→`, `█` are text glyphs.
- ALL names, dates, scores, challenge lists, and profile URLs are placeholders — source real values from Nils.

## Files

- `DFIR Blog - Home.dc.html` — landing page
- `DFIR Blog - Articles.dc.html` — article index with filter
- `DFIR Blog - Article.dc.html` — article detail (DHCP) with all article content patterns
- `DFIR Blog - Field Notes.dc.html` — lab-log archive with filter
- `DFIR Blog - Toolbox.dc.html` — tool inventory with receipts
- `DFIR Blog - About.dc.html` — recruiter-facing about/contact
- `theme.js` — dark-mode toggle mechanic (reference)
- `image-slot.js` — prototype-only photo placeholder; replace with `<img>`
- `screenshots/` — reference captures of every page in both themes (`<page>-light.png` / `<page>-dark.png`). Note: captures are viewport-height-capped, so long pages are truncated — the HTML files are the source of truth.
