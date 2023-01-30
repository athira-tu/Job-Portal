var express = require('express');
const { rendersignup, dosignup } = require('../controllers/companycontrollers');

var router = express.Router();

router.get('/signup', rendersignup)
router.post('/signup', dosignup)

module.exports = router;
