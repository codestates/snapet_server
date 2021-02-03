const express = require('express')

const app = express()
app.use('/',(req,res)=>{
    res.send('server test node server')
})

app.use('/login',(req,res)=>{
    res.send(data)
})
app.listen(5000,()=>{
    console.log('server is running')
})