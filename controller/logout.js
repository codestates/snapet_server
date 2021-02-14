const models = require('../models')
const jwt = require('jsonwebtoken')

module.exports = async (req,res)=>{
    const authorization = req.headers['authorization']

    if(!authorization){
        return res.status(404).send('로그아웃 상태')
    }
    req.session = null
    req.logout()
    req.redirect('/')
    res.status(200).send('ok')
}