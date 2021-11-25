//Importation de la paquage express (???)
const express = require('express');

//Importation de la paquage express (???)
const bodyParser = require('express');

//Importation de la paquage de mongoose (connexion mongoDB)
const mongoose = require('mongoose');

//Importation de la paquage de helmet (améliorer la sécurité de l'app)
const helmet = require('helmet');

//Importation de la paquage de path (??)
const path = require('path');

//Dotenv 
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
app.use(helmet());

//Middlware générale pour le cors  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;