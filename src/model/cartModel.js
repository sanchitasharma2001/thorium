const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        unique: true
    },
    items: [
        {
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product", 
            required: true
        },
        quantity: {
            type: Number, 
            required: true, 
            default: 1}
        }
    ],
    totalPrice: {
        type: Number, 
        required: true
    },
    totalItems: {
        type: Number, 
        required: true
    }
}, {timestamps: true})

module.exports = new mongoose.model("Cart", cartSchema)