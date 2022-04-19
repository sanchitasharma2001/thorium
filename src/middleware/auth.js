const jwt = require("jsonwebtoken")
const validator = require("../validator/validator")

const authentication = async function  (req, res , next)
{
    try {
        const token = req.header('Authorization', 'Bearer Token')
        if(!token){
            return res.status(400).send({status:false , message:"Plz enter a token"})
        }
        let splitToken = token.split(' ')
        let decodedToken = jwt.verify(splitToken[1], "projectfivegroup20")
        //check decoded Token
        if(!decodedToken){
            return  res.status(400).send ({status:false, message: "token is invalid"})
        }
        if (Date.now()>(decodedToken.exp)*1000) {
            return res.status(404).send({ status: false, message: `please login again because session is expired` })
        }
        next()
        }
    catch (error){
        return res.status(500).send ({ status:false , message: error.message})
    } 
}

const userAuthorization = async function(req, res, next){
    // let token = req.headers["authorization"];
    const token = req.header('Authorization', 'Bearer Token')
    if(!token){
        return res.status(400).send({status:false , message:"Plz enter a token"})
    }
    let splitToken = token.split(' ')
    let decodedToken = jwt.verify(splitToken[1], "projectfivegroup20")
    let userId = req.params.userId;
    let DuserId = decodedToken.userId;
    if(!(validator.isValid(userId)) && (validator.isValidobjectId(userId))){
      return res.status(400).send({status:false , message:"plz enter a valid userId"})  
    }
    if(userId != DuserId){
        return res.status(403).send({status:false , message:"You are not authorized"})
    }
    next()
}

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization', 'Bearer Token')
        if (!token) {
          return res.status(403).send({ status: false, message: ` token request missing here` })
        }
        let splitToken = token.split(' ')
        const decodedtoken = jwt.decode(splitToken[1], 'projectfivegroup20')
        if (!decodedtoken) {
           return res.status(403).send({ status: false, message: `invalid authenticated token in request body` })       
        }
        if (Date.now()>(decodedtoken.exp)*1000) {
            return res.status(404).send({ status: false, message: `please login again because session is expired` })
        }
        req.userId = decodedtoken.userId;
        next()
    } catch (err) {
        console.error(`error ${err.message}`)
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.userAuth = userAuth
module.exports.userAuthorization = userAuthorization;
module.exports.authentication = authentication
