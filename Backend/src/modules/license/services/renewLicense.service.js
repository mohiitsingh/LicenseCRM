const ApiError = require("../../../common/errors/ApiError");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const {validateLicenseAccess} = require("../../../common/helpers/validateLicenseAccess.helper");

const {createLicenseRenewal} = require("../repositories/licenseRenewal.repository");
const {updateLicenseExpiryDate} = require("../repositories/license.repository");

const renewLicenseService = async(licneseId, renewalData, loggedInUser) => {
    const license = await validateLicenseAccess(licenseId, loggedInUser);

    const {
        renewedExpiryDate,
        renewalCost,
        vendor,
        remarks
    } = renewalData;

    if(new Date(renewedExpiryDate) <= new Date(license.expirationDate)){
        throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            "Renewed expiry date must be greater than current expiry date."
        )
    }

    await createLicenseRenewal({
        licenseId,
        previousExpiryDate: license.expiryDate,
        renewedExpiryDate,
        renewalCost,
        vendor,
        remarks,
        renewedBy: loggedInUser._id
    });

    return await updateLicenseExpiryDate(licenseId, renewedExpiryDate);
}

module.exports = {renewLicenseService};