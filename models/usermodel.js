const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    userName: {
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
    workstatus: {
        type: String,
        required: true
    },
    about: {
        type: String,

    },
    qualification: {
        type: String,

    },
    skills: {
        type: String,

    },
    experience: {
        type: String,

    },

    jobcategory: {
        type: String,

    },
    language: {
        type: String,

    },
    updated: {
        type: Boolean,
        default: false
    }
})
const usermodel = mongoose.model('user', userSchemas);
module.exports = usermodel