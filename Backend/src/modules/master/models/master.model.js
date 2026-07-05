const mongoose = require("mongoose");
const MASTER_TYPES = require("../../../common/constants/masterTypes");

const masterSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: Object.values(MASTER_TYPES),
            required: true
        },
        code: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MASTER",
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

masterSchema.index(
    {type: 1, name: 1, parentId: 1},
    {unique: true}
);

const Master = mongoose.model("Master", masterSchema);
module.exports = Master;