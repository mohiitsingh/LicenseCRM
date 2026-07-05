const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../user/models/user.model");
const env = require("../../../config/env");

const registerUser = async(data) => {
    const {name, email, password} = data;
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return user;
}

const loginUser = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Invalid credentials");
    }
    
    if(!user.isActive){
        throw new Error("User account is disabled");
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid){
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        env.jwtSecret,
        {
            expiresIn: env.jwtExpiration
        }
    );
    const newUser = user.toObject();
    delete newUser.password;
    return {token, newUser};
}

module.exports = {loginUser, registerUser};