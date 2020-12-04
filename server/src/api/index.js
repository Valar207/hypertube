const router = require('express-promise-router')();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes pour authentication
router.use('/auth', authRoutes);

// Routes pour user
router.use('/user', userRoutes);

module.exports = router;
