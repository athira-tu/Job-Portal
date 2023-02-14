var express = require('express');
const { rendersignup, dosignup, renderlogin, renderhome, doLogin, updateprofile, doupdate } = require('../controllers/companycontrollers');
const { renderjob, doaddjob, companyjobview } = require('../controllers/jobcontrollers');

var router = express.Router();

router.get('/home', renderhome)
router.get('/signup', rendersignup)
router.post('/signup', dosignup)
router.get('/login', renderlogin)
router.post('/login', doLogin)
router.get('/addjob', renderjob)
router.post('/addjob', doaddjob)
router.get('/viewjob', companyjobview)
router.get('/updateprofile', updateprofile)
router.post('/updateprofile', doupdate)


module.exports = router;
