const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const {validateLicenseAccess} = require("../../../common/helpers/validateLicenseAccess.helper");

const {findAttachmentById} = require("../repositories/attachment.repository");

const downloadAttachmentService = async(licenseId, attachmentId, loggedInUser) => {
    await validateLicenseAccess(licenseId, loggedInUser);

    const attachment = await findAttachmentById(attachmentId);

    if(!attachment){
        throw new ApiError(
            STATUS_CODE.NOT_FOUND,
            "Attachment not found"
        )
    }

    if(attachment.licenseId.toString() !== licenseId){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Invalid attachment"
        )
    }
    return attachment;
}

module.exports = {downloadAttachmentService};