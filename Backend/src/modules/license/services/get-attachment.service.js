const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const {canAccessLicense} = require("../../../common/helpers/authorization.helper");

const {findLicenseById} = require("../repositories/license.repository");
const {findAttachmentsByLicenseId} = require("../repositories/attachment.repository");

const getAttachmentsService = async(licenseId, loggedInUser) => {
    const license = await findLicenseById(licenseId);

    if(!license){
        throw new ApiError(
            STATUS_CODE.NOT_FOUND,
            "License not found"
        )
    }

    if(!canAccessLicense(license,loggedInUser)){
        throw new ApiError(
            STATUS_CODE.FORBIDDEN,
            "You are not authorized"
        )
    }

    return await findAttachmentsByLicenseId(licenseId);
}

module.exports = {getAttachmentsService};