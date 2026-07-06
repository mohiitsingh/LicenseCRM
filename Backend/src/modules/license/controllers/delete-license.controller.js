const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {deleteLicenseService} = require("../services/delete-license.service");

const deleteLicense = async(req, res, next) => {
    try {
        await deleteLicenseService(req.params.id, req.user);
        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                "License deleted successfully"
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {deleteLicense};