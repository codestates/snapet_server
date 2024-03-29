const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  const userInfo = await users.findOne({
    where: { email: req.body.email },
  });
  const check = await bcrypt.compare(req.body.password, userInfo.password);

  if (!check) {
    res.json({ data: null, message: 'not authorized' });
  }
  delete userInfo.dataValues.password;
  const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
    expiresIn: '5h',
  });
  const refreshToken = jwt.sign(
    userInfo.dataValues,
    process.env.REFRESH_SECRET,
    {
      expiresIn: '5d',
    }
  );
  res.cookie('refreshToken', refreshToken, {
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  // console.log(accessToken);
  res.json({ data: { accessToken: accessToken }, message: 'ok' });
};
