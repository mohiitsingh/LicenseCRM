const path = require("path");

const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {findLicenseById} = require("../repositories/license.repository");
const {createAttachments} = require("../repositories/attachment.repository");
const {canAccessLicense} = require("../../../common/helpers/authorization.helper");

const uploadAttachmentService = async(licenseId, files, loggedInUser) => {
    const license = await findLicenseById(licenseId);
    if(!license){
        throw new ApiError(
            STATUS_CODE.NOT_FOUND,
            "License not found"
        )
    }

    if(!canAccessLicense(license, loggedInUser)){
        throw new ApiError(
            STATUS_CODE.FORBIDDEN,
            "You are not authorized to upload attachments"
        )
    }

    if(!files || files.length === 0){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Please upload atleast one file"
        )
    }

    const attachments = files.map(file => ({
        licenseId,
        originalName: file.originalName,
        fileName: file.fileName,
        filePath: file.filePath,
        mimeType: file.mimeType,
        fileSize: file.size,
        uploadedBy: loggedInUser._id
    }));

    return await createAttachments(attachments);
}

module.exports = {uploadAttachmentService};