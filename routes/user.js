var express = require('express');
const { renderindexpage, renderlogin, renderhome, rendersignup, dosignup, doLogin } = require('../controllers/usercontroller');
var router = express.Router();

/* GET home page. */
router.get('/', renderindexpage);
router.get('/login', renderlogin);
router.get('/home', renderhome)
router.get('/signup', rendersignup)
router.post('/signup', dosignup)
router.post('/login', doLogin)



module.exports = router;
