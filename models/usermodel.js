const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({ userName: { type: String, maxLength: 30 }, email: { type: String }, phoneNumber: { type: String }, password: { type: String }, workstatus: { type: String } })
const usermodel = mongoose.model('signup', userSchemas);
module.exports = usermodel