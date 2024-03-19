const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const Router = require('./Router/Man')
const exp = require('constants')
require('./Model/Config')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', Router)


app.listen(process.env.PORT, (req, res)=>{
    console.log('Server Is Running');
})
