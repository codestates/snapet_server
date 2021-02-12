const { photos, users, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];

  if (!accessTokenData) {
    return res.status(404).send('존재 하지 않은 유저');
  }

  const token = authorization.split(' ')[1];
  const tokenData = jwt.verify(
    token,
    process.env.ACCESS_SECRET,
    async function (err, decoded) {
      if (err) return res.status(400).send('error');

      const posts = await photos.findAll({
        attributes: {
          exclude: ['userId'],
          include: [
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
        where: { userId: decoded.id },
        include: [
          {
            model: users,
            as: 'users',
            attributes: [],
          },
        ],
      });
      // const needs = posts.map(post => {
      //   const { id, filepath, content, created_at, update_at } = post
      //   return { id, filepath, content, created_at, update_at }
      // })
      res.status(200).json(posts);
    }
  );
};
