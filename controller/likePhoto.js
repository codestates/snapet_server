const { photos, users, users_like_photos, sequelize } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { photoId, userId } = req.body;

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

      const posts = await photos.findOne({
        raw: true,
        include: [
          {
            model: users,
            as: 'users',
            // attributes: [],
            through: {
              // model: users_like_photos,
              // as: 'users_like_photos',
              where: { userId: decoded.id, photoId: req.body.photoId },
            },
            where: { id: decoded.id },
          },
        ],
        where: { id: req.body.photoId },
      });

      if (!posts) {
        await users_like_photos.create({
          userId: decoded.id,
          photoId: req.body.photoId,
        });
        return res.status(200).json('click like');
      } else if (posts) {
        await users_like_photos.destroy({
          where: { photoId: req.body.photoId, userId: req.body.userId },
        });
        return res.status(200).json('cancel like');
      }
      return res.status(500).send('error');
    }
  );
};

// users_like_photos에 있는 countLike를 올려야된다
// 하트를 클릭한 사진의 id(name이여도 상관 없음)를 받아온다
// isLike가 true인 경우
