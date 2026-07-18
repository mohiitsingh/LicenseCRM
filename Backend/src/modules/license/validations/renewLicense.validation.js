const {body} = require("express-validator");

const renewLicenseValidation = [
    body("renewedExpiryDate")
        .notEmpty()
        .withMessage("Renewed Expiry date is required")
        .isISO8601()
        .withMessage("Please provide valid expiry date"),

    body("renewalCost")
        .optional()
        .isFloat({min: 0})
        .withMessage("Renewal Cost must be greater than 0"),

    body("vendor")
        .optional()
        .trim()
        .isLength({max: 1000})
        .withMessage("Remarks cannot exceed 1000 character")
]

module.exports = {renewLicenseValidation};