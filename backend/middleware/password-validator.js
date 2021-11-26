//Importation le fichier Password-validator de dossier models 
const passwordSchema = require('../models/Password-validator');

//Entrer la bonne format de MDP
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le modepass doit faire 8 caractère au moins, avec une maj, une min et un chiffre au moins.' });
    } else {
        next();
    }
};