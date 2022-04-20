const cartModel = require("../model/cartModel")
const userModel = require("../model/userModel")
const validator = require("../validator/validator")
const productModel = require("../model/productModel");



const createCart = async function(req, res) {
    try{
        let userId = req.params.userId;
        let data = req.body
        let items2 
        if(!(validator.isValid(userId))&&(validator.isValidObjectId(userId))){
            return res.status(400).send({status:false, message:"Please provide a valid userId"})
        }
        if (!validator.isValidObject(data)) {
        return res.status(400).send({status: false, message: "Plaese Provide all required field" })
        } 
        let items = data.items
        if (typeof(items) == "string"){
            items = JSON.parse(items)
        }
        const isCartExist = await cartModel.findOne({userId:userId})
        let totalPrice = 0;
        if(!isCartExist){
            for(let i = 0; i < items.length; i++){
            let productId = items[i].productId
            let quantity = items[i].quantity
            let findProduct = await productModel.findOne({_id:productId,isDeleted:false});
            if(!findProduct){
                return res.status(400).send({status:false, message:"product is not valid or product is deleted"})
            }
            totalPrice = totalPrice + (findProduct.price*quantity)
            }
            let createCart = await cartModel.create({userId:userId,items:items,totalPrice:totalPrice,totalItems:items.length })
            
            return res.status(200).send({status:true,data:createCart})
        } if(isCartExist){
            items2 = isCartExist.items
        }
            let findProduct = await productModel.findOne({_id:items[0].productId,isDeleted:false})
            if(!findProduct){
            return res.status(404).send({status:false, message:"product not found or deleted"})
            }
        // res.send(findProduct)
            let totalPrice2 = findProduct.price
            let newquantity = items[0].quantity
            let flag = 0
            for(let i = 0; i < items2.length; i++){
                let productId = items2[i].productId
                if(productId == items[0].productId){
                    flag = 1
                    items2[i].quantity = items2[i].quantity + newquantity}
                
    }    totalPrice2 = Math.round(totalPrice2 * newquantity + isCartExist.totalPrice) 
            if(flag == 0){
                items2.push(items[0])
            }
        let updateCart = await cartModel.findOneAndUpdate({userId:userId},{$set:{items:items2,totalPrice:totalPrice2,totalItems:items2.length}},{new:true})
                return res.status(200).send({status: false, data:updateCart})
    }catch(error){
        return res.status(500).send({ status: false, ERROR: error.message })
    }
}

const getCartByUserId = async function (req, res) {
    try {
        const userId = req.params.userId
    if (!validator.isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: "Invalid User Id" })
    }
    const getProduct = await cartModel.findOne({ userId: userId })
    if(!getProduct){
        return res.status(404).send({status: false, message: "cart not found"})
    }
    return res.status(200).send({ status: true, message: "Get all product which is avilable in cart", data: getProduct })
    }
    catch (error) {
        return res.status(500).send({ status: false, ERROR: error.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const userId = req.params.userId
        const data = req.body
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid UserId" })
        }

        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" })
        }
        if (!validator.isValidObject(data)) {
            return res.status(400).send({status: false, message: "Plaese Provide all required field" })
        } 
        const { cartId, productId, removeProduct } = data
        if (!validator.isValidObjectId(cartId)) {
            return res.status(400).send({ status: false, message: "Invalid cartId" })
        }
        if (!validator.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: "Invalid productId" })
        }
        const getProduct = await productModel.findById({ _id: productId })
        if ((!getProduct) || (getProduct.isDeleted == true)) {
            return res.status(404).send({ status: false, message: "Product not found, or deleted" })
        }
        const getCart = await cartModel.findOne({ _id: cartId })
        if (!getCart) {
            return res.status(404).send({ status: false, message: "Cart not found" })
        }
        if (getCart.items.length == 0) {
            return res.status(400).send({ status: false, message: "cart is empty" })
        }
        let getQuantityOfProduct = 0
        let getProductIdOfItems = []
        let productInCart = 0
        for (i = 0; i < (getCart.items.length); i++) { // To get quantity of Selected Product
            if (getCart.items[i].productId == productId) {
                getQuantityOfProduct = getCart.items[i].quantity
                // getProductIdOfItems = getCart.items[i].productId
                getProductIdOfItems.push(getCart.items[i].productId)
                productInCart = 1
            }
        }
        if(productInCart == 0){
            return res.status(400).send({status:false, message:"There Is No Product in the Cart"})
        }
        let totalPriceOfSelectedProduct = getQuantityOfProduct * getProduct.price //  To get total price of select Product
        

        if (removeProduct == 0) { // we have to handle cartId authorization

            await cartModel.updateOne(
                { "items.productId": productId },
                { $pull: { "items": { productId: productId } } },
            )
            const updateProduct = await cartModel.findByIdAndUpdate({ _id: cartId },
                { $inc: { totalItems: -1, totalPrice: - totalPriceOfSelectedProduct } },
                { new: true })
            return res.status(200).send({
                statu: true,
                message: `This ${productId} Product Has Removed Successfully`,
                Data: updateProduct
            })
        }
        if (removeProduct == 0) { // we have to handle cartId authorization


            await cartModel.updateOne(
                { "items.productId": productId },
                { $pull: { "items": { productId: productId } } },
            )
            const updateProduct = await cartModel.findByIdAndUpdate({ _id: cartId },
                { $inc: { totalItems: -1, totalPrice: - totalPriceOfSelectedProduct } },
                { new: true })
            return res.status(200).send({
                statu: true,
                message: `This ${productId} Product Has Removed Successfully`,
                Data: updateProduct
            })
        }
        if (removeProduct == 0)  {
            for (let i = 0; i < getCart.items.length; i++) {
                if (getCart.items[i].productId == productId) {
                    const priceUpdate = getCart.totalPrice - getProduct.price
                    getCart.items[i].quantity = 0  // check if quantity is more than 1
                   
                    if (getCart.items[i].quantity > 0) {
                        const response = await cartModel.findOneAndUpdate({ _id: cartId },
                             { items: getCart.items, totalPrice: priceUpdate },
                              { new: true })
                        return res.status(200).send({ status: true, data: response })
                    }
                    else {
                        const totalItems1 = getCart.totalItems  // to remove the Product from items
                        getCart.items.splice(i, 1)
                        const response = await cartModel.findOneAndUpdate({ _id: cartId },
                             { items: getCart.items, totalItems: totalItems1, totalPrice: priceUpdate }, { new: true })
                        return res.status(200).send({ status: true, data: response })
                    }
                } else {
                    return res.status(404).send({ status: false, message: `product doesnot exist` })
                }
            }
            
        }
        if (removeProduct == 1)  {
            for (let i = 0; i < getCart.items.length; i++) {
                if (getCart.items[i].productId == productId) {
                    const priceUpdate = getCart.totalPrice - getProduct.price
                    getCart.items[i].quantity = getCart.items[i].quantity - 1  // check if quantity is more than 1
                   
                    if (getCart.items[i].quantity > 0) {
                        const response = await cartModel.findOneAndUpdate({ _id: cartId },
                             { items: getCart.items, totalPrice: priceUpdate },
                              { new: true })
                        return res.status(200).send({ status: true, data: response })
                    }
                    else {
                        const totalItems1 = getCart.totalItems - 1  // to remove the Product from items
                        getCart.items.splice(i, 1)
                        const response = await cartModel.findOneAndUpdate({ _id: cartId },
                             { items: getCart.items, totalItems: totalItems1, totalPrice: priceUpdate }, { new: true })
                        return res.status(200).send({ status: true, data: response })
                    }
                } else {
                    return res.status(404).send({ status: false, message: `product doesnot exist` })
                }
            }
            
        }
    } catch(err) {
    return res.status(500).send({ ERROR: err.message })
}
}

const deleteCartItems = async (req, res) => {
    try{
        const {userId} = req.params
        if(!validator.isValidObjectId(userId)){
            return res.status(400).send({status: false, message: "invalid userID"})
        }
        const isUserExist = await userModel.findOne({_id: userId})
        if(!isUserExist){
            return res.status(404).send({status: false, message: "user does not exist"})
        }
        const isCartexist = await cartModel.findOne({userId: userId})
        if(!isCartexist){
            return res.status(404).send({status: false, message: "cart does not exist"})
        }
        const data = {
            items: [],
            totalPrice: 0,
            totalItems: 0
        }
        const emptyCart = await cartModel.findOneAndUpdate({userId: userId}, data, {new: true})
        return res.status(204).send({status: true, message: "remove all items from cart"})//, data: emptyCart
    }catch(error){
        return res.status(500).send({status: false, message: error.message})
    }
}

module.exports.createCart = createCart
module.exports.getCartByUserId = getCartByUserId
module.exports.updateCart = updateCart
module.exports.deleteCartItems = deleteCartItems

