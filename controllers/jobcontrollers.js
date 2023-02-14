const jobmodels = require("../models/jobmodels")
const bcrypt = require('bcrypt')
const usermodel = require("../models/usermodel")

const renderjob = function (req, res, next) {
    res.render('company/addjob')

}
const doaddjob = async function (req, res, next) {
    if (req.session.employer) {

        req.body.companyid = req.session.employer._id
        req.body.companyname = req.session.employer.employerName
        req.body.dateposted = new Date().toDateString()
        // console.log(req.body);
        await jobmodels.create(req.body)
        res.redirect('/company/home')
    } else {
        res.redirect('/company/login')
    }
}
const companyjobview = async (req, res, next) => {
    if (req.session.employer) {
        let jobs = await jobmodels.find({ companyid: req.session.employer._id })
        console.log("jobs", jobs);
        res.render("company/viewjobs", { jobs })

    } else {
        res.redirect('/company/login')
    }
}
const viewalljobs = async function (req, res, next) {
    let jobs = await jobmodels.find({ status: 'posted' })
    res.render('user/viewalljobs', { jobs })
}
module.exports = { renderjob, doaddjob, companyjobview, viewalljobs }