const {body} = require("express-validator");

const renewLicenseValidation = [
    body("expirationDate")
    .notEmpty()
    .isISO8601()
    .withMessage("Valid expiration date is required"),

    body("notes")
    .optional()
    .isLength({max: 1000})
]

module.exports = {renewLicenseValidation};