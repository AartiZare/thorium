const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body.page
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBookLists = async function (req, res){
    let allBooks = await BookModel.find({ bookName:{$eq:"greatbook"}, authorName:{$eq:"AartiZare"}
})
   res.send({msg: allBooks})
}

const getParticularbooks = async function(req, res){
    let allBooks = await BookModel.find({
        authorName:{$eq:"AartiZare"}, year:{$eq:2020}
    })
    res.send({msg:allBooks})
}

const getBooksinYear = async function(req, res){
    let allBooks = await BookModel.find({
        year:{$eq:2020}
    })
    res.send({msg: allBooks})
}

const getXINR = async function(req, res){
    let allBooks = await BookModel.find({
        $or: prices[{indianPrice:{$eq:100}},{indianPrice:{$eq:200}},{indianPrice:{$eq:500}}]
    })
    res.send({msg: allBooks})
}

const getRandombooks = async function (req, res){
    let allBooks = await BookModel.find({
        isStockAvailable:true},{data:{$gt:500}}
    )
    res.send({msg: allBooks})
}


module.exports.createBook= createBook
module.exports.getBookLists = getBookLists
module.exports.getParticularbooks = getParticularbooks
module.exports.getBooksinYear = getBooksinYear
module.exports.getXINR = getXINR
module.exports.getRandombooks = getRandombooks