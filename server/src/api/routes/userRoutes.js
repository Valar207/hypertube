const router = require('express-promise-router')();

const userController = require('../controllers/userController');

// Route pour récupérer tout les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour créer un utilisateur
router.post('/', userController.create);

module.exports = router;
