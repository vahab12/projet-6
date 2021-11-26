//Importation de la paquage mongoose (connexion au mongoDB)
const mongoose = require('mongoose');

//Importation de la paquage mongoose-unique-validator (un seul mail pour chac count)
const uniqueValidator = require('mongoose-unique-validator');

//Schema pour créer un utilisateur 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//application de mongoose-unique-validator
userSchema.plugin(uniqueValidator);

//Exportation de ce module  
module.exports = mongoose.model('User', userSchema);