const usermodel = require("../models/usermodel");
const taskmodel = require("../models/usermodel")
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
        let data = await usermodel.create(req.body)
        res.send("success")
    } catch (error) {
        res.send("error")
    }
}






module.exports = { renderindexpage, renderlogin, renderhome, rendersignup, dosignup }