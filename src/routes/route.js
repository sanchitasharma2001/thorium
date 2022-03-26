const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth.js')
const bookController=require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const userController=require("../controllers/userController")


//createBook 
//router.post("/createBook",bookController.createBook)


//createUser

router.post("/register",userController.createUser)
router.post("/login",userController.createUser)
router.post("/books",bookController.createbook)
module.exports =router
