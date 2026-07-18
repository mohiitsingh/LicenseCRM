const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
    {
        licenseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "License",
            required: true,
            index: true
        },
        originalName: {
            type: String,
            required: true,
            trim: true
        },
        fileName: {
            type: String,
            requird: true
        },
        filePath: {
            type: String,
            required: true
        },
        mimeType: {
            type: String,
            required: true
        },
        fileSize: {
            type: Number,
            required: true
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        deletedAt: Date
    }, 
    {
        timestamps: true
    }
);

attachmentSchema.index({
    uploadedBy: 1
})

const Attachment = mongoose.model('Attachment', attachmentSchema);
module.exports = Attachment;