module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.TINYINT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'ratings',
    timestamps: false,
    indexes: [
      { unique: true, fields: ['user_id', 'store_id'], name: 'uniq_user_store' }
    ]
  });
};
