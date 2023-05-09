const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        type: [String],
        default: undefined
    }
})

//in MomgoDB will set State to states
module.exports = mongoose.model('State', stateSchema)