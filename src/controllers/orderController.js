const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const createOrder = async function (req, res) {
    const userId = req.body.user
    let userDetails = await userModel.findById({ _id: userId})
    if(!userDetails)return res.send("userId is invalid")


    let productId=req.body.product
    let product = await productModel.findById(productId)
    if(!product)return res.send("product is invalid")

    let header= req.headers.isfreeappuser
    
    if (header != "true") {
        let productPrice=productDetails.price
        let userBalance=userDwtails.balance
             
   if (userBalance<productPrice) {
       res.send("The user doesn't have sufficient balance")


    }else{
        let data =req.body
        const updatedUser=await userModel.updateOne({_id:userid},
     {$set:{balance:250}})
let saveorder=await orderModel.create(updatedUser)
     res.send({msg:saveorder})
    }

    }else{
       let data =req.body
       let saveorder=await orderModel.create(data)
       req.send({msg:saveorder})
   }

    }
    module.exports.createOrder = createOrder





