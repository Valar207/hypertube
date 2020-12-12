const router = require('express-promise-router')();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

router.get('/', (req, res) => res.status(200).json({
    message: "Tu es sur l'api, check la doc pour voir les ressources accessibles",
    status: 200
}));


// Routes pour authentication
router.use('/auth', authRoutes);

// Routes pour user
router.use('/user', userRoutes);

module.exports = router;
