module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      // onDelete: 'CASCADE',
    });
  };
  return Order;
};
