const LICENSE_STATUS = require("../constants/licenseStatus");

const buildStatusFilter = (status) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const renewal = new Date(today);
    renewal.setDate(renewal.getDate() + 30);
    
    switch(status){
        case LICENSE_STATUS.ACTIVE: 
            return{
                expirationDate: {
                    $gt: renewalDate
                }
            }
        case LICENSE_STATUS.RENEWAL:
            return {
                expirationDate: {
                    $gte: today,
                    $lte: renewal
                }
            }
        case LICENSE_STATUS.EXPIRED: 
            return {
                expirationDate: {
                    $lt: today
                }
            }
        default: 
            return {}
    }
    
}

module.exports = {buildStatusFilter};