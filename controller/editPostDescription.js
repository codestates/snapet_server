const { photos } = require('../models')

module.exports = async(req,res)=>{
    //filepath 가 들어오니까 filepath로 찾음
    const photo = await photos.findOne({
        where : { filepath : req.body.filepath }
    })
    //console.log(photo)
    //맞는 filepath가 없을때
    if(!photo){
        res.status(406).send('"406 Not Acceptable"')
    }else if(photo.dataValues.content === req.body.content){
        res.status(400).json(
            "변경 내용과 현재 내용 동일함"
        )
    }
    //맞는 filepath가 있을때 업데이트로 해당 콘텐트 수정
    else{
        //const id로 하는 이유는 id를 찾아서 json으로 돌려주려고
        const { id } = photo.dataValues
        //update로 해당 사항 바디에 들어온 걸로 변경
        await photo.update({content : req.body.content})
        res.status(200).json(
            id
        )
    }
}