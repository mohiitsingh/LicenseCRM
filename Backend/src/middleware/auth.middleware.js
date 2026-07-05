const jwt = require("jsonwebtoken");
const User = require("../modules/user/models/user.model");
const ApiResponse = require("../common/responses/ApiResponse");
const env = require("../config/env");

const authenticate = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new ApiError(401, "Unauthorized");
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, env.jwtSecret);

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            throw new ApiError(401, "User not found");
        }
        if(!user.isActive){
            throw new Error(403, "User disabled");
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {authenticate};