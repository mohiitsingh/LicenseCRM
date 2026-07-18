const License = require("../models/license.model");

const saveLicense = (data) => {
  return License.save(data);
};

const findLicenseByNumber = (number) => {
  return License.findOne({ licenseNumber: number, isDeleted: false });
};

const createLicense = (data) => {
  return License.create(data);
};

const findLicenseId = (id) => {
  return License.findById(id);
};

const findLicenses = async (filter, page, limit) => {
  const skip = (page - 1) * limit;

  const [licenses, totalRecords] = await Promise.all([
    License.find(filter)
      .populate("assignedTo", "name email")
      .populate("state", "name")
      .populate("city", "name")
      .populate("licenseType", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    License.countDocuments(filter),
  ]);
  return { licenses, totalRecords };
};

const findLicenseById = async (id) => {
  return License.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("assignedTo", "name email role")
    .populate("state", "name")
    .populate("city", "name")
    .populate("licenseType", "name");
};

const updateLicenseById = async (id, payload) => {
  return License.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const updateLicense = async(id, payload) => {
    return License.findByIdAndUpdate(id, payload, {
        new: true, 
        runValidators: true
    }).populate("assignedTo", "name email")
    .populate("state", "name")
    .populate("city", "name")
    .populate("licenseType", "name")
};

const softDeleteLicense = async(id, updatedBy) => {
    return License.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            deletedAt: new Date(),
            updatedBy
        },
        {
            new: true
        }
    )
}

const hasActiveOrRenewalLicenses = async(userId) => {
    return License.exists({
        assignedTo: userId,
        isDeleted: false,
        expirationDate: {
            $gte: new Date()
        }
    })
};

const countLicense = (filter) => {
  return License.countDocuments(filter);
}

const findRecentLicenses = (filter, limit=10) => {
  return License.find(filter)
    .populate("assignedTo", "name")
    .populate("state", "name")
    .populate("city", "name")
    .populate("licenseType", "name")
    .sort({createdAt: -1})
    .limit(limit)
}

const updateLicenseExpiryDate = async(licenseId, renewedExpiryDate) => {
  return await License.findByIdAndUpdate(
    licenseId,
    {
      expiryDate: renewedExpiryDate
    },
    {
      new: true
    }
  )
}

module.exports = {
  saveLicense,
  findLicenseByNumber,
  createLicense,
  findLicenseId,
  findLicenses,
  findLicenseById,
  updateLicenseById,
  updateLicense,
  softDeleteLicense,
  hasActiveOrRenewalLicenses,
  countLicense,
  findRecentLicenses,
  updateLicenseExpiryDate
};
