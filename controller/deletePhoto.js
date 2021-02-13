const { users, photos, users_like_photos } = require('../models');
//const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  //console.log(users)
  const photo = await photos.findOne({
    where: { filepath: req.body.filepath },
  });

  if (photo) {
    const islike = await photos.findOne({
      raw: true,
      include: [
        {
          model: users,
          as: 'users',
          through: {
            where: { photoId: photo.id },
          },
        },
      ],
      where: { filepath: req.body.filepath },
    });

    if (islike) {
      await users_like_photos.destroy({
        where: { photoId: photo.id },
      });
    }

    await photos.destroy({
      where: { filepath: req.body.filepath },
    });
    return res.send('ok!');
  }
  res.status(400).send('error');
};
