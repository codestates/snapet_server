const { photos } = require('../models')
//const jwt = require('jsonwebtoken')

module.exports = async (req,res) => {
    //console.log(users)
    const photo = await photos.findOne({
      where : { filepath : req.body.filepath }
    })
    console.log(photo)
    if(photo){
      await photo.destroy({
        where: { filepath : req.body.filepath },
      })
      res.send('ok!')
    }
}
