const mongoose = require('mongoose');
const companySchemas = new mongoose.Schema({
    employerName: {
        type: String,
        maxLength: 30,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companytype: {
        type: String,
        required: true
    },
    about: {
        type: String,

    },
    address: {
        type: String
    },
    mission: {
        type: String
    },
    vision: {
        type: String
    }


})
const companymodels = mongoose.model('companysignup', companySchemas);
module.exports = companymodels