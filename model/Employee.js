const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
})

//in MomgoDB will set Employee to employees
module.exports = mongoose.model('Employee', employeeSchema)