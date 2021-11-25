//Importation de la paquage jsonwebtoken (??)
const jwt = require('jsonwebtoken');

//Importation de la paquage dotenv et config (mettre les clés secrets dans le ficher .env)
require('dotenv').config();

//???????????????????????
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.MDP_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};