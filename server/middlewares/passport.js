const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["token"];
        return token;
    }
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor
}

passport.use(
    new Strategy(opts, async ({id}, done) => {
        try {
            const { rows } = await db.query(
                "SELECT id, email, username FROM users WHERE id = $1", [id]
            )

            if (!rows.length) {
                throw new Error("401 not authorized.")
            }

            const user = { id: rows[0].id, username: rows[0].username, email: rows[0].email}

            return await done(null, user);
        } catch (error) {
            console.error(error.message);
            done(null, false);
        }
    })
)