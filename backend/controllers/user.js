//Importation de fichier User de dossier models
const User = require('../models/User');

//Importation de la paquage bcrypte (crypter le mdp)
const bcrypt = require('bcrypt');

//Importation de la paquage jsonwebtoken (??)
const jwt = require('jsonwebtoken');

//Importation de la paquage Dotenv et config (mettre les clés secrets le ficher .env)
require('dotenv').config();

//Importation de cryptojs (pour chiffrer le mail)
const cryptojs = require('crypto-js');

//la fonction signup (création de nouveau utilisateur dans la base de donné)
exports.signup = (req, res, next) => {
    //chiffrer l'émail avant de l'envoyer dans le bas de donnes
    const hashEmail = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_SECRET).toString();

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: hashEmail,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//la fonction login (identification d'un utilisateur existant dans la base de donné)
exports.login = (req, res, next) => {
    //chiffrer l'émail avant de l'envoyer dans le bas de donnes

    const hashEmail = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_SECRET).toString();

    User.findOne({ email: hashEmail })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.MDP_SECRET, { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};