# How I Used Claude Code to Revamp a Legacy Full-Stack App in One Session

I had a side project collecting dust — **Noteworthy**, an Evernote clone I built in 2020 with React, Redux, and Ruby on Rails. It worked, but the UI looked dated, the Heroku deployment was dead (RIP free tier), and the codebase had the kind of tech debt that accumulates when you ship something as a bootcamp grad and never look back.

I decided to revamp it. Not a rewrite — a targeted modernization. And I used [Claude Code](https://claude.com/claude-code), Anthropic's CLI-based AI pair programmer, as my primary collaborator.

Here's how it went, what worked, what didn't, and what I learned about using AI tooling effectively as an engineer.

**Stack**: React 16 / Redux / Ruby on Rails 5.2 / PostgreSQL / Webpack 4

---

## The Starting Point

The app was frozen at a September 2023 README update. Under the hood:

- **18 SCSS files** with no design tokens — colors defined inline, viewport-relative units (`vw`/`vh`) everywhere, dozens of commented-out alternatives. The color palette (flat green `#01A82D` + dark gray `#263238`) was pulled from Mattia Astorino's Material theme but applied inconsistently.
- **No active deployment** — Heroku free tier gone, no replacement configured
- **No security posture** — no secret scanning, no dependency monitoring, no supply chain protections
- **Mixed paradigms** — class components alongside functional components, jQuery `$.ajax` for API calls, a half-built Express backend sitting unused in `/server`

The kind of project where you open it, sigh, and close the tab.

---

## What I Chose Not to Change

The first decision was scoping. This is where experience matters more than tooling — AI can execute fast, but it'll happily execute the wrong thing fast if you let it.

I explicitly rejected several tempting changes:

- **React 16 to 18**: Would require migrating from `ReactDOM.render` to `createRoot`, testing all components for concurrent mode compatibility, and potentially breaking React Quill (pinned to a beta targeting React 16's API). High risk, zero user-facing value.
- **Class components to hooks**: The codebase mixes class components (NoteEditor, LoginForm, SignupForm, NotebookForm, NotebookItem) with functional ones (Sidebar, NotesNav, NotesIntro, Home). Converting is a pure refactor with no behavioral change.
- **jQuery AJAX to fetch/axios**: Would require removing `jquery-rails`, reimplementing CSRF token handling, and testing every API call. Zero UX improvement.
- **Complete the Express backend (initially)**: The repo had a partially implemented Express/Sequelize backend in `/server` with only auth and notes routes. At the time, the Rails backend worked — shipping beat rewriting. (This decision was later reversed — see Phase 5.)
- **Ruby 2.5 to 3.x preemptively**: Save it for when it actually breaks (spoiler: it did, and we dealt with it).

I scoped the work to three areas: **design system**, **deployment**, and **security**.

---

## Phase 1: Design System Overhaul

Rather than patching individual files, I chose to establish a centralized design token system in `universal.scss` and propagate it across all 18 stylesheets. This is the same pattern used by systems like GitHub Primer or Shopify Polaris — define once, reference everywhere.

### Token Architecture

| Category | Examples | Rationale |
|----------|----------|-----------|
| Color primitives | `$bg-dark: #1a1e2e`, `$accent-primary: #6c5ce7` | Single source of truth for palette |
| Semantic colors | `$text-inverse-muted: rgba(245, 246, 250, 0.6)` | Context-aware color application |
| Shadows | `$shadow-sm` through `$shadow-xl` | Consistent elevation system |
| Radii | `$radius-sm: 6px` through `$radius-xl: 24px` | Uniform roundness scale |
| Typography | `$font-sans`, `$font-display` | Font stack consolidation |
| Transitions | `$transition-fast: 0.15s ease` | Consistent motion language |

### Color Palette Rationale

The new palette centers on purple (`#6c5ce7`) and teal (`#00cec9`) as primary/secondary accents against a deep navy background (`#1a1e2e`). This wasn't arbitrary:

- **Contrast ratios**: Purple-on-dark-navy meets WCAG AA for large text. The original green-on-gray did not consistently pass.
- **Semantic color range**: Purple as primary freed up green for success states (`$accent-success: #00b894`), red for danger (`$accent-danger: #ff6b6b`), and yellow for warnings — a standard semantic palette that the single-green scheme couldn't support.
- **Visual hierarchy**: Gradient text on hero headings (`linear-gradient(135deg, $accent-primary-light, $accent-secondary)`) creates a focal point without relying on size alone.

### Typography & Unit Migration

Replaced `Raleway` with `Inter` — a typeface designed for screen interfaces with better legibility at small sizes, proper tabular figures, and a wider weight range (300-800). The display font `CaeciliaLTStd-Bold` was retained for brand headings where its serif character adds personality.

Replaced `vw`/`vh` sizing with:
- **`px`** for fixed UI elements (sidebar width, button padding, icon sizes)
- **`clamp()`** for responsive typography: `font-size: clamp(28px, 3vw, 48px)` provides fluid scaling with hard min/max bounds
- **`rem`/`em`** where relative sizing to parent context matters

This eliminates the layout instability that `vw`-based padding and font sizes caused at different viewport widths.

### What Changed Per Area

**Landing page** (`home.scss`): Radial gradient background glows, glass navbar with `backdrop-filter: blur()`, feature cards with hover-lift animations, gradient text hero, steps section with icon circles.

**Session pages** (`session.scss`): Glass-card login/signup forms with animated entrance, floating logo animation, dark-themed inputs with focus glow rings, demo button as ghost/outline style for visual hierarchy.

**Main app sidebar** (`sidebar.scss`): Active nav items use a right-border accent (`3px solid $accent-primary`) with tinted background, replacing the flat background swap. Icon colors mapped to semantic meaning (red for logout, green for notebooks, yellow for notes).

**Notes list** (`notes_nav.scss`): Selected note gets a left-border accent. Note cards reduced from 260px to 200px height for better density. Slide-in animation on mount.

**Note editor** (`note_editor.scss`): Title input increased to 28px bold. Action buttons now have rounded hover backgrounds with contextual colors. Tag display changed to rounded pill badges.

**Modals** (`modal.scss`, `notebook_form.scss`): Backdrop blur overlay. Modal entrance animation (scale + translateY). Clean shadow and border-radius treatment.

**Main layout** (`main.scss`): Grid columns adjusted from `250px 500px auto` to `260px 380px 1fr`. The notes nav column was narrowed from 500px to 380px — the original was wider than necessary and compressed the editor. Using `1fr` instead of `auto` ensures the editor fills remaining space predictably.

All 18 SCSS files were rewritten, plus one JSX component (`Sidebar.jsx`) updated to match new grid column values. I described the target architecture to Claude Code and had it execute the propagation; I reviewed the token definitions and visual hierarchy decisions.

---

## Phase 2: Deployment on Render

### Architecture Decision: Monolith vs. Split

I evaluated two approaches:

**Option A — Vercel (frontend) + Render (backend):** Would require decoupling React from Rails: standalone `index.html`, replacing all `$.ajax` calls with `fetch()` targeting an external API URL, replacing Rails asset pipeline image references with static imports, rewriting session bootstrapping (Rails currently injects `window.currentUser` via ERB), and configuring CORS.

**Option B — Full Rails monolith on Render:** Zero code changes. Rails serves both the API and the frontend as originally designed.

**Decision: Option B.** The decoupling work in Option A is substantial and provides no benefit for a portfolio project. Vercel's edge CDN advantage is negligible for a single-user demo app. Split architecture makes sense when you need to scale frontend and backend independently — not the case here. One deployment = one thing to monitor, one set of logs, one URL.

### Infrastructure as Code

Created a `render.yaml` blueprint that declaratively defines the full deployment:

```yaml
databases:
  - name: noteworthy-db
    plan: free
    databaseName: noteworthy
    user: noteworthy

services:
  - type: web
    name: noteworthy
    runtime: node
    plan: free
    buildCommand: "./bin/render-build.sh"
    startCommand: "npm start"
```

Version-controlled, reproducible. Anyone forking the repo can deploy the same infrastructure by applying the blueprint.

### Build Pipeline

Created `bin/render-build.sh`:

```bash
npm install             # All dependencies (Express + webpack + React)
npm run build           # Webpack production build → dist/
cp -r public/images public/fonts dist/   # Static assets
```

Simple and fast — one ecosystem, one package manager, one build step. No more Ruby/Node dual dependency resolution.

---

## Phase 3: The Build Fix Saga (Where It Got Real)

This is the part that doesn't make the highlight reel, but it's where I spent the most time and where the AI collaboration pattern got interesting.

The Render build failed. Then it failed again. **15 consecutive fix commits** over several hours:

1. Ruby 2.5.1 isn't available on Render → bump to 3.1.0
2. Gemfile.lock Ruby version mismatch → regenerate
3. Node engine version conflict → bump in `package.json`
4. `net-ftp` removed from Ruby 3.1 stdlib → add gem explicitly
5. OpenSSL 3.0 breaks webpack 4's legacy crypto → enable `NODE_OPTIONS=--openssl-legacy-provider`
6. Rack 2.2.6 incompatible with Rails 5.2 → pin Rack version
7. `bundle update` resolves to wrong Rack → switch to `bundle install`
8. Rails version constraint conflicts → pin exact versions
9. Ruby 3.1 too aggressive → fall back to 2.7.8 → then back to 3.1 with targeted updates
10. ...and so on, each commit peeling back one layer of the dependency resolution puzzle

This is the reality of deploying a 2020 Rails app on modern infrastructure. Every dependency has transitive dependencies, and version constraints form a constraint satisfaction problem that doesn't always have an obvious solution.

**How Claude Code helped:** Each build failure produced logs. I fed them back, and Claude Code diagnosed the issue, proposed a fix, and generated the commit. The feedback loop was ~2 minutes per iteration instead of the 15-20 it would take to research each gem compatibility matrix manually. But I was still the one deciding *which* approach to try when there were multiple options (pin Rack vs. upgrade Rails vs. downgrade Ruby).

**What Claude Code couldn't do:** It couldn't see the Render build logs directly — I had to copy them in. It also couldn't predict cascading effects — fixing Rack broke something downstream, requiring another fix. This is inherently iterative; no amount of AI capability eliminates the need to deploy, observe, and adapt.

---

## Phase 4: The Pivot — Rails to Node/Express

After 15 failed deploy attempts patching Rails 5.2 to work with Ruby 3.1+, I hit a fundamental wall. Rails 5.2's middleware stack uses the pre-Ruby 3.0 keyword argument convention (`opts = {}`), and Ruby 3.1 enforces the separation of positional and keyword arguments. Every patch to fix one middleware broke another downstream. Continuing to fight this was a losing battle.

### The Decision Framework

I evaluated three options:

| Option | Effort | Risk | Outcome |
|--------|--------|------|---------|
| **Patch Rails 5.2** | Medium | High — whack-a-mole with middleware compat | Already failed 15 times |
| **Upgrade to Rails 7** | High — full migration of routes, controllers, views, config | Medium — well-documented path | Keeps Ruby dependency for one project |
| **Rebuild in Node/Express** | Medium — Express scaffold already existed | Low — same language as frontend | Eliminates Ruby entirely |

**Decision: Node/Express.** The reasoning:

1. **Portfolio consistency**: Every other project in my portfolio is JavaScript. Rails was the outlier.
2. **Raw SQL showcase**: Using `pg` with parameterized queries instead of an ORM demonstrates database skills more directly than ActiveRecord or Sequelize ever could.
3. **Existing scaffold**: The `/server` directory already had passport-jwt auth, a `pg` pool, and route stubs — roughly 40% of the work was done.
4. **Dependency elimination**: No more Ruby version management, Bundler conflicts, or gem compatibility matrices.

### Schema Simplification

The Rails schema used **three unnecessary join tables** (`user_notes`, `user_notebooks`, `notebook_notes`) for what are actually one-to-many relationships. A user *owns* their notes and notebooks — there's no sharing model. The join tables existed because the original design anticipated multi-user collaboration that was never implemented.

The simplified schema adds `user_id` and `notebook_id` directly to the `notes` table, and `user_id` to the `notebooks` table. Only `note_tags` remains as a join table — tags genuinely have a many-to-many relationship with notes.

**5 tables instead of 8.** Same functionality, simpler queries, fewer JOINs.

### What Changed in the Frontend

Three targeted migrations:

1. **jQuery `$.ajax` to `fetch`**: Created a thin `apiFetch()` wrapper that handles JSON serialization and error shaping (matching jQuery's `responseJSON` pattern so the existing Redux action creators didn't need changes). Replaced all 15 API calls across 4 files.

2. **Session cookies to JWT**: Rails used server-side sessions with a `session_token` column. Express uses JWT in httpOnly cookies — stateless, no database lookup on every request. The passport-jwt middleware handles extraction and verification.

3. **`window.currentUser` to API call**: Rails injected the current user into the page via ERB (`<script>window.currentUser = <%= @user.to_json %></script>`). The Express version makes a `GET /api/auth/session` call on page load to check for an existing JWT cookie.

### CSS Pipeline Migration

A hidden cost of removing Rails: the Sprockets asset pipeline handled SCSS compilation and `font-url()` resolution. Replaced with webpack loaders (`sass-loader`, `css-loader`, `mini-css-extract-plugin`). Moved all 18 SCSS files to `src/styles/` with a proper `@import` entry point, and fonts to `public/fonts/` served as static files.

### Monorepo Architecture

Express serves the webpack-built React frontend from `dist/` — same monolith approach as before, just Node instead of Ruby:

```
noteworthy/
├── server/          # Express API
│   ├── app.js       # Entry + static serving + SPA catch-all
│   ├── routes/      # auth, notes, notebooks, tags
│   └── database.sql # Simplified schema
├── src/             # React frontend
│   ├── styles/      # SCSS (migrated from app/assets/)
│   └── index.html   # Template (replaces Rails ERB)
├── dist/            # Webpack output (gitignored)
└── render.yaml      # Updated: runtime: node
```

Build command: `npm install && npm run build` (webpack). Start command: `node server/app.js`. No Ruby anywhere.

---

## Phase 5: Security Hardening

All configured via GitHub's REST API on the repository:

| Feature | What It Does |
|---------|-------------|
| **Secret scanning** | Scans every commit for leaked API keys, tokens, and credentials using pattern matching against 100+ service providers |
| **Push protection** | Blocks `git push` if a detected secret is in the commit — prevents exposure before it reaches the remote |
| **Dependabot alerts** | Monitors `Gemfile.lock` and `package-lock.json` against the GitHub Advisory Database (NVD + GitHub-reviewed) |
| **Automated security PRs** | Dependabot opens PRs to bump vulnerable dependencies to the minimum patched version |

### Secrets Management

After the Node/Express migration, secrets are simpler:

- **`JWT_SECRET`**: Set as Render env var, used by passport-jwt for token signing/verification
- **`DATABASE_URL`**: Automatically provided by Render's database linking

No more Rails master key or encrypted credentials. Environment variables are the only secret mechanism needed — encrypted at rest on Render, gitignored locally via `.env`.

---

## What I Learned About Using AI Dev Tools Effectively

**1. Scope before you prompt.** The most valuable thing I did was spend 10 minutes deciding what *not* to change before touching any code. Claude Code will happily rewrite your entire codebase if you ask — the skill is in constraining the blast radius.

**2. Be specific about architecture, not just outcomes.** "Make the UI modern" produces generic results. "Establish a token-based design system in `universal.scss` using these specific categories, then propagate across all 18 stylesheets" produces something you'd actually ship.

**3. AI excels at propagation, humans excel at judgment.** Applying a design token system across 18 files is tedious, error-prone work for a human but trivial for an AI. Deciding *which* design tokens to define, *why* purple over green, *whether* to use `clamp()` vs media queries — that's engineering judgment.

**4. The debugging loop is where AI saves the most time.** The 15-commit build fix saga would have been a full weekend of Stack Overflow and gem compatibility matrices. With Claude Code, each iteration was a few minutes. Total time was still hours, but cognitive load was dramatically lower.

**5. AI doesn't eliminate iteration — it compresses it.** I still had to deploy, fail, diagnose, fix, repeat. The cycle just ran faster.

---

## The Numbers

| Metric | Value |
|--------|-------|
| Total commits | ~30 |
| SCSS files rewritten | 18 |
| Lines changed | ~5,000 |
| Build fix iterations | 15 (Rails), then 1 clean build (Node) |
| Time (wall clock) | ~12 hours across two sessions |
| Backend rewrite | 6 route files, 1 controller, ~500 lines of raw SQL |
| Frontend API migration | 4 files, jQuery to fetch |
| Rails files deleted | ~100+ files across app/, config/, db/ |

---

## Before & After

| Area | Before | After |
|------|--------|-------|
| **Backend** | Ruby on Rails 5.2 (incompatible with modern Ruby) | Node/Express with raw `pg` queries |
| **Schema** | 8 tables (3 unnecessary join tables) | 5 tables with direct foreign keys |
| **API calls** | jQuery `$.ajax` | Native `fetch` with thin wrapper |
| **Auth** | Rails session cookies + `session_token` column | JWT in httpOnly cookies (passport-jwt) |
| **CSS pipeline** | Rails Sprockets + `font-url()` helpers | Webpack sass-loader + mini-css-extract-plugin |
| **Design system** | Ad-hoc colors/spacing across 18 files | Token-based system with semantic variables |
| **Typography** | Raleway (all weights via vw units) | Inter (proper weight scale, px/clamp sizing) |
| **Color palette** | Flat green + dark gray | Purple/teal accent system with semantic colors |
| **Deployment** | Heroku (defunct free tier) | Render (IaC blueprint, auto-deploy on push) |
| **Security** | None | Secret scanning, push protection, Dependabot |
| **Infrastructure** | Manual deployment | Declarative `render.yaml`, scripted builds |
| **Ruby dependency** | Required (Ruby 2.5 + Bundler + 30+ gems) | Eliminated entirely |

---

*If you're sitting on a side project that "works but looks like 2020," this kind of targeted revamp is a good use case for AI pair programming. Scope aggressively, modernize what matters, and don't be afraid to pivot when the original plan hits a wall. Sometimes the right answer isn't "fix it" — it's "replace it with something simpler."*
