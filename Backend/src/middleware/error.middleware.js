const ApiResponse = require("../common/responses/ApiResponse");

const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server error",
    });
}

module.exports = errorHandler;