const { Store, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.listStores = async (req, res, next) => {
  try {
    const { name, address } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    const stores = await Store.findAll({ where });
    const userId = req.user ? req.user.id : null;
    const results = await Promise.all(stores.map(async s => {
      const avgRow = await Rating.findAll({ where: { store_id: s.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg']] });
      const avg = parseFloat(avgRow[0].get('avg')) || null;
      let userRating = null;
      if (userId) {
        const rating = await Rating.findOne({ where: { store_id: s.id, user_id: userId } });
        userRating = rating ? rating.rating : null;
      }
      return { id: s.id, name: s.name, address: s.address, overallRating: avg, userRating };
    }));
    res.json(results);
  } catch (err) { next(err); }
};
