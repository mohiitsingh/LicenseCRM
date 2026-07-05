const {body} = require("express-validator");

const registerValidation = [
    body("name")
    .notEmpty()
    .withMessage("Name is required"),

    body("email")
    .isEmail()
    .withMessage("Valid email is required"),

    body("password")
    .isLength({min: 6})
    .withMessage("password must be atleast 6 characters"),
]

const loginValidation = [
    body('email')
    .isEmail()
    .withMessage("Valid email is required"),

    body("password")
    .isLength({min: 6})
    .withMessage("Password is required")
]

module.exports = {registerValidation, loginValidation};