const {validateLicenseAccess} = require("../../../common/helpers/validateLicenseAccess.helper");
const {validateAttachment} = require("../../../common/helpers/validateAttachment.helper");

const previewAttachmentService = async(licenseId, attachmentId, loggedInUser) => {
    await validateLicenseAccess(licenseId, loggedInUser);
    const attachment = await validateAttachment(attachmentId, licenseId);

    return attachment;
}

module.exports = {previewAttachmentService};
