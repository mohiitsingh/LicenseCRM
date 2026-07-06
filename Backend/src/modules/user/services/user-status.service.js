const ROLES = require("../../../common/constants/roles");
const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {findById, updateUserStatus, countActiveAdmins} = require("../repositories/user.repository");
const {hasActiveOrRenewalLicenses} = require("../../license/repositories/license.repository");

const updateUserStatusService = async(userId, isActive, loggedInUser) => {
    const user = await findById(userId);
    if(!user){
        throw new ApiError(
            STATUS_CODE.NOT_FOUND,
            "User not found"
        )
    }

    if(!isActive && user._id.toString() === loggedInUser._id.toString()){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "You cannot disable your own account"
        )
    }

    if(!isActive && user.role === ROLES.ADMIN){
        const activeAdmins = await countActiveAdmins();
        if(activeAdmins <= 1){
            throw new ApiError(
                STATUS_CODE.BAD_REQUEST,
                "cannot disable the last active admin"
            )
        }
    }

    if(!isActive){
        const hasLicenses = await hasActiveOrRenewalLicenses(userId);
        if(!hasLicenses){
            throw new ApiError(
                STATUS_CODE.BAD_REQUEST,
                "User have active or renewal license"
            )
        }
    }

    return updateUserStatus(userId, isActive);
}

module.exports = {updateUserStatusService};