# How I Used Claude Code to Revamp a Legacy Full-Stack App in One Session

I had a side project collecting dust — **Noteworthy**, an Evernote clone I built in 2020 with React, Redux, and Ruby on Rails. It worked, but the UI looked dated, the Heroku deployment was dead (RIP free tier), and the codebase had the kind of tech debt that accumulates when you ship something as a bootcamp grad and never look back.

I decided to revamp it. Not a rewrite — a targeted modernization. And I used [Claude Code](https://claude.com/claude-code), Anthropic's CLI-based AI pair programmer, as my primary collaborator.

Here's how it went, what worked, what didn't, and what I learned about using AI tooling effectively as an engineer.

---

## The Starting Point

The app was frozen at a September 2023 README update. Under the hood:

- **18 SCSS files** with no design tokens — colors defined inline, viewport-relative units (`vw`/`vh`) everywhere, dozens of commented-out alternatives
- **No active deployment** — Heroku free tier gone, no replacement configured
- **No security posture** — no secret scanning, no dependency monitoring, no supply chain protections
- **Mixed paradigms** — class components alongside functional components, jQuery `$.ajax` for API calls, a half-built Express backend sitting unused in `/server`

The kind of project where you open it, sigh, and close the tab.

---

## What I Actually Did (and Didn't Do)

The first decision was scoping. This is where experience matters more than tooling — AI can execute fast, but it'll happily execute the wrong thing fast if you let it.

I explicitly chose **not** to:

- Upgrade React 16 to 18 (would break React Quill, require concurrent mode migration, high risk for zero user-facing value)
- Convert class components to hooks (pure refactor, no behavioral change)
- Replace jQuery AJAX with fetch (would require ripping out `jquery-rails`, reimplementing CSRF handling)
- Complete the half-built Express backend (the Rails backend works — shipping beats rewriting)
- Upgrade Ruby from 2.5 to 3.x preemptively (save it for when it breaks)

Staff-level engineering is knowing what not to touch. I scoped the work to three areas: **design system**, **deployment**, and **security**.

---

## Phase 1: Design System Overhaul

I described the target aesthetic to Claude Code and had it propagate changes across all 18 stylesheets. The approach was token-based — define a design system in `universal.scss` (colors, shadows, radii, typography, transitions) and reference those tokens everywhere.

**What changed:**

| Before | After |
|--------|-------|
| Flat green (`#01A82D`) + dark gray (`#263238`) | Purple/teal accent system with semantic color roles |
| Raleway font via `vw` units | Inter with `px`/`clamp()` for fluid, bounded scaling |
| Ad-hoc spacing and colors per file | Centralized design tokens |
| Neon text-shadow animations | Glass morphism with `backdrop-filter: blur()` |
| `vw`-based padding causing layout instability | Fixed + fluid units with predictable behavior |

The key insight: I didn't ask Claude Code to "make it look better." I specified the design system architecture — token categories, the color palette rationale (WCAG contrast, semantic color range), the unit system migration strategy — and had it execute. The more precisely you define the target state, the better the output. Vague prompts produce vague results.

This phase touched **18 SCSS files and 1 JSX component**. Claude Code handled the propagation; I reviewed the token definitions and visual hierarchy decisions.

---

## Phase 2: Deployment on Render

I evaluated two approaches with Claude Code:

- **Split deployment**: Vercel (frontend) + Render (backend). Would require decoupling React from Rails — standalone `index.html`, replacing `$.ajax` with `fetch()` targeting an external URL, CORS config, rewriting session bootstrapping (Rails injects `window.currentUser` via ERB).
- **Monolith on Render**: Zero code changes. Rails serves everything.

Went with the monolith. The decoupling work is substantial and provides no benefit for a portfolio project. One deployment = one thing to monitor, one set of logs, one URL. Split architecture makes sense when you need to scale frontend and backend independently — not the case here.

Claude Code generated:

- A `render.yaml` Infrastructure-as-Code blueprint (declarative, version-controlled, reproducible)
- A `bin/render-build.sh` build pipeline with correct dependency ordering (npm before asset precompile, because webpack needs `node_modules` to bundle React)
- Production config changes (`DATABASE_URL` connection string, static file serving for Render's environment)

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
7. `bundle update` resolves to wrong Rack version → switch to `bundle install`
8. Rails version constraint conflicts → pin exact versions
9. Ruby 3.1 too aggressive, fall back to 2.7.8 → then back to 3.1 with targeted updates
10. ...and so on, each commit fixing one layer of the dependency resolution puzzle

This is the reality of deploying a 2020 Rails app on modern infrastructure. Every dependency has transitive dependencies, and version constraints form a constraint satisfaction problem that doesn't always have an obvious solution.

**How Claude Code helped here:** Each build failure produced logs. I fed the logs back, and Claude Code diagnosed the issue, proposed a fix, and generated the commit. The feedback loop was fast — maybe 2 minutes per iteration instead of the 15-20 it would take me to research each gem compatibility issue manually. But I was still the one deciding *which* approach to try when there were multiple options (pin Rack vs. upgrade Rails vs. downgrade Ruby).

**What Claude Code couldn't do:** It couldn't see the Render build logs directly. I had to copy them in. It also couldn't predict the cascading effects — fixing Rack broke something downstream, which required another fix. This is inherently iterative; no amount of AI capability eliminates the need to deploy, observe, and adapt.

---

## Phase 4: Security Hardening

Enabled via GitHub's API:

- **Secret scanning** — pattern matching against 100+ provider formats on every commit
- **Push protection** — blocks `git push` if a secret is detected
- **Dependabot alerts** — monitors `Gemfile.lock` and `package-lock.json` against the GitHub Advisory Database
- **Automated security PRs** — Dependabot opens PRs for vulnerable dependency versions

Also set up proper secrets management: Rails master key stored in macOS Keychain locally, injected as an env var on Render, never in version control.

---

## What I Learned About Using AI Dev Tools Effectively

**1. Scope before you prompt.** The most valuable thing I did was spend 10 minutes deciding what *not* to change before touching any code. Claude Code will happily rewrite your entire codebase if you ask — the skill is in constraining the blast radius.

**2. Be specific about architecture, not just outcomes.** "Make the UI modern" produces generic results. "Establish a token-based design system in `universal.scss` using these specific categories, then propagate across all 18 stylesheets" produces something you'd actually ship.

**3. AI excels at propagation, humans excel at judgment.** Applying a design token system across 18 files is tedious, error-prone work for a human but trivial for an AI. Deciding *which* design tokens to define, *why* purple over green, *whether* to use `clamp()` vs media queries — that's engineering judgment.

**4. The debugging loop is where AI saves the most time.** The 15-commit build fix saga would have been a full weekend of Stack Overflow and gem compatibility matrices. With Claude Code, each iteration was a few minutes. The total time was still hours, but the cognitive load was dramatically lower.

**5. AI doesn't eliminate iteration — it compresses it.** I still had to deploy, fail, diagnose, fix, repeat. The cycle just ran faster.

---

## The Numbers

| Metric | Value |
|--------|-------|
| Total commits | 21 |
| SCSS files rewritten | 18 |
| Lines changed | ~3,000 |
| Build fix iterations | 15 |
| Time (wall clock) | ~8 hours (one session, with a break) |
| React/Rails code changes | Minimal (1 JSX file, 2 config files) |

---

## Final State

The app went from a dead Heroku deployment with a dated UI to a live, auto-deploying Render service with a modern design system, proper secrets management, and automated security monitoring — without changing the core React/Rails architecture.

The full technical decision record is in the repo: [REVAMP.md](https://github.com/alextongme/noteworthy/blob/master/REVAMP.md)

---

*If you're sitting on a side project that "works but looks like 2020," this kind of targeted revamp is a good use case for AI pair programming. Don't rewrite — scope, modernize, ship.*
