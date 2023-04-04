const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

const getUsers = async (req, res) => {
    try {
        const response = await db.query("SELECT username, email FROM USERS")
        return res.status(200).json({
            data: response.rows
        });
    } catch (error) {
        console.error(error);
    }
};

const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // SALT with a length of 10
        const hashedPassword = await hash(password, 10);

        await db.query("INSERT INTO users(email, username, password) VALUES($1, $2, $3)", [email, username, hashedPassword]);

        return res.status(201).json({
            success: true,
            message: "The registration was successful"
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        })
    }
};

const login = async (req, res) => {
    const user = req.user;
    const payload = {
        id: user.id,
        email: user.email,
    }

    try {
        const token = await sign(payload, SECRET);

        return res.status(200).cookie("token", token, {httpOnly: true}).json({
            success: true,
            message: "Logged in successfully."
        })
       
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: "Protected"
        });
    } catch (error) {
        console.error(error);
    }
};

const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token", {httpOnly: true}).json({
            success: true,
            message: "Logged out successfully."
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
};

module.exports = { 
    getUsers, 
    register,
    login,
    protected,
    logout
};