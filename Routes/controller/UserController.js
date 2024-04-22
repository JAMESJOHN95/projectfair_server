// register
const { json } = require('express');
const users = require('../Models/usermodel')
const jwt = require('jsonwebtoken')


exports.Register =async (req,res)=>{
    console.log("Inside Register Request");
    const {username,email,password} = (req.body);
    console.log(username,email,password);

    try{
        const existinguser = await users.findOne({email})
        if(existinguser){
            res.status(406).json("User Already Exist")
        }
        else{
            const newuser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newuser.save()
            res.status(200).json(newuser)
        }

    }
    catch(err){
        res.status(401).json(err)

    }


}

// Login 

exports.Login = async(req,res)=>{
console.log("Resolved at login");
const {email,password} = req.body
console.log(email, password);

// cheking if user exist at mongo db

try{
    const existinguser = await users.findOne({email,password})
    if(existinguser){
        const token = jwt.sign({userId:existinguser._id},process.env.jwt_sectret)
        res.status(200).json({existinguser,token})
    }
    else{
res.status(404).json("invalid email / password")
    }

}catch(err){
    res.status(401).json(err)
}
}

// update profile details in projects page

exports.edituser = async(req,res)=>{
    const userid = req.payload
    const {username,email,password,github,linkedin,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage

    try{
        const updateuser = await users.findByIdAndUpdate({_id:userid},{
            username,email,password,github,linkedin,profile 
        },{new:true})
        await updateuser.save()
        res.status(200).json(updateuser)

    }catch(err){
        res.status(401).json(err)
    }

}
