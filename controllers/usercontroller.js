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
        }


    } else {
        res.redirect("/login")
    }
}






module.exports = { renderindexpage, renderlogin, renderhome, rendersignup, dosignup, doLogin }