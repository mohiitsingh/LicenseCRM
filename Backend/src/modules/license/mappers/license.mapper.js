const {calculateLicense} = require("../../../common/helpers/license.helper");

const mapLicenseResponse = (license) => {
    return {
        id: license._id,
        licenseNumber: license.licenseNumber,
        licenseName: license.licenseName,
        licenseType: {
            id: license.licenseType._id,
            name: license.licenseType.name
        },
        state: {
            id: license.state._id,
            name: license.state.name
        },
        city: {
            id: license.city._id,
            name: license.city.name
        },
        assignedTo: {
            id: license.assignedTo._id,
            name: license.assignedTo.name,
            email: license.assignedTo.email
        },
        creationDate: license.creationDate,
        expirationDate: license.expirationDate,
        status: calculateLicense(license.expirationDate),
        notes: license.notes
    }
}

module.exports = {mapLicenseResponse};