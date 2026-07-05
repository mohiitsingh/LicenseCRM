const ROLES = require('../constants/roles');

const canAccessLicense = (license, user) => {
    if(user.role !== ROLES.USER){
        return true
    }

    return(
        license.assignedTo._id.toString() === user._id.toString()
    )
}

module.exports = {canAccessLicense};