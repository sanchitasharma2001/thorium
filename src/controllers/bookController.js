const { count } = require("console")
const BookModel= require("../models/bookModel")
const authorModel= require("../models/authorModel")
//part 1
const createBook=async function (req, res){
    let data= req .body
    let saveddata=await BookModel.create(data)
    res.send({msg:saveddata})
}

//part 2
const createAuthor=async function (req, res){
    let data= req .body
    let saveddata=await authorModel.create(data)
    res.send({msg:saveddata})

}

//part 3
const bookList=async function (req, res){
    let idAuthor= await authorModel.find({authorName:"Chetan Bhagat"}).select({author_id:1,_id:0})
    console.log(idAuthor)
    const id=idAuthor[0].author_id
    console.log(id)
    let bookNames=await BookModel.find({author_id:id}).select({name:1,_id:0})
    console.log(bookNames)
    console.log({msg:bookNames})
}

//4
const updateBookPrice=async function(req, res){
let idBook = await BookModel.findAndUpdate({name:"Two states"},{$set:{price:100}},{new:true}).select({author_id:1,_id:0})
console.log(idBook)
let id =idBook.author_id
let newPrice=idBook.price
console.log(newPrice)
console.log(id)
let authorName=await authorModel.find({author_id:id}).select({author_id:1,_id:0})
console.log(authorName)
res.send({msg:authorName,newPrice})
}
//part 5
const Books=async function(req,res)
{
let avaliableBooks=await bookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0}) 
console.log(avaliableBooks)   
let id =availableBooks.map(ele=>ele.author_id)
console.log(id)
let arr=[]
for(let i=0;i<id.length;i++){
let x=id[i]
let authorNames=await authorModel.find({author_id:x}).select({authorName:1,_id:0})
arr.push(authorNames)
}
console.log(arr)
res.send({msg:arr})
}
module.exports .createBook= createBook
module.exports.createAuthor= createAuthor
module.exports .bookList= bookList
module.exports.updateBookPrice=updateBookPrice
module.exports.Books= Books
