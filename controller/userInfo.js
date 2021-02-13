const { users } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
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

      if (!user) {
        return res.send('access token has been tempered');
      }
      const { id, name, profilepath, description } = user;
      res.status(200).json({
        id,
        username: name,
        profileimg: profilepath,
        description,
      });
    }
  );
};

// const user = await users.findAll({
//   include: [ models.photos ],
// });
