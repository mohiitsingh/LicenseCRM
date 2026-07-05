const ApiError = require("../common/responses/ApiResponse");

const authorize = (...roles) => {
    return(req, res, next) => {
        if(!req.includes(req.user.role)){
            return next(
                new ApiError(403, "Forbidden")
            )
        }
        next();
    }
}

module.exports = {authorize};