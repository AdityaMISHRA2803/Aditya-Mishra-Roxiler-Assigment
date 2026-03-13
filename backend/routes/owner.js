const express = require('express');
const router = express.Router();
const ownerCtrl = require('../controllers/ownerController');
const jwtAuth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.use(jwtAuth, roles(['STORE_OWNER']));
router.get('/dashboard', ownerCtrl.dashboard);

module.exports = router;
