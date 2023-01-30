const companymodels = require("../models/companymodels")
const bcrypt = require('bcrypt')
const rendersignup = function (req, res, next) {
    res.render('company/companysignup')
}
const dosignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await companymodels.create(req.body)
        res.send("success")
    } catch (error) {
        res.send(error)
    }
}
module.exports = { rendersignup, dosignup }