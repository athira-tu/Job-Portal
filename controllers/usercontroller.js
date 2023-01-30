const usermodel = require("../models/usermodel");
const taskmodel = require("../models/usermodel")
const bcrypt = require('bcrypt')
const renderindexpage = function (req, res, next) {
    res.render('index', { title: 'express' });
}
const renderlogin = function (req, res, next) {
    res.render('user/login', { name: 'athira', data: { id: '234', value: 'true' } });
}

const renderhome = function (req, res, next) {
    res.render('user/home')
}
const rendersignup = function (req, res, next) {
    res.render('user/signup')
}
const dosignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await usermodel.create(req.body)
        res.redirect("/login")
    } catch (error) {
        res.send("error")
    }
}






module.exports = { renderindexpage, renderlogin, renderhome, rendersignup, dosignup }