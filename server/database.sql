-- Noteworthy Schema (simplified — no join tables for 1:many relationships)

CREATE TABLE users (
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

CREATE TABLE notebooks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add FK for default_notebook_id after notebooks table exists
ALTER TABLE users ADD CONSTRAINT fk_default_notebook
    FOREIGN KEY (default_notebook_id) REFERENCES notebooks(id) ON DELETE SET NULL;

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notebook_id INTEGER NOT NULL REFERENCES notebooks(id) ON DELETE CASCADE,
    title VARCHAR(255),
    body TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(author_id, name)
);

CREATE TABLE note_tags (
    id SERIAL PRIMARY KEY,
    note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(note_id, tag_id)
);

-- Seed: demo user (password: "123456")
INSERT INTO users (username, email, password, first_name, last_name)
VALUES ('demo', 'demo@gmail.com', '$2a$10$yKP7ClcQwd/5bKhgZdolbOENgUwaP8/3R.MFD5BjJp4FVafBCNgMe', 'Demo', 'User');

INSERT INTO notebooks (user_id, name)
VALUES (1, 'Your first notebook!');

UPDATE users SET default_notebook_id = 1 WHERE id = 1;

INSERT INTO notes (user_id, notebook_id, title, body)
VALUES (1, 1, 'Your first note!', '<p><span class="ql-font-monospace ql-size-huge">Your first message!</span></p>');
