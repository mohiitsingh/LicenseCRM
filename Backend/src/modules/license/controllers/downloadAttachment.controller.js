const path = require("path");
const {downloadAttachmentService} = require("../services/downloadAttachment.service");

const downloadAttachmentController = async(req, res, next) => {
    try {
        const attachment = await downloadAttachmentService(
            req.params.licenseId,
            req.params.attachmentId,
            req.user
        )
        return res.download(
            path.resolve(attachment.filePath),
            attachment.originalName
        );
    } catch (error) {
        next(error);
    }
}

module.exports = {downloadAttachmentController};