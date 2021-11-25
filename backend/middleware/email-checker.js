//Regex (rensigner la bonne format d'émail)
module.exports = (req, res, next) => {
    const validEmail = (email) => {
        let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        let isRegexTrue = emailRegexp.test(email)
        isRegexTrue ? next() : res.status(400).json({ message: "Votre email n'est pas valide" });
    }
    validEmail(req.body.email)
};