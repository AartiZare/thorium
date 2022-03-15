const authorModel = require("../models/authorModel")
const blogsModel = require("../models/blogsModel")
const BlogModel = require("../models/blogsModel")
const createBlog = async function(req, res){
    try{
        let data = req.body
        
        let authorId = data.authorId
        let authorReq=await authorModel.findById(authorId)
        if(authorReq){
            let createBlog = await blogsModel.create(data)
            res.status(201).send({status: true, data: createBlog})
        }
        else{
            res.status(400).send({status: false, msg:`${authorId} is not Avaialable, Enter valid authorId`})
        }
    }
    catch(err){
        console.log("ERRORR", err.message)
        res.status(500).send({msg: "errror found", error:err.message})
    }
}



const getBlogs = async function(req, res){
    try{
        let filters = req.query
        let allBlogs = await blogsModel.find(
            {$and:[filters,{isDeleted:false},{isPublished: true}]})
            if(allBlogs.length == 0){
                return res.status(401).send({status: false, msg: ""})
            }
            return res.status(200).send({status: true, msg: allBlogs})
    }
    catch(err){
        console.log("ERRORR", err.message)
        res.status(500).send({msg: "errror found", error:err.message})
    }
}


// const getBlogs = async function(req, res){
//     try{
//         let filters = req.query
//         filters.isDeleted = false
//         filters.isPublished = false
//         console.log(filters)
//         let allBlogs = await BlogModel.find(filters)

//         if(allBlogs.length == 0){
//             return res.status(404).send({ status : false, msg: ""})

//         }
//         return res.status(200).send({status : true, msg : allBlogs})
//     }
//     catch(err){
//         console.log("ERRORR", err.message)
//         res.status(500).send({msg: "errror found", error:err.message})
//     }
// }



const updateBlogs = async function(req, res)
{
    try{
    let Id = req.params.blogId
    let data = req.body
    data.publishedAt = Date.now()
    data.isPublished = true

    let updatedBlog = await blogsModel.findByIdAndUpdate(
         {_id:Id}, {$set : data},{new : true})
        console.log(updatedBlog)
        return res.send(updatedBlog)
    }catch(err){
        console.log("ERRORR", err.message)
        res.status(500).send({msg: "errror found", error:err.message})
    }
}




const deleteById = async(req, res)=>{
    try{

        let Id = req.params.blogId
        let isExists = await blogsModel.findById(Id)
        if(!isExists){
            return res.status(404).send({Status: false, msg: "Data Not Found"})
        }
        if(isExists.isDeleted != true){
            let deleteBlog = await blogsModel.findOneAndUpdate({_id:Id},{ $set:{isDeleted: true}})
            console.log(deleteBlog)
            return res.status(200).send({status:true, msg:"Successfully Deleted"})
        }
        else{
            return res.status(400).send({status: false, msg: "already deleted"})
        }

    }
    catch(error){
        console.log("ERRORR", err.message)
        res.status(500).send({msg: "errror found", err:error.message})
    }
}


const deleteByParams = async(req, res) => {
    try{
        let filters = req.query
        let ifExists = await blogsModel.find(filters)
        if(!ifExists){
            return res.status(404).send({Status: false, msg: "Data not found"})
        }
        if(ifExists.isDeleted != true){
            let deleteBlog = await blogsModel.findOneAndUpdate(filters, {$set: {isDeleted: true}})
            return res.status(200).send(deleteBlog)
        }else{
            return res.status(400).send({status: false, msg: "already deleted"})
        }
    }
    catch(error){
        console.log("ERRORR", err.message)
        res.status(500).send({msg: "errror found", err:error.message})
    }
}

module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteById = deleteById
module.exports.deleteByParams = deleteByParams