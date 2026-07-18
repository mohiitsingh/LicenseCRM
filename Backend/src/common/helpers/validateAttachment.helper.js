const ApiError = require("../errors/ApiError");
const STATUS_CODE = require("../constants/statusCodes");

const {findAttachmentById} = require("../../modules/license/repositories/attachment.repository");

const validateAttachment = async(attachmentId, licenseId) => {
    const attachment = await findAttachmentById(attachmentId);

    if(!attachment){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Attachment does not belong to this license"
        )
    }

    if(attachment.licenseId.toString() !== licenseId){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Attachment does not belong to the license"
        )
    }

    return attachment;
}

module.exports = {validateAttachment};