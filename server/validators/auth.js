const { check } = require("express-validator");
const db = require("../db");
const { compare } = require("bcryptjs");

// EMAIL
const emailExists = check("email").custom(async (value) => {
    const {rows} = await db.query("SELECT * FROM users WHERE email = $1", [value]);
    
    if (rows.length) {
        throw new Error('There is an existing user with this email already.')
    };
});

const validEmail = check("email").isEmail().withMessage('Email must be a valid email.');

// USERNAME
const usernameExists = check("username").custom(async (value) => {
    const {rows} = await db.query("SELECT * FROM users WHERE username = $1", [value]);

    if (rows.length) {
        throw new Error('There is an existing user with this username already.')
    };
});

const validUsername = check("username").isLength({min: 4, max: 24}).withMessage('Username must be between 4 and 24 characters');

// PASSWORD
const validPassword = check("password").isLength({min: 6, max: 15}).withMessage('Password must be between 6 and 15 characters');

// LOGIN
const validLoginFields = check("username").custom(async (value, {req}) => {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [value]);
  
    if (!user.rows.length) {
        throw new Error("User does not exist");
    };

    const validPassword = await compare(req.body.password, user.rows[0].password);
    if(!validPassword) {
        throw new Error("Wrong password.");
    };

    req.user = user.rows[0];
});

module.exports = {
    userValidation: [emailExists, validEmail, usernameExists, validUsername, validPassword],
    loginValidation: [validLoginFields]
};