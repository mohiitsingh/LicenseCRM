const mongoose = require("mongoose");

const licenseRenewalSchema = new mongoose.Schema(
    {
        licenseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "License",
            required: true,
            index: true
        },
        previousExpiryDate: {
            type: Date,
            required: true
        },
        renewalCost: {
            type: Number,
            default: 0
        },
        vendor: {
            type: String,
            trim: true
        },
        remarks: {
            type: String,
            trim: true
        },
        renewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

licenseRenewalSchema.index({
    licenseId: 1,
    createdAt: -1
});

module.exports = mongoose.model("LicenseRenewal", licenseRenewalSchema);