const express = require('express')
const dotenv = require('dotenv')
const bodyParser=require('body-parser')
const submit= require('./routes/submit')
const getQs=require('./routes/get-qs')
const cors = require('cors')
const app=express()

app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/submit',submit)

app.use('/get-qs',getQs)

app.listen(8000)
