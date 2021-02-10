const { photos } = require('../models')
module.exports = async(req, res) => {
  const authorization = await req.headers['authorization']

  if (!accessTokenData) {
    return res.status(404).send("존재 하지 않은 유저");
  }

  const token = authorization.split(' ')[1];
  const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

  const posts = await photos.findAll({
    attributes: {exclude: ['userId']},
    where: {userId: tokenData.id },
  })
  // const needs = posts.map(post => {
  //   const { id, filepath, content, created_at, update_at } = post
  //   return { id, filepath, content, created_at, update_at }
  // })
  console.log(posts)
  res.status(200).json(posts);
}