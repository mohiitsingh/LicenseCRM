const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {findLicenseById, softDeleteLicense} = require("../repositories/license.repository");
const {canAccessLicense} = require("../../../common/helpers/authorization.helper");

const deleteLicenseService = async(licenseId, loggedInUser) => {
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
            "You are not authorized"
        )
    }

    if(license.isDeleted){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "License already deleted"
        )
    }
    await softDeleteLicense(licenseId, loggedInUser);
}

module.exports = {deleteLicenseService};