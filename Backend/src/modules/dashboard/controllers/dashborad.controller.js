const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");

const {getDashboardService} = require("../services/dashboard.service");

const getDashboard = async(req, res, next) => {
    try {
        const dashboard = await getDashboardService(req.user);
        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                "Dashboard fetched successfully",
                dashboard
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {getDashboard};