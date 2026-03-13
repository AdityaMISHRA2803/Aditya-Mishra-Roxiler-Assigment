const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const jwtAuth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.use(jwtAuth, roles(['ADMIN']));

router.get('/dashboard', admin.dashboard);
router.post('/stores', admin.createStoreValidation, admin.createStore);
router.get('/stores', admin.listStores);
router.get('/store-owners', admin.listStoreOwners);

router.post('/users', admin.createUserValidation, admin.createUser);
router.get('/users', admin.listUsers);
router.get('/users/:id', admin.userDetails);

module.exports = router;
