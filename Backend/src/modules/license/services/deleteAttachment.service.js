const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const {validateLicenseAccess} = require("../../../common/helpers/validateLicenseAccess.helper");
const {validateAttachment} = require("../../../common/helpers/validateAttachment.helper");
const {softDeleteAttachment} = require("../repositories/attachment.repository");

const fs = require('fs');

const deleteAttachmentService = async(licenseId, attachmentId, loggedInUser) => {
    await validateLicenseAccess(licenseId, loggedInUser);

    const attachment = await validateAttachment(attachmentId, licenseId);

    if(attachment.isDeleted){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Attachment already deleted"
        )
    }

    await softDeleteAttachment(attachmentId, loggedInUser);
}


module.exports = {deleteAttachmentService}