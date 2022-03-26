const bookModel =require('../models/bookModel')
const userModel = require('../models/userModel')
//const reviewModel= require('../models/reviewModel')
const validations = require('../validations/validator.js')
const createbook=async function(req, res) {
    try{
        if (!validations.isValidRequestBody(req.body)) 
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide collage details' })
        
        let { title, excerpt, userId ,ISBN ,category,subcategory,reviews,} = req.body

        if (!validations.isValid(title)) 
        return res.status(400).send({ status: false, message: `title is required` })

        if (!validations.isValid(excerpt)) {
        return res.status(400).send({ status: false, message: `excerpt is required` })
        }
        const userDetails=await userModel.findById(_id)
        if(!userDetails) {
            return res.status(400).send({ status: false, message:"No user exist by this id"})
        }
        var {_id} = userDetails;
        if(!validations.isValid(_id)){
            return res.status(400).send({ status: false, message: "userId is required" })
        }
        if(!validations.isValidObjectId(_id)) {
            return res.status(400).send({ status: false, message:`${_id} is not a valid userId`})
       }
       if(!validations.isValid(ISBN)){
           return res.status(400).send({ status: false, message:"Isbn is required"})
       }
       const isISBNalreadyexist=await bookModel.findOne({ISBN})
       if(isISBNalreadyexist){
           return res.status(400).send({ status: false, message:"This ISBN is already exist"})
       }
       if(!validations.isValid(category)){
           return res.status(400).send({ status: false, message:"Category is required"})
       }
       if(!validations.isValid(subcategory)){
           return res.status(400).send({ status: false, message:"Subcategory is required"})
        }
        ////reviews portion////
         {
            res.status(400).send({ status: false, message: "Please give reviews from 0 to 5" })
        } 
        let createdbook=await bookModel.create(req.body)
        return res.status(200).send({status:true,msg:"Book is successfully created",data:createdbook});
    }catch(err){
        res.status(500).send({status:false,err:err.message});
    }
}

















const deleteBook= async function (req, res) {
    try{
        let id=req.params.bookId 
        let data=await bookModel.findById(id)
        if(data){
            if(data.isDeleted==false){
                let data2=await bookModel.findOneAndUpdate({_id:id},{isDeleted:true,deletedAt:new Date()},{new:true} ,{upsert:true})
                return res.status(200).send({status:true,msg:"Data deleted",data: data2})   
          }else{
              return res.status(400).send({status:false,msg:"Data is already deleted"})
          }
        }else{
            return res.status(404).send({status:false,msg:"bookId does not exist"})
        }


    }catch(err){
        return res.status(400).send({ status: false, error:err.message})
    }
}




    module.exports = {createbook}