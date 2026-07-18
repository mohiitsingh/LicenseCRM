const STATUS_CODE = require("../../../common/constants/statusCodes");
const ApiResponse = require("../../../common/responses/ApiResponse");

const {renewLicenseService} = require("../services/renewLicense.service");
const { updateLicense } = require("./update.license.controller");

const renewLicenseController = async(req, res, next) => {
    try {
        const updatedLicense = await renewLicenseService(
            req.params.licenseId,
            req.body,
            req.user
        );
        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                "License renewed successfully",
                updateLicense
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {renewLicenseController};