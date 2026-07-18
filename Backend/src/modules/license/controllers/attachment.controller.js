const STATUS_CODE = require("../../../common/constants/statusCodes");
const ApiResponse = require("../../../common/responses/ApiResponse");
const MESSAGES = require("../../../common/constants/message");
const {uploadAttachmentService} = require("../services/attachment.service");

const uploadAttachment = async(req, res, next) => {
    try {
        const {licenseId} = req.params;
        const attachments = await uploadAttachmentService(
            licenseId,
            req.files,
            req.user
        )
        return res.status(STATUS_CODE.CREATED).json(
            new ApiResponse(
                STATUS_CODE.CREATED,
                MESSAGES.ATTACHMENT_UPLOAD,
                attachments
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {uploadAttachment}