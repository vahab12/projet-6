const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)
    .is().max(35)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123', '123456789']);

module.exports = passwordSchema;