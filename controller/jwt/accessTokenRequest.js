const { users } = require('../../models/users')
const jwt = require("jsonwebtoken")


module.exports = (req, res) => {
    const authorization = req.headers["authorization"]
    if(!authorization){
        res.status(200).send({data:null,message:"invalid acess token"})
    }
    const token = authorization.split(" ")[1]
    const checked = jwt.verify(
        token,
        process.env.ACCESS_SECRET,
        (err,decoded) =>{
            if(err)return null;
            return decoded
        }
    )
    if(!checked){
        return res.json({data:null,message:"access token has been tempered"})
    }
    else{
        Users.findOne({where:{email:checked.email}})
            .then(data=>{
        if(!data){
            res.json({data:null,message:"access token has been tempered"})
        }
        else {
            delete data.dataValues.password
            res.json({data:{userInfo:data.dataValues},message:"ok"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}