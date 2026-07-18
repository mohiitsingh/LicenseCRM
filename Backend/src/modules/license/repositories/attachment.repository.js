const Attachment = require("../models/attachment.model");


const createAttachments = async(attachments) => {
    return Attachment.insertMany(attachments);
}

const findAttachmentsByLicenseId = async(licenseId) => {
    return Attachment.find({licenseId, isDeleted: false})
        .populate("uploadedBy", "firstName lastName email")
        .sort({createdAt: -1});
}

const findAttachmentById = async(attachmentId) => {
    return Attachment.findById(attachmentId);
}

const deleteAttachment = async(attachmentId) => {
    return Attachment.findByIdAndDelete(attachmentId);
}

const softDeleteAttachment = async(attachmentId, loggedInUser) => {
    return await Attachment.findByIdAndUpdate(
        attachmentId,
        {
            isDeleted: true,
            deletedAt: new Date(),
            deletedBy: loggedInUser
        },
        {
            new: true
        }
    )
}

module.exports = {
    createAttachments,
    findAttachmentById,
    findAttachmentsByLicenseId,
    deleteAttachment,
    softDeleteAttachment
}