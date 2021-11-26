//Importation de fichier Sauce dans le dossier models
const Sauce = require('../models/Sauce');

//pour téléchager les images dans base de donée/supprimé 
const fs = require('fs');

// créer un sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

//Modifier un sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

//Suprimmer un sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//Afficher ou lire un sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

//Afficher ou lire tous les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

//Liker et desliker les sauces ou rester neutre 
exports.likeSauce = (req, res, next) => {
    console.log(req.body)
    switch (req.body.like) {
        //Cancel = 0
        //Vérifier si l'utilisateur a aimé ou n'a pas aimé la sauce 
        //Mettre à jours la sauce et envoyer message/ error
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.find(user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                                _id: req.params.id
                            })
                            .then(() => { res.status(201).json({ message: 'Avis neure' }); })
                            .catch((error) => { res.status(400).json({ error: error }); });

                    }
                    if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                                _id: req.params.id
                            })
                            .then(() => { res.status(201).json({ message: 'Avis neure' }); })
                            .catch((error) => { res.status(400).json({ error: error }); });
                    }
                })
                .catch((error) => { res.status(404).json({ error: error }); });
            break;
            //likes = 1
            //Mettre à jours la sauce et envoyer message/ error
        case 1:
            Sauce.updateOne({ _id: req.params.id }, {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId },
                    _id: req.params.id
                })
                .then(() => { res.status(201).json({ message: "J'aime!" }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            break;
            //likes = -1
            //Mettre à jours la sauce et envoyer message/ error
        case -1:
            Sauce.updateOne({ _id: req.params.id }, {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                    _id: req.params.id
                })
                .then(() => { res.status(201).json({ message: "Je n'aime pas !" }) })
                .catch((error) => { res.status(400).json({ error: error }) });
            break;
        default:
            console.error('Bad request')
    }
};