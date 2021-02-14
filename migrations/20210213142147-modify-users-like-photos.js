'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('users_like_photos', 'userId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    });
    await queryInterface.changeColumn('users_like_photos', 'photoId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'photos',
        key: 'id',
      },
    });
    await queryInterface.removeColumn('users_like_photos', 'countLike');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('users_like_photos', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    });
    await queryInterface.changeColumn('users_like_photos', 'photoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'photos',
        key: 'id',
      },
    });
    await queryInterface.addColumn('users_like_photos', 'countLike', {
      type: Sequelize.INTEGER,
    });
  },
};
