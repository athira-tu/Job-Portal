const express = require('express');

const { viewalljobs } = require('../controllers/jobcontrollers');
const { renderindexpage, renderlogin, renderhome, rendersignup, dosignup, doLogin, updateuser, doupdate, viewprofile, applyjob, viewuserapplication, dologout, vieweditprofile, doedit } = require('../controllers/usercontroller');

var router = express.Router();
const useronly = require('../middleware/useronly')

/* GET home page. */
router.get('/', renderindexpage);
router.get('/login', renderlogin);
router.get('/home', renderhome)
router.get('/signup', rendersignup)
router.post('/signup', dosignup)
router.post('/login', doLogin)
router.get('/viewalljobs', viewalljobs)
router.get('/updateuser', updateuser)
router.post('/updateuser', useronly, doupdate)
router.get('/viewprofile', useronly, viewprofile)
router.get('/applyjob/:id', useronly, applyjob)
router.get('/viewuserapplication', useronly, viewuserapplication)
router.get('/logout', useronly, dologout)
router.get('/editprofile', useronly, vieweditprofile)
router.post('/editprofile', useronly, doedit)



module.exports = router;
