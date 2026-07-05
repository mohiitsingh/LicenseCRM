const Master = require("../models/master.model");

const findMasters = async(filter) => {
    return await Master.find(filter).sort({name: 1});
}

const findMasterById = async(id) => {
    return await Master.findById(id);
}

const createMaster = async(data) => {
    return await Master.create(data);
}

const updateMaster = async(id, data) => {
    return await Master.findByIdAndUpdate(id, data, {new: true})
}

const findActiveById = (id) => {
    return Master.findOne({
        _id: id,
        isActive: true
    })
}

const findActiveCityByState = async(cityId, stateId) => {
    return Master.findOne({
        _id: cityId,
        parentId: stateId,
        isActive: true
    })
}

module.exports = {findMasters, findMasterById, createMaster, updateMaster,findActiveById, findActiveCityByState};