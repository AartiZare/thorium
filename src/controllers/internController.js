const internModel = require('../models/internModel');


const createIntern = async function (req, res) {
    try {

        const data = req.body;
       
        if (!data.name) {
            res.status(400).send({ status: false, message: 'Intern name is required' })
            return
        }
        if (!data.email) {
            res.status(400).send({ status: false, message: 'Email is required' })
            return
        }
        if (!data.mobile) {
            res.status(400).send({ status: false, message: 'Mobile number is required' })
            return
        }
        if(!data.collegeId){
            res.status(400).send({status: false, message: 'CollegeId is required '})
            return
        }

        let uniqueEmail = await internModel.findOne({email : data.email})
        if(uniqueEmail){
            return res.status(406).send({status: false, msg: 'This email has been already taken and same emails are not acceptable'})
        }
        let uniqueMobile = await internModel.findOne({mobile : data.mobile})
        if(uniqueMobile){
            return res.status(406).send({status: false, msg: 'This mobile number is already exist, same mobile number is not acceptable'})
        }

        let internCreate = await internModel.create(data)
        return res.status(201).send({status: true, data: internCreate})
}
    catch(error){
        return res.status(500).send({status: false, msg: error.message})
    }
}
module.exports.createIntern = createIntern
