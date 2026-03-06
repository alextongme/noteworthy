const express = require("express");
const router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth");

router.use(userAuth);

// Helper: fetch a note with its notebook and tags, formatted for the frontend
async function formatNote(noteId) {
    const noteRes = await pool.query(
        `SELECT n.id, n.title, n.body, n.created_at, n.updated_at, n.user_id, n.notebook_id,
                json_build_object('id', nb.id, 'name', nb.name) AS notebook
         FROM notes n
         JOIN notebooks nb ON nb.id = n.notebook_id
         WHERE n.id = $1`,
        [noteId]
    );
    const note = noteRes.rows[0];

    const tagsRes = await pool.query(
        `SELECT t.id, t.name, t.created_at, t.updated_at, t.author_id
         FROM tags t
         JOIN note_tags nt ON nt.tag_id = t.id
         WHERE nt.note_id = $1`,
        [noteId]
    );
    note.tags = tagsRes.rows;
    note.user_ids = [note.user_id];
    delete note.user_id;

    return note;
}

// GET all notes for current user
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id FROM notes WHERE user_id = $1 ORDER BY updated_at DESC",
            [req.user.id]
        );

        const result = {};
        for (const row of rows) {
            const note = await formatNote(row.id);
            result[note.id] = note;
        }

        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET single note
router.get("/:id", async (req, res) => {
    try {
        const note = await formatNote(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// CREATE note
router.post("/", async (req, res) => {
    try {
        const { title, body } = req.body.note || req.body;

        // Use user's default notebook if no notebook_id provided
        let notebookId = (req.body.note && req.body.note.notebook_id) || req.body.notebook_id;
        if (!notebookId) {
            const userRes = await pool.query(
                "SELECT default_notebook_id FROM users WHERE id = $1",
                [req.user.id]
            );
            notebookId = userRes.rows[0].default_notebook_id;
        }

        const { rows } = await pool.query(
            "INSERT INTO notes (user_id, notebook_id, title, body) VALUES($1, $2, $3, $4) RETURNING id",
            [req.user.id, notebookId, title || "", body || ""]
        );

        const note = await formatNote(rows[0].id);
        res.status(201).json(note);
    } catch (error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
    }
});

// UPDATE note
router.patch("/:id", async (req, res) => {
    try {
        const noteData = req.body.note || req.body;
        const sets = [];
        const vals = [];
        let idx = 1;

        if (noteData.title !== undefined) {
            sets.push(`title = $${idx++}`);
            vals.push(noteData.title);
        }
        if (noteData.body !== undefined) {
            sets.push(`body = $${idx++}`);
            vals.push(noteData.body);
        }
        // Support moving note to a different notebook
        const newNotebookId = noteData.notebook && noteData.notebook.id;
        if (newNotebookId) {
            sets.push(`notebook_id = $${idx++}`);
            vals.push(newNotebookId);
        }

        sets.push(`updated_at = now()`);
        vals.push(req.params.id);

        await pool.query(
            `UPDATE notes SET ${sets.join(", ")} WHERE id = $${idx} AND user_id = $${idx + 1}`,
            [...vals, req.user.id]
        );

        const note = await formatNote(req.params.id);
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
    }
});

// DELETE note
router.delete("/:id", async (req, res) => {
    try {
        // Fetch note info before deleting (for frontend state cleanup)
        const noteRes = await pool.query(
            "SELECT id, notebook_id FROM notes WHERE id = $1 AND user_id = $2",
            [req.params.id, req.user.id]
        );

        if (!noteRes.rows.length) {
            return res.status(404).json({ error: "Note not found" });
        }

        const note = noteRes.rows[0];

        // Get tag_ids for frontend cleanup
        const tagRes = await pool.query(
            "SELECT tag_id FROM note_tags WHERE note_id = $1",
            [req.params.id]
        );
        const tag_ids = tagRes.rows.map(r => r.tag_id);

        await pool.query("DELETE FROM notes WHERE id = $1", [req.params.id]);

        res.json({ id: note.id, notebook_id: note.notebook_id, tag_ids });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
