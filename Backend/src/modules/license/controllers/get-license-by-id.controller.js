const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {getLicenseByIdService} = require("../services/get-license-by-id.service");

const getLicenseById = async(req, res, next) => {
    try {
        const data = await getLicenseByIdService(req.params.id, req.user);
        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                "License fetched successfully",
                data
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {getLicenseById};