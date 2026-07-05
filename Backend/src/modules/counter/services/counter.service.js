const {incrementSequence} = require("../repositories/counter.repository");

const generateSequence = async(
    counterName,
    prefix,
    padding = 6
) => {
    const counter = await incrementSequence(counterName);
    return `${prefix}${counter.sequence.toString().padStart(padding, "0")}`;
}

module.exports = {generateSequence};