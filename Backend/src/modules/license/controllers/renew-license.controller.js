const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {renewLicenseService} = require("../services/renew-license.service");

const renewLicense = async(req, res, next) => {
    try {
        const data = await renewLicenseService(req.params.id, req.body, req.user);
        return res.status(STATUS_CODE.OK).json(
            STATUS_CODE.OK,
            "License renewed successfully",
            data
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {renewLicense};