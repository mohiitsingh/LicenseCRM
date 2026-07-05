const Counter = require("../models/counter.model");

const incrementSequence = async(name) => {
    return Counter.findOneAndUpdate(
        {name},
        {
            $inc: {
                sequence: 1
            }
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }
    )
}

module.exports = {incrementSequence};