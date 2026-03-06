const express = require("express");
const router = express.Router();
const db = require("../db");
const { register, login, session, logout } = require("../controllers/auth");
const { userAuth } = require("../middlewares/auth");
const { userValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations");

require("../middlewares/passport");

router.post("/register", userValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.post("/logout", logout);
router.get("/session", userAuth, session);

// Check if email exists (used by login form before showing password field)
router.get("/lookForUser", async (req, res) => {
    try {
        const { email } = req.query;
        const { rows } = await db.query("SELECT id FROM users WHERE email = $1", [email]);
        if (rows.length) {
            return res.json(["Email found"]);
        }
        return res.status(401).json(["Email not found, please signup!"]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
