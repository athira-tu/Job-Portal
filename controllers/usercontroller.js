const usermodel = require("../models/usermodel");

const bcrypt = require('bcrypt')
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
    await req.files.resume.mv(`./public/resume/${req.session.user._id}.pdf`)


}
const viewprofile = async function (req, res, next) {

    const profile = await usermodel.findOne({ email: req.session.user.email })
    res.render('user/viewprofile', { profile })



}






module.exports = { renderindexpage, renderlogin, renderhome, rendersignup, dosignup, doLogin, updateuser, doupdate, viewprofile }