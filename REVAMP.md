# Noteworthy: Full-Stack Revamp — Architecture & Design Decisions

## Overview

This document covers the end-to-end revamp of Noteworthy, an Evernote-inspired note-taking application originally built as a portfolio project in 2020. The revamp addressed three major areas: **design system modernization**, **deployment architecture**, and **security hardening** — all executed in a single session using Claude Code as an AI pair programmer.

**Stack**: React 16 · Redux · Ruby on Rails 5.2 · PostgreSQL · Webpack 4

---

## 1. Design System Overhaul

### Problem

The original UI was built with ad-hoc SCSS — no design tokens, inconsistent spacing, colors defined inline across 18 separate stylesheets, and heavy use of viewport-relative units (`vw`/`vh`) that created unpredictable scaling. The color palette (flat green `#01A82D` + dark gray `#263238`) was pulled from Mattia Astorino's Material theme but applied inconsistently, with dozens of commented-out color alternatives scattered throughout the codebase.

### Approach: Token-Based Design System

Rather than patching individual files, I chose to establish a centralized design token system in `universal.scss` and propagate it across all 18 stylesheets. This is the same pattern used by design systems like GitHub Primer or Shopify Polaris — define once, reference everywhere.

**Token categories defined:**

| Category | Examples | Rationale |
|----------|----------|-----------|
| Color primitives | `$bg-dark: #1a1e2e`, `$accent-primary: #6c5ce7` | Single source of truth for palette |
| Semantic colors | `$text-inverse-muted: rgba(245, 246, 250, 0.6)` | Context-aware color application |
| Shadows | `$shadow-sm` through `$shadow-xl` | Consistent elevation system |
| Radii | `$radius-sm: 6px` through `$radius-xl: 24px` | Uniform roundness scale |
| Typography | `$font-sans`, `$font-display` | Font stack consolidation |
| Transitions | `$transition-fast: 0.15s ease` | Consistent motion language |

### Typography Migration

Replaced `Raleway` (Google Font, used as the primary UI font) with `Inter` — a typeface specifically designed for screen interfaces with better legibility at small sizes, proper tabular figures, and a wider weight range (300–800). The display font `CaeciliaLTStd-Bold` was retained for brand headings where its serif character adds personality.

### Unit System Migration

Replaced `vw`/`vh` sizing with a combination of:
- **`px`** for fixed UI elements (sidebar width, button padding, icon sizes)
- **`clamp()`** for responsive typography: `font-size: clamp(28px, 3vw, 48px)` provides fluid scaling with hard min/max bounds
- **`rem`/`em`** where relative sizing to parent context matters

This eliminates the layout instability that `vw`-based padding and font sizes caused at different viewport widths.

### Color Palette Rationale

The new palette centers on purple (`#6c5ce7`) and teal (`#00cec9`) as primary/secondary accents against a deep navy background (`#1a1e2e`). This was chosen over the original green/dark-gray scheme for several reasons:

- **Contrast ratios**: The purple-on-dark-navy combination meets WCAG AA for large text. The original green-on-gray did not consistently pass.
- **Semantic color range**: Purple as primary freed up green for success states (`$accent-success: #00b894`), red for danger (`$accent-danger: #ff6b6b`), and yellow for warnings — a standard semantic palette that the original single-green scheme couldn't support.
- **Visual hierarchy**: The gradient text treatment on hero headings (`linear-gradient(135deg, $accent-primary-light, $accent-secondary)`) creates a focal point without relying on size alone.

### Glass Morphism & Layering

Applied `backdrop-filter: blur()` with semi-transparent backgrounds on the landing page navbar, session forms, and signup section. This creates visual depth through layering rather than hard borders. The technique is used sparingly — only on overlapping surfaces — to avoid performance issues with excessive blur compositing.

### Files Modified

All 18 SCSS files were rewritten:

```
application.css.scss    dropdown.scss         header_intro.scss
home.scss               main.scss             modal.scss
note_editor.scss        notebook_form.scss    notebook_item.scss
notebook_note_items.scss notebooks.scss       notes_intro.scss
notes_nav.scss          reset.css.scss        session.scss
sidebar.scss            tags.css.scss         universal.scss
```

Plus one JSX component (`Sidebar.jsx`) updated to match the new grid column values.

### What Changed Per Area

**Landing page** (`home.scss`): Radial gradient background glows, glass navbar, feature cards with hover-lift animations, gradient text hero, steps section with icon circles and card containers.

**Session pages** (`session.scss`): Glass-card login/signup forms with animated entrance, floating logo animation, dark-themed inputs with focus glow rings, demo button as ghost/outline style for visual hierarchy.

**Main app sidebar** (`sidebar.scss`): Active nav items now use a right-border accent (`3px solid $accent-primary`) with tinted background, replacing the flat background swap. Icon colors mapped to semantic meaning (red for logout, green for notebooks, yellow for notes).

**Notes list** (`notes_nav.scss`): Selected note gets a left-border accent. Note cards reduced from 260px to 200px height for better density. Slide-in animation on mount.

**Note editor** (`note_editor.scss`): Title input increased to 28px bold. Action buttons (move, trash) now have rounded hover backgrounds with contextual colors. Toolbar opacity transition cleaned up. Tag display changed to rounded pill badges.

**Modals** (`modal.scss`, `notebook_form.scss`): Backdrop blur overlay. Modal entrance animation (scale + translateY). Clean shadow and border-radius treatment.

**Main layout** (`main.scss`): Grid columns adjusted from `250px 500px auto` to `260px 380px 1fr`. The notes nav column was narrowed from 500px to 380px — the original was wider than necessary and compressed the editor. Using `1fr` instead of `auto` for the editor column ensures it fills remaining space predictably.

---

## 2. Deployment Architecture

### Problem

The original app was deployed on Heroku, which has since eliminated its free tier. The app had no active deployment.

### Architecture Decision: Monolith on Render vs. Split Deployment

I evaluated two approaches:

**Option A — Vercel (frontend) + Render (backend):**
This would require decoupling the React frontend from Rails by creating a standalone `index.html`, replacing all `$.ajax` calls with `fetch()` targeting an external API URL, replacing Rails asset pipeline image references with static imports, rewriting the session bootstrapping (Rails currently injects `window.currentUser` via ERB), and configuring CORS.

**Option B — Full Rails monolith on Render:**
Zero code changes. Rails serves both the API and the frontend as it was originally designed.

**Decision: Option B.** The decoupling work in Option A is substantial and provides no meaningful benefit for a portfolio project. Vercel's edge CDN advantage is negligible for a single-user demo app. A split architecture makes sense when you need to scale frontend and backend independently — not the case here. One deployment means one thing to monitor, one set of logs, one URL.

### Render Configuration

Created a `render.yaml` Infrastructure-as-Code blueprint that declaratively defines the full deployment:

```yaml
databases:
  - name: noteworthy-db
    plan: free
    databaseName: noteworthy
    user: noteworthy

services:
  - type: web
    name: noteworthy
    runtime: ruby
    plan: free
    buildCommand: "./bin/render-build.sh"
    startCommand: "bundle exec puma -C config/puma.rb"
```

This approach (IaC via blueprint) means the deployment is version-controlled and reproducible. Anyone forking the repo can deploy the same infrastructure by applying the blueprint.

### Build Script

Created `bin/render-build.sh` as a sequential build pipeline:

```bash
bundle install          # Ruby dependencies
npm install             # Node dependencies (webpack, babel, react)
bundle exec rake assets:precompile   # Webpack bundle + Rails asset pipeline
bundle exec rake assets:clean        # Remove stale compiled assets
bundle exec rake db:migrate          # Run pending migrations
```

The order matters — `npm install` must complete before `assets:precompile` because webpack (invoked via the `postinstall` npm script) needs node_modules present to bundle the React frontend into `app/assets/javascripts/bundle.js`, which Rails then includes in the asset pipeline.

### Production Configuration Changes

**`config/database.yml`**: Changed production config from explicit `database`/`username`/`password` fields to `url: <%= ENV['DATABASE_URL'] %>`. Render provides the full connection string as `DATABASE_URL` when linking a database to a service — this is the standard approach for managed database services and avoids splitting connection details across multiple env vars.

**`config/environments/production.rb`**: Added `ENV['RENDER'].present?` to the static file serving check. Render sets a `RENDER` env var automatically. Without this, Rails won't serve static assets (CSS, JS, images) in production because it expects a reverse proxy (Nginx/Apache) to handle them — which Render's free tier doesn't provide.

### Auto-Deploy Pipeline

Render's GitHub integration auto-deploys on every push to `master` by default when connected via blueprint. No CI/CD configuration, webhook setup, or GitHub Actions needed. The pipeline is: push to master → Render detects change → runs build script → deploys if build succeeds.

---

## 3. Security Hardening

### Problem

The repository had no security scanning or supply chain protections enabled.

### What Was Enabled

All configuration done via GitHub's REST API on the `alextongme/noteworthy` repository:

| Feature | What It Does |
|---------|-------------|
| **Secret scanning** | Scans every commit for leaked API keys, tokens, passwords, and other credentials using pattern matching against known secret formats from 100+ service providers |
| **Secret scanning push protection** | Blocks `git push` if the commit contains a detected secret — prevents accidental exposure before it reaches the remote |
| **Dependabot vulnerability alerts** | Monitors `Gemfile.lock` and `package-lock.json` against the GitHub Advisory Database (NVD + GitHub-reviewed advisories) and creates alerts for known CVEs |
| **Dependabot automated security fixes** | Automatically opens PRs to bump vulnerable dependencies to the minimum patched version |

### Secrets Management

The Rails master key (`config/master.key`) is stored in three places:

1. **Locally**: `config/master.key` file (gitignored by Rails default `.gitignore`)
2. **macOS Keychain**: Stored as `noteworthy-rails-master-key` — encrypted at rest, persists across reboots, retrievable via `security find-generic-password -s "noteworthy-rails-master-key" -w`
3. **Render**: Set as the `RAILS_MASTER_KEY` environment variable, which Render encrypts at rest and injects at runtime

The master key never appears in version control, build logs, or client-side code.

---

## 4. What Was Intentionally Not Changed

Staff-level engineering is as much about what you don't do as what you do. Several potential changes were evaluated and rejected:

- **React 16 → 18 upgrade**: Would require migrating from `ReactDOM.render` to `createRoot`, testing all components for concurrent mode compatibility, and potentially breaking React Quill (which uses a beta version pinned to React 16's API). High risk, low user-facing value for a portfolio project.

- **Class components → hooks**: The codebase mixes class components (NoteEditor, LoginForm, SignupForm, NotebookForm, NotebookItem) with functional components (Sidebar, NotesNav, NotesIntro, Home). Converting the remaining class components would be a pure refactor with no behavioral change.

- **jQuery AJAX → fetch/axios**: The API layer uses `$.ajax` for all backend calls. Replacing it would require also removing the `jquery-rails` gem and ensuring CSRF token handling works with the new approach. Not worth the risk for zero UX improvement.

- **Node.js backend completion**: The repo contains a partially implemented Express/Sequelize backend (`server/`) with only auth and notes routes. Completing it would mean reimplementing notebooks, tags, and user routes, plus migrating the auth model from session-based (Rails) to JWT-based. The Rails backend works — shipping beats rewriting.

- **Ruby version upgrade**: The Gemfile specifies Ruby 2.5.1 (EOL). Upgrading to 3.x would likely require Rails upgrade to 6+ and gem compatibility fixes. Flagged as a potential issue if Render's build fails, but not preemptively changed.

---

## Summary

| Area | Before | After |
|------|--------|-------|
| Design system | Ad-hoc colors/spacing across 18 files | Token-based system with semantic variables |
| Typography | Raleway (all weights via vw units) | Inter (proper weight scale, px/clamp sizing) |
| Color palette | Flat green + dark gray | Purple/teal accent system with semantic colors |
| Deployment | Heroku (defunct free tier) | Render (IaC blueprint, auto-deploy on push) |
| Security | None | Secret scanning, push protection, Dependabot |
| Infrastructure | Manual deployment | Declarative `render.yaml`, scripted builds |
| Secrets | Not managed | Keychain + Render env vars, gitignored locally |
