const {Router} = require('express');
const {getMasters} = require("../controllers/master.controller");
const {authenticate} = require("../../../middleware/auth.middleware");

const router = Router();

router.get("/", authenticate, getMasters);

module.exports = router;