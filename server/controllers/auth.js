const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

const register = async (req, res) => {
    const { email, password } = req.body;
    const username = req.body.username || email.split('@')[0];
    try {
        const hashedPassword = await hash(password, 10);

        const { rows } = await db.query(
            "INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING id, username, email, first_name, last_name, default_notebook_id",
            [email, username, hashedPassword]
        );

        const user = rows[0];

        // Create default notebook
        const nb = await db.query(
            "INSERT INTO notebooks(user_id, name) VALUES($1, $2) RETURNING id",
            [user.id, "Your first notebook!"]
        );
        const notebookId = nb.rows[0].id;

        // Set default notebook
        await db.query(
            "UPDATE users SET default_notebook_id = $1 WHERE id = $2",
            [notebookId, user.id]
        );
        user.default_notebook_id = notebookId;

        // Create default note
        await db.query(
            "INSERT INTO notes(user_id, notebook_id, title, body) VALUES($1, $2, $3, $4)",
            [user.id, notebookId, "Your first note!", '<p><span class="ql-font-monospace ql-size-huge">Your first message!</span></p>']
        );

        const token = sign({ id: user.id }, SECRET);

        return res.status(201).cookie("token", token, { httpOnly: true, sameSite: "lax" }).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const user = req.user;
    const payload = { id: user.id };

    try {
        const token = sign(payload, SECRET);

        // Fetch full user data
        const { rows } = await db.query(
            "SELECT id, username, email, first_name, last_name, default_notebook_id FROM users WHERE id = $1",
            [user.id]
        );

        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: "lax" }).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const session = async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT id, username, email, first_name, last_name, default_notebook_id FROM users WHERE id = $1",
            [req.user.id]
        );

        if (!rows.length) {
            return res.status(401).json(null);
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token", { httpOnly: true, sameSite: "lax" }).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    session,
    logout
};
