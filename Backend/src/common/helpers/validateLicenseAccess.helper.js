const ApiError = require("../errors/ApiError");
const STATUS_CODE = require("../constants/statusCodes");

const {findLicenseById} = require('../../modules/license/repositories/license.repository');
const {canAccessLicense} = require("./authorization.helper");

const validateLicenseAccess = async(licenseId, loggedInUser) => {
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
            "You are unauthorized"
        )
    }

    return license;
}

module.exports = {validateLicenseAccess};