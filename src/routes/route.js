const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleWare = require("../middleware/auth")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/usersregister", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", middleWare.authentication, userController.getUserData)
router.put("/users/:userId", middleWare.authentication,userController.updateUser)
router.delete("/users/:userId", middleWare.authentication, userController.deleteUser)

module.exports = router;