const ROLES = require("../../../common/constants/roles");
const LICENSE_STATUS = require("../../../common/constants/licenseStatus");
const ApiError = require("../../../common/errors/ApiError");
const {mapLicenseResponse} = require("../mappers/license.mapper");
const {canAccessLicense} = require("../../../common/helpers/authorization.helper");

const {findLicenseById, updateLicense} = require("../repositories/license.repository");
const {findActiveUserById} = require("../../user/repositories/user.repository");
const {findActiveById, findActiveCityByState} = require("../../master/repositories/master.repository");
const STATUS_CODES = require("../../../common/constants/statusCodes");

const updateLicenseService = async(licenseId, payload, loggedInUser) => {
    const license = await findLicenseById(licenseId);

    if(!license){
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            "License not found"
        );
    }

    if(loggedInUser.role === ROLES.USER){
        if(payload.assignedTo){
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                "You cannot reassign a license"
            )
        }
        if(payload.creationDate){
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                "You cannot modify the creation date"
            )
        }
    }

    if(payload.assignedTo){
        const assignedUser = await findActiveUserById(payload.assignedTo);
        if(!assignedUser){
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Assigned User is invalid"
            )
        }
    }

    const stateId = payload.stateId || license.state._id;
    const cityId = payload.cityId || license.city._id;

    if(payload.stateId || payload.cityId){
        const state = await findActiveById(stateId);
        if(!state){
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Invalid state"
            )
        }
        const city = await findActiveById(cityId);
        if(!city){
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Invalid city"
            )
        }
    }

    if(payload.licenseTypeId){
        const type = await findActiveById(payload.licenseTypeId);
        if(!type){
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                "Invalid license type"
            )
        }
    }

    const creationDate = payload.creationDate || license.creationDate;
    const expirationDate = payload.expirationDate || license.expirationDate;

    if(new Date(expirationDate) <= new Date(creationDate)){
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            "Expiration date must be greater than creation date"
        )
    }

    payload.updatedBy = loggedInUser._id;

    const updatedLicense = await updateLicense(licenseId, payload);
    return mapLicenseResponse(updatedLicense);
}

module.exports = {updateLicenseService}