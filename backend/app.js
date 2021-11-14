const express = require('express');
const bodyParser = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//  Connexion au mongodb
mongoose.connect('mongodb+srv://Projet6:1214@cluster0.5vtmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion réussie à MongoDB !'))
    .catch(() => console.log('Connexion échouée  à MongoDB!'));

const app = express();

//Middlware générale 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;