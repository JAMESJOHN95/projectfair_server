const mongoose = require('mongoose')
mongoose.connect(process.env.DBconnectionstring).then(
    result=>{
        console.log("mongodb atlas connected with pfserver");
    }
).catch(err=>{
    console.log("connection failed");
    console.log(err);
})