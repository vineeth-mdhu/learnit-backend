const express = require('express')
const dotenv = require('dotenv')
const bodyParser=require('body-parser')
const submit= require('./routes/submit')
const getContent=require('./routes/get-content')
const app=express()

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/submit',submit)

app.use('/get-content',getContent)

app.listen(5000)
