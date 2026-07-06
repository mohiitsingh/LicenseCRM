const express = require("express");
const { profile, userDropdown } = require("../controllers/user.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { getAllUsers } = require("../controllers/user.controller");
const { authorize } = require("../../../middleware/role.middleware");
const {
  updateUserStaus,
} = require("../controllers/update-user-status.controller");

const router = express.Router();

// router.get("/profile", authenticate, profile);

router.get("/", authenticate, authorize("ADMIN"), getAllUsers);
router.get(
  "/dropdown",
  authenticate,
  authorize("ADMIN", "COORDINATOR"),
  userDropdown,
);

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    updateUserStaus
)

module.exports = router;
