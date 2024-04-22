const projects = require('../Models/projectmodel')

// add project

exports.addproject = async (req, res) => {

   

    console.log("Inside App Project Request!!!");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const { tittle, language, overview, github, website } = req.body
    const userId = req.payload
    const projectimage = req.file.filename
    try {
        const existingproject = await projects.findOne({ github })
        if (existingproject) {
            res.status(406).json("Project already available....")
        } else {
            const newproject = new projects({
                tittle, language, overview, github, website, projectimage, userId
            })
            await newproject.save()
            res.status(200).json(newproject)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}

// Get all projects

exports.getallprojects = async (req, res) => {
    const searchkey = req.query.search
    const query = {
        language :{
            $regex : searchkey ,$options :'i'
        }
    }
    try {
        const allprojects = await projects.find(query)
        res.status(200).json(allprojects)

    } catch (err) {
        res.status(401).json(err)
    }
}

// Get user uploaded projects

exports.getuserprojects = async (req, res) => {
    const userId = req.payload
    try {
        const userprojects = await projects.find({ userId })
        res.status(200).json(userprojects)

    } catch (err) {
        res.status(401).json(err)
    }
}

// Get Home projects

exports.getHomeprojects = async (req, res) => {
    try {
        const Homeprojects = await projects.find().limit(3)
        res.status(200).json(Homeprojects)

    } catch (err) {
        res.status(401).json(err)
    }
}

exports.editprojects = async (req,res)=>{
    console.log("inside edit project");
    const {pid}=req.params
    const userId = req.payload
    const {tittle,language,overview,github,website,projectimage} = req.body
    const uploadimage =req.file?req.file.filename:projectimage

    try{
        const updatedprojects = await projects.findByIdAndUpdate({_id:pid},{
            tittle,language,overview,github,website,projectimage:uploadimage,userId
        },{new:true})
        await updatedprojects.save()
        res.status(200).json(updatedprojects)

    }catch(err){
        res.status(401).json(err)
    }
}

exports.removeProjects = async (req,res)=>{
    console.log("inside remove project");
    const {pid}= req.params
    try{
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}