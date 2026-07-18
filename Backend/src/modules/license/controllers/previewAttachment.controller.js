const {previewAttachmentService} = require("../services/previewAttachment.service");

const path = require("path");
const fs = require("fs");

const previewAttachmentController = async(req, res, next) => {
    try {
        const attachment = await previewAttachmentService(
            req.params.licenseId,
            req.params.attachmentId,
            req.user
        );

        res.setHeader(
            "Content-Type",
            attachment.mimeType
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename=${attachment.originalName}`
        )

        return fs.createReadStream(
            path.resolve(attachment.filePath)
        ).pipe(res);
    } catch (error) {
        next(error);
    }
}

module.exports = {previewAttachmentController};