const STATUS_CODE = require("../../../common/constants/statusCodes");
const ApiResponse = require("../../../common/responses/ApiResponse");
const {deleteAttachmentService} = require("../services/deleteAttachment.service");

const deleteAttachmentController = async(req, res, next) => {
    try {
        await deleteAttachmentService(
            req.params.licenseId,
            req.params.attachmentId,
            req.user
        )
        return res.status(STATUS_CODE.OK).json({
            success: true,
            message: "Attachment deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {deleteAttachmentController};