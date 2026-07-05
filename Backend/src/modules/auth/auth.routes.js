const express = require("express");
const {register, login} = require("./auth.controller");
const {registerValidation, loginValidation} = require("../auth.validation");
const validate = require("../../../middleware/validation.middleware");

const router = express.Router();

router.post("/register", registerValidation,validate, register);
router.post("/login", loginValidation, validate, login);

module.exports = router;
