/*const jwt = require("jsonwebtoken")
const authenticate = function(req, req, next) {
    let token= req.headers["x-auth-token"]
    if(!token) return res.send({status: false,msg:"token must be present"})
    let decodedToken= jwt.verify(token,"functionup-thorium")
    if(!decodedToken) return res.send({status: false,msg:"Invalid token"})
    //check the token in request header
    //validate this token
    
    next()
}


const authorise = function(req, res, next) {
    let decodedToken =jwt.verify(req.headers["x-auth-token"],"functionup-thorium")
    if(decodedToken.userId !=req.params.userId) return res.send({msg:"You are not allowed to  make changes in the data"})
    
    // comapre the logged in user's id and the id in request
    next()
}
module.exports.authenticate= authenticate
module.exports.authorise= authorise*/



const jwt = require("jsonwebtoken");
const tokenChecker = function (req, res, next) {
  let token = req.headers["x-auth-token"]
    if (!token) {
        return res.send("Token is missing")
    }

    // let decodedToken = jwt.verify(token, "functionup-thorium")
    // if(!decodedToken){
    //     return res.send("Invalid Token")
    // }
    try {
        let decodedToken = jwt.verify(token, "functionup-thorium")
        if (decodedToken.userId === req.params.userId) {
            next()
        } else {return res.send("Unauthorised user")
    }
}
catch(err){return res.send("invalid token")}
}
module.exports.tokenChecker = tokenChecker;