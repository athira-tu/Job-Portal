const usermodel = require("../models/usermodel");
const jobapplicationmodel = require("../models/jobapplicationmodel")
const bcrypt = require('bcrypt');
const jobmodels = require("../models/jobmodels");
const renderindexpage = function (req, res, next) {
    res.render('index', { title: 'express' });
}
const renderlogin = function (req, res, next) {
    res.render('user/login', { name: 'athira', data: { id: '234', value: 'true' } });
}

const renderhome = function (req, res, next) {
    if (req.session.user) {
        res.render('user/home', { user: req.session.user })
    } else {
        res.redirect('/login')
    }
}
const rendersignup = function (req, res, next) {
    if (req.session.alertMsg) {
        let { alertMsg } = req.session

        res.render('user/signup', { alertMsg })
    } else {
        res.render('user/signup')
    }
}
const dosignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await usermodel.create(req.body)
        res.redirect("/login")
    } catch (error) {
        console.log("error");
        req.session.alertMsg = "signup failed retry"
        res.redirect('/signup')
    }
}
const doLogin = async function (req, res, next) {


    const user = await usermodel.findOne({ email: req.body.email })
    if (user) {
        existUser = await bcrypt.compare(req.body.password, user.password)
        if (existUser) {
            req.session.user = user
            res.redirect('/home')
        } else {
            res.redirect("/login")
            console.log("hello");
        }


    } else {
        res.redirect("/login")
        console.log("hi");
    }
}
const updateuser = function (req, res, next) {
    res.render('user/updateuser')
}
const doupdate = async function (req, res, next) {

    console.log(req.body);
    req.body.language = req.body.language.join(" , ")


    await usermodel.findOneAndUpdate({ email: req.session.user.email }, req.body)
    await req.files.image.mv(`./public/user/${req.session.user._id}.jpg`)
    await req.files.resume.mv(`./public/user/resume/${req.session.user._id}.pdf`)


}
const viewprofile = async function (req, res, next) {

    const profile = await usermodel.findOne({ email: req.session.user.email })
    res.render('user/viewprofile', { profile })



}

const applyjob = async function (req, res, next) {
    const job = await jobmodels.findOne({ _id: req.params.id })
    let body = {
        userId: req.session.user._id,
        userName: req.session.user.userName,
        jobId: job._id,
        jobTitle: job.title,
        companyId: job.companyid,
        companyName: job.companyname,
        applicationdate: new Date().toLocaleDateString()

    }
    console.log(body)
    let application = await jobapplicationmodel.create(body)
    res.redirect("/home")
}

const viewuserapplication = async function (req, res, next) {
    const applications = await jobapplicationmodel.find({ userId: req.session.user._id })
    res.render('user/viewuserapplication', { applications })
}

const dologout = async function (req, res, next) {
    delete req.session.user
    res.redirect('/login')
}

const vieweditprofile = async function (req, res, next) {
    const editprofile = await usermodel.findOne({ email: req.session.user.email })
    res.render('user/editprofile', { editprofile })
}

const doedit = async function (req, res, next) {
    const edit = await usermodel.findOneAndUpdate({ email: req.session.user.email }, req.body)
    res.redirect('/viewprofile')
}

module.exports = { renderindexpage, renderlogin, renderhome, rendersignup, dosignup, doLogin, updateuser, doupdate, viewprofile, applyjob, viewuserapplication, dologout, vieweditprofile, doedit }