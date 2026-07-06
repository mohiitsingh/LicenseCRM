const User = require("../models/user.model");

const findUsers = async (filter, skip, limit) => {
  return User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

const countUsers = async (filter) => {
  return await User.countDocuments(filter);
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (data) => {
  return User.create(data);
};

const findById = (id) => {
  return User.findById(id);
};

const findActiveUserById = (id) => {
  return User.findOne({ _id: id, isActive: true });
};

const updateUserStatus = (userId, isActive) => {
  return User.findByIdAndUpdate(
    userId,
    {
      isActive,
    },
    {
      new: true,
    },
  ).select("-password");
};

const countActiveAdmins = () => {
    return User.countDocuments({
        role: "ADMIN",
        isActive: true
    })
}

module.exports = {
  createUser,
  findUserByEmail,
  countUsers,
  findUsers,
  findById,
  findActiveUserById,
  updateUserStatus,
  countActiveAdmins
};
