const ApiResponse = require("../../../common/responses/ApiResponse");
const {getUser, getUserDropdown} = require("../services/user.service");

// const profile = async(req, res) => {
//     return res.json(
//         new ApiResponse(200, "Profile fetched", req.user)
//     )
// }

// module.exports = {profile};

const getAllUsers = async(req, res, next) => {
    try {
        const filters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: req.query.search || "",
            role: req.query.role,
            isActive: req.query.isActive
        }
        const result = await getUser(req.query);
        return res.status(200).json(
            new ApiResponse(
                200,
                "User fetched successfully",
                result
            )
        )
    } catch (error) {
        next(error);
    }
}

const userDropdown = async(req, res, next) => {
    try {
        const search = req.query.search || "";
        const users = await getUserDropdown(search);
        return res.status(200).json(
            new ApiResponse(
                200,
                "User fetched successfully",
                users
            )
        )
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers, userDropdown};