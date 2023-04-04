const express = require("express");
const router = express.Router();
const { login, protected, logout } = require("../controllers/auth");
const { userAuth } = require("../middlewares/auth");

// VALIDATORS
const { userValidation, loginValidation } = require("../validators/auth");

require('../middlewares/passport');

const { register } = require("../controllers/auth");

// MIDDLEWARE
const { validationMiddleware }  = require("../middlewares/validations");

// POST
router.post('/register', userValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);

// PROTECTED ROUTES
// GET ALL USERS
router.get('/protected', userAuth, protected);

router.get('/logout', userAuth, logout);

module.exports = router;