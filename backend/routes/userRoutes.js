const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', protect, userController.getUser);

module.exports = router;