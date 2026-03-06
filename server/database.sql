-- Noteworthy Schema (idempotent — safe to run multiple times)

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    default_notebook_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notebooks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add FK for default_notebook_id after notebooks table exists
DO $$ BEGIN
    ALTER TABLE users ADD CONSTRAINT fk_default_notebook
        FOREIGN KEY (default_notebook_id) REFERENCES notebooks(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notebook_id INTEGER NOT NULL REFERENCES notebooks(id) ON DELETE CASCADE,
    title VARCHAR(255),
    body TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(author_id, name)
);

CREATE TABLE IF NOT EXISTS note_tags (
    id SERIAL PRIMARY KEY,
    note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(note_id, tag_id)
);

-- Seed: demo user (password: "123456") — skips if already exists
INSERT INTO users (username, email, password, first_name, last_name)
VALUES ('demo', 'demo@gmail.com', '$2a$10$yKP7ClcQwd/5bKhgZdolbOENgUwaP8/3R.MFD5BjJp4FVafBCNgMe', 'Demo', 'User')
ON CONFLICT (email) DO NOTHING;

-- Seed notebooks (only if demo user has none)
INSERT INTO notebooks (user_id, name)
SELECT 1, 'Getting Started'
WHERE NOT EXISTS (SELECT 1 FROM notebooks WHERE user_id = 1 AND name = 'Getting Started');

INSERT INTO notebooks (user_id, name)
SELECT 1, 'Inspiration'
WHERE NOT EXISTS (SELECT 1 FROM notebooks WHERE user_id = 1 AND name = 'Inspiration');

INSERT INTO notebooks (user_id, name)
SELECT 1, 'Work Projects'
WHERE NOT EXISTS (SELECT 1 FROM notebooks WHERE user_id = 1 AND name = 'Work Projects');

-- Set default notebook
UPDATE users SET default_notebook_id = (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Getting Started' LIMIT 1)
WHERE id = 1 AND default_notebook_id IS NULL;

-- Seed notes for "Getting Started" notebook
INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Getting Started' LIMIT 1),
    'Welcome to Noteworthy!',
    '<h1><strong>Welcome to Noteworthy</strong></h1><p><br></p><p>This is your <strong>rich text editor</strong>. You can format text in many ways:</p><ul><li><strong>Bold text</strong> for emphasis</li><li><em>Italic text</em> for style</li><li><u>Underlined text</u> for importance</li><li><s>Strikethrough</s> for completed items</li></ul><p><br></p><h2>Organize Your Life</h2><p>Use <strong>notebooks</strong> to group related notes together. Use <strong>tags</strong> to cross-reference notes across notebooks.</p><p><br></p><blockquote>The palest ink is better than the best memory. — Chinese Proverb</blockquote><p><br></p><p>Try editing this note to get started!</p>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'Welcome to Noteworthy!');

INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Getting Started' LIMIT 1),
    'Keyboard Shortcuts',
    '<h2><strong>Keyboard Shortcuts</strong></h2><p><br></p><p>Master these shortcuts to speed up your workflow:</p><p><br></p><pre class="ql-syntax" spellcheck="false">Ctrl/Cmd + B    → Bold&#10;Ctrl/Cmd + I    → Italic&#10;Ctrl/Cmd + U    → Underline&#10;Ctrl/Cmd + Z    → Undo&#10;Ctrl/Cmd + Y    → Redo</pre><p><br></p><p>The editor supports <span class="ql-font-monospace">monospace code</span>, <span class="ql-size-large">large text</span>, and <span class="ql-size-small">small text</span> too.</p>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'Keyboard Shortcuts');

-- Seed notes for "Inspiration" notebook
INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Inspiration' LIMIT 1),
    'Lofi Hip Hop Radio',
    '<h2>Lofi Hip Hop - Beats to Relax/Study To</h2><p><br></p><p>Perfect background music for writing notes and staying focused.</p><p><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/jfKfPfyJRdk"></iframe><p><br></p><p><em>This livestream has been going since 2020 — the dedication is real.</em></p>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'Lofi Hip Hop Radio');

INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Inspiration' LIMIT 1),
    'The Art of Productivity',
    '<h1>The Art of Productivity</h1><p><br></p><p>A curated collection of ideas on <strong>getting things done</strong>.</p><p><br></p><h2>The Eisenhower Matrix</h2><ol><li><strong>Urgent + Important</strong> — Do it now</li><li><strong>Important, Not Urgent</strong> — Schedule it</li><li><strong>Urgent, Not Important</strong> — Delegate it</li><li><strong>Neither</strong> — Eliminate it</li></ol><p><br></p><h2>Watch: How to Multiply Your Time</h2><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/y2X7c9SBER0"></iframe><p><br></p><blockquote>You do not rise to the level of your goals. You fall to the level of your systems. — James Clear</blockquote>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'The Art of Productivity');

INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Inspiration' LIMIT 1),
    'Creative Coding Inspo',
    '<h2>Creative Coding Inspiration</h2><p><br></p><p>Amazing things people are building with code:</p><p><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/4Se0_w0ISYk"></iframe><p><br></p><h3>Ideas to Try</h3><ul><li>Generative art with <strong>p5.js</strong></li><li>Audio visualizers with <strong>Web Audio API</strong></li><li>3D scenes with <strong>Three.js</strong></li><li>Shader experiments on <strong>Shadertoy</strong></li></ul><p><br></p><p><span class="ql-font-monospace">const creativity = passion + code;</span></p>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'Creative Coding Inspo');

-- Seed notes for "Work Projects" notebook
INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Work Projects' LIMIT 1),
    'Q1 Planning Notes',
    '<h1>Q1 2026 Planning</h1><p><br></p><h2>Goals</h2><ol><li><strong>Launch v2.0</strong> of the product by end of February</li><li>Increase test coverage to <strong>80%</strong></li><li>Reduce average response time to <strong>&lt;200ms</strong></li></ol><p><br></p><h2>Team Assignments</h2><pre class="ql-syntax" spellcheck="false">Frontend  → Alex, Sarah&#10;Backend   → Mike, Priya&#10;DevOps    → Jordan&#10;Design    → Emma</pre><p><br></p><h2>Key Milestones</h2><ul><li><s>Week 1-2: Architecture review</s></li><li><s>Week 3-4: Core feature development</s></li><li>Week 5-6: Integration testing</li><li>Week 7-8: Beta release + feedback</li></ul><p><br></p><p><em>Next sync: Monday 10am</em></p>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'Q1 Planning Notes');

INSERT INTO notes (user_id, notebook_id, title, body)
SELECT 1,
    (SELECT id FROM notebooks WHERE user_id = 1 AND name = 'Work Projects' LIMIT 1),
    'Meeting Notes - Design Review',
    '<h2>Design Review Meeting</h2><p><em>March 3, 2026</em></p><p><br></p><h3>Attendees</h3><p>Alex, Emma, Sarah, Mike</p><p><br></p><h3>Discussion Points</h3><ul><li>New <strong>color system</strong> approved — moving to Material-inspired dark theme</li><li>Typography: switching from Raleway to <strong>Inter</strong> for better readability</li><li>Emma will deliver updated component library by <strong>Friday</strong></li></ul><p><br></p><h3>Action Items</h3><ol><li>Alex: Update CSS variables across all components</li><li>Sarah: Implement responsive breakpoints</li><li>Mike: API response shape review</li></ol><p><br></p><blockquote>Good design is as little design as possible. — Dieter Rams</blockquote>'
WHERE NOT EXISTS (SELECT 1 FROM notes WHERE user_id = 1 AND title = 'Meeting Notes - Design Review');

-- Seed tags
INSERT INTO tags (author_id, name)
SELECT 1, 'tutorial'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE author_id = 1 AND name = 'tutorial');

INSERT INTO tags (author_id, name)
SELECT 1, 'productivity'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE author_id = 1 AND name = 'productivity');

INSERT INTO tags (author_id, name)
SELECT 1, 'work'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE author_id = 1 AND name = 'work');

-- Tag associations (link notes to tags)
INSERT INTO note_tags (note_id, tag_id)
SELECT n.id, t.id FROM notes n, tags t
WHERE n.title = 'Welcome to Noteworthy!' AND n.user_id = 1
AND t.name = 'tutorial' AND t.author_id = 1
AND NOT EXISTS (SELECT 1 FROM note_tags WHERE note_id = n.id AND tag_id = t.id);

INSERT INTO note_tags (note_id, tag_id)
SELECT n.id, t.id FROM notes n, tags t
WHERE n.title = 'The Art of Productivity' AND n.user_id = 1
AND t.name = 'productivity' AND t.author_id = 1
AND NOT EXISTS (SELECT 1 FROM note_tags WHERE note_id = n.id AND tag_id = t.id);

INSERT INTO note_tags (note_id, tag_id)
SELECT n.id, t.id FROM notes n, tags t
WHERE n.title = 'Q1 Planning Notes' AND n.user_id = 1
AND t.name = 'work' AND t.author_id = 1
AND NOT EXISTS (SELECT 1 FROM note_tags WHERE note_id = n.id AND tag_id = t.id);

INSERT INTO note_tags (note_id, tag_id)
SELECT n.id, t.id FROM notes n, tags t
WHERE n.title = 'Meeting Notes - Design Review' AND n.user_id = 1
AND t.name = 'work' AND t.author_id = 1
AND NOT EXISTS (SELECT 1 FROM note_tags WHERE note_id = n.id AND tag_id = t.id);
