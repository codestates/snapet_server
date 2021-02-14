'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profilepath: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  users.associate = (models) => {
    users.hasMany(models.photos, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    users.belongsToMany(models.photos, {
      through: 'users_like_photos',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return users;
};
