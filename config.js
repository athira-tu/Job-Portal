const mongoose = require('mongoose');
async function connectdb() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect("mongodb+srv://athira-tu:123@cluster0.vgoxwy1.mongodb.net/job-portal?retryWrites=true&w=majority")
        console.log("db connected");
    } catch (error) {
        console.log("db error");
    }
}


module.exports = connectdb