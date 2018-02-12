module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    messenger_user_id: DataTypes.STRING,
    // order: DataTypes.INTEGER
  });

  User.associate = (models) => {
    // associations can be defined here
    // models.User.hasMany(models.Order);
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      // as: 'userId',
    });
  };
  return User;
};
