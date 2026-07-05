const {loginUser, registerUser} = require("../services/auth.service");
const ApiResponse = require("../../../common/responses/ApiResponse");

const register = async(req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const user = await registerUser(name, email, password);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data : {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        next(error);
    }
}

const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const result = await loginUser(email, password);
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {login, register};