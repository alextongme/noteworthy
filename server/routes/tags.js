const express = require("express");
const router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth");

router.use(userAuth);

// Helper: format tag with note_ids for frontend
async function formatTag(tagId) {
    const tagRes = await pool.query(
        "SELECT id, name, author_id, created_at, updated_at FROM tags WHERE id = $1",
        [tagId]
    );
    const tag = tagRes.rows[0];

    const notesRes = await pool.query(
        "SELECT note_id FROM note_tags WHERE tag_id = $1",
        [tagId]
    );
    tag.note_ids = notesRes.rows.map(r => r.note_id);

    return tag;
}

// GET all tags for current user
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT id FROM tags WHERE author_id = $1 ORDER BY name ASC",
            [req.user.id]
        );

        const result = {};
        for (const row of rows) {
            const tag = await formatTag(row.id);
            result[tag.id] = tag;
        }

        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// CREATE tag (or add existing tag to note)
router.post("/", async (req, res) => {
    try {
        const { name, note_id } = req.body.tag || req.body;

        // Check if tag already exists for this user
        let tagRes = await pool.query(
            "SELECT id FROM tags WHERE author_id = $1 AND name = $2",
            [req.user.id, name]
        );

        let tagId;
        if (tagRes.rows.length) {
            tagId = tagRes.rows[0].id;
        } else {
            const newTag = await pool.query(
                "INSERT INTO tags (author_id, name) VALUES($1, $2) RETURNING id",
                [req.user.id, name]
            );
            tagId = newTag.rows[0].id;
        }

        // Create note_tag association if note_id provided
        if (note_id) {
            await pool.query(
                "INSERT INTO note_tags (note_id, tag_id) VALUES($1, $2) ON CONFLICT DO NOTHING",
                [note_id, tagId]
            );
        }

        const tag = await formatTag(tagId);
        res.status(201).json(tag);
    } catch (error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
    }
});

// DELETE tag entirely
router.delete("/:id", async (req, res) => {
    try {
        const tagData = req.body.tag || req.body;

        // If note_id is provided, just remove the note-tag association
        if (tagData && tagData.note_id) {
            await pool.query(
                "DELETE FROM note_tags WHERE tag_id = $1 AND note_id = $2",
                [req.params.id, tagData.note_id]
            );

            const tag = await formatTag(req.params.id);
            return res.json(tag);
        }

        // Otherwise delete the tag entirely
        await pool.query(
            "DELETE FROM tags WHERE id = $1 AND author_id = $2",
            [req.params.id, req.user.id]
        );

        res.json({ id: parseInt(req.params.id) });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
