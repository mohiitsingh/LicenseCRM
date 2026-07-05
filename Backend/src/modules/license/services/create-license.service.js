const ROLES = require("../../../common/constants/roles");
const ApiError = require("../../../common/errors/ApiError");

const {createLicense} = require("../repositories/license.repository");
const {findActiveUserById} = require("../../user/repositories/user.repository");
const {findActiveById, findActiveCityByState} = require("../../master/repositories/master.repository");

const {generateSequence} = require("../../counter/services/counter.service");

const resolveAssignedUser = async(loggedInUser, assignedTo) => {
    const assignedUserId = loggedInUser.role === ROLES.USER ? loggedInUser._id : assignedTo;
    if(!assignedUserId) throw new ApiError(404, "Assigned User is required");

    const user = await findActiveUserById(assignedUserId); 
    if(!user) throw new ApiError(404, "Assigned User not found");

    return user;
}

const validateMasterReferences = async ({
    stateId,
    cityId,
    licenseTypeId
}) => {
    const state = await findActiveById(stateId);
    if(!state) throw new ApiError(404, "Invalid state")
    
    const city = await findActiveCityByState(cityId, stateId);
    if(!city) throw new ApiError(404, "Invalid city")

    const licenseType = await findActiveById(licenseTypeId);
    if(!licenseType) throw new ApiError(404, "Invalid license type");

}

const validateDates = (creationDate, expirationDate) => {
    const created = new Date(creationDate);
    const expiry = new Date(expirationDate);
    if(expiry <= created) throw new ApiError(400, "Expiration date must be after creation date");
}

const createLicenseService = async(payload, loggedInUser) => {
    const {
        licenseName,
        licenseTypeId,
        stateId,
        cityId,
        assignedTo,
        creationDate,
        expirationDate,
        notes
    } = payload;

    // 1
    const user = await resolveAssignedUser(loggedInUser, assignedTo);

    // 2
    await validateMasterReferences(stateId, cityId, licenseTypeId);

    // 3
    validateDates(creationDate, expirationDate);

    // 4
    const licenseNumber = await generateSequence("LICENSE", "LIC");

    // 5
    return createLicense({
        licenseNumber,
        licenseName,
        licenseType: licenseTypeId,
        state: stateId,
        city: cityId,
        assignedTo: user._id,
        creationDate,
        expirationDate,
        notes,
        createBy: loggedInUser._id
    });
}

module.exports = {createLicenseService};