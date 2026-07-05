const express = require("express");
const {register, login} = require("../controllers/auth.controller");
const {registerValidation, loginValidation} = require("../validations/auth.validation");
const {validate} = require("../../../middleware/validation.middleware");

const router = express.Router();

router.post("/register", registerValidation,validate, register);
router.post("/login", loginValidation, validate, login);

module.exports = router;
