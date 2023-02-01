var express = require('express');
const { rendersignup, dosignup, renderlogin, renderhome, doLogin } = require('../controllers/companycontrollers');

var router = express.Router();

router.get('/home', renderhome)
router.get('/signup', rendersignup)
router.post('/signup', dosignup)
router.get('/login', renderlogin)
router.post('/login', doLogin)


module.exports = router;
