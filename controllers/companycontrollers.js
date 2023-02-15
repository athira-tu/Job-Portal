const companymodels = require("../models/companymodels")
const bcrypt = require('bcrypt')

const rendersignup = function (req, res, next) {
    res.render('company/companysignup')
}
const renderhome = function (req, res, next) {
    res.render('company/companyhome')

}
const dosignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await companymodels.create(req.body)
        res.redirect('/company/login')
    } catch (error) {
        res.send(error)
    }
}
const renderlogin = function (req, res, next) {
    res.render('company/companylogin')
}

const doLogin = async function (req, res, next) {
    const employer = await companymodels.findOne({ email: req.body.email })
    if (employer) {
        const existEmployer = await bcrypt.compare(req.body.password, employer.password)
        if (existEmployer) {
            req.session.employer = employer
            res.redirect('/company/home')
        } else {
            res.redirect("/company/login")
        }


    } else {
        res.redirect("/company/companylogin")
    }
}
const updateprofile = function (req, res, next) {
    res.render('company/updateprofile')
}
const doupdate = async function (req, res, next) {
    console.log(req.body)
    await companymodels.findOneAndUpdate({ email: req.session.employer.email }, req.body)
    await req.files.image.mv(`./public/company/${req.session.employer._id}.jpg`)

}


const viewprofile = async function (req, res, next) {
    const profile = await companymodels.findOne({ email: req.session.employer.email })
    res.render('company/viewprofile', { profile })
}

module.exports = { rendersignup, dosignup, renderlogin, doLogin, renderhome, updateprofile, doupdate, viewprofile }