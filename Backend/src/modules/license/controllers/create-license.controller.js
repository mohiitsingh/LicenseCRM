const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const MESSAGES = require("../../../common/constants/message");

const {createLicenseService} = require("../services/create-license.service");

const createLicense = async(req, res, next) => {
    try {
        const license = await createLicenseService(req.body, req.user);
        return res.status(STATUS_CODE.CREATED).json(
            new ApiResponse(STATUS_CODE.CREATED, MESSAGES.LICENSE_CREATED, {
                id: license._id,
                licenseNumber: license.licenseNumber
            })
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {createLicense};