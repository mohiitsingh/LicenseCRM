const ROLES = require("../../../common/constants/roles");
const LICENSE_STATUS = require("../../../common/constants/licenseStatus");

const {findLicenses} = require("../repositories/license.repository");

const getLicenseService = async(query, loggedInUser) => {
    const {page=1, limit=10,search, stateId,cityId, licenseTypeId, status} = query;

    const filter = {
        isDeleted: false
    }

    if(loggedInUser.role === ROLES.USER){
        filter.assignedTo = loggedInUser._id;
    }

    if(search){
        filter.$or = [
            {
                licenseName: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                licenseNumber: {
                    $regex: search,
                    $options: "i"
                }
            }
        ]
    }

    if(stateId){
        filter.state = stateId;
    }

    if(cityId){
        filter.city = cityId;
    }

    if(licenseTypeId){
        filter.licenseType = licenseTypeId;
    }

    const today = new Date();
    const renewalDate = new Date();
    renewalDate.setDate(today.getDate() + 30);

    if(status === LICENSE_STATUS.ACTIVE){
        filter.expirationDate = {
            $gt: renewalDate
        };
    }

    if(status === LICENSE_STATUS.RENEWAL){
        filter.expirationDate = {
            $gte: renewalDate
        }
    }

    if(status === LICENSE_STATUS.EXPIRED){
        filter.expirationDate = {
            $lt: today
        }
    }

    const result = await findLicenses({
        filter,
        page:Number(page),
        limit: Number(limit)
    })

}

module.exports = {getLicenseService};