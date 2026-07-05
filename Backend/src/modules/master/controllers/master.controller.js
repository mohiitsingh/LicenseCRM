const ApiResponse = require("../../../common/responses/ApiResponse");
const {getMasterService} = require("../services/master.service");

const getMasters = async(req, res, next) => {
    try {
        const masters = await getMasterService(req.query);
        return res.json(
            new ApiResponse(
                200,
                "Master data fetched",
                masters
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {getMasters};