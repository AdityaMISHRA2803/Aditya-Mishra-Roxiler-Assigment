const { Store, Rating, User, sequelize } = require('../models');

exports.dashboard = async (req, res, next) => {
  try {
    // find stores owned by this owner
    const ownerId = req.user.id;
    const stores = await Store.findAll({ where: { owner_id: ownerId } });
    const data = await Promise.all(stores.map(async s => {
      const ratings = await Rating.findAll({ where: { store_id: s.id } });
      const avg = ratings.length ? (ratings.reduce((a,b)=>a+Number(b.rating),0)/ratings.length) : null;
      const users = await Promise.all(ratings.map(async r => {
        const u = await User.findByPk(r.user_id);
        return { userId: u.id, name: u.name, email: u.email, rating: r.rating };
      }));
      return { storeId: s.id, name: s.name, averageRating: avg, ratingsByUsers: users };
    }));
    res.json(data);
  } catch (err) { next(err); }
};
