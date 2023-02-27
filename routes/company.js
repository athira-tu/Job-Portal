var express = require('express');
const { rendersignup, dosignup, renderlogin, renderhome, doLogin, updateprofile, doupdate, viewprofile, viewcompanyjob, viewuserprofile, acceptprofile, rejectprofile, doLogout, vieweditcompanyprofile, doeditcompanyprofile } = require('../controllers/companycontrollers');
const { renderjob, doaddjob, companyjobview, deletejob, edit, editjob } = require('../controllers/jobcontrollers');
const companyonly = require('../middleware/companyonly');


var router = express.Router();

router.get('/home', companyonly, renderhome)
router.get('/signup', rendersignup)
router.post('/signup', dosignup)
router.get('/login', renderlogin)
router.post('/login', doLogin)
router.get('/addjob', renderjob)
router.post('/addjob', doaddjob)
router.get('/viewjobs', companyjobview)
router.get('/updateprofile', updateprofile)
router.post('/updateprofile', companyonly, doupdate)
router.get('/viewprofile', companyonly, viewprofile)
router.post('/viewprofile', companyonly, viewprofile)
router.get('/viewcompanyjobs', companyonly, viewcompanyjob)
router.get('/viewuserprofiles/:id', companyonly, viewuserprofile)
router.get('/acceptprofile/:id', companyonly, acceptprofile)
router.get('/rejectprofile/:id', companyonly, rejectprofile)
router.get('/logout', doLogout)
router.get('/delete/:id', companyonly, deletejob)
router.get('/editjob/:id', companyonly, edit)
router.post('/editjob/:id', companyonly, editjob)
router.get('/editcompanyprofile', companyonly, vieweditcompanyprofile)
router.post('/editcompanyprofile', companyonly, doeditcompanyprofile)
module.exports = router;
