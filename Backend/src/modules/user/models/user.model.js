const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlenght: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum : ["ADMIN", "COORDINATOR", "USER"],
            default: "USER"
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    }, 
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;