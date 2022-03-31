const e = require("express");
const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");

const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    try{
        let token = req.headers["x-auth-token"];
        if (!token) token = req.headers["x-auth-token"];
        if(!token){
        return res.send({status: false, msg: "token must be present"});
        }
        let decodedtoken = jwt.verify(token, "Secret-Key-Aarti-project-3")
            if (!decodedtoken){
                return res.status(401).send({ status: false, message: "token is invalid" })
            } 
        next()
}
catch (error) {
    console.log(error)
    return res.status(500).send({ message: error.message })
}
}


const authorise = async function(req, res, next) {
    // comapre the logged in user's id and the id in request
   try{
            
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "Secret-Key-Aarti-project-3")
    let toBeUpdatedBookId = req.params.bookId;
    if(toBeUpdatedBookId){
        let updatingUserId = await bookModel.findOne({_id: toBeUpdatedBookId }).select({ userId: 1, _id: 0 })
        let user_id = updatingUserId.userId
        let id = decodedToken.userId
        if(id != user_id){
            return res.status(403).send({status: false, message: "You're not authorised to perform this task"})
        }
    
    }
    else{
        let toBeCreatedBookByUserId = req.body.userId
            let id = decodedToken.userId
            if (id != toBeCreatedBookByUserId ) {
                return res.status(403).send({status : false , message : "You are not authorise to perform this task"})
            }
        }
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise
