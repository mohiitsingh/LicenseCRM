const User = require("../models/user.model");
const {createUser, findUserByEmail, countUsers, findUsers} = require("../repositories/user.repository");

const getUser = async (query) => {
  const { page = 1, limit = 10, search = "", role = isActive } = query;
  const filter = {};
  // Search by Name or Email
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

//   filter by role
  if(isActive !== undefined){
    filter.isActive = isActive === 'true';
  }

  const skip = Number(page -1) * Number(limit);
  const [users, totalRecords] = await Promise.all([
    // User.find(filter)
    // .select("-password")
    // .sort({createdAt:-1})
    // .skip(skip)
    // .limit(Number(limit)),
    findUsers(filter, skip, limit),
    // User.countDocuments(filter)
    countUsers(filter)
  ]);

  return {
    users,
    pagination: {
        page: Number(page),
        limit: Number(limit),
        totalRecords,
        totalPages: Math.ceil(totalRecords/limit)
    }
  }
};

const getUserDropdown = async(search="") => {
  const filter = {
    isActive: true
  }
  
  if(search){
    filter.name = {
      $regex: search,
      $options: "i"
    }
  }
  return User.find(filter)
    .select("_id")
    .sort({name:1})
    .limit(20);
}


module.exports = {getUser, getUserDropdown};