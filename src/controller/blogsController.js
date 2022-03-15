const blogsModel = require("../models/blogsModel")
const authorModel = require("../models/authorModel")

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let author_id = req.body.authorId
        if (!author_id) {
            return res.send("AuthorId is required")
        }
        let authorId = await authorModel.findById(author_id)
        if (!authorId) {
            return res.send('No author is not present with the given id')
        }
        if (data) {
            let savedData = await blogsModel.create(data)
            return res.status(201).send({ msg: "#successful-response-structure", savedData })

        } else {
            return res.status(400).send({ msg: "#error-response-structure" })

        }

    } catch (err) {
        return res.status(500).send({ msg: "error" })
    }
}
//let createBlogs = async function (req, res) {
  //let body = req.body;
  //let createBlogs = await blogModels.create(body);
  //res.status(201).send({ data: createBlogs });
//};

let getBlogs = async function (req, res) {
  try {
    let data = req.query;
    let filter = {
    isPublished: true,
      isDeleted: false,
      ...data,
    };
    let getBlogs = await blogsModel.find(filter);

    if (getBlogs.length == 0) {
      res.status(400).send({ status: false, data: "No blogs are found" });
    } else {
      res.status(200).send({ status: true, data: getBlogs });
    }
  } catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
};
 const updateBlog = async function(req,res){
  try{
  let updateblog = req.params.blogId
  let  = await blogsModel.findById(updateblog)
if (!updateblog) {
  return res.status(404).send({msg:"Invalid Blog"})
}
let updatedata = req.body;
let updatedUser = await blogsModel.findOneAndUpdate({ _id: updateblog },{title : updatedata.title, body:updatedata.body, tags : updatedata.tags,category : updatedata.category,subcategory : updatedata.subcategory},{new : true, upsert : true});
res.status(200).send({ status: true, data: updatedUser })
}catch(err){
  res.status(500).send({Error : err.message})
  }
}


const deleteBlog = async function(req,res){
  try{
  let deleteblog = req.params.blogId;
  let = await blogsModel.findById(deleteblog)
  if (!deleteblog) {
    return res.status(404).send({ msg: "Is not deleted" });
  }
  let blogId = req.params.blogId;
  let userDel = await blogsModel.findOneAndUpdate({_id: blogId},{isDeleted: true},{new:true});
  res.status(200).send({status:true, data:userDel})
  }catch(err){
    res.status(500).send({Error : err.message})
  }
};
const deletebyQuery = async function(req,res){
  try{  
          let query = req.query
          let filter = {...query}
          let filterByquery = await blogsModel.find(filter)
          if(filterByquery.length == 0){
              return res.status(400).send({msg:"Blog Not Found"})
          }
          else{
              let deletedDetails = await blogsModel.findOneAndUpdate({filter}, {isDeleted : true}, {new : true})
              return res.status(200).send({msg:deletedDetails})
          }
  }catch(err){
      res.status(500).send({Error : err.message})
  }
}


    module.exports.createBlog = createBlog
    module.exports.getBlogs = getBlogs
    module.exports. updateBlog = updateBlog
    module.exports. deleteBlog = deleteBlog
    module.exports.deletebyQuery = deletebyQuery