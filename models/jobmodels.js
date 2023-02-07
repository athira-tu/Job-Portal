const mongoose = require('mongoose');

const jobSchemas = new mongoose.Schema({
    title: {
        type: String,

        required: true
    },
    description: {
        type: String,

        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    vaccancy: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true
    },



    lastdate: {
        type: String,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "posted"
    },
    companyid: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    dateposted: {
        type: String,
        required: true
    }

})
const jobmodels = mongoose.model('job', jobSchemas);
module.exports = jobmodels
