const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
// steps to verify token
console.log("inside Jwt middleware");
const token = req.headers["authorization"].split(" ")[1]
console.log(token);
if (token){
    console.log(token);

try{
    const jwtResponse = jwt.verify(token,process.env.jwt_sectret)
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    next()

}catch(err){
res.status(401).json("Authentication Failed....Please Login!!!!")
}


}else{
    res.status(406).json("Please Provide Token")
}

}
module.exports = jwtMiddleware