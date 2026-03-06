const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json(
            errors.array().map(e => e.msg)
        );
    }

    next();
}

module.exports = {
    validationMiddleware
};
