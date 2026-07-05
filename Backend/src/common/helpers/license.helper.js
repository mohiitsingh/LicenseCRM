const LICENSE_STATUS = require("../constants/licenseStatus");

const calculateLicense = (expirationDate) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const renewal = new Date();

    renewal.setDate(today.getDate() + 30);

    if(expiry < today){
        return LICENSE_STATUS.EXPIRED;
    }

    if(expiry <= renewal){
        return LICENSE_STATUS.RENEWAL
    }
    
    return LICENSE_STATUS.ACTIVE;
}

module.exports = {calculateLicense};