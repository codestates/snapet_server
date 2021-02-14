'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  photos.init(
    {
      filepath: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'photos',
    }
  );
  photos.associate = (models) => {
    photos.belongsTo(models.users, {
      onDelete: 'CASCADE',
      hooks: true,
    });
    photos.belongsToMany(models.users, {
      through: 'users_like_photos',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return photos;
};
