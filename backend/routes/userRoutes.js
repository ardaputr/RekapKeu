const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// route protected
router.get('/user/:id', authMiddleware, userController.getUserById);
router.put('/user/:id', authMiddleware, userController.updateUser);

module.exports = router;
