const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {findLicenseById, updateLicense} = require("../repositories/license.repository");
const {mapLicenseResponse} = require("../mappers/license.mapper");

const renewLicenseService = async(licenseId, payload, loggedInUser) => {
    const license = await findLicenseById(licenseId);
    if(!license){
        throw new ApiError(
            STATUS_CODE.NOT_FOUND,
            "License not found"
        )
    }
    const newExpiry = new Date(payload.expirationDate);
    const currentExpiry = new Date(payload.expirationDate);

    if(newExpiry <= currentExpiry){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "New expiration date must be greater than current expiration date"
        )
    }

    const updated = await updateLicense(
        licenseId,
        {
            expirationDate: payload.expirationDate,
            notes: payload.notes ?? license.notes,
            updatedBy: loggedInUser._id
        }
    );
    return mapLicenseResponse(updated);
}

module.exports = {renewLicenseService};