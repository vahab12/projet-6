//Importation de la paquage password-validator
const passwordValidator = require('password-validator');

//le chemin de new MDP
const passwordSchema = new passwordValidator();

//Le MDP doit respecter ce regle
passwordSchema
    .is().min(8)
    .is().max(35)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123', '123456789']);


module.exports = passwordSchema;