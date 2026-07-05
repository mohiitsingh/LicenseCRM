const {Router} = require("express");
const router = Router();

const authRoutes = require("../modules/auth/routes/auth.routes");
const userRoutes = require("../modules/user/routes/user.routes");
const masterRoutes = require("../modules/master/routes/master.routes");
const licenseRoutes = require("../modules/license/routes/license.routes");



router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/masters", masterRoutes);
router.use("/licenses", licenseRoutes);

module.exports = router;