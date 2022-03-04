const { count } = require("console")
const newAuthor = require("../models/newAuthor")
const newPublisher=require("../models/newPublisher")
const newBook= require("../models/newBook")



const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await newAuthor.create(author)
    res.send({data: authorCreated})
}




const createPublisher =async function (req, res) {
    let Publisher = req.body
    let PublisherCreated = await newPublisher.create(Publisher)
    res.send({data: PublisherCreated})
}
 
const createBook1 =async function (req, res) {
    let Book1 = req.body
    let Book1Created = await newBook.create(Book1)
    res.send({data:Book1Created})
}

const createBook= async function (req, res) {
    let book = req.body
    if(book.Author){
        if(book.Publisher){
            Publisher_id = book.Publisher
            Author_id=book.Author
          const valid1=await newAuthor.find({_id:Author_id})
          const valid2=await newPublisher.find({_id:Publisher_id})
          if(valid1.length==0)
          {
              res.send("author is not present")
          }
          if(valid2.length==0)
          {
              res.send("publisher is not present")
          }
          
        } 
        res.send("this deatail is required")
    }
        res.send("this detail is required ")
   
let bookCreated = await newBook.create(book)
res.send({data: bookCreated})
}



const getBooks= async function (req, res) {
    let books = await newBook.find().populate("Author_id Publisher_id")
    res.send({data: books})
}

const putBooks=async function(req,res){
  let books1= await newPublisher.find({Publisher:{$in:["Penguin","Harper collin"]}})
  let x=books1.map(ele=>ele._id)
  let match=[]
  for(let i=0;i<x.length;i++)
  match.push(books1[i]._id)
  let books=await newBook.updateMany({Publisher:x[i]},{$set:{isHardcover:true}},{new:true})
    match.push(books)

}
let books2= await newPublisher.find({Publisher:{$in:["Penguin","Harper collin"]}})
let id=books2.map(ele1=>ele1._id)
let updated=[]
for(let j=0;j<x.length;j++){
let books3=await newBook.updateMany({Author:id[j]},{$inc:{price:+10}},{new:true})

updated.push(books3)
} 

module.exports.createAuthor= createAuthor
module.exports.createPublisher=createPublisher
module.exports.createBook1=createBook1
module.exports.createBook=createBook
module.exports.getBooks= getBooks
module.exports.putBooks=putBooks