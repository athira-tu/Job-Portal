const express = require('express');

const { viewalljobs } = require('../controllers/jobcontrollers');
const { renderindexpage, renderlogin, renderhome, rendersignup, dosignup, doLogin, updateuser, doupdate, viewprofile } = require('../controllers/usercontroller');

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



module.exports = router;
