const {body} = require("express-validator");

const createLicenseValidation = [
    body("licenseName")
        .trim()
        .notEmpty()
        .withMessage("License name is required")
        .isLength({max: 200})
        .withMessage("licenseName cannot exceed 200 characters"),

    body("licenseNumber")
        .isMongoId()
        .withMessage("License number is required"),

    body("stateId")
        .isMongoId()
        .withMessage("State is required"),
    
    body("cityId")
        .isMongoId()
        .withMessage("city is required"),

    body("creationDate")
        .isISO8601()
        .withMessage("Invalid creation date"),

    body("expirationDate")
        .isISO8601()
        .withMessage("Invalid expirationDate"),

    body("notes")
        .optional()
        .isLength({max: 1000})
        .withMessage("Notes cannot exceed 1000 characters"),

    body("assignedTo")
        .optional()
        .isMongoId()
        .withMessage("Invalid assigned user")
]

module.exports = {createLicenseValidation};