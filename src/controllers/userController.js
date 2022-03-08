const UserModel = require("../models/userSchema")
//const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    //let data= req.body
    // let savedData= await UserModel.create(data)
    // console.log(req.newAtribute)

    let user = await UserModel.create(req.body)

    res.send({user : user})
}

module.exports.createUser= createUser
