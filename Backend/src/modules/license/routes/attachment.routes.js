const { Router } = require("express");
const { authenticate } = require("../../../middleware/auth.middleware");
const { authorize } = require("../../../middleware/role.middleware");
const { validate } = require("../../../middleware/validation.middleware");
const ROLES = require("../../../common/constants/roles");

const upload = require("../../../middleware/upload.middleware");
const {uploadAttachment} = require("../controllers/attachment.controller");
const {getAttachmentsController} = require("../controllers/get-attachment.controller");
const {downloadAttachmentController} = require("../controllers/downloadAttachment.controller");
const {deleteAttachmentController} = require("../controllers/deleteAttachment.controller");
const {previewAttachmentController} = require("../controllers/previewAttachment.controller");

const router = Router();

router.post(
    "/:licenseId/attachments",
    authenticate,
    authorize(ROLES.ADMIN, ROLES.COORDINATOR, ROLES.USER),
    upload.array("files", 10),
    uploadAttachment
);

router.get(
    "/:licenseId/attachments",
    authenticate,
    getAttachmentsController
);

router.get(
    "/:licenseId/attachments/:attachmentId/download",
    authenticate,
    downloadAttachmentController
);

router.delete(
    "/:licenseId/attachments/:attachmentId",
    authenticate,
    deleteAttachmentController
);

router.get(
    "/:licenseId/attachments/:attachmentId",
    authenticate,
    previewAttachmentController
)

module.exports = router;