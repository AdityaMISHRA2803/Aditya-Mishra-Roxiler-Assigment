const { User, Store, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');
const { body, validationResult, query } = require('express-validator');

exports.createUserValidation = [
  body('name').isLength({ min: 20, max: 60 }),
  body('email').isEmail(),
  body('address').optional().isLength({ max: 400 }),
  body('password').isLength({ min: 8, max: 16 }).matches(/[A-Z]/).matches(/[^A-Za-z0-9]/),
  body('role').isIn(['ADMIN','USER','STORE_OWNER'])
];

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { name, email, address, password, role } = req.body;
    const bcrypt = require('bcrypt');
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password_hash: hash, role });
    res.json({ id: user.id, email: user.email });
  } catch (err) { next(err); }
};

exports.createStoreValidation = [
  body('name').isString().notEmpty(),
  body('email').optional().isEmail(),
  body('address').optional().isLength({ max: 400 }),
  body('owner_id').notEmpty().withMessage('Store owner is required')
];

exports.createStore = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { name, email, address, owner_id } = req.body;
    
    // Validate owner_id
    const owner = await User.findByPk(owner_id);
    if (!owner) {
      return res.status(400).json({ message: 'Invalid owner: User does not exist' });
    }
    if (owner.role !== 'STORE_OWNER') {
      return res.status(400).json({ message: 'Invalid owner: User must be a Store Owner' });
    }
    
    const store = await Store.create({ name, email, address, owner_id });
    res.json(store);
  } catch (err) { next(err); }
};

exports.dashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) { next(err); }
};

exports.listStores = async (req, res, next) => {
  try {
    const { name, email, address, sortBy='name', order='ASC', page=1, limit=50 } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    const stores = await Store.findAll({ where, order: [[sortBy, order]] });
    // compute average ratings
    const results = await Promise.all(stores.map(async s => {
      const avg = await Rating.findAll({ where: { store_id: s.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg']] });
      return { id: s.id, name: s.name, email: s.email, address: s.address, overallRating: parseFloat(avg[0].get('avg')) || null };
    }));
    res.json(results);
  } catch (err) { next(err); }
};

exports.listUsers = async (req, res, next) => {
  try {
    const { name, email, address, role, sortBy='name', order='ASC' } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;
    const users = await User.findAll({ where, order: [[sortBy, order]] });
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, address: u.address, role: u.role })));
  } catch (err) { next(err); }
};

exports.listStoreOwners = async (req, res, next) => {
  try {
    const owners = await User.findAll({ 
      where: { role: 'STORE_OWNER' },
      attributes: ['id', 'name', 'email'],
      order: [['name', 'ASC']]
    });
    res.json(owners);
  } catch (err) { next(err); }
};

exports.userDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const result = { id: user.id, name: user.name, email: user.email, address: user.address, role: user.role };
    if (user.role === 'STORE_OWNER') {
      const stores = await Store.findAll({ where: { owner_id: user.id } });
      const storeRatings = await Promise.all(stores.map(async s => {
        const avg = await Rating.findAll({ where: { store_id: s.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg']] });
        return { storeId: s.id, name: s.name, average_rating: parseFloat(avg[0].get('avg')) || null };
      }));
      result.stores = storeRatings;
    }
    res.json(result);
  } catch (err) { next(err); }
};
