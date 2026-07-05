const ROLES = require("../../../common/constants/roles");
const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const {canAccessLicense} = require("../../../common/helpers/authorization.helper");

const {findLicenseById} = require("../repositories/license.repository");
const {mapLicenseResponse} = require("../mappers/license.mapper");


const getLicenseByIdService = async(licenseId, loggedInUser) => {
    const license = await findLicenseById(licenseId);
    if(!license){
        throw new ApiError(
            STATUS_CODE.NOT_FOUND,
            "License not found"
        )
    }

    // user can only access their own license
    // if(loggedInUser.role === ROLES.USER &&
    //     license.assignedTo._id.toString() !== loggedInUser._id.toString()
    if(canAccessLicense(license, loggedInUser)
    ){
        throw new ApiError(
            STATUS_CODE.FORBIDDEN,
            "You are not authorize to access this license"
        )
    }

    return mapLicenseResponse(license);
}


module.exports = {getLicenseByIdService};