const jobmodels = require("../models/jobmodels")
const bcrypt = require('bcrypt')

const renderjob = function (req, res, next) {
    res.render('company/addjob')

}
const doaddjob = function (req, res, next) {
    if (req.session.company) {
        res.render('company/addjob')
    } else {
        res.redirect('/company/login')
    }
}
module.exports = { renderjob, doaddjob }