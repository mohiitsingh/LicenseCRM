const {findMasters, findMasterById, createMaster, updateMaster} = require("../repositories/master.repository");

const getMasterService = async(type, parentId) =>{
    const filter = {
        isActive: true
    }

    if(type){
        filter.type = type
    }

    if(parentId){
        filter.parentId = parentId;
    }
    return findMasters(filter);
}

module.exports = {getMasterService};