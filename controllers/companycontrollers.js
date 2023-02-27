const companymodels = require("../models/companymodels")
const bcrypt = require('bcrypt')
const jobapplicationmodel = require("../models/jobapplicationmodel")
const usermodel = require("../models/usermodel")

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
        res.redirect("/company/login")
    }
}
const updateprofile = function (req, res, next) {
    res.render('company/updateprofile')
}
const doupdate = async function (req, res, next) {
    console.log(req.body)
    await companymodels.findOneAndUpdate({ email: req.session.employer.email }, req.body)
    await req.files.image.mv(`./public/company/${req.session.employer._id}.jpg`)
    res.redirect('/company/viewprofile')

}


const viewprofile = async function (req, res, next) {
    const profile = await companymodels.findOne({ email: req.session.employer.email })
    res.render('company/viewprofile', { profile })
}

const viewcompanyjob = async function (req, res, next) {
    const jobs = await jobapplicationmodel.find({ companyId: req.session.employer._id })
    // console.log(jobs);
    let appliedjob = jobs.filter((x) => x.status == "applied")
    let acceptedjob = jobs.filter((x) => x.status == "accepted")
    let rejectedjob = jobs.filter((x) => x.status == "rejected")
    console.log(acceptedjob)
    res.render('company/viewcompanyjobs', { jobs, appliedjob, acceptedjob, rejectedjob })
}

const viewuserprofile = async function (req, res, next) {
    const userprofile = await usermodel.findOne({ _id: req.params.id })
    console.log(userprofile);
    res.render('company/viewuserprofile', { userprofile })
}

const acceptprofile = async function (req, res, next) {
    const accept = await jobapplicationmodel.findOneAndUpdate({ _id: req.params.id }, { status: "accepted" })
    console.log(accept);
    res.redirect('/company/viewcompanyjobs')
}
const rejectprofile = async function (req, res, next) {
    const reject = await jobapplicationmodel.findOneAndUpdate({ _id: req.params.id }, { status: "rejected" })
    res.redirect('/company/viewcompanyjobs')
}

const doLogout = async function (req, res, next) {
    delete req.session.employer
    res.redirect('/company/login')
}

const vieweditcompanyprofile = async function (req, res, next) {
    const edit = await companymodels.findOne({ email: req.session.employer.email })
    res.render('company/editcompanyprofile', { edit })
}

const doeditcompanyprofile = async function (req, res, next) {
    await companymodels.findOneAndUpdate({ email: req.session.employer.email }, req.body)
    res.redirect('/company/viewprofile')
}


module.exports = { rendersignup, dosignup, renderlogin, doLogin, renderhome, updateprofile, doupdate, viewprofile, viewcompanyjob, viewuserprofile, acceptprofile, rejectprofile, doLogout, vieweditcompanyprofile, doeditcompanyprofile }