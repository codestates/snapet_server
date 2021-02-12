const { photos, users, users_like_photos, sequelize } = require('../models');
console.log('check!');
module.exports = async (req, res) => {
  const posts = await photos.findAll({
    attributes: {
      exclude: ['userId'],
      include: [
        'id',
        [sequelize.col('users.name'), 'username'],
        [
          sequelize.fn(
            'count',
            sequelize.col('users.users_like_photos.userId')
          ),
          'countLike',
        ],
        // [sequelize.col('users.users_like_photos.countLike'), 'countLike'],
      ],
    },
    group: ['id'],
    // 그룹바이 에러 뜰때 :
    // mysql > SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
    include: [
      {
        model: users,
        as: 'users',
        attributes: [],
      },
    ],
  });

  res.status(200).json(posts);
};
