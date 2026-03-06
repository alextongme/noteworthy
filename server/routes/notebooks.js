const express = require("express");
const router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth");

router.use(userAuth);

// Helper: format notebook with note_ids and user_ids for frontend
async function formatNotebook(notebookId) {
    const nbRes = await pool.query(
        "SELECT id, name, user_id, created_at, updated_at FROM notebooks WHERE id = $1",
        [notebookId]
    );
    const notebook = nbRes.rows[0];

    const notesRes = await pool.query(
        "SELECT id FROM notes WHERE notebook_id = $1 ORDER BY updated_at DESC",
        [notebookId]
    );
    notebook.note_ids = notesRes.rows.map(r => r.id);
    notebook.user_ids = [notebook.user_id];
    delete notebook.user_id;

    return notebook;
}

// GET all notebooks for current user
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id FROM notebooks WHERE user_id = $1 ORDER BY created_at ASC",
            [req.user.id]
        );

        const result = {};
        for (const row of rows) {
            const notebook = await formatNotebook(row.id);
            result[notebook.id] = notebook;
        }

        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET single notebook
router.get("/:id", async (req, res) => {
    try {
        const notebook = await formatNotebook(req.params.id);
        if (!notebook) return res.status(404).json({ error: "Notebook not found" });
        res.json(notebook);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// CREATE notebook
router.post("/", async (req, res) => {
    try {
        const { name } = req.body.notebook || req.body;

        const { rows } = await pool.query(
            "INSERT INTO notebooks (user_id, name) VALUES($1, $2) RETURNING id",
            [req.user.id, name]
        );

        const notebook = await formatNotebook(rows[0].id);
        res.status(201).json(notebook);
    } catch (error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
    }
});

// UPDATE notebook
router.patch("/:id", async (req, res) => {
    try {
        const { name } = req.body.notebook || req.body;

        await pool.query(
            "UPDATE notebooks SET name = $1, updated_at = now() WHERE id = $2 AND user_id = $3",
            [name, req.params.id, req.user.id]
        );

        const notebook = await formatNotebook(req.params.id);
        res.json(notebook);
    } catch (error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
    }
});

// DELETE notebook
router.delete("/:id", async (req, res) => {
    try {
        // Return the notebook with note_ids so frontend can clean up
        const notebook = await formatNotebook(req.params.id);

        await pool.query(
            "DELETE FROM notebooks WHERE id = $1 AND user_id = $2",
            [req.params.id, req.user.id]
        );

        res.json(notebook);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
