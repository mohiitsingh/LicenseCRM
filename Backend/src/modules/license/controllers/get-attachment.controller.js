const STATUS_CODE = require("../../../common/constants/statusCodes");
const ApiResponse = require("../../../common/responses/ApiResponse");
const MESSAGES = require("../../../common/constants/message");

const {getAttachmentsService} = require("../services/get-attachment.service");

const getAttachmentsController = async(req, res, next) => {
    try {
        const attachments = await getAttachmentsService(
            req.params.licenseId,
            req.user
        );

        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                MESSAGES.ATTACHMENT_FETCHED,
                attachments
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {getAttachmentsController};