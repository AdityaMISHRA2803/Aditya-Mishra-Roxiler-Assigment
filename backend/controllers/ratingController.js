const { Rating, Store, sequelize } = require('../models');
const { body, validationResult } = require('express-validator');

exports.ratingValidation = [ body('rating').isInt({ min: 1, max: 5 }) ];

exports.submitRating = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const storeId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { rating } = req.body;
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    // ensure one rating per user per store
    const existing = await Rating.findOne({ where: { user_id: userId, store_id: storeId } });
    if (existing) return res.status(409).json({ message: 'Rating submitted already, please update rating.' });
    const r = await Rating.create({ user_id: userId, store_id: storeId, rating });
    res.json(r);
  } catch (err) { next(err); }
};

exports.updateRating = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const storeId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { rating } = req.body;
    const existing = await Rating.findOne({ where: { user_id: userId, store_id: storeId } });
    if (!existing) return res.status(404).json({ message: 'Rating not found' });
    existing.rating = rating;
    await existing.save();
    res.json(existing);
  } catch (err) { next(err); }
};

exports.rateStore = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    const storeId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { rating } = req.body;
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    // check if rating exists
    const existing = await Rating.findOne({ where: { user_id: userId, store_id: storeId } });
    if (existing) {
      // update
      existing.rating = rating;
      await existing.save();
      res.json(existing);
    } else {
      // create
      const r = await Rating.create({ user_id: userId, store_id: storeId, rating });
      res.json(r);
    }
  } catch (err) { next(err); }
};
