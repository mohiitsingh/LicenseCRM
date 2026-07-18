const {calculateLicense} = require("../../../common/helpers/license.helper");

const mapLicenseResponse = (license) => {

    const expirationDate = new Date(license.expirationDate);
    const today = new Date();

    const daysRemaining = Math.ceil(
        (expirationDate - today)/ (1000 * 60 * 60 * 24)
    )

    return {

    id: license._id,

    licenseNumber: license.licenseNumber,

    licenseName: license.licenseName,

    licenseTypeId: license.licenseType._id,

    licenseTypeName: license.licenseType.name,

    stateId: license.state._id,

    stateName: license.state.name,

    cityId: license.city._id,

    cityName: license.city.name,

    assignedTo: license.assignedTo._id,

    assignedUserName:
        license.assignedTo.name,

    assignedUserEmail:
        license.assignedTo.email,

    creationDate:
        license.creationDate,

    expirationDate:
        license.expirationDate,

    status:
        calculateLicense(
            license.expirationDate
        ),
    daysRemaining,
    reminderDays: license.reminderDays,
    notes:
        license.notes

};
}

module.exports = {mapLicenseResponse};

/*
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
*/