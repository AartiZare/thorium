const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher


    if(!authorId) return res.send('The request is not valid as the author details are required.')


    let author = await authorModel.findById(authorId)
    if(!author) return res.send('The request is not valid as no author is present with the given author id')


    if(!publisherId) return res.send('The request is not valid as the publisher details are required.') 

    
    let publisher = await publisherModel.findById(publisherId)
    if(!publisher) return res.send('The request is not valid as no publisher is present with the given publisher id')

    let bookCreated = await bookModel.create(book)
    return res.send({data: bookCreated})
}

const putBooks = async function(req, res){
    let putbook = await bookModel.updateMany(
        {publisher:"62210348bbce397df2c75d61", publisher:"61951bfa4d9fe0d34da84523"},
        {$set:{isHardCover:true}},
        {new:true}
    )
    res.send({data:putbook})
}

const updateBooks = async function(req, res){
    let updatebook = await bookModel.updateMany(
       {authorrating:{$gt:3.5}},
       {$set:{price:100}},
       {new:true}
    )
    res.send({data:updatebook})
}


const getBooks= async function (req, res) {
    let books = await bookModel.find().populate('author publisher')
    res.send({data: books})
}


module.exports.createBook= createBook
module.exports.getBooks= getBooks
module.exports.putBooks= putBooks
module.exports.updateBooks= updateBooks
