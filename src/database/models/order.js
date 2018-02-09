'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Order.belongsTo(models.User, {
          foreignKey: 'userId',
          // onDelete: 'CASCADE',
        });
      }
    }
  });
  return Order;
};
