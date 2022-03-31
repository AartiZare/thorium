const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

const createUser= async function (req, res) {
    try {

        const data = req.body;
        if(!data.title){
            res.status(400).send({ status: false, message: 'title is required'})
            return
        }
        if (!data.name) {
            res.status(400).send({ status: false, message: 'User name is required' })
            return
        }
        if (!data.mobile) {
            res.status(400).send({ status: false, message: 'Mobile number is required' })
            return
        }
        if (!data.email) {
            res.status(400).send({ status: false, message: 'Email is required' })
            return
        }
        if(!data.password){
            res.status(400).send({ status: false, message: 'Pasword is required'})
            return
        }

        
        let Mobile = await userModel.findOne({mobile : data.mobile})
        if(Mobile){
            return res.status(406).send({status: false, msg: 'This mobile number is already exist, same mobile number is not acceptable'})
        }
        let Email = await userModel.findOne({email : data.email})
        if(Email){
            return res.status(406).send({status: false, msg: 'This email has been already taken and same emails are not acceptable'})
        }
        let Password = await userModel.findOne({password : data.password})
        if(Password){
            return res.status(406).send({status: false, msg: "Use different password"})
        }

        let createUser = await userModel.create(data)
        return res.status(201).send({status: true, data: createUser})
}
    catch(error){
        return res.status(500).send({status: false, msg: error.message})
    }
}




const loginUser = async function (req, res) {
    try {
      let email = req.body.email;
      let password = req.body.password;
  
      // checking if email and password is missing in req body
      if (!email) return res.status(400).send({ error: " Please , enter email Id" })
      if (!password) return res.status(400).send({ error: " Please , enter password" })
  
      // checking if email and password has no value
      if (!email) return res.status(400).send({ status: false, msg: 'please provide email' })
      if (!password) return res.status(400).send({ status: false, msg: 'please provide password' })
      
  
      let User = await userModel.findOne({ email: email, password: password });
      if (!User)
        return res.status(404).send({
          status: false,
          msg: "user ID and passward not found",
      });
  
      let token = jwt.sign({ userId: User._id.toString() }, "Secret-Key-Aarti-project-3",{expiresIn:"0.5h"});
      res.setHeader("x-auth-token", token);
      res.status(200).send({ status: "User log-in successfully", data: token });
    }
    catch (err) {
      console.log(err)
      res.status(500).send({ msg: err.message })
    }
  }
  

module.exports.createUser = createUser

module.exports.loginUser = loginUser
