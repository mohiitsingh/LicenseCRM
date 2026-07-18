const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema(
    {
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        licenseName: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Master",
            required: true
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Master",
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        pdfUrl: {
            type: String,
            // required: true
        },
        notes: {
            type: String,
            default: ""
        },
        creationDate: {
            type: Date,
            required: true
        },
        expirationDate: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
        department: {
            type: String,
        },
        vendor: {
            type: String
        },
        reminderDays: {
            type: Number,
            default: 30
        },
        cost: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: "INR"
        }
    },
    {
        timestamps: true
    }
);

// search
licenseSchema.index({licenseNumber: 1}, {unique: true});
licenseSchema.index({licenseName: 1});

// filter
licenseSchema.index({assignedTo: 1});
licenseSchema.index({state: 1});
licenseSchema.index({city: 1});
licenseSchema.index({licenseType: 1});

// expiry
licenseSchema.index({expirationDate: 1});

// soft delete
licenseSchema.index({isDeleted: 1});

// sorting
licenseSchema.index({createdAt: -1});

// compound index 
licenseSchema.index({
    assignedTo: 1,
    isDeleted: 1,
    createdAt: -1
});

const License = mongoose.model("License", licenseSchema);
module.exports = License;