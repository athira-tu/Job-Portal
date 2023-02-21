const mongoose = require('mongoose');
const jobapplicationschema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    applicationdate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "applied"
    }
})

const jobapplicationmodel = mongoose.model('jobapplication', jobapplicationschema)

module.exports = jobapplicationmodel