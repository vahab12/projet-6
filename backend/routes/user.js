//Importation de la paquage expresse
const express = require('express');

//????????????????????
const router = express.Router();

//Importation de fichier user de dossier controllers
const userCtrl = require('../controllers/user');

//Importation de fichier password-validator de dossier middleware
const passwordValidator = require('../middleware/password-validator')

//Importation de fichier email-checker de dossier middleware
const emailChecker = require('../middleware/email-checker')

//La route pour créer un compte et se connecter 
router.post('/signup', passwordValidator, emailChecker, userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation de ce module 
module.exports = router;