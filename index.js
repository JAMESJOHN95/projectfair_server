// load .env file to process.env use config()
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/Router')
require ('./Routes/controller/DB/connection')

// create express server

const pfserver = express()

// use cors in our file

pfserver.use(cors())
pfserver.use(express.json())  // middleware to convert json to js(express.json)
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))


// create port



const PORT = 3000|| process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(`Project Fair Server Started At ${PORT} `);
})

pfserver.get("/",(req,res)=>{
    res.status(200).send(<h1 style="color:green">project fair started and waiting for client request !!!</h1>)
})





