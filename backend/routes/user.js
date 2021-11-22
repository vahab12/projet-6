const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password-validator')
const emailChecker = require('../middleware/email-checker')

router.post('/signup', passwordValidator, emailChecker, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;