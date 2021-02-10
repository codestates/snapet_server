const { photos, users } = require('../models')
module.exports = async(req, res) => {
  const { filepath, content } = req.body
  if (!filepath) {
    return res.status(422).send("insufficient parameters supplied")
  }

  const authorization = await req.headers['authorization']

  if (!accessTokenData) {
    return res.status(404).send("존재 하지 않은 유저");
  }

  const token = authorization.split(' ')[1];
  const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

  const user = await users.findOne({ where: { id: tokenData.id } });

  await photos.create({ 
    filepath, 
    content,
    userId: user.id
  })

  res.json({ id: user.id })
}