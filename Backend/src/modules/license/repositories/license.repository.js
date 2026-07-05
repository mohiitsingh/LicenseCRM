const License = require("../models/license.model");

const saveLicense = (data) => {
    return License.save(data);
}

const findLicenseByNumber = (number) => {
    return License.findOne({licenseNumber:number, isDeleted: false})
}

const createLicense = (data) => {
    return License.create(data);
}

const findLicenseId = (id) => {
    return License.findById(id);
}

const findLicenses = async(filter, page, limit) => {
    const skip = (page - 1) * limit;

    const[licenses, totalRecords] = await Promise.all([
        License.find(filter)
            .populate("assignedTo", "name email")
            .populate("state", "name")
            .populate("city", "name")
            .populate("licenseType", "name")
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit),
        License.countDocuments(filter)
    ])
    return {licenses, totalRecords};
}

const findLicenseById = async(id) => {
    return License.findOne({
        _id: id,
        isDeleted: false
    }).populate("assignedTo", "name email role")
    .populate("state", "name")
    .populate("city", "name")
    .populate("licenseType", "name");
}

module.exports = {saveLicense, findLicenseByNumber, createLicense, findLicenseId, findLicenses, findLicenseById};