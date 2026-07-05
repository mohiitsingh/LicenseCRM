const {body} = require("express-validator");

const createLicenseValidation = [
    body("licenseName")
        .trim()
        .notEmpty()
        .withMessage("License name is required"),

    body("licenseNumber")
        .notEmpty()
        .withMessage("License number is required"),

    body("stateId")
        .notEmpty()
        .withMessage("State is required"),
    
    body("cityId")
        .notEmpty()
        .withMessage("city is required"),

    body("creationDate")
        .isISO8601()
        .withMessage("Invalid creation date"),

    body("expirationDate")
        .isISO8601()
        .withMessage("Invalid expirationDate")
]

module.exports = createLicenseValidation;