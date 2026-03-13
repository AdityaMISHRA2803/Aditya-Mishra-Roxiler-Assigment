const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const jwtAuth = require('../middlewares/auth');

router.post('/signup', auth.signupValidation, auth.signup);
router.post('/login', auth.loginValidation, auth.login);
router.post('/update-password', jwtAuth, auth.updatePasswordValidation, auth.updatePassword);

module.exports = router;
