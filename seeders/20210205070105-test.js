'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      name: 'Hannah',
      email: 'example@gmail.com',
      password: '1234',
      profilepath: 'selfie.jpg',
      description: 'hello world!',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);
    const usersRows = users[0];
    await queryInterface.bulkInsert('photos', [{
      filepath: 'chunja.jpg',
      content: 'miss u',
      userId: usersRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    const photos = await queryInterface.sequelize.query(`SELECT id FROM photos`);
    const photosRows = photos[0];
    return await queryInterface.bulkInsert('users_like_photos', [{
      userId: usersRows[0].id,
      photoId: photosRows[0].id,
      countLike: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('photos', null, {});
    await queryInterface.bulkDelete('user_like_photos', null, {});
  }
};
