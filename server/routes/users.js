const express = require("express");
const router = express.Router();
const pool = require("../db");
const { userAuth } = require("../middlewares/auth");

router.use(userAuth);

// UPDATE default notebook
router.patch("/", async (req, res) => {
    try {
        const { default_notebook_id } = req.body;

        await pool.query(
            "UPDATE users SET default_notebook_id = $1, updated_at = now() WHERE id = $2",
            [default_notebook_id, req.user.id]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;
