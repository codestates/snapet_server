const express = require('express')
const https = require('https')
const fs = require('fs')
const deletePhoto = require('./controller/deletePhoto');

const app = express()

app.post('/deletePhoto', deletePhoto.post);
    https.createServer({
        key: fs.readFileSync(__dirname + '/../../../../Seulji/keys/key.pem','utf-8'),
        cert: fs.readFileSync(__dirname + '/../../../../Seulji/keys/cert.pem','utf-8'),
    },
    app.use('/',(req,res)=>{
        res.send('made https server')
    })
)
app.listen(5000)