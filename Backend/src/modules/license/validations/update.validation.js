const {body} = require("express-validator");

const upadateLicenseValidation = [
    body("licenseName")
        .optional()
        .trim()
        .isLength({ max: 200 }),

    body("licenseTypeId")
        .optional()
        .isMongoId(),

    body("stateId")
        .optional()
        .isMongoId(),

    body("cityId")
        .optional()
        .isMongoId(),

    body("assignedTo")
        .optional()
        .isMongoId(),

    body("creationDate")
        .optional()
        .isISO8601(),

    body("expirationDate")
        .optional()
        .isISO8601(),

    body("notes")
        .optional()
        .isLength({ max: 1000 })
]

module.exports = {upadateLicenseValidation};