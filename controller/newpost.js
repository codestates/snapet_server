const { photos, users, users_like_photos } = require('../models');
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
  const { filepath, content } = req.body;
  if (!filepath) {
    return res.status(422).send('insufficient parameters supplied');
  }

  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(404).send('존재 하지 않은 유저');
  }

  const token = authorization.split(' ')[1];
  const tokenData = jwt.verify(
    token,
    process.env.ACCESS_SECRET,
    async function (err, decoded) {
      if (err) return res.status(400).send('error');

      const user = await users.findOne({ where: { id: decoded.id } });

      const photo = await photos.create({
        filepath,
        content,
        userId: user.id,
      });

      // await users_like_photos.create({
      //   userId: user.id,
      //   photoId: photo.id,
      // });

      return res.status(200).json({ id: photo.id });
    }
  );
};
