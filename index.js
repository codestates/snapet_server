const express = require('express')

const app = express()

app.use('/',(req,res)=>{
    res.send('dkdkdkdk')
})

app.listen(5000)