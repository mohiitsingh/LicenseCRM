const ApiResponse = require("../../../common/responses/ApiResponse");
const STATUS_CODE = require("../../../common/constants/statusCodes");
const {updateUserStatusService} = require("../services/user-status.service");

const updateUserStaus = async(req, res, next) => {
    try {
        const user = await updateUserStatusService(
            req.params.id,
            req.body.isActive,
            req.user
        );
        return res.status(STATUS_CODE.OK).json(
            new ApiResponse(
                STATUS_CODE.OK,
                "user status updated successfully",
                user
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {updateUserStaus};