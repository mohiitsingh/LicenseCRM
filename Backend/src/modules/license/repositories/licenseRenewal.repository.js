const LicenseRenewal = require("../models/licenseRenewal.model");

const createLicenseRenewal = async(payload) => {
    return await LicenseRenewal.create(payload);
}

const getLicenseRenewals = async(licenseId) => {
    return await LicenseRenewal.find({licenseId})
        .populate("renewedBy", "firstName lastName email")
        .sort({createdAt: -1})
}

module.exports = {
    createLicenseRenewal,
    getLicenseRenewals
}