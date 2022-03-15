const AuthorModel = require("../models/authorModel")
const createAuthor = async function(req, res){
    try{
        let data = req.body
        console.log(data);
        if(Object.keys(data).length !== 0)
        {
            let saveData = await AuthorModel.create(data)
            res.status(201).send({msg : saveData})
        }
        else
        res.status(400).send({msg: "BAD REQUEST"})
    }
    catch(err){
        console.log("ERRORR", err.message)
        res.status(500).send({msg: "errror found", error:err.message})
    }
}
module.exports.createAuthor = createAuthor