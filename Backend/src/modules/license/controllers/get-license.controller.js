const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const MESSAGES = require("../../../common/constants/message");

const {getLicenseService} = require("../services/get-license.service");

const getLicenses = async(req, res, next) => {
    try {
        const data = await getLicenseService(req.query, req.user);
        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                MESSAGES.LICENSE_FETCHED,
                data
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {getLicenses};
