const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
   Author_id:{
        type:ObjectId,
         ref:"newAuthor"
    },
    
    name: String,
    price: Number,
    ratings: Number,
    Publisher:String,
    Publisher_id:{
        type:ObjectId,
        ref:"newPublisher"
    },
    isHardcover:String

}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
