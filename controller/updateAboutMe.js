const { users } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(404).json('invalid access token');
  }
  const token = authorization.split(' ')[1];
  const tokenData = jwt.verify(
    token,
    process.env.ACCESS_SECRET,
    async function (err, decoded) {
      if (err) return res.status(404).json('wrong access token');

      const user = await users.findOne({ where: { id: decoded.id } });

      if (!user) {
        return res.status(404).json('invalid userInfo');
      }

      await user.update({ description: req.body.description });

      res.status(200).send('OK');
    }
  );
};
