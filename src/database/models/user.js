'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    messenger_user_id: DataTypes.STRING,
    // order: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          // models.User.hasMany(models.Order);
          User.hasMany(models.Order, {
            foreignKey: 'UserId',
            as: 'userId',
          });
        }
      }
    });
  return User;
};
