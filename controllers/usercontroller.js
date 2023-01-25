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






module.exports = { renderindexpage, renderlogin, renderhome, rendersignup }