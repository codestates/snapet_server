const { photos } = require('../models')

module.exports = async (req,res) => {
    //console.log(users)
    const photo = await photos.findOne({
      where : { filepath : req.body.filepath }
    })
    //console.log(photo)
    if(photo){
      delete photo.dataValues
      res.send('ok!')
    }
}