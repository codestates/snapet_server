const { users } = require('../models');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = async(req, res) => {
  const {email, username, password} = req.body;

  if (!email || !username || !password) {
    return res.status(422).send("insufficient parameters supplied")
  }

  const existingUser = await users.findOne({ where: { email } });
  if (!existingUser) {
    // bcrypt.genSalt(10, function(err, salt) {
    //   if(err) return next(err)
    //   bcrypt.hash(password, salt, function(err, hash) {
    //     if(err) return next(err);
    //     password = hash;
    //     next()
    //   });
    // });
    const signUp = await users.create({
      email,
      name: username,
      // password,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(200).json({ id: signUp.id })
  } else {
    res.status(400).send("bad request")
  }
}