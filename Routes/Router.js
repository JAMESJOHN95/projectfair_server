const express = require("express")
const usercontroller = require('./controller/UserController')
const projectcontroller = require('./controller/Projectcontroler')
const jwtMiddleware = require("../Middlewares/jwtmiddleware")
const multerconfig = require("../Middlewares/MulterMiddleware")
const getallprojects = require('./controller/Projectcontroler')
const getuserprojects = require('./controller/Projectcontroler')
const getHomeprojects = require('./controller/Projectcontroler')
const editprojects = require ("./controller/Projectcontroler")
const removeproject = require ("./controller/Projectcontroler")
const edituser = require("./controller/UserController")
const router = new express.Router()

// Register request----
router.post('/register',usercontroller.Register)
// login user
router.post('/login',usercontroller.Login)
// add projects
router.post('/add-project',jwtMiddleware, multerconfig.single('projectimage'),projectcontroller.addproject)
//get all projects
router.get('/all-projects',jwtMiddleware,projectcontroller.getallprojects)
//get user projects
router.get('/user-projects',jwtMiddleware,projectcontroller.getuserprojects)
// Get home projects
router.get('/home-projects',projectcontroller.getHomeprojects)
// edit project details
router.put('/edit-projects/:pid',jwtMiddleware,multerconfig.single('projectimage'),projectcontroller.editprojects)
// delete projects
router.delete('/delete-project/:pid',jwtMiddleware,projectcontroller.removeProjects)
// edit userdetails
router.put('/edit-user',jwtMiddleware,multerconfig.single('profileImage'),usercontroller.edituser)


module.exports = router