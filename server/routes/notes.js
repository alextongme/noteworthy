const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const newNote = await pool.query("INSERT INTO notes (title) VALUES($1) RETURNING *", [title])
        
        res.status(201).json({
            status: "Success",
            data: newNote.rows[0]
        });
    } catch (error) {
        res.status(400);
        console.error(error.message);
    };
})

// GET ALL
router.get('/', async (req, res) => {
    try { 
        const results = await pool.query("SELECT * FROM notes");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: { 
                notes: results.rows
            }
        });
    } catch (error) {
        console.error(error.message);
    };
});

// GET ONE
router.get("/:noteId", async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await pool.query("SELECT * FROM notes WHERE id = $1", [noteId]);
        // console.log(req.params.id);
        res.status(200).json(note.rows)
    } catch (error) {
        console.error(error.message);
    };
});

// UPDATE
router.put("/:noteId", async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title } = req.body;
        const updatedNote = await pool.query("UPDATE notes SET title = $1 WHERE id = $2", [title, noteId]);
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error(error.message);
    };
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM notes WHERE id = $1", [id])
        res.status(204).json("Todo was deleted!");
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;