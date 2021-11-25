//Importation de la paquage expresse
const express = require('express');

//??????????????????????
const router = express.Router();

//Importation de fichier sauce de dossier controllers
const saucesCtrl = require('../controllers/sauce');

//Importation de fichier auth de dossier middleware
const auth = require('../middleware/auth');

//Importation de fichier multer-config de dossier middleware
const multer = require('../middleware/multer-config');

//les routes CRUD + like et dislike 
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

//Exportation de ce module 
module.exports = router;