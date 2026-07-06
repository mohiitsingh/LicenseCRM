const { Router } = require("express");
const { authenticate } = require("../../../middleware/auth.middleware");
const { authorize } = require("../../../middleware/role.middleware");
const ROLES = require("../../../common/constants/roles");

const {getDashboard} = require("../controllers/dashborad.controller");

const router = Router();

router.get(
    "/",
    authenticate,
    authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
    getDashboard
)


module.exports = router;