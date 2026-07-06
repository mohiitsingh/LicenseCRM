const { Router } = require("express");
const { authenticate } = require("../../../middleware/auth.middleware");
const { authorize } = require("../../../middleware/role.middleware");
const { validate } = require("../../../middleware/validation.middleware");
const ROLES = require("../../../common/constants/roles");
const { createLicense } = require("../controllers/create-license.controller");
const {getLicenses} = require("../controllers/get-license.controller");
const {getLicenseById} = require("../controllers/get-license-by-id.controller");
const {updateLicense} = require("../controllers/update.license.controller");
const {upadateLicenseValidation} = require("../validations/update.validation");
const {renewLicense} = require("../controllers/renew-license.controller");
const {renewLicenseValidation} = require("../validations/renew-license.validation");
const {deleteLicense} = require("../controllers/delete-license.controller");
const {
  createLicenseValidation,
} = require("../validations/create-license.validation");

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
  createLicenseValidation,
  validate,
  createLicense,
);

router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
  getLicenses
);

router.get(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
  getLicenseById
);

router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
  upadateLicenseValidation,
  validate,
  updateLicense
);

router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.COORDINATOR),
  renewLicenseValidation,
  validate,
  renewLicense
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
  deleteLicense
)

module.exports = router;
