//Importation de la paquage express (Framework roposant sur node.Js)
const express = require('express');

//Importation de la paquage express (tranfomer le corps de requêt et format js)
const bodyParser = require('express');

//Importation de la paquage de mongoose (connexion mongoDB)
const mongoose = require('mongoose');

//Importation de la paquage de helmet (améliorer la sécurité de l'app)
const helmet = require('helmet');

//Importation de la paquage de path (chemin pour les rout)
const path = require('path');

//Importer dotenv et configurer 
require('dotenv').config();

//Importer les fichier sauce et user de dossier routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion au mongodb
mongoose.connect(process.env.MDB_SECRET, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion réussie à MongoDB !'))
    .catch(() => console.log('Connexion échouée  à MongoDB!'));



const app = express();

//Utilisation de helmet
app.use(helmet());

// Utilisation de ce middlware générale pour résoudre le problème de cors  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//Utilisation de bodyParser
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;