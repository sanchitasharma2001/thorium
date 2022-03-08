const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const productController= require("../controllers/productController")
const userController= require("../controllers/userController")
const orderController= require("../controllers/orderController")
const globalMiddleware = require("../middleware/globalMiddleware")

router.post("/createProduct", productController.createProduct)
router.post("/createUser", globalMiddleware.checkheader,userController.createUser)
router.post("/createOrder", globalMiddleware.checkheader,orderController.createOrder)

module.exports = router;