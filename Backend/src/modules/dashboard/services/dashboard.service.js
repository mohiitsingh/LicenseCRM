const ROLES = require("../../../common/constants/roles");
const LICENSE_STATUS = require("../../../common/constants/licenseStatus");

const {countLicense, findRecentLicenses} = require("../../license/repositories/license.repository");
const {buildStatusFilter} = require("../../../common/helpers/license-query.helper");
const {mapLicenseResponse} = require("../../license/mappers/license.mapper");

const getDashboardService = async(loggedInUser) => {
    const baseFilter = {
        isDeleted: false
    }
    if(loggedInUser.role === ROLES.USER){
        baseFilter.assignedTo = loggedInUser._id;
    }
    const [
        total,
        active,
        renewal,
        expired,
        recentLicenses
    ] = await Promise.all([
        countLicense(baseFilter),
        countLicense({...baseFilter, ...baseFilter(LICENSE_STATUS.ACTIVE)}),
        countLicense({...baseFilter, ...baseFilter(LICENSE_STATUS.RENEWAL)}),
        countLicense({...baseFilter, ...baseFilter(LICENSE_STATUS.EXPIRED)}),
        findRecentLicenses(baseFilter, 10)
    ])

    return {
        cards: {
            total,
            active,
            renewal,
            expired
        },
        recentLicenses: recentLicenses.map(mapLicenseResponse)
    }
}

module.exports = {getDashboardService};