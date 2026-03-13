const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const nameRules = body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters');
const addressRules = body('address').optional().isLength({ max: 400 }).withMessage('Address max 400');
const passwordRules = body('password').isLength({ min: 8, max: 16 }).matches(/[A-Z]/).withMessage('Password must contain uppercase').matches(/[^A-Za-z0-9]/).withMessage('Password must contain special char');
const emailRules = body('email').isEmail().withMessage('Invalid email');

exports.signupValidation = [nameRules, addressRules, emailRules, passwordRules];

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { name, email, address, password } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password_hash: hash, role: 'USER' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name, email: user.email });
  } catch (err) { next(err); }
};

exports.loginValidation = [body('email').isEmail(), body('password').isString().notEmpty()];
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid creds' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name, email: user.email });
  } catch (err) { next(err); }
};

exports.updatePasswordValidation = [body('oldPassword').isString().notEmpty(), body('newPassword').isLength({ min: 8, max: 16 }).matches(/[A-Z]/).withMessage('Password must contain uppercase').matches(/[^A-Za-z0-9]/).withMessage('Password must contain special char')];
exports.updatePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    const ok = await bcrypt.compare(oldPassword, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Old password incorrect' });
    const hash = await bcrypt.hash(newPassword, 10);
    user.password_hash = hash;
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (err) { next(err); }
};
